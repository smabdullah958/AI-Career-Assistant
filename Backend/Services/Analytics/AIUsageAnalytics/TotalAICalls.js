const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const TotalAICalls = async () => {
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
  });

  console.log("========== GA4 CREDIT ANALYTICS ==========");

  let Total_Credits = 0;
  let Credits_Consumed = 0;

  response.rows.forEach((row) => {
    const eventName = row.dimensionValues[0].value;
    const eventCount = Number(row.metricValues[0].value);

    console.log("Event:", eventName);
    console.log("Count:", eventCount);

    if (eventName === "credits_allocated") {
      Total_Credits = eventCount * 10;
    }

    if (eventName === "api_call") {
      Credits_Consumed = eventCount;
    }
  });

  const Credits_Wasted = Math.max(Total_Credits - Credits_Consumed, 0);

  const Number_Of_Features = 3;

  const Average_Credits_Per_Feature =
    Number_Of_Features > 0 ? Credits_Consumed / Number_Of_Features : 0;

  console.log("Total Credits:", Total_Credits);
  console.log("Credits Consumed:", Credits_Consumed);
  console.log("Credits Wasted:", Credits_Wasted);
  console.log("Average Credits Per Feature:", Average_Credits_Per_Feature);

  console.log("==========================================");

  return {
    Total_Credits,
    Credits_Consumed,
    Credits_Wasted,
    Average_Credits_Per_Feature,
  };
};

module.exports = TotalAICalls;
