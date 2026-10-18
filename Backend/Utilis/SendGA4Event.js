const axios = require("axios");

const SendGA4Event = async (
  ClientId,
  EventName,
  Params = {},
  UserId = null,
) => {
  try {
    // const response = await axios.post(
    //   `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
    //   {
    //     client_id: ClientId,
    //     events: [
    //       {
    //         name: EventName,
    //         params: Params,
    //       },
    //     ],
    //   },
    // );

    // console.log("========== GA4 EVENT SENT ==========");
    // console.log("Event Name:", EventName);
    // console.log("Client ID:", ClientId);
    // console.log("Parameters:", Params);
    // console.log("GA4 Status:", response.status);
    // console.log("====================================");

    const payload = {
      client_id: String(ClientId),
      events: [
        {
          name: EventName,
          params: Params,
        },
      ],
    };

    if (UserId) {
      payload.user_id = String(UserId);
      payload.user_properties = {
        app_user_id: {
          value: String(UserId),
        },
      };
    }

    const response = await axios.post(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
      payload,
    );

    console.log("GA4 EVENT SENT", {
      EventName,
      UserId: UserId ? String(UserId) : null,
      Params,
      Status: response.status,
    });
  } catch (error) {
    console.log("========== GA4 EVENT ERROR ==========");
    console.log("Event Name:", EventName);
    console.log("Client ID:", ClientId);
    console.log("Error:", error.response?.data || error.message);
    console.log("=====================================");
  }
};

module.exports = SendGA4Event;
