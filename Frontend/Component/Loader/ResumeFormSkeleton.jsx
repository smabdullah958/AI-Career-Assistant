const ResumeBuilderSkeleton = () => {
  // Helper for input fields (matched to the border and rounded style of the image)
  const InputSkeleton = () => (
    <div className="h-10 w-full bg-slate-100 border border-slate-200 animate-pulse rounded-lg mb-4"></div>
  );

  // Helper for card containers (matched to the bg-slate-100 and rounded-2xl of the image)
  const CardSkeleton = ({ titleWidth = "w-32", children }) => (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-6 shadow-sm">
      {/* Title */}
      <div className={`${titleWidth} h-6 bg-slate-200 animate-pulse rounded-md mb-6`}></div>
      {/* White inner container matched to the form */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 2xl:p-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* MAIN PAGE TITLE (AI Resume Builder) */}
        <div className="h-10 w-64 bg-slate-200 animate-pulse rounded-lg mb-12"></div>

        {/* 1. PERSONAL DETAIL CARD */}
        <CardSkeleton titleWidth="w-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div className="flex flex-col gap-1">
              <div className="h-3 w-16 bg-slate-100 animate-pulse rounded"></div> {/* Label: Full Name */}
              <InputSkeleton />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-12 bg-slate-100 animate-pulse rounded"></div> {/* Label: Email */}
              <InputSkeleton />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-14 bg-slate-100 animate-pulse rounded"></div> {/* Label: Phone */}
              <InputSkeleton />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-10 bg-slate-100 animate-pulse rounded"></div> {/* Label: Role */}
              <InputSkeleton />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-16 bg-slate-100 animate-pulse rounded"></div> {/* Label: Portfolio */}
              <InputSkeleton />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-3 w-16 bg-slate-100 animate-pulse rounded"></div> {/* Label: LinkedIn */}
              <InputSkeleton />
            </div>
          </div>
        </CardSkeleton>

        {/* 2. PROFESSIONAL DETAIL CARD (With Textarea) */}
        <CardSkeleton titleWidth="w-44">
          <div className="h-3 w-40 bg-slate-100 animate-pulse rounded mb-2"></div> {/* Label */}
          {/* Main Textarea Area */}
          <div className="h-32 w-full bg-slate-50 animate-pulse rounded-xl border border-slate-100 mb-2"></div>
          {/* Character counter area */}
          <div className="h-3 w-24 bg-slate-100 animate-pulse rounded"></div>
        </CardSkeleton>

        {/* 3. SKILLS CARD (With + Add Button) */}
        <CardSkeleton titleWidth="w-20">
          <InputSkeleton />
          <div className="flex justify-between items-center">
             {/* The violet button skeleton */}
             <div className="h-10 w-24 bg-indigo-200 animate-pulse rounded-xl"></div>
             {/* skills counter */}
             <div className="h-3 w-16 bg-slate-100 animate-pulse rounded"></div>
          </div>
        </CardSkeleton>

        {/* 4. PROJECTS CARD (Grid layout for title, links, desc) */}
        <CardSkeleton titleWidth="w-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 items-start">
            {/* Left Column (Title, Links) */}
            <div className="space-y-1">
                <div className="h-3 w-10 bg-slate-100 animate-pulse rounded"></div>
                <InputSkeleton />
                <div className="h-3 w-20 bg-slate-100 animate-pulse rounded"></div>
                <InputSkeleton />
                <div className="h-3 w-20 bg-slate-100 animate-pulse rounded"></div>
                <InputSkeleton />
            </div>
             {/* Right Column (Description) */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="h-3 w-20 bg-slate-100 animate-pulse rounded"></div>
              <div className="h-44 w-full bg-slate-50 animate-pulse rounded-xl border border-slate-100"></div>
            </div>
          </div>
           {/* Add project button */}
           <div className="h-10 w-32 bg-indigo-200 animate-pulse rounded-xl mt-6"></div>
        </CardSkeleton>

      </div>
    </div>
  );
};

export default ResumeBuilderSkeleton;