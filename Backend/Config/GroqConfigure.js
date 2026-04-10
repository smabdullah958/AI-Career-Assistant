let { ChatGroq } = require("@langchain/groq");
require("dotenv").config();
let llm;
try {
  llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: process.env.Groq_API,
  });
} catch (err) {
  console.log("internal error", err);
}
module.exports = llm;
