let NotificationModel = require("../../Model/Notification");

let MarkNotificationsAsRead = async (req, res) => {
  try {
    let UserID = req.user.UserId;

    await NotificationModel.updateMany(
      {
        recipientID: UserID,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    return res.status(200).json({
      message: "Notifications marked as read",
    });
  } catch (err) {
    console.log("Error marking notifications as read:", err);

    return res.status(500).json({
      message: "Internal error",
      error: err.message,
    });
  }
};

module.exports = MarkNotificationsAsRead;
