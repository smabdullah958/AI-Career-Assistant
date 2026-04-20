let LLM = require("../../Config/GroqConfigure");
let { ChatPromptTemplate } = require("@langchain/core/prompts");
let AnalyzerPrompt = require("../../Prompts/AnalyzerPrompt");

let Analyzer = async (PDFText, Role, Experience) => {
  //prompttemplate
  let prompt = ChatPromptTemplate.fromTemplate(AnalyzerPrompt);

  //create chain
  let chain = prompt.pipe(LLM);
  let response = await chain.invoke({ PDFText, Role, Experience });
  console.log("this si amain file of a chain");
  return response.content;
};

module.exports = Analyzer;
