let NotificationModel = require("../../Model/Notification");

let UnReadNotifications = async (req, res) => {
  try {
    let UserID = req.user.UserId;

    let UnReadCount = await NotificationModel.countDocuments({
      recipientID: UserID,
      isRead: false,
    });

    console.log(
      "so the total number of unread notificaont si a : ",
      UnReadNotifications,
    );

    return res.status(200).json({
      message: "Notifications marked as read",
      UnReadCount,
    });
  } catch (err) {
    console.log("Error marking notifications as read:", err);

    return res.status(500).json({
      message: "Internal error",
    });
  }
};

module.exports = UnReadNotifications;
