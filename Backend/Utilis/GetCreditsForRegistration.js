let DailyUsageCredits = require("../Model/Usage");

let GetCreditsForLogIn = async (UserId) => {
  let today = new Date().toISOString().split("T")[0];
  let UsageRecord = await DailyUsageCredits.findOne({
    UserId,
    LastCallDate: today,
  });
  if (!UsageRecord) {
    UsageRecord = await DailyUsageCredits.create({
      UserId  ,
      LastCallDate: today,
      ApiCallCount: 10,
    });
  }
  return UsageRecord.ApiCallCount;
};

module.exports = GetCreditsForLogIn;
