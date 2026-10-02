let express = require("express");
let app = express.Router();

let AdminMiddleWare = require("../MiddleWare/AdminMiddleware");
let FeatureAnalytics = require("../Controller/Anaytics/FeatureAnalytics/FeatureAnalytics");

app.get(
  "/Analytics",
  AdminMiddleWare, //only admin can allow
  FeatureAnalytics,
);

module.exports = app;
