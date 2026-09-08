let express = require("express");
let app = express.Router();

let NotificationController = require("../Controller/Notification/GetNotification");
let MarkNotificationAsRead = require("../Controller/Notification/MarkNotificationAsRead");
let UnReadNotifications = require("../Controller/Notification/UnreadNotification");
let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");
let FcmToken = require("../Controller/Notification/FcmToken");

app.get("/Notification", AuthMiddleWare, NotificationController);
app.put("/MarkAsRead", AuthMiddleWare, MarkNotificationAsRead);
app.get("/UnRead", AuthMiddleWare, UnReadNotifications);
app.post("/token", AuthMiddleWare, FcmToken);

module.exports = app;
