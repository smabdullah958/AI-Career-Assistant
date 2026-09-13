const cron = require("node-cron");
let PushUserNotification = require("../Services/PushNotification/PushUserNotification");
const User = require("../Model/Auth");
const CreateNotification = require("../Utilis/Notification");

//weekly notification ona monday at a 9am
cron.schedule("*/1 * * * *", async () => {
  try {
    console.log("🔔 Cron job started");

    //get all the users
    const users = await User.find({});

    for (const user of users) {
      const type = "Weekly_Report";

      const title = "Your weekly report is ready";

      const message = "Here you can check out your weekly work";

      await CreateNotification(user._id, type, title, message);

      //send all the data to a push user notificoantion from where the notficaoitn si send from firebase
      await PushUserNotification(user._id, type, title, message, "/");
    }

    console.log("🔔 Cron job finished");
  } catch (error) {
    console.log("Cron job error:", error);
  }
});

//montly notification ona monday at a 9am
cron.schedule("0 9 1 * *", async () => {
  try {
    console.log("🔔 Cron job started");

    //get all the users
    const users = await User.find({});

    for (const user of users) {
      const type = "Monthly_Report";

      const title = "Your monthly report is ready";

      const message = "Here you can check out your monthly work";

      await CreateNotification(user._id, type, title, message);

      //send all the data to a push user notificoantion from where the notficaoitn si send from firebase
      await PushUserNotification(user._id, type, title, message, "/");
    }

    console.log("🔔 Cron job finished");
  } catch (error) {
    console.log("Cron job error:", error);
  }
});
