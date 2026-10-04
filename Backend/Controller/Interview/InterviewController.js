let InterviewService = require("../../Services/Interview/InterviewService");
let SendGA4WithStatus = require("../../Utilis/SendGA4Event");
let InterviewController = async (req, res) => {
  try {
    let { Input } = req.body;
    if (!Input) {
      return res.status(400).json({ message: "all field are requred" });
    }
    //get user id froma middleware
    let SessionID = req.user.UserId;
    console.log(SessionID);

    let response = await InterviewService(Input, SessionID);
    //send success aclong witha status
    await SendGA4WithStatus(
      process.env.Client_ID,
      "mock_interview",
      "success",
      1,
    );
    console.log(response);
    res.status(200).json({
      message: "input is present ",
      response,
      remainingCalls: req.remainingCalls, // remaining calls is come from a middleware which si used to check the daily usage
    });
  } catch (err) {
    console.log("internal error", err);
    await SendGA4WithStatus(
      process.env.Client_ID,
      "mock_interview",
      "failed",
      0,
    );
  }
};
module.exports = InterviewController;
