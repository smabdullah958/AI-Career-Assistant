let InterviewService = require("../../Services/Interview/InterviewService");
let InterviewController = async (req, res) => {
  try {
    let { Input, SessionId } = req.body;
    if ((!Input, SessionId)) {
      return res.status(400).json({ message: "all field are requred" });
    }
    let response = await InterviewService(Input, SessionId);
    console.log(response);
    res.status(200).json({ message: "input is present ", response });
  } catch (err) {
    console.log("internal error", err);
  }
};
module.exports = InterviewController;
