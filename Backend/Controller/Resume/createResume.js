let { validationResult } = require("express-validator");

let Resume = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      Role,
      portfolio,
      Linkedin,
      Summary,
      Skills,
      Projects,
      Experience,
      Certifications,
      Education,
    } = req.body;
    let error = validationResult(req);
    if (!error.isEmpty()) {
      console.log("error", error.array());
      res.status(400).json({ error: error.array() });
    }
    console.log("resume data", req.body);
    res.status(200).json({ message: "resume is being created" });
  } catch (err) {
    console.log("internal error", err);
  }
};

module.exports = Resume;
