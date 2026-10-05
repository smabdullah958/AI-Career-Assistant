const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const AverageFeatureUsage = async (startDate, endDate) => {
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
          name: "eventName",
        },
        {
          name: "customEvent:feature",
        },
      ],

      metrics: [
        {
          name: "eventCount",
        },
        {
          name: "totalUsers",
        },
      ],

      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: {
            matchType: "EXACT",
            value: "api_call",
          },
        },
      },
    });

    let Resume_Calls = 0;
    let Resume_Users = 0;

    let ATS_Calls = 0;
    let ATS_Users = 0;

    let Mock_Interview_Calls = 0;
    let Mock_Interview_Users = 0;

    // response.rows.forEach((row) => {
    //   const Feature = row.dimensionValues[1].value;

    //   const EventCount = Number(row.metricValues[0].value);
    //   const TotalUsers = Number(row.metricValues[1].value);

    //   console.log({
    //     Feature,
    //     EventCount,
    //     TotalUsers,
    //   });

    //   if (Feature === "resume_builder") {
    //     Resume_Calls += EventCount;
    //     Resume_Users += TotalUsers;
    //   }

    //   if (Feature === "ats_analyzer") {
    //     ATS_Calls += EventCount;
    //     ATS_Users += TotalUsers;
    //   }

    //   if (Feature === "mock_interview") {
    //     Mock_Interview_Calls += EventCount;
    //     Mock_Interview_Users += TotalUsers;
    //   }
    // });

    response.rows.forEach((row) => {
      const EventName = row.dimensionValues[0].value;
      const Feature = row.dimensionValues[1].value;

      const EventCount = Number(row.metricValues[0].value);
      const TotalUsers = Number(row.metricValues[1].value);

      console.log({
        EventName,
        Feature,
        EventCount,
        TotalUsers,
      });

      if (EventName !== "api_call") return;

      if (Feature === "resume_builder") {
        Resume_Calls += EventCount;
        Resume_Users += TotalUsers;
      }

      if (Feature === "ats_analyzer") {
        ATS_Calls += EventCount;
        ATS_Users += TotalUsers;
      }

      if (Feature === "mock_interview") {
        Mock_Interview_Calls += EventCount;
        Mock_Interview_Users += TotalUsers;
      }
    });

    const Average_Resume_Calls =
      Resume_Users > 0 ? Number((Resume_Calls / Resume_Users).toFixed(2)) : 0;

    const Average_ATS_Calls =
      ATS_Users > 0 ? Number((ATS_Calls / ATS_Users).toFixed(2)) : 0;

    const Average_Mock_Interview_Calls =
      Mock_Interview_Users > 0
        ? Number((Mock_Interview_Calls / Mock_Interview_Users).toFixed(2))
        : 0;

    console.log("========== AVERAGE FEATURE USAGE ==========");
    console.log("Resume:", Average_Resume_Calls);
    console.log("ATS:", Average_ATS_Calls);
    console.log("Mock Interview:", Average_Mock_Interview_Calls);
    console.log("===========================================");

    return {
      Average_Resume_Calls,
      Average_ATS_Calls,
      Average_Mock_Interview_Calls,
    };
  } catch (error) {
    console.log("Internal error in average feature usage:");
    console.log(error.message);

    return {
      Average_Resume_Calls: 0,
      Average_ATS_Calls: 0,
      Average_Mock_Interview_Calls: 0,
    };
  }
};

module.exports = AverageFeatureUsage;
