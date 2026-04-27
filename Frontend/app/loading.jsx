
const Loading = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* TOP NAV/HEADER AREA */}
        <div className="flex justify-between items-center mb-12">
          <div className="h-8 w-40 bg-indigo-100 animate-pulse rounded-lg"></div>
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-slate-200 animate-pulse rounded-full"></div>
            <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-lg"></div>
          </div>
        </div>

        {/* HERO SECTION AREA */}
        <div className="text-center space-y-4 py-10">
          <div className="h-12 w-3/4 md:w-1/2 bg-slate-200 animate-pulse rounded-xl mx-auto"></div>
          <div className="h-4 w-2/3 md:w-1/3 bg-slate-100 animate-pulse rounded-lg mx-auto"></div>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4"
            >
              {/* Icon Circle */}
              <div className="h-12 w-12 bg-indigo-50 animate-pulse rounded-2xl"></div>
              {/* Title */}
              <div className="h-6 w-1/2 bg-slate-200 animate-pulse rounded-md"></div>
              {/* Description Lines */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 animate-pulse rounded"></div>
                <div className="h-3 w-full bg-slate-100 animate-pulse rounded"></div>
                <div className="h-3 w-4/5 bg-slate-100 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* LARGE INTERACTIVE AREA SKELETON */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-indigo-100/20 border border-slate-200 mt-12 min-h-[400px] flex flex-col items-center justify-center space-y-6">
          <div className="h-16 w-16 bg-indigo-100 animate-pulse rounded-full"></div>
          <div className="h-4 w-48 bg-slate-100 animate-pulse rounded-lg"></div>
          <div className="w-full max-w-md space-y-3">
            <div className="h-12 w-full bg-slate-50 animate-pulse rounded-2xl border border-slate-100"></div>
            <div className="h-12 w-32 bg-indigo-600/10 animate-pulse rounded-2xl mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
