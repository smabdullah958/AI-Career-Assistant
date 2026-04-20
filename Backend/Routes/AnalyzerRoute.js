let express = require("express");
let app = express.Router();

let ResumeAnalyzer = require("../Controller/ResumeAnalyzer/AnalyzerController");
let upload = require("../Config/MulterSetUp");

let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");

app.post("/Analyzer", upload.single("File"), AuthMiddleWare, ResumeAnalyzer);

module.exports = app;
