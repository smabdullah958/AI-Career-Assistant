let express = require("express");
let app = express.Router();

let NotificationController = require("../Controller/Notification/GetNotification/MonthlyUserNotificationThroughId");
let UserAuth = require("../MiddleWare/AuthMiddleware");

app.get("/MonthlyNotification/:UserId", NotificationController);

module.exports = app;
