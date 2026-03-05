let express = require("express");
let app = express.Router();
let SignUp = require("../Controller/Auth/Signup");
let LogIn = require("../Controller/Auth/Login");
let LogOut = require("../Controller/Auth/LogOut");

app.post("/signup", SignUp);
app.post("/login", LogIn);
app.post("/logout", LogOut);
module.exports = app;
