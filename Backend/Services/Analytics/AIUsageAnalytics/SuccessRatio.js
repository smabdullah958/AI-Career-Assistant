const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const SuccessRatio = async (startDate, endDate) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.PropertyID}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [{ name: "eventName" }, { name: "customEvent:status" }],

      metrics: [{ name: "eventCount" }],
    });

    let Successful_API_Calls = 0;
    let Failed_API_Calls = 0;

    response.rows.forEach((row) => {
      const EventName = row.dimensionValues[0].value;
      const Status = row.dimensionValues[1].value;
      const EventCount = Number(row.metricValues[0].value);

      if (EventName !== "api_call") return;

      if (Status === "success") {
        Successful_API_Calls += EventCount;
      }

      if (Status === "failed") {
        Failed_API_Calls += EventCount;
      }
    });

    const Total_API_Calls = Successful_API_Calls + Failed_API_Calls;

    const Success_Ratio =
      Total_API_Calls > 0
        ? Number(((Successful_API_Calls / Total_API_Calls) * 100).toFixed(1))
        : 0;

    const Failure_Ratio =
      Total_API_Calls > 0
        ? Number(((Failed_API_Calls / Total_API_Calls) * 100).toFixed(1))
        : 0;

    return {
      Success_Ratio,
      Failure_Ratio,
    };
  } catch (error) {
    console.log("Internal error in AI calls success/failure ratio:", error);

    return {
      Success_Ratio: 0,
      Failure_Ratio: 0,
    };
  }
};

module.exports = SuccessRatio;
