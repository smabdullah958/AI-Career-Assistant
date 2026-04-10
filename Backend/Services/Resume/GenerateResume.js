let { ChatPromptTemplate } = require("@langchain/core/prompts");
let ResumePrompt = require("../../Prompts/ResumePrompts");
let llm = require("../../Config/GroqConfigure");

let GenerateResume = async (data) => {
  try {
    //so this is a resume prompt and the prompt is present ina  ResumePrompt file
    let prompt = ChatPromptTemplate.fromTemplate(ResumePrompt);

    //creaet chain
    let chain = prompt.pipe(llm);

    let response = await chain.invoke({
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Role: data.Role,
      Portfolio: data.portfolio,
      LinkedIn: data.Linkedin,

      Summary: data.Summary,

      Skills: data.Skills,

      Projects: data.Projects,

      Experience: data.Experience,

      Certifications: data.Certifications,

      Education: data.Education,
    });

    console.log("response is generated ", response.content);
    return response.content;
  } catch (err) {
    console.log("resume is not generated", err);
  }
};

module.exports = GenerateResume;
