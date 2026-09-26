const Usage = require("../../Model/Usage");
let UserModel = require("../../Model/Auth");

const CheckAuth = async (req, res) => {
  try {
    const UserId = req.user.UserId;

    const today = new Date().toISOString().split("T")[0];

    let record = await Usage.findOne({
      UserId,
      LastCallDate: today,
    });

    if (!record) {
      record = await Usage.create({
        UserId,
        LastCallDate: today,
        ApiCallCount: 10,
      });
    }

    console.log("record", req.user);

    let LastActiveDate = await UserModel.findByIdAndUpdate(UserId, {
      LastActiveAt: new Date(),
    });

    console.log("last update ate ", LastActiveDate);

    console.log("so the user is login successfully", LastActiveDate);

    return res.status(200).json({
      IsLoggIn: true,
      Role: req.user.Role,
      RemainingCalls: record.ApiCallCount,
      ShowPopUp: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
      ShowPopUp: false,
    });
  }
};

module.exports = CheckAuth;
