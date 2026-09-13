const FcmModel = require("../../Model/FCMModel");

const FCMToken = async (req, res) => {
  try {
    const { FcmToken } = req.body;

    const UserId = req.user.UserId;

    if (!FcmToken) {
      return res.status(400).json({
        success: false,
        message: "FID is required",
      });
    }

    if (!UserId) {
      return res.status(400).json({
        success: false,
        message: "User is not found",
      });
    }

    const fcmRecord = await FcmModel.findOneAndUpdate(
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
        setDefaultsOnInsert: true,
      },
    );
    // 6a9ff255477762f75464aacc

    console.log("✅ FID saved/updated:", fcmRecord);

    return res.status(200).json({
      success: true,
      message: "FID saved successfully",
      data: fcmRecord,
    });
  } catch (error) {
    console.log("❌ FID storage error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = FCMToken;
