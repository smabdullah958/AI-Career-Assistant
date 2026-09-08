let FcmModel = require("../../Model/FCMModel");

let FCMToken = async (req, res) => {
  try {
    let { FcmToken } = req.body;
    if (!FcmToken) {
      console.log("token is needed");
      return res.status(400).json({ message: "token is needed" });
    }

    console.log("token is recieved", FcmToken);

    let UserId = req.user.UserId;
    if (!UserId) {
      console.log("user is not found");
      return res.status(400).json({ message: "user is not found" });
    }

    let fcm = await FcmModel.findOneAndUpdate(
      {
        FcmToken: FcmToken,
      },
      {
        UserId: UserId,
        FcmToken: FcmToken,
      },
      {
        upsert: true,
        new: true,
      },
    );

    console.log("token is store");
    return res.status(200).json({ message: "token is received" });
  } catch (err) {
    console.log("some thing went wrong intenral error", err);
    return res.status(500).json({ message: "internal error" });
  }
};

module.exports = FCMToken;
