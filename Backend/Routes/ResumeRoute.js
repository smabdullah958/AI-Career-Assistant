//we have been send low credits notificatoin through a adaily usage middleware

let express = require("express");
let app = express.Router();
let ResumeValidator = require("../Validator/ResumeValidator");
let ResumeController = require("../Controller/Resume/ResumeController");

let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");
let DailyUsageMiddleWare = require("../MiddleWare/DailyUsageMiddleWare");

app.post(
  "/createResume",
  ResumeValidator, // to validate the resume form
  AuthMiddleWare, //to check that user is login or not without registratio user isnot use any feature
  DailyUsageMiddleWare, //to check daily usage of a api call and max 10 call are allowed
  ResumeController,
);

module.exports = app;
