let { ChatPromptTemplate } = require("@langchain/core/prompts");
// connect histore with llm
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");
//store chat
const {
  ChatMessageHistory,
} = require("@langchain/community/stores/message/in_memory");
const { MessagesPlaceholder } = require("@langchain/core/prompts");

let InterviewPrompt = require("../../Prompts/InterviewPrompt");
let llm = require("../../Config/GroqConfigure");

//  This object stores history for DIFFERENT users separately
const messageHistories = {};

let InterviewService = async (input, sessionId) => {
  try {
    //prompt
    let promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", InterviewPrompt],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);
    //create chain
    let Chain = promptTemplate.pipe(llm);

    //  This logic manages memory automatically
    const withHistoryChain = new RunnableWithMessageHistory({
      runnable: Chain, //connect with chain
      getMessageHistory: async (id) => {
        if (messageHistories[id] === undefined) {
          messageHistories[id] = new ChatMessageHistory(); //if not chatmessage history than create new one
        }

        const history = messageHistories[id];
        //  LIMIT TO on pass last 10 MESSAGES in a history
        const maxMessages = 10;

        if (history.messages.length > maxMessages) {
          history.messages = history.messages.slice(-maxMessages);
        }

        return history;
      },
      inputMessagesKey: "input",
      historyMessagesKey: "history",
    });

    let response = await withHistoryChain.invoke(
      { input },
      { configurable: { sessionId: sessionId } },
    );

    console.log(response.content);

    //check history
    let history = await messageHistories[sessionId];
    console.log("istory si ", history.messages);

    return response.content;
  } catch (err) {
    console.log("internal error questoins is not generated", err);
  }
};

module.exports = InterviewService;
