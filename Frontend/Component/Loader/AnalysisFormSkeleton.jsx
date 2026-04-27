const FormSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-pulse pb-10">
      {/* 1. Header Skeleton */}
      <div className="text-center">
        <div className="h-10 w-96 bg-slate-200 rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* 2. Form Input Area Skeleton (Left) */}
        <div className="md:col-span-1 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100/50 space-y-8">
          {/* Target Role Field */}
          <div className="space-y-2">
            <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
            <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
          </div>
          {/* Experience Dropdown */}
          <div className="space-y-2">
            <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
            <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
          </div>
        </div>

        {/* 3. Upload Box Skeleton (Right) */}
        <div className="md:col-span-2 h-full bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col justify-center">
          <div className="w-full h-full min-h-[16rem] border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-16 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl"></div>
            <div className="h-6 w-56 bg-slate-200 rounded-full"></div>
            <div className="h-3 w-20 bg-slate-100 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
