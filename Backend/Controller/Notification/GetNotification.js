let NotifcationModel = require("../../Model/Notification");

let GetNotification = async (req, res) => {
  try {
    // Get page from query
    let page = Number(req.query.page) || 1;

    // Always fetch maximum 10 notifications
    let limit = 10;

    // Calculate how many notifications to skip
    let skip = (page - 1) * limit;

    //get userid from a middleware and this sia  auth middleware
    let UserID = req.user.UserId;
    console.log("user id is ", UserID);

    let GetNotification = await NotifcationModel.find({ recipientID: UserID })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(10);

    console.log("all the noticaitno: ", GetNotification);
    res.status(200).json({ response: GetNotification });
  } catch (err) {
    console.log("internal error ina  notifiacaiton", err);
    return res
      .status(500)
      .json({ message: "internal error", error: err.messge });
  }
};

module.exports = GetNotification;
