//text extractor
let PDFTextExtractor = require("../../Services/Analyzer/PDFTextExtractor");
//main ai file
let chain = require("../../Services/Analyzer/ResumeAnalyzer");

let AnalyzerController = async (req, res) => {
  try {
    let { Experience, Role } = req.body;

    console.log(Experience, Role);
    if (!req.file || !Experience || !Role) {
      return res.status(400).json({ message: "All teh fields are required" });
    }

    //only 3mb file is need
    if (req.file.size > 3 * 1024 * 1024) {
      return res.status(400).json({
        message: "file is to much large less than 3mb file is alloweed",
      });
    }

    //pdf text extractor
    let TextExtractor = await PDFTextExtractor(req.file.buffer);

    //main ai/langchain
    let result = await chain(TextExtractor, Role, Experience);

    console.log(result);

    // get Role from a middleware to hide the button so that any one can not use a feature withou login
    let UserRole = req.user.Role;

    return res
      .status(200)
      .json({ message: "all field are present", result, UserRole });
  } catch (err) {
    console.log("internal error", err);
    res.status(500).json({ message: "interal errro" });
  }
};

module.exports = AnalyzerController;
