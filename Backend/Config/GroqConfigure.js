let { ChatGroq } = require("@langchain/groq");
require("dotenv").config();
let llm;
try {
  llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.Groq_API,
    temperature: 0,
    maxTokens: 10000,
  });
} catch (err) {
  console.log("internal error", err);
}
module.exports = llm;
