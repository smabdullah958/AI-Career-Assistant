let UserModel = require("../../Model/Auth");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let Login = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).status({ message: "all the field are required" });
    }
    let ExistUser = await UserModel.findOne({ Email });
    if (!ExistUser) {
      return res.status(400).json({ message: "user not exist" });
    }
    let MatchPassword = await bcrypt.compare(Password, ExistUser.Password);
    if (!MatchPassword) {
      return res.status(400).json({ message: "wrong email or password" });
    }
    //generate a token
    let token = jwt.sign(
      {
        Email,
        UserId: ExistUser._id,
      },
      process.env.SecretKey,
      {
        expiresIn: "1w",
      },
    );
    //send token or a cookie toa  frontend
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //for 7 days
    });
    console.log("user id " + ExistUser._id);
    return res.status(200).json({
      message: "user is login",
      IsLoggIn: true,
      Role: ExistUser.Role,
    });
  } catch (error) {
    console.log("some thing went wrong", error);
    res.status(500).json({ message: "some thing went wrong" });
  }
};
module.exports = Login;
