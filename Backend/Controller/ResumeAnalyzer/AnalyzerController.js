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

    return res.status(200).json({
      message: "all field are present",
      result,
      remainingCalls: req.remainingCalls, // remaining calls is come from a middleware which si used to check the daily usage
    });
  } catch (err) {
    console.log("internal error", err);
    res.status(500).json({ message: "interal errro" });
  }
};

module.exports = AnalyzerController;
