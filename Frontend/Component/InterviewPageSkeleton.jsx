const InterviewPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans animate-pulse">
      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto w-full px-4 pt-10 pb-6 text-center">
        <div className="h-10 w-2/3 mx-auto bg-gray-200 rounded mb-4"></div>
        <div className="h-5 w-1/2 mx-auto bg-gray-100 rounded"></div>
      </section>

      {/* MAIN CHAT CONTAINER */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-8">
        <div className="flex-1 bg-white rounded-[3rem] shadow-2xl border border-slate-200 flex flex-col min-h-[500px] overflow-hidden">
          {/* CHAT AREA */}
          <div className="flex-1 p-6 md:p-10 space-y-6">
            {/* AI Message */}
            <div className="flex justify-end">
              <div className="w-2/3 bg-gray-100 rounded-2xl rounded-tl-none p-4 space-y-2">
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-start">
              <div className="w-2/3 bg-gray-200 rounded-2xl rounded-tr-none p-4 space-y-2">
                <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* More fake messages */}
            <div className="flex justify-end">
              <div className="w-1/2 bg-gray-100 rounded-2xl p-4 space-y-2">
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="max-w-4xl mx-auto relative flex items-center">
              {/* Input skeleton */}
              <div className="w-full h-14 bg-gray-200 rounded-2xl"></div>

              {/* Button skeleton */}
              <div className="absolute right-3 w-10 h-10 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPageSkeleton;
