const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const TotalFeatureUsage = async () => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.PropertyID}`,

    dateRanges: [
      {
        startDate: "2026-09-01",
        endDate: "today",
      },
    ],

    dimensions: [
      {
        name: "eventName",
      },
    ],

    metrics: [
      {
        name: "eventCount",
      },
    ],

    metricAggregations: ["TOTAL"],
  });

  const result = {
    Total_API_Calls: 0,
    Total_Resumes: 0,
    Total_Mock_Interviews: 0,
    Total_ATS_Scores: 0,
  };

  response.rows.forEach((row) => {
    const eventName = row.dimensionValues[0].value;
    const eventCount = Number(row.metricValues[0].value);

    if (eventName === "api_call") {
      result.Total_API_Calls = eventCount;
    }

    if (eventName === "resume_generated") {
      result.Total_Resumes = eventCount;
    }

    if (eventName === "mock_interview_started") {
      result.Total_Mock_Interviews = eventCount;
    }

    if (eventName === "ats_score_generated") {
      result.Total_ATS_Scores = eventCount;
    }
  });

  return result;
};
module.exports = TotalFeatureUsage;
