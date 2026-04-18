let express = require("express");
let app = express.Router();

let InterviewController = require("../Controller/Interview/InterviewController");
let AuthMiddleWare = require("../MiddleWare/AuthMiddleware");

app.post("/Interview", AuthMiddleWare, InterviewController);

module.exports = app;
