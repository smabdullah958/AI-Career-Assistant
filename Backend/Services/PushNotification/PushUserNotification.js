const admin = require("../../Config/FirebaseAdmin");
const FCMToken = require("../../Model/FCMModel");
let notification = require("../../Utilis/Notification");

const PushUserNotification = async (UserId) => {
  try {
    // Find all FCM tokens of this user
    const userTokens = await FCMToken.find({
      UserId,
    });

    if (userTokens.length === 0) {
      console.log(`No FCM token found for user ${UserId}`);
      return;
    }

    // Send notification to every device
    for (const item of userTokens) {
      const message = {
        token: item.FcmToken,

        notification: notification(
          UserId,
          "Weekly_Report",
          "your weekly report is ready",
          "here you can check it out your weekly work",
        ),
      };

      await admin.messaging().send(message);
    }
    console.log(`Notification sent to user: ${UserId}`);
  } catch (error) {
    console.log(`Notification failed for user ${UserId}:`, error);
    if (error.code === "messaging/registration-token-not-registered") {
      await FCMToken.deleteOne({
        _id: UserId,
      });
    }
  }
};
module.exports = PushUserNotification;
