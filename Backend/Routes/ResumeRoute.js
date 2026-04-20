let express = require("express");
let app = express.Router();
let ResumeValidator = require("../Validator/ResumeValidator");
let ResumeController = require("../Controller/Resume/ResumeController");
let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");

app.post("/createResume", ResumeValidator, AuthMiddleWare, ResumeController);

module.exports = app;
