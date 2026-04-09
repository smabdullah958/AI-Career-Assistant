let { ChatGroq } = require("@langchain/groq");
require("dotenv").config();

let llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  apiKey: process.env.Groq_API,
});

module.exports = llm;
