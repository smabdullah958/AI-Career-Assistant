let NotificationModel = require("../Model/Notification");

let CreateNotification = async (ID, type, title, message, URL) => {
  try {
    let notification = await NotificationModel.create({
      recipientID: ID,
      type,
      title,
      message,
      URL,
    });
    return notification;
  } catch (err) {
    console.log("internal error", err);
  }
};

module.exports = CreateNotification;
