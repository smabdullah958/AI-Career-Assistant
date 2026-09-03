//we have been send low credits notificatoin through a adaily usage middleware
let express = require("express");
let app = express.Router();

let ResumeAnalyzer = require("../Controller/ResumeAnalyzer/AnalyzerController");

let upload = require("../Config/MulterSetUp");
let DailyUsageMiddleWare = require("../MiddleWare/DailyUsageMiddleWare");

let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");

app.post(
  "/Analyzer",
  upload.single("File"), //to upload file
  AuthMiddleWare, //to check that user is login or not without registratio user isnot use any feature
  DailyUsageMiddleWare, //to check daily usage of a api call and max 10 call are allowed
  ResumeAnalyzer,
);

module.exports = app;
