let express = require("express");
let app = express.Router();

let NotificationController = require("../Controller/Notification/GetNotification/UserNotificationThroughId");
let UserAuth = require("../MiddleWare/AuthMiddleware");

app.get("/WeeklyNotification/:UserId", UserAuth, NotificationController);

module.exports = app;
