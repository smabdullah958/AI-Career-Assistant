// const admin = require("../../Config/FirebaseAdmin");
// const FCMToken = require("../../Model/FCMModel");
// let notification = require("../../Utilis/Notification");

// const PushUserNotification = async (UserId) => {
//   try {
//     // Find all FCM tokens of this user
//     const userTokens = await FCMToken.find({
//       UserId,
//     });

//     if (userTokens.length === 0) {
//       console.log(`No FCM token found for user ${UserId}`);
//       return;
//     }

//     // Send notification to every device
//     for (const item of userTokens) {
//       const message = {
//         fid: item.FcmToken,

//         notification: notification(
//           UserId,
//           "Weekly_Report",
//           "your weekly report is ready",
//           "here you can check it out your weekly work",
//         ),
//       };

//       await admin.messaging().send(message);
//     }
//     console.log(`Notification sent to user: ${UserId}`);
//   } catch (error) {
//     console.log(`Notification failed for user ${UserId}:`, error);
//     if (error.code === "messaging/registration-token-not-registered") {
//       await FCMToken.deleteOne({
//         UserId,
//         Fid: item.Fid,
//       });
//     }
//   }
// };
// module.exports = PushUserNotification;

const admin = require("../../Config/FirebaseAdmin");
const FCMToken = require("../../Model/FCMModel");
const notification = require("../../Utilis/Notification");

const PushUserNotification = async (UserId) => {
  try {
    const userFids = await FCMToken.find({
      UserId,
    });

    if (userFids.length === 0) {
      console.log(`No FID found for user ${UserId}`);
      return;
    }

    for (const item of userFids) {
      try {
        const message = {
          fid: item.Fid,

          notification: notification(
            UserId,
            "Weekly_Report",
            "Your weekly report is ready",
            "Here you can check out your weekly work",
          ),
        };

        const response = await admin.messaging().send(message);

        console.log(`Notification sent to user ${UserId}`, response);
      } catch (error) {
        console.log(`Notification failed for FID ${item.Fid}:`, error);

        // Remove invalid/unregistered FID
        if (
          error.code === "messaging/registration-token-not-registered" ||
          error.code === "messaging/invalid-registration-token"
        ) {
          await FCMToken.deleteOne({
            _id: item._id,
          });

          console.log(`Removed invalid FID: ${item.Fid}`);
        }
      }
    }
  } catch (error) {
    console.log(`Push notification service failed for user ${UserId}:`, error);
  }
};

module.exports = PushUserNotification;
