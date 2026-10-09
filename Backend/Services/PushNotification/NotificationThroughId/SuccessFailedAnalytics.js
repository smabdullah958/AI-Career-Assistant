const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const SuccessFailureAnalytics = async (UserId, startDate, endDate) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PropertyID}`,

      dateRanges: [{ startDate, endDate }],

      dimensions: [{ name: "customEvent:status" }],

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
    });

    let Successful_APIs = 0;
    let Failed_APIs = 0;

    for (const row of response.rows || []) {
      const Status = row.dimensionValues[0].value;
      const Count = Number(row.metricValues[0].value);

      if (Status === "success") {
        Successful_APIs += Count;
      } else if (Status === "failed") {
        Failed_APIs += Count;
      }
    }

    const Total_APIs = Successful_APIs + Failed_APIs;

    return {
      Successful_APIs,
      Failed_APIs,
      Total_APIs,
    };
  } catch (error) {
    console.error("API Success/Failure Analytics Error:", error.message);
    throw error;
  }
};

module.exports = SuccessFailureAnalytics;
