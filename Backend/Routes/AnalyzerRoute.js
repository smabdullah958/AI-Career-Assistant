let express = require("express");
let app = express.Router();

let ResumeAnalyzer = require("../Controller/ResumeAnalyzer/AnalyzerController");
let upload = require("../Config/MulterSetUp");

app.post("/Analyzer", upload.single("File"), ResumeAnalyzer);

module.exports = app;
