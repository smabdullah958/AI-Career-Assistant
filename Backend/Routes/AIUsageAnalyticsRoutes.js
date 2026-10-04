let express = require("express");
let app = express.Router();

let AdminMiddleWare = require("../MiddleWare/AdminMiddleware");
let AIUsageAnalytics = require("../Controller/Anaytics/AIUsageAnalytics/AIUsageAnalytics");

app.get(
  "/Analytics",
  AdminMiddleWare, //only admin can allow
  AIUsageAnalytics,
);

module.exports = app;
