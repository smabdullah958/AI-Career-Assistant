let InterviewService = require("../../Services/Interview/InterviewService");
let InterviewController = async (req, res) => {
  try {
    let { Input } = req.body;
    if (!Input) {
      return res.status(400).json({ message: "all field are requred" });
    }
    //get user id froma middleware
    let SessionID = req.user.UserId;
    console.log(SessionID);

    // get Role from a middleware so that any one can not use a feature withou login
    let Role = req.user.Role;

    let response = await InterviewService(Input, SessionID);
    console.log(response);
    res.status(200).json({ message: "input is present ", response, Role });
  } catch (err) {
    console.log("internal error", err);
  }
};
module.exports = InterviewController;
