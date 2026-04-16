"use client";
import { useState } from "react";
import Link from "next/link";

const InterviewPage = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    alert("Sending to AI: " + input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* --- NEW HERO SECTION ABOVE THE CHAT --- */}
      <section className="max-w-5xl mx-auto w-full px-4 pt-10 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Master Your <span className="text-indigo-600"> Interview</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Practice real-world questions with our AI. Get instant feedback,
          improve your logic, and land your dream job.
        </p>
      </section>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-8 overflow-hidden">
        {/* CHAT CONTAINER */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-200 flex flex-col overflow-hidden relative min-h-[500px] ">
          {/* INPUT AREA */}
          <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100">
            <form
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto relative group"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                rows="1"
                placeholder="Describe your technical approach here..."
                className="w-full bg-white text-slate-700 placeholder:text-slate-400 text-sm rounded-2xl border border-slate-200 p-4 pr-16 shadow-lg shadow-indigo-50/50 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none min-h-[60px]"
              />

              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2.5 bg-indigo-600 hover:bg-blue-600 text-white rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-90"
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
