const loading = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 flex flex-col items-center gap-4 shadow-2xl">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
        </div>
        <p className="text-blue-700 font-semibold text-lg tracking-wide animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default loading;
