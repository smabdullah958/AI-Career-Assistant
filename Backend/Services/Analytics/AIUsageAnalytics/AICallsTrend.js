const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

// ==================== WEEKLY ====================

const WeeklyAICallsTrend = async (startDate, endDate) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PropertyID}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "date",
        },
        {
          name: "eventName",
        },
        {
          name: "customEvent:status",
        },
      ],

      metrics: [
        {
          name: "eventCount",
        },
      ],
    });

    const Growth = [];

    for (let i = 0; i < 7; i++) {
      const DateValue = new Date();

      DateValue.setDate(DateValue.getDate() - i);

      const DateString =
        DateValue.getFullYear().toString() +
        String(DateValue.getMonth() + 1).padStart(2, "0") +
        String(DateValue.getDate()).padStart(2, "0");

      let Total_API_Calls = 0;
      let Successful_API_Calls = 0;

      response.rows.forEach((row) => {
        const date = row.dimensionValues[0].value;
        const eventName = row.dimensionValues[1].value;
        const status = row.dimensionValues[2].value;

        const eventCount = Number(row.metricValues[0].value);

        if (date !== DateString) return;

        if (eventName !== "api_call") return;

        Total_API_Calls += eventCount;

        if (status === "success") {
          Successful_API_Calls += eventCount;
        }
      });

      Growth.push({
        label: DateValue.toLocaleDateString("en-PK", {
          timeZone: "Asia/Karachi",
          weekday: "short",
        }),
        Total_API_Calls,
        Successful_API_Calls,
      });
    }

    return Growth;
  } catch (error) {
    console.log(
      "internal error ina  weekly report for a ai calls trend",
      error,
    );
  }
};

// ==================== MONTHLY ====================

const MonthlyAICallsTrend = async (startDate, endDate) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PropertyID}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "date",
        },
        {
          name: "eventName",
        },
        {
          name: "customEvent:status",
        },
      ],

      metrics: [
        {
          name: "eventCount",
        },
      ],
    });

    const Growth = [];

    for (let i = 0; i < 4; i++) {
      let Total_API_Calls = 0;
      let Successful_API_Calls = 0;

      response.rows.forEach((row) => {
        const date = row.dimensionValues[0].value;
        const eventName = row.dimensionValues[1].value;
        const status = row.dimensionValues[2].value;

        const eventCount = Number(row.metricValues[0].value);

        if (eventName !== "api_call") return;

        const year = Number(date.substring(0, 4));
        const month = Number(date.substring(4, 6)) - 1;
        const day = Number(date.substring(6, 8));

        const CurrentDate = new Date(year, month, day);

        const Today = new Date();
        Today.setHours(0, 0, 0, 0);

        const DaysAgo = Math.floor(
          (Today - CurrentDate) / (1000 * 60 * 60 * 24),
        );

        const WeekNumber = Math.floor((29 - DaysAgo) / 7);

        if (WeekNumber !== i) return;

        Total_API_Calls += eventCount;

        if (status === "success") {
          Successful_API_Calls += eventCount;
        }
      });

      Growth.push({
        label: `Week ${i + 1}`,
        Total_API_Calls,
        Successful_API_Calls,
      });
    }

    return Growth;
  } catch (error) {
    console.log(
      "internal error ina  monthly report for a ai calls trend",
      error,
    );
  }
};

// ==================== YEARLY ====================

const YearlyAICallsTrend = async (startDate, endDate) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PropertyID}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "yearMonth",
        },
        {
          name: "eventName",
        },
        {
          name: "customEvent:status",
        },
      ],

      metrics: [
        {
          name: "eventCount",
        },
      ],
    });

    const Growth = [];

    for (let i = 0; i < 12; i++) {
      let Total_API_Calls = 0;
      let Successful_API_Calls = 0;

      const CurrentMonth = new Date();

      CurrentMonth.setMonth(CurrentMonth.getMonth() - (11 - i));

      const CurrentYear = CurrentMonth.getFullYear();
      const CurrentMonthNumber = CurrentMonth.getMonth() + 1;

      response.rows.forEach((row) => {
        const yearMonth = row.dimensionValues[0].value;
        const eventName = row.dimensionValues[1].value;
        const status = row.dimensionValues[2].value;

        const eventCount = Number(row.metricValues[0].value);

        if (eventName !== "api_call") return;

        const RowYear = Number(yearMonth.substring(0, 4));
        const RowMonth = Number(yearMonth.substring(4, 6));

        if (RowYear !== CurrentYear || RowMonth !== CurrentMonthNumber) {
          return;
        }

        Total_API_Calls += eventCount;

        if (status === "success") {
          Successful_API_Calls += eventCount;
        }
      });

      Growth.push({
        label: CurrentMonth.toLocaleDateString("en-PK", {
          timeZone: "Asia/Karachi",
          month: "short",
        }),
        Total_API_Calls,
        Successful_API_Calls,
      });
    }

    return Growth;
  } catch (error) {
    console.log(
      "internal error ina  yearly report for a ai calls trend",
      error,
    );
  }
};

module.exports = {
  WeeklyAICallsTrend,
  MonthlyAICallsTrend,
  YearlyAICallsTrend,
};
