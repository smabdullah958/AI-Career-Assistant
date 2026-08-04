// "use client";

// import { FcGoogle } from "react-icons/fc";

// const GoogleButton = () => {
//   return (
//     <button
//       type="button"
//       className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
//     >
//       <FcGoogle size={22} />
//       Continue with Google
//     </button>
//   );
// };

// export default GoogleButton;

"use client";

import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick, loading = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="
        group
        mt-2
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-lg
        border
        border-blue-200
        bg-white
        px-4
        py-3
        font-medium
        text-blue-700
        shadow-sm
        transition-all
        duration-300
        hover:border-blue-500
        hover:bg-blue-50
        hover:shadow-md
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <div className="rounded-full bg-white p-1 shadow-sm">
        <FcGoogle size={22} />
      </div>

      <span className="text-sm font-semibold">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
