let LLM = require("../../Config/GroqConfigure");
let { ChatPromptTemplate } = require("@langchain/core/prompts");
let AnalyzerPrompt = require("../../Prompts/AnalyzerPrompt");

let Analyzer = async (PDFText, Role, Experience) => {
  try {
    //prompttemplate
    let prompt = ChatPromptTemplate.fromTemplate(AnalyzerPrompt);

    //create chain
    let chain = prompt.pipe(LLM);
    let response = await chain.invoke({ PDFText, Role, Experience });
    console.log("this si amain file of a chain");

    let raw = response.content;

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
