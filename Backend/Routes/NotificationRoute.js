let express = require("express");
let app = express.Router();

let NotificationController = require("../Controller/Notification/GetNotification");
let MarkNotificationAsRead = require("../Controller/Notification/MarkNotificationAsRead");
let UnReadNotifications = require("../Controller/Notification/UnreadNotification");
let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");
let PushNotification = require("../Controller/Notification/PushNotification");

app.get("/Notification", AuthMiddleWare, NotificationController);
app.put("/MarkAsRead", AuthMiddleWare, MarkNotificationAsRead);
app.get("/UnRead", AuthMiddleWare, UnReadNotifications);
app.post("/push", AuthMiddleWare, PushNotification);

module.exports = app;
