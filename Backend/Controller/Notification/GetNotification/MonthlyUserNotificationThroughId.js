let UserAuth = require("../../../Model/Auth");
let MonthlyCreditAnalytics = require("../../../Services/PushNotification/NotificationThroughId/TotalCredits");
let MonthlyCreditUsageTrend = require("../../../Services/PushNotification/NotificationThroughId/CreditUsageTrend ");
let SuccessFailureAnalytics = require("../../../Services/PushNotification/NotificationThroughId/SuccessFailedAnalytics");

let UserNotificationById = async (req, res) => {
  try {
    let UserId = req.params.UserId;
    let FindUser = await UserAuth.findOne({ _id: UserId });
    if (!FindUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    let [
      Monthly_Credit_Analytics,
      Monthly_Credit_Usage_Trend,
      Success_Failure_Analytics,
    ] = await Promise.all([
      MonthlyCreditAnalytics(UserId, "30daysAgo", "today"),
      MonthlyCreditUsageTrend(UserId, "30daysAgo", "today"),
      SuccessFailureAnalytics(UserId, "30daysAgo", "today"),
    ]);
    console.log("Notification");
    res.status(200).json({
      Monthly_Credit_Analytics,
      Monthly_Credit_Usage_Trend,
      Success_Failure_Analytics,
    });
  } catch (error) {
    console.log("internal error ina  user notifiocnat route ", error);
    return res
      .status(500)
      .json({ message: "internal error ina  user notifiocnat route" });
  }
};

module.exports = UserNotificationById;
