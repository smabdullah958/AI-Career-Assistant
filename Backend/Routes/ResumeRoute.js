let express = require("express");
let app = express.Router();
let ResumeValidator = require("../Validator/ResumeValidator");
let Resume = require("../Controller/Resume/createResume");

app.post("/createResume", ResumeValidator, Resume);

module.exports = app;
