let userModel = require("../../Model/Auth");
require("dotenv").config();
let key = process.env.SecretKey;
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let SignUp = async (req, res) => {
  try {
    let { Name, Email, Password } = req.body;
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
    });
    await newUser.save();

    let token = jwt.sign(
      {
        Email,
      },
      key,
      { expiresIn: "1w" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // ✅ "Lax" works well on local project
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log(token, newUser);
    res.status(200).json({
      message: "User created successfully",
      Role: newUser.Role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "some thing went wrong" });
  }
};
module.exports = SignUp;
