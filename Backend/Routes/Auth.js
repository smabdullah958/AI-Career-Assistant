let express = require("express");
let app = express.Router();
let SignUp = require("../Controller/Signup");

app.post("/signup", SignUp);
module.exports = app;
