//it is used to get credits for a signup
let GetCreditsForRegistration = require("../../Utilis/GetCreditsForRegistration");

let userModel = require("../../Model/Auth");
require("dotenv").config();
let key = process.env.SecretKey;
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let SignUp = async (req, res) => {
  try {
    let { Name, Email, Password, Role } = req.body;
    if (!Name || !Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
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
      Role: "User",
    });
    await newUser.save();

    console.log("user id : " + newUser._id);

    let token = jwt.sign(
      {
        Email,
        UserId: newUser._id,
        Role: newUser.Role,
      },
      key,
      { expiresIn: "1w" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", //  "Lax" works well on local project
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("this is a new user ", newUser);

    //check the credits through user id
    let remainingCalls = await GetCreditsForRegistration(newUser._id);
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
