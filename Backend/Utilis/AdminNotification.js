let NotificationModel = require("../Model/Notification");

let userModel = require("../Model/Auth");

let SendNotification = async (type, title, message) => {
  try {
    let FindAdminUser = await userModel
      .find({
        Role: {
          $in: ["Admin", "SuperAdmin"],
        },
      })
      .select("_id");

    if (!FindAdminUser) {
      return console.log("No Admin user found");
    }

    // let notification = await NotificationModel.create({
    //   recipientID: FindAdminUser._id,
    //   type,
    //   title,
    //   message,
    // });
    // return notification;

    let notifications = FindAdminUser.map((admin) => ({
      recipientID: admin._id,
      type,
      title,
      message,
    }));

    let createdNotifications =
      await NotificationModel.insertMany(notifications);

    return createdNotifications;
  } catch (err) {
    console.log("internal error", err);
  }
};
module.exports = SendNotification;
