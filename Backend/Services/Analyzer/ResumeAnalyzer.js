let LLM = require("../../Config/GroqConfigure");
let { ChatPromptTemplate } = require("@langchain/core/prompts");
let AnalyzerPrompt = require("../../Prompts/AnalyzerPrompt");

let Analyzer = async (PDFText, Role, Experience) => {
  try {
    //prompttemplate
    let prompt = ChatPromptTemplate.fromTemplate(AnalyzerPrompt);

    //create chain
    let chain = prompt.pipe(LLM);
    let response = await chain.stream({ PDFText, Role, Experience });
    console.log("this si amain file of a chain");

    let fullContent = "";

    //to get data through chunks
    for await (const chunk of response) {
      const content = chunk.content;
      fullContent += content;
    }

    let raw = fullContent;

    // remove, and other things like  ```json or ``` blocks
    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    //convert into a  json
    let parsed = JSON.parse(raw);

    return parsed;
  } catch (error) {
    console.log("internal error", error);
  }
};

module.exports = Analyzer;
