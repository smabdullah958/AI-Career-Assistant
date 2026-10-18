let express = require("express");
let app = express.Router();

let NotificationController = require("../Controller/Notification/GetNotification/WeeklyUserNotificationThroughId");
let UserAuth = require("../MiddleWare/AuthMiddleware");
const CheckUserNotificaitonOwnership = require("../MiddleWare/CheckUserNotificicationOwnerShip");

app.get(
  "/WeeklyNotification/:UserId",
  UserAuth,
  CheckUserNotificaitonOwnership, //it is used to check that can the noticiaon which user has try to fetch can it is really go to him
  NotificationController,
);

module.exports = app;
