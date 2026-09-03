const Usage = require("../Model/Usage");
let Notifcation = require("../Utilis/Notification");

let DailyUsageMiddleWare = async (req, res, next) => {
  const UserId = req.user.UserId;

  const today = new Date().toISOString().split("T")[0];

  let record = await Usage.findOne({ UserId, LastCallDate: today });

  if (!record) {
    record = await Usage.create({
      UserId,
      LastCallDate: today,
      ApiCallCount: 10,
    });
  }

  if (record.ApiCallCount === 0) {
    return res.status(429).json({
      message: "Daily limit reached (10 requests/day)",
      remainingCalls: 0,
    });
  }

  // increase count
  record.ApiCallCount -= 1;
  await record.save();

  if (record.ApiCallCount <= 3) {
    //send notification when remaining call is 3  or less than 3 to user
    let notification = await Notifcation(
      UserId,
      "Low_Credits",
      "Your daily API call limit is running low",
      `You have ${record.ApiCallCount} API calls remaining for today.`,
    );
    console.log("send notfication to a user", notification);
  }

  //now pass the remaining call to a controller
  req.remainingCalls = record.ApiCallCount;

  console.log("the api call is ", record.ApiCallCount);

  next();
};

module.exports = DailyUsageMiddleWare;
