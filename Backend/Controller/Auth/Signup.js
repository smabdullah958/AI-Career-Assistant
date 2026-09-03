//it is used to get credits for a signup
let GetCreditsForRegistration = require("../../Utilis/GetCreditsForRegistration");

let SendNotification = require("../../Utilis/Notification"); //to send a notificaiton to a user

let SendAdminNotification = require("../../Utilis/AdminNotification"); //to send a notificaiton to a admin

let userModel = require("../../Model/Auth");
require("dotenv").config();
let key = process.env.SecretKey;
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let SignUp = async (req, res) => {
  try {
    let { Name, Email, Password, Role, Provider = "Local" } = req.body;
    console.log(Role);
    if (!Name || !Email || !Password || !Provider || !Role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (Password.length < 6) {
      return res
        .status(400)
        .json({ message: "passwod must be at least 6 character" });
    }

    let user = await userModel.findOne({ Email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //generating salt
    let salt = await bcrypt.genSalt(10);
    //hashing password
    let hashPassword = await bcrypt.hash(Password, salt);
    let newUser = new userModel({
      Name,
      Email,
      Password: hashPassword,
      Role,
      Provider,
    });
    await newUser.save();

    console.log("user id : " + newUser._id);
    console.log("user role : " + newUser.Role);
    //generate token
    let token = jwt.sign(
      {
        Email,
        UserId: newUser._id,
        Role: newUser.Role,
      },
      key,
      { expiresIn: "1w" },
    );
    //stoer incooke
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", //  "Lax" works well on local project
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("this is a new user ", newUser);

    //check the credits through user id
    let remainingCalls = await GetCreditsForRegistration(newUser._id);

    //send notificaiton to  a user
    let notification = await SendNotification(
      newUser._id,
      "New_User",
      "Welcome to our platform",
      "Thank you for signing up! We are excited to have you on board. Explore our features and enjoy your experience.",
    );

    console.log("notification sent to user : ", notification);

    //send notification to admin
    let adminNotification = await SendAdminNotification(
      "New_User",
      "A new user has signed up",
      `User ${newUser.Name} has signed up for an account.`,
    );

    console.log("notification sent to admin : ", adminNotification);

    console.log(remainingCalls);
    // console.log(newUser.Role);
    res.status(200).json({
      message: "User created successfully",
      Role: newUser.Role,
      remainingCalls,
      IsLoggIn: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "some thing went wrong" });
  }
};
module.exports = SignUp;
