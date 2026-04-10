let { validationResult } = require("express-validator");
let generateResume = require("../../Services/Resume/GenerateResume");

let Resume = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      console.log("error", error.array());
      return res.status(400).json({ error: error.array() });
    }

    //here the resume will be generated
    let response = await generateResume(req.body);
    console.log("resume data");
    res.status(200).json({ message: "resume is being created", response });
  } catch (err) {
    console.log("internal error", err);
  }
};

module.exports = Resume;
