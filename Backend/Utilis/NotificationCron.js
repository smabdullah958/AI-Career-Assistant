const cron = require("node-cron");
let PushUserNotification = require("../Services/PushNotification/PushUserNotification");
const User = require("../Model/Auth");

//weekly notification ona monday at a 9am
cron.schedule("*/1 * * * *", async () => {
  try {
    console.log("🔔 Cron job started");

    //get all the users
    const users = await User.find({});

    for (const user of users) {
      await PushUserNotification(user._id);
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
      await PushUserNotification(user._id);
    }

    console.log("🔔 Cron job finished");
  } catch (error) {
    console.log("Cron job error:", error);
  }
});
