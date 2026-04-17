let { ChatPromptTemplate } = require("@langchain/core/prompts");
// connect histore with llm
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");
//store chat
const {
  ChatMessageHistory,
} = require("@langchain/community/stores/message/in_memory");
const { MessagesPlaceholder } = require("@langchain/core/prompts");

let InterviewPrompt = require("../../Prompts/InterviewPrompt");
// let UserPrompt = require("../../Prompts/InterviewPrompt");
let llm = require("../../Config/GroqConfigure");

let InterviewService = async (input, sessionId = "user") => {
  try {
    //  This object stores history for DIFFERENT users separately
    const messageHistories = {};

    //prompt
    let promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", InterviewPrompt],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);
    //create chain
    let Chain = promptTemplate.pipe(llm);

    // 2. This logic manages memory automatically
    const withHistoryChain = new RunnableWithMessageHistory({
      runnable: Chain, //connect with chain
      getMessageHistory: async (id) => {
        if (messageHistories[id] === undefined) {
          messageHistories[id] = new ChatMessageHistory(); //if not chatmessage history than create new one
        }
        return messageHistories[id];
      },
      inputMessagesKey: "input",
      historyMessagesKey: "history",
    });

    let response = await withHistoryChain.invoke(
      { input },
      { configurable: { sessionId: sessionId } },
    );

    console.log(response.content);
    return response.content;
  } catch (err) {
    console.log("internal error questoins is not generated", err);
  }
};

module.exports = InterviewService;
