import React from "react";

const HomeLoading = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Outer Glowing Circles */}
        <div className="absolute w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-48 h-48 bg-blue-200/20 rounded-full blur-2xl animate-bounce [animation-duration:3s]"></div>

        {/* Central Logo/Icon Animation */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

          <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl border border-slate-100">
            {/* The "AI Spark" Icon */}
            <svg
              className="w-10 h-10 text-indigo-600 animate-spin [animation-duration:3s]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>

        {/* Text Area */}
        <div className="mt-10 text-center space-y-3 z-10">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Career <span className="text-indigo-600">Assistant</span>
          </h2>

          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>

          <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
            Initializing Intelligence
          </p>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default HomeLoading;
