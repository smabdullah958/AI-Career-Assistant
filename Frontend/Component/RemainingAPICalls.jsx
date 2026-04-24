let RemainingAPICalls = ({ remaining }) => {
  return (
    <div className="fixed top-18  sm:top-20 2xl:top-50 right-0 sm:right-5 z-50">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
        {/* Pulsing indicator */}
        <div className="relative flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${remaining > 2 ? "bg-indigo-400" : "bg-red-400"}`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${remaining > 2 ? "bg-indigo-500" : "bg-red-500"}`}
          ></span>
        </div>

        <div className="flex flex-col">
          <span className="text-[7px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
            AI Credits
          </span>
          <span className="text-[12px] sm:text-sm font-bold text-slate-700">
            {remaining} / 10{" "}
            <span className="text-slate-400 font-medium">left</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RemainingAPICalls;
