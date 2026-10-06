require("../../Config/FirebaseAdmin");
let Frontend = process.env.Frontend;

const { getMessaging } = require("firebase-admin/messaging");
const FCMToken = require("../../Model/FCMModel");

const PushUserNotification = async (UserId, type, title, Message, URL) => {
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

          notification: { title, body: Message },
          data: { type, URL },
          webpush: {
            fcmOptions: {
              link: `${URL}`,
            },
          },
        };

        console.log("Firebase message:", message);

        const response = await getMessaging().send(message);

        console.log(`Notification sent to user: ${UserId} and url is ${URL}`);

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
