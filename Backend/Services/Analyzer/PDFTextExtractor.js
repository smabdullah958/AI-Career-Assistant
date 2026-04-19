let { PDFParse } = require("pdf-parse");
let PDFTextExtractor = async (pdfdata) => {
  const parser = new PDFParse({
    data: pdfdata,
  });

  //get text
  let result = await parser.getText();

  console.log(result.text);
  return result.text;
};
module.exports = PDFTextExtractor;
