const Usage = require("../Model/Usage");
const Notifcation = require("../Utilis/UserNotification");
const SendGA4Event = require("../Utilis/SendGA4Event");

let DailyUsageMiddleWare = async (req, res, next) => {
  const UserId = req.user.UserId;

  const now = new Date();

  const PakistanDate = now.toLocaleDateString("en-CA", {
    timeZone: "Asia/Karachi",
  });

  // Reset daily credits at 12:00 AM Pakistan time
  const today = PakistanDate;

  console.log("Pakistan Date:", PakistanDate);
  console.log("Usage Day:", today);

  let record = await Usage.findOne({
    UserId,
    LastCallDate: today,
  });

  if (!record) {
    record = await Usage.create({
      UserId,
      LastCallDate: today,
      ApiCallCount: 10,
    });

    console.log("NEW DAILY CREDITS ALLOCATED");

    await SendGA4Event(process.env.Client_ID, "credits_allocated", {
      credits_allocated: 10,
    });
  }

  if (record.ApiCallCount === 0) {
    return res.status(429).json({
      message: "Daily limit reached (10 requests/day)",
      remainingCalls: 0,
    });
  }

  record.ApiCallCount -= 1;

  await record.save();

  if (record.ApiCallCount <= 3) {
    let notification = await Notifcation(
      UserId,
      "Low_Credits",
      "Your daily API call limit is running low",
      `You have ${record.ApiCallCount} API calls remaining for today.`,
    );

    console.log("send notification to a user", notification);
  }

  req.remainingCalls = record.ApiCallCount;

  console.log("Remaining API calls:", record.ApiCallCount);

  next();
};

module.exports = DailyUsageMiddleWare;
