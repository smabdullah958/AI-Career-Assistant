let express = require("express");
let app = express.Router();

let NotificationController = require("../Controller/Notification/GetNotification");
let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");

app.get("/Notification", AuthMiddleWare, NotificationController);

module.exports = app;
