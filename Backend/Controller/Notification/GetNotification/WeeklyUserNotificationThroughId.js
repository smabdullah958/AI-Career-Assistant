let UserAuth = require("../../../Model/Auth");
let WeeklyCreditAnalytics = require("../../../Services/PushNotification/NotificationThroughId/TotalCredits");
let WeeklyCreditUsageTrend = require("../../../Services/PushNotification/NotificationThroughId/CreditUsageTrend ");
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
      Weekly_Credit_Analytics,
      Weekly_Credit_UsageTrend,
      Success_Failure_Analytics,
    ] = await Promise.all([
      WeeklyCreditAnalytics(UserId, "7daysAgo", "today"),
      WeeklyCreditUsageTrend(UserId, "7daysAgo", "today"),
      SuccessFailureAnalytics(UserId, "7daysAgo", "today"),
    ]);
    console.log("Notification");
    res.status(200).json({
      Weekly_Credit_Analytics,
      Weekly_Credit_UsageTrend,
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
