const axios = require("axios");

const SendGA4Event = async (ClientId, EventName, Params = {}) => {
  try {
    const response = await axios.post(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
      {
        client_id: ClientId,
        events: [
          {
            name: EventName,
            params: Params,
          },
        ],
      },
    );

    console.log("========== GA4 EVENT SENT ==========");
    console.log("Event Name:", EventName);
    console.log("Client ID:", ClientId);
    console.log("Parameters:", Params);
    console.log("GA4 Status:", response.status);
    console.log("====================================");
  } catch (error) {
    console.log("========== GA4 EVENT ERROR ==========");
    console.log("Event Name:", EventName);
    console.log("Client ID:", ClientId);
    console.log("Error:", error.response?.data || error.message);
    console.log("=====================================");
  }
};

module.exports = SendGA4Event;

const SendGA4WithStatus = async (ClientId, Feature, Status, CreditUsed) => {
  await SendGA4Event(ClientId, "api_call", {
    feature: Feature,
    status: Status,
    credit_used: CreditUsed,
  });
};

module.exports = SendGA4WithStatus;
