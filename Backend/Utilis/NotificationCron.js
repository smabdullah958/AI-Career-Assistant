const cron = require("node-cron");
let PushUserNotification = require("../Services/PushNotification/PushUserNotification");
let PushAdminNotification = require("../Services/PushNotification/PushAdminNotification");
const Auth = require("../Model/Auth");
const CreateNotification = require("./UserNotification"); //creae notifcaiton toa user
const CreateAdminNotification = require("./AdminNotification"); //creae notifcaiton toa admin

//weekly notification ona monday at a 9am
// */1
cron.schedule("*/100 * * * *", async () => {
  try {
    console.log("🔔 Cron job started");

    //get all the users
    const users = await Auth.find({});

    //send notiocan toa  all a user
    for (const user of users) {
      const type = "Weekly_Report";

      const title = "Your weekly report is ready";

      const message = "Here you can check out your weekly work";

      await CreateNotification(user._id, type, title, message);

      //send all the data to a push user notificoantion from where the notficaoitn si send from firebase
      await PushUserNotification(user._id, type, title, message, "/");
    }

    //get all the admin or a super admin
    const admins = await Auth.find({
      Role: {
        $in: ["Admin", "SuperAdmin"],
      },
    }).select("_id");

    //send notiocan toa  all the admin or a super admin
    for (const admin of admins) {
      const type = "Weekly_Report";

      const title = "Your admin or super admin weekly report is ready";

      const message = "Here you can check out your weekly work";

      await CreateAdminNotification(admin._id, type, title, message);

      //send all the data to a push user notificoantion from where the notficaoitn si send from firebase
      await PushAdminNotification(
        admin._id,
        type,
        title,
        message,
        "/AdminDashbord",
      );
    }

    console.log("🔔 Cron job finished");
  } catch (error) {
    console.log("Cron job error:", error.message);
  }
});

//montly notification ona monday at a 9am
cron.schedule("*/100 * * * *", async () => {
  try {
    console.log("🔔 Cron job started");

    //get all the users
    const users = await Auth.find({});

    for (const user of users) {
      const type = "Monthly_Report";

      const title = "Your monthly report is ready";

      const message = "Here you can check out your monthly work";

      await CreateNotification(user._id, type, title, message);

      //send all the data to a push user notificoantion from where the notficaoitn si send from firebase
      await PushUserNotification(user._id, type, title, message, "/");
    }

    //get all the admin or a super admin
    const admins = await Auth.find({
      Role: {
        $in: ["Admin", "SuperAdmin"],
      },
    }).select("_id");

    //send notiocan toa  all the admin or a super admin
    for (const admin of admins) {
      const type = "Weekly_Report";

      const title = "Your admin or super admin weekly report is ready";

      const message = "Here you can check out your weekly work";

      await CreateAdminNotification(admin._id, type, title, message);

      //send all the data to a push user notificoantion from where the notficaoitn si send from firebase
      await PushAdminNotification(
        admin._id,
        type,
        title,
        message,
        "/AdminDashboard",
      );
    }

    console.log("🔔 Cron job finished");
  } catch (error) {
    console.log("Cron job error:", error.message);
  }
});
