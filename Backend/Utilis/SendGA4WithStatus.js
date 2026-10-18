const SendGA4Event = require("./SendGA4Event");

const SendGA4WithStatus = async (ClientId, Feature, Status, CreditUsed) => {
  await SendGA4Event(ClientId, "api_call", {
    feature: Feature,
    status: Status,
    credit_used: CreditUsed,
  });
};

module.exports = SendGA4WithStatus;
