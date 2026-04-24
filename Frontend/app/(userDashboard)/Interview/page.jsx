"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InterviewThunck from "@/Libraries/Thuncks/Interview/InterviewThunck";
import InterviewSkeleton from "@/Component/InterviewPageSkeleton";
import { ResetInterviewState } from "@/Libraries/Slices/Interview/InterviewSlice";

import RemainingAPICalls from "@/Component/RemainingAPICalls";

const InterviewPage = () => {
  let { loading, response, success, errorMessage, remainingCalls } =
    useSelector((state) => state.InterviewSlice);

  //signup role
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  let IsRole = (Role === "User" || UserRole === "User") && remainingCalls !== 0;

  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  //chat message state
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Who would you like to be interviewed by? (HR / Technical / CEO)",
    },
  ]);

  //  useEffect to catch the backend response when it arrives in Redux
  useEffect(() => {
    if (success && response) {
      // Check if the message is already in the list to avoid duplicates
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.content !== response) {
        setMessages((prev) => [...prev, { role: "ai", content: response }]);
      }
    }
  }, [success, response]); // Triggers whenever response changes

  const InterviewFunction = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    //if role is user
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    //call backend
    await dispatch(InterviewThunck({ Input: currentInput }));
  };

  //reset the states when the page is load
  useEffect(() => {
    dispatch(ResetInterviewState());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  //show the chatbot loader when move to a intervew section
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <InterviewSkeleton />;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {(Role === "User" || UserRole === "User") &&
        (success || errorMessage) && (
          <RemainingAPICalls remaining={remainingCalls} />
        )}

      <section className="max-w-5xl mx-auto w-full px-4 pt-10 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl xl:my-5 2xl:mt-32 2xl:mb-10 xl:text-5xl font-extrabold text-slate-900 tracking-tight">
          Master Your{" "}
          <span className="text-indigo-600 font-black">Interview</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Practice real-world questions with our AI assistant.
        </p>
      </section>
      <main className="flex-1 flex  flex-col md:max-w-[85%] 2xl:max-w-[65%] mx-auto w-full p-4 md:p-8 overflow-hidden">
        <div className="flex-1 bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-slate-200 flex flex-col overflow-hidden min-h-[500px] ">
          {/* chat */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  msg.role === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`relative max-w-[85%]  px-6 py-4 text-sm md:text-base transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-2xl rounded-tr-none shadow-lg shadow-indigo-200"
                      : "bg-slate-50 text-slate-700 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"
                  }`}
                >
                  {/* Small Label for Role */}
                  <span
                    className={`text-[10px] uppercase font-black tracking-widest absolute -top-5 ${msg.role === "user" ? "right-0 text-indigo-400" : "left-0 text-slate-400"}`}
                  >
                    {msg.role === "user" ? "You" : "Interviewer"}
                  </span>

                  <p className="leading-relaxed font-medium">{msg.content}</p>
                </div>
              </div>
            ))}

            {/*   Loading indicator */}
            {loading && (
              <div className="flex justify-end items-center gap-3">
                <div className="bg-slate-100 px-5 py-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="mt-auto p-6 bg-slate-50/50 border-t border-slate-100 backdrop-blur-sm">
            <form className=" mx-auto relative flex items-center gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                  }
                }}
                rows="1"
                placeholder="Type your answer here..."
                disabled={loading}
                className="w-full bg-white text-slate-700 text-sm rounded-2xl border border-slate-200 p-4 pr-16 shadow-inner outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none min-h-[60px] flex items-center"
              />

              <button
                onClick={InterviewFunction}
                disabled={loading || !IsRole}
                className={`p-2 sm:p-4 text-white font-black rounded-2xl shadow-lg ${IsRole ? " bg-indigo-600 disabled:opacity-50  transition-all flex items-center justify-center sm-gap-2" : "bg-indigo-600 opacity-30 cursor-not-allowed   "}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;
