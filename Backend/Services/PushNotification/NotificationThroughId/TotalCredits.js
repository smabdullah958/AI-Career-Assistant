const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

// weekly analytics
const WeeklyCreditAnalytics = async (UserId, startDate, endDate) => {
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
      ],

      dimensionFilter: {
        filter: {
          fieldName: "customUser:app_user_id",
          stringFilter: {
            matchType: "EXACT",
            value: String(UserId),
          },
        },
      },
    });

    let Total_Credits = 0;
    let Credits_Consumed = 0;

    let Credits_By_Feature = {
      resume_builder: 0,
      ats_analyzer: 0,
      mock_interview: 0,
    };

    response.rows.forEach((row) => {
      const EventName = row.dimensionValues[0].value;
      const Feature = row.dimensionValues[1].value;

      const EventCount = Number(row.metricValues[0].value);

      // -----------------------------
      // TOTAL CREDITS ALLOCATED
      // -----------------------------

      if (EventName === "credits_allocated") {
        Total_Credits += EventCount * 10;
      }

      // -----------------------------
      // CREDITS CONSUMED
      // -----------------------------

      if (EventName === "api_call") {
        Credits_Consumed += EventCount;

        // -----------------------------
        // CREDITS BY FEATURE
        // -----------------------------

        if (Feature === "resume_builder") {
          Credits_By_Feature.resume_builder += EventCount;
        }

        if (Feature === "ats_analyzer") {
          Credits_By_Feature.ats_analyzer += EventCount;
        }

        if (Feature === "mock_interview") {
          Credits_By_Feature.mock_interview += EventCount;
        }
      }
    });

    // -----------------------------
    // UNUSED CREDITS
    // -----------------------------

    const Credits_Unused = Math.max(Total_Credits - Credits_Consumed, 0);

    // -----------------------------
    // AVERAGE CREDITS PER FEATURE
    // -----------------------------

    const Total_Feature_Credits =
      Credits_By_Feature.resume_builder +
      Credits_By_Feature.ats_analyzer +
      Credits_By_Feature.mock_interview;

    const Average_Credits_Per_Feature = Number(
      (Total_Feature_Credits / 3).toFixed(2),
    );

    console.log(
      "so the total credits is ",
      UserId,

      Total_Credits,

      Credits_Consumed,

      Credits_Unused,

      Credits_By_Feature,

      Average_Credits_Per_Feature,
    );

    // -----------------------------
    // RETURN ANALYTICS
    // -----------------------------

    return {
      Total_Credits,

      Credits_Consumed,

      Credits_Unused,

      Credits_By_Feature,

      Average_Credits_Per_Feature,
    };
  } catch (error) {
    console.error("Credit Analytics Error:", error.message);
    console.error(
      "GA4 Error Details:",
      JSON.stringify(error.details ?? error.cause ?? error, null, 2),
    );

    return {
      Total_Credits: 0,

      Credits_Consumed: 0,

      Credits_Unused: 0,

      Credits_By_Feature: {
        resume_builder: 0,
        ats_analyzer: 0,
        mock_interview: 0,
      },

      Average_Credits_Per_Feature: 0,
    };
  }
};

module.exports = WeeklyCreditAnalytics;



const MonthlyCreditAnalytics = async (UserId, startDate, endDate) => {
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
      ],

      dimensionFilter: {
        filter: {
          fieldName: "customUser:app_user_id",
          stringFilter: {
            matchType: "EXACT",
            value: String(UserId),
          },
        },
      },
    });

    let Total_Credits = 0;
    let Credits_Consumed = 0;

    const Credits_By_Feature = {
      resume_builder: 0,
      ats_analyzer: 0,
      mock_interview: 0,
    };

    (response.rows ?? []).forEach((row) => {
      const EventName = row.dimensionValues[0].value;
      const Feature = row.dimensionValues[1].value;
      const EventCount = Number(row.metricValues[0].value);

      // Total credits allocated
      if (EventName === "credits_allocated") {
        Total_Credits += EventCount * 10;
      }

      // Total credits consumed and usage by feature
      if (EventName === "api_call") {
        Credits_Consumed += EventCount;

        if (Feature === "resume_builder") {
          Credits_By_Feature.resume_builder += EventCount;
        }

        if (Feature === "ats_analyzer") {
          Credits_By_Feature.ats_analyzer += EventCount;
        }

        if (Feature === "mock_interview") {
          Credits_By_Feature.mock_interview += EventCount;
        }
      }
    });

    const Credits_Unused = Math.max(
      Total_Credits - Credits_Consumed,
      0,
    );

    const Total_Feature_Credits =
      Credits_By_Feature.resume_builder +
      Credits_By_Feature.ats_analyzer +
      Credits_By_Feature.mock_interview;

    const Average_Credits_Per_Feature = Number(
      (Total_Feature_Credits / 3).toFixed(2),
    );

    console.log("Monthly Credit Analytics:", {
      UserId,
      startDate,
      endDate,
      Total_Credits,
      Credits_Consumed,
      Credits_Unused,
      Credits_By_Feature,
      Average_Credits_Per_Feature,
    });

    return {
      Total_Credits,
      Credits_Consumed,
      Credits_Unused,
      Credits_By_Feature,
      Average_Credits_Per_Feature,
    };
  } catch (error) {
    console.error("Monthly Credit Analytics Error:", error.message);
    console.error(
      "GA4 Error Details:",
      JSON.stringify(error.details ?? error.cause ?? error, null, 2),
    );

    return {
      Total_Credits: 0,
      Credits_Consumed: 0,
      Credits_Unused: 0,
      Credits_By_Feature: {
        resume_builder: 0,
        ats_analyzer: 0,
        mock_interview: 0,
      },
      Average_Credits_Per_Feature: 0,
    };
  }
};

module.exports = MonthlyCreditAnalytics;
