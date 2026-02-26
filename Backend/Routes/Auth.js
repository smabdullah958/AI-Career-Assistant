let express = require("express");
let app = express.Router();
let SignUp = require("../Controller/Signup");
let LogIn = require("../Controller/Login");
let LogOut = require("../Controller/LogOut");

app.post("/signup", SignUp);
app.post("/login", LogIn);
app.post("/logout", LogOut);
module.exports = app;
