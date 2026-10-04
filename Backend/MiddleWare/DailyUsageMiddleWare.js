const Usage = require("../Model/Usage");
const Notifcation = require("../Utilis/UserNotification");
const SendGA4Event = require("../Utilis/SendGA4Event");

let DailyUsageMiddleWare = async (req, res, next) => {
  const UserId = req.user.UserId;

  const now = new Date();

  const PakistanDate = now.toLocaleDateString("en-CA", {
    timeZone: "Asia/Karachi",
  });

  const PakistanTime = now.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  console.log("Pakistan Date:", PakistanDate);
  console.log("Pakistan Time:", PakistanTime);

  let today = PakistanDate;

  // TEST: daily reset at 02:18 Pakistan time
  if (PakistanTime >= "16:15") {
    today = `${PakistanDate}-16:15`;
  } else {
    const previousDate = new Date(now);
    previousDate.setDate(previousDate.getDate() - 1);

    const PreviousPakistanDate = previousDate.toLocaleDateString("en-CA", {
      timeZone: "Asia/Karachi",
    });

    today = `${PreviousPakistanDate}-16:15`;
  }

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
