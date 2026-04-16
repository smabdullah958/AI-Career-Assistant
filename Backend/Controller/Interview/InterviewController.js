let InterviewService = require("../../Services/Interview/InterviewService");
let InterviewController = async (req, res) => {
  try {
    let { Input } = req.body;
    if (!Input) {
      return res.status(400).json({ message: "Input is required" });
    }
    let response = await InterviewService(Input);
    console.log(response);
    res.status(200).json({ message: "input is present ", response });
  } catch (err) {
    console.log("internal error", err);
  }
};
module.exports = InterviewController;
