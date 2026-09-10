require("../../Config/FirebaseAdmin");

const { getMessaging } = require("firebase-admin/messaging");
const FCMToken = require("../../Model/FCMModel");
const notification = require("../../Utilis/Notification");

const PushUserNotification = async (UserId) => {
  try {
    const userFids = await FCMToken.find({
      UserId,
    });

    console.log(`User ${UserId} has ${userFids.length} FID record(s)`);

    if (userFids.length === 0) {
      console.log(`No FID found for user ${UserId}`);
      return;
    }

    for (const item of userFids) {
      try {
        console.log("Sending notification to FID:", item.FcmToken);

        const message = {
          fid: item.FcmToken,

          notification: notification(
            UserId,
            "Weekly_Report",
            "Your weekly report is ready",
            "Here you can check out your weekly work",
          ),
        };

        console.log("Firebase message:", message);

        const response = await getMessaging().send(message);

        console.log(`Notification sent to user: ${UserId}`);

        console.log("Firebase response:", response);
      } catch (error) {
        console.log(`Notification failed for FID ${item.FcmToken}:`, error);

        if (
          error.code === "messaging/registration-token-not-registered" ||
          error.code === "messaging/invalid-registration-token"
        ) {
          await FCMToken.deleteOne({
            _id: item._id,
          });

          console.log(`Removed invalid FID: ${item.FcmToken}`);
        }
      }
    }
  } catch (error) {
    console.log(`Push notification service failed for user ${UserId}:`, error);
  }
};

module.exports = PushUserNotification;
