let express = require("express");
let app = express.Router();
let ResumeValidator = require("../Validator/ResumeValidator");
let ResumeController = require("../Controller/Resume/ResumeController");

app.post("/createResume", ResumeValidator, ResumeController);

module.exports = app;
