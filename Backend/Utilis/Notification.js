let NotificationModel = require("../Model/Notification");

let SendNotification = async (ID, type, title, message) => {
  try {
    let notification = await NotificationModel.create({
      recipientID: ID,
      type,
      title,
      message,
    });
    return notification;
  } catch (err) {
    console.log("internal error", err);
  }
};

module.exports = SendNotification;
