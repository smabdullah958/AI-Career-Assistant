const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const UserByCountry = async (startDate, endDate) => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.PropertyID}`,

    dimensions: [
      {
        name: "country",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
    ],

    dateRanges: [
      {
        startDate,
        endDate,
      },
    ],
  });

  return response.rows.map((row) => ({
    country: row.dimensionValues[0].value,
    activeUsers: Number(row.metricValues[0].value),
  }));
};

module.exports = UserByCountry;
