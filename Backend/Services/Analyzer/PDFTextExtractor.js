let { PDFParse } = require("pdf-parse");
let PDFTextExtractor = async (pdfdata) => {
  const parser = new PDFParse({
    data: pdfdata,
  });

  //get text
  let result = await parser.getText();

  console.log("this is a pdf text in a text extractor");

  //clean the memory so that the text can not occupy the memory or RAM
  await parser.destroy();

  return result.text;
};
module.exports = PDFTextExtractor;
