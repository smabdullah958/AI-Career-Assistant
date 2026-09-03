//we have been send low credits notificatoin through a adaily usage middleware

let express = require("express");
let app = express.Router();

let InterviewController = require("../Controller/Interview/InterviewController");

let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");
let DailyUsageMiddleWare = require("../MiddleWare/DailyUsageMiddleWare");

app.post(
  "/Interview",
  AuthMiddleWare, //to check that user is login or not without registratio user isnot use any feature
  DailyUsageMiddleWare, //to check daily usage of a api call and max 10 call are allowed
  InterviewController,
);

module.exports = app;
