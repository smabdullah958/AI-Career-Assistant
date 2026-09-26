let express = require("express");
let app = express.Router();

let AdminMiddleWare = require("../MiddleWare/AdminMiddleware");
let ActiveUserController = require("../Controller/Anaytics/UserAnalytics/UserAnalytics.js");

app.get(
  "/UserAnalytics",
  AdminMiddleWare, //only admin can allow
  ActiveUserController,
);

module.exports = app;
