let express = require("express");
let app = express.Router();
let SignUp = require("../Controller/Auth/Signup");
let LogIn = require("../Controller/Auth/Login");
let LogOut = require("../Controller/Auth/LogOut");
let CheckAuth = require("../Controller/Auth/CheckLogin"); //it is used to check if user is logged in or not and also it also returns the remaining credits for the user if it is login or not
let CreateAccountThroughGoogle = require("../Controller/Auth/CreateAccountThroughGoogle");
let LogInThroughGoogle = require("../Controller/Auth/LoginThroughGoogle");

let AuthMiddleWare = require("../MiddleWare/AuthMiddleware"); //middleare which main work si to check that user is login or not

app.post("/signup", SignUp);
app.post("/CreateAccountThroughGoogle", CreateAccountThroughGoogle);

app.post("/login", LogIn);
app.post("/LogInThroughGoogle", LogInThroughGoogle); //login through google

app.post("/logout", LogOut);
app.get("/checklogin", AuthMiddleWare, CheckAuth); //it is used to check if user is logged in or not and also it also returns the remaining credits for the user if it is login or not
module.exports = app;
