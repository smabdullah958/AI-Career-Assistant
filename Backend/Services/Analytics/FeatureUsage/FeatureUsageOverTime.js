const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

// Weekly Feature Usage
const WeeklyFeatureUsage = async (startDate, endDate) => {
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
    let Total_Resumes = 0;
    let Total_Mock_Interviews = 0;
    let Total_ATS_Scores = 0;

    response.rows.forEach((row) => {
      const date = row.dimensionValues[0].value;
      const eventName = row.dimensionValues[1].value;
      const eventCount = Number(row.metricValues[0].value);

      if (date !== DateString) {
        return;
      }

      if (eventName === "api_call") {
        Total_API_Calls += eventCount;
      }

      if (eventName === "resume_generated") {
        Total_Resumes += eventCount;
      }

      if (eventName === "mock_interview_started") {
        Total_Mock_Interviews += eventCount;
      }

      if (eventName === "ats_score_generated") {
        Total_ATS_Scores += eventCount;
      }
    });

    Growth.push({
      label: DateValue.toLocaleDateString("en-PK", {
        timeZone: "Asia/Karachi",
        weekday: "short",
      }),

      Total_API_Calls,
      Total_Resumes,
      Total_Mock_Interviews,
      Total_ATS_Scores,
    });
  }

  return Growth;
};

// Monthly Feature Usage
const MonthlyFeatureUsage = async (startDate, endDate) => {
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
    let Total_Resumes = 0;
    let Total_Mock_Interviews = 0;
    let Total_ATS_Scores = 0;

    response.rows.forEach((row) => {
      const date = row.dimensionValues[0].value;
      const eventName = row.dimensionValues[1].value;
      const eventCount = Number(row.metricValues[0].value);

      const year = Number(date.substring(0, 4));
      const month = Number(date.substring(4, 6)) - 1;
      const day = Number(date.substring(6, 8));

      const CurrentDate = new Date(year, month, day);

      const Today = new Date();

      Today.setHours(0, 0, 0, 0);

      const DaysAgo = Math.floor((Today - CurrentDate) / (1000 * 60 * 60 * 24));

      const WeekNumber = Math.floor((29 - DaysAgo) / 7);

      if (WeekNumber !== i) {
        return;
      }

      if (eventName === "api_call") {
        Total_API_Calls += eventCount;
      }

      if (eventName === "resume_generated") {
        Total_Resumes += eventCount;
      }

      if (eventName === "mock_interview_started") {
        Total_Mock_Interviews += eventCount;
      }

      if (eventName === "ats_score_generated") {
        Total_ATS_Scores += eventCount;
      }
    });

    Growth.push({
      label: `Week ${i + 1}`,

      Total_API_Calls,
      Total_Resumes,
      Total_Mock_Interviews,
      Total_ATS_Scores,
    });
  }

  return Growth;
};

// Yearly Feature Usage
const YearlyFeatureUsage = async (startDate, endDate) => {
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
    ],

    metrics: [
      {
        name: "eventCount",
      },
    ],
  });

  const Growth = [];

  for (let i = 0; i < 13; i++) {
    let Total_API_Calls = 0;
    let Total_Resumes = 0;
    let Total_Mock_Interviews = 0;
    let Total_ATS_Scores = 0;

    response.rows.forEach((row) => {
      const yearMonth = row.dimensionValues[0].value;
      const eventName = row.dimensionValues[1].value;
      const eventCount = Number(row.metricValues[0].value);

      const month = Number(yearMonth.substring(4, 6)) - 1;

      const CurrentMonth = new Date();
      CurrentMonth.setMonth(CurrentMonth.getMonth() - (11 - i));

      if (
        month !== CurrentMonth.getMonth() ||
        Number(yearMonth.substring(0, 4)) !== CurrentMonth.getFullYear()
      ) {
        return;
      }

      if (eventName === "api_call") {
        Total_API_Calls += eventCount;
      }

      if (eventName === "resume_generated") {
        Total_Resumes += eventCount;
      }

      if (eventName === "mock_interview_started") {
        Total_Mock_Interviews += eventCount;
      }

      if (eventName === "ats_score_generated") {
        Total_ATS_Scores += eventCount;
      }
    });

    const LabelDate = new Date();
    LabelDate.setMonth(LabelDate.getMonth() - (11 - i));

    Growth.push({
      label: LabelDate.toLocaleDateString("en-PK", {
        timeZone: "Asia/Karachi",
        month: "short",
      }),

      Total_API_Calls,
      Total_Resumes,
      Total_Mock_Interviews,
      Total_ATS_Scores,
    });
  }

  return Growth;
};

module.exports = {
  WeeklyFeatureUsage,
  MonthlyFeatureUsage,
  YearlyFeatureUsage,
};
