const Usage = require("../Model/Usage");

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

  //now pass the remaining call to a controller
  req.remainingCalls = record.ApiCallCount;

  console.log("the api call is ", record.ApiCallCount);

  next();
};

module.exports = DailyUsageMiddleWare;
