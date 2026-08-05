const User = require("../../Model/Auth");
const jwt = require("jsonwebtoken");
const GetCreditsForRegistration = require("../../Utilis/GetCreditsForRegistration");

const CreateAccountThroughGoogle = async (req, res) => {
  try {
    const { Name, Email, GoogleId, Provider } = req.body;

    if (!Name || !Email || !GoogleId || !Provider) {
      return res.status(400).json({
        message: "Required information is missing. Please try again.",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ Email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Your account already exists. Please login." });
    }

    user = await User.create({
      Name,
      Email,
      GoogleId,
      Provider,
      Password: null,
      Role: "User",
    });

    // Give free credits only once
    await GetCreditsForRegistration(user._id);

    // Generate JWT
    const token = jwt.sign(
      {
        UserId: user._id,
        Email: user.Email,
        Role: user.Role,
      },
      process.env.SecretKey,
      {
        expiresIn: "7d",
      },
    );

    // Save Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Get Remaining Credits
    const remainingCalls = await GetCreditsForRegistration(user._id);

    console.log(user.Role, remainingCalls);

    return res.status(200).json({
      message: "Google authentication successful",
      IsLoggIn: true,
      Role: user.Role,
      remainingCalls,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = CreateAccountThroughGoogle;
