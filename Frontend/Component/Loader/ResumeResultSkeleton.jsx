"use client";

const ResumeSkeleton = () => {
  // Helper for repetitive lines
  const SkeletonLine = ({ width = "w-full", height = "h-3" }) => (
    <div
      className={`${height} ${width} bg-gray-200 rounded animate-pulse mb-2`}
    ></div>
  );

  return (
    <div className="bg-white p-10 w-full max-w-[210mm] min-h-[297mm] mx-auto rounded-xl border border-gray-100 shadow-sm">
      {/* HEADER SKELETON */}
      <div className="border-b-2 border-gray-100 pb-6 mb-8">
        <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="h-4 w-1/4 bg-blue-100 animate-pulse rounded mb-6"></div>

        <div className="flex gap-4">
          <div className="h-3 w-32 bg-gray-100 animate-pulse rounded"></div>
          <div className="h-3 w-40 bg-gray-100 animate-pulse rounded"></div>
          <div className="h-3 w-48 bg-gray-100 animate-pulse rounded"></div>
        </div>
      </div>

      {/* ABOUT ME SKELETON */}
      <div className="mb-8">
        <div className="h-5 w-28 bg-gray-200 animate-pulse rounded mb-4"></div>
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine width="w-4/5" />
      </div>

      {/* SKILLS SKELETON (8 Skills as requested) */}
      <div className="mb-8">
        <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-gray-50 border-l-2 border-gray-100 animate-pulse rounded-sm"
            ></div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE SKELETON */}
      <div className="mb-8">
        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-3 w-24 bg-gray-100 animate-pulse rounded"></div>
              </div>
              <div className="h-3 w-32 bg-blue-50 animate-pulse rounded mb-3"></div>
              <SkeletonLine />
              <SkeletonLine width="w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS SKELETON */}
      <div>
        <div className="h-5 w-28 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="flex justify-between mb-2">
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-3 w-20 bg-gray-100 animate-pulse rounded"></div>
        </div>
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-3/4" />
      </div>
    </div>
  );
};

export default ResumeSkeleton;
