let { ChatPromptTemplate } = require("@langchain/core/prompts");
let InterviewPrompt = require("../../Prompts/InterviewPrompt");
let UserPrompt = require("../../Prompts/InterviewPrompt");
let llm = require("../../Config/GroqConfigure");
let InterviewService = async (input) => {
  try {
    console.log(input);
    //prompt
    let promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", InterviewPrompt],
      ["human", UserPrompt],
    ]);
    //create chain
    let Chain = promptTemplate.pipe(llm);
    let response = await Chain.invoke({ input });
    console.log(response.content);
    return response.content;
  } catch (err) {
    console.log("internal error questoins is not generated");
  }
};

module.exports = InterviewService;
