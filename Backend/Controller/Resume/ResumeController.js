let { validationResult } = require("express-validator");
let SendGA4WithStatus = require("../../Utilis/SendGA4Event");

let ResumeController = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      console.log("error", error.array());
      return res.status(400).json({ error: error.array() });
    }

    //here the resume will be generated
    console.log("this is a req body ", req.body);
    //send success aclong witha status
    await SendGA4WithStatus(
      process.env.Client_ID,
      "mock_interview",
      "success",
      1,
    );

    res.status(200).json({
      message: "resume is being created",
      remainingCalls: req.remainingCalls, // remaining calls is come from a middleware which si used to check the daily usage
    });
  } catch (err) {
    await SendGA4WithStatus(
      process.env.Client_ID,
      "mock_interview",
      "failed",
      0,
    );

    console.log("internal error", err);
  }
};

module.exports = ResumeController;
