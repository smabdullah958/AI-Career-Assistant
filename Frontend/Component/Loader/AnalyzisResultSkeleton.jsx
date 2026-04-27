const ResultsSkeleton = () => {
  return (
    <div className="mt-12 max-w-7xl mx-auto animate-pulse pb-20 px-4">
      {/* 1. Meta Tag Skeleton */}
      <div className="w-40 h-7 bg-indigo-50 border border-indigo-100 rounded-full mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (4cols) - Score Hub */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Score Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-center space-y-10">
            <div className="h-2 w-28 bg-slate-200 rounded-full mx-auto"></div>
            {/* Circular Progress Skeleton */}
            <div className="w-48 h-48 mx-auto rounded-full border-[12px] border-slate-100 flex items-center justify-center">
              <div className="h-10 w-24 bg-slate-200 rounded-full"></div>
            </div>
            {/* Summary Box Skeleton */}
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 space-y-3">
              <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
              <div className="h-4 w-full bg-slate-100 rounded-full"></div>
              <div className="h-4 w-full bg-slate-100 rounded-full"></div>
              <div className="h-4 w-full bg-slate-100 rounded-full"></div>
              <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
            </div>
          </div>

          {/* Missing Keywords Skeleton */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl space-y-6">
            <div className="h-3 w-32 bg-slate-600 rounded-full"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-16 bg-slate-700 rounded-full"></div>
              <div className="h-8 w-24 bg-slate-700 rounded-full"></div>
              <div className="h-8 w-20 bg-slate-700 rounded-full"></div>
              <div className="h-8 w-16 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (8cols) - Insights */}
        <div className="lg:col-span-8 space-y-6">
          {/* Strengths Card Skeleton */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-slate-200 rounded-full"></div>
                <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            {/* List Item Skeletons */}
            <div className="h-16 w-full bg-emerald-50 rounded-[1.5rem] border border-emerald-100/50"></div>
            <div className="h-16 w-full bg-emerald-50 rounded-[1.5rem] border border-emerald-100/50"></div>
            <div className="h-16 w-full bg-emerald-50 rounded-[1.5rem] border border-emerald-100/50"></div>
          </div>

          {/* Tips Card Skeleton */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex gap-4 items-center mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-40 bg-slate-200 rounded-full"></div>
                <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            {/* Grid Tips Skeletons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-28 w-full bg-slate-50 rounded-[1.5rem] border border-slate-200/50"></div>
              <div className="h-28 w-full bg-slate-50 rounded-[1.5rem] border border-slate-200/50"></div>
              <div className="h-28 w-full bg-slate-50 rounded-[1.5rem] border border-slate-200/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSkeleton;
