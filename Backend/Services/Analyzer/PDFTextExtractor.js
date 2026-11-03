const { PDFParse } = require("pdf-parse");

const PDFTextExtractor = async (pdfdata) => {
  const parser = new PDFParse({
    data: pdfdata,
  });

  try {
    // Extract PDF text
    const result = await parser.getText();

    const text = result.text || "";

    // Check whether the PDF contains readable text
    const hasReadableText = text.trim().length > 0;

    const pageCount = result.total ?? result.pages?.length ?? 0;

    console.log("PDF text extraction completed");
    console.log("Page count:", pageCount);
    console.log("Readable text:", hasReadableText);

    return {
      text,
      pageCount,
      ...(hasReadableText && { hasReadableText: true }),
    };
  } finally {
    // Always release parser resources
    await parser.destroy();
  }
};

module.exports = PDFTextExtractor;
