let express = require("express");
let app = express.Router();

let InterviewController = require("../Controller/Interview/InterviewController");

app.post("/Interview", InterviewController);

module.exports = app;
