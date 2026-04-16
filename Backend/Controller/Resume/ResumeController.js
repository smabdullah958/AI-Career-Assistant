let { validationResult } = require("express-validator");
let ResumeService = require("../../Services/Resume/ResumeService");

let ResumeController = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      console.log("error", error.array());
      return res.status(400).json({ error: error.array() });
    }

    //here the resume will be generated
    let response = await ResumeService(req.body);
    console.log("this is a req body ", req.body);
    res.status(200).json({ message: "resume is being created", response });
  } catch (err) {
    console.log("internal error", err);
  }
};

module.exports = ResumeController;
