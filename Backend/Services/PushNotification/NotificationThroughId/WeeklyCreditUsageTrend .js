const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const WeeklyCreditUsageTrend = async (UserId, startDate, endDate) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PropertyID}`,

      dateRanges: [{ startDate, endDate }],

      dimensions: [{ name: "date" }, { name: "customEvent:feature" }],

      metrics: [{ name: "eventCount" }],

      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: "eventName",
                stringFilter: {
                  matchType: "EXACT",
                  value: "api_call",
                },
              },
            },
            {
              filter: {
                fieldName: "customEvent:status",
                stringFilter: {
                  matchType: "EXACT",
                  value: "success",
                },
              },
            },
            {
              filter: {
                fieldName: "customUser:app_user_id",
                stringFilter: {
                  matchType: "EXACT",
                  value: String(UserId),
                },
              },
            },
          ],
        },
      },

      orderBys: [
        {
          dimension: {
            dimensionName: "date",
          },
        },
      ],
    });

    const WeeklyData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dateKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("");

      WeeklyData.push({
        dateKey,
        day: date.toLocaleDateString("en-PK", {
          weekday: "short",
        }),
        ats_analyzer: 0,
        resume_builder: 0,
        mock_interview: 0,
      });
    }

    const DataByDate = new Map(WeeklyData.map((item) => [item.dateKey, item]));

    for (const row of response.rows || []) {
      const dateKey = row.dimensionValues[0].value;
      const feature = row.dimensionValues[1].value;
      const count = Number(row.metricValues[0].value);

      const dayData = DataByDate.get(dateKey);

      if (!dayData) continue;

      if (feature === "ats_analyzer") {
        dayData.ats_analyzer += count;
      } else if (feature === "resume_builder") {
        dayData.resume_builder += count;
      } else if (feature === "mock_interview") {
        dayData.mock_interview += count;
      }
    }

    return {
      WeeklyData: WeeklyData.map(({ dateKey, ...item }) => item),
    };
  } catch (error) {
    console.error("Weekly Credit Usage Trend Error:", error.message);
    throw error;
  }
};

module.exports = WeeklyCreditUsageTrend;
