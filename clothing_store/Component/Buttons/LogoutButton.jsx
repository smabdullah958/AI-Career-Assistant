"use client";

import { useState } from "react";

const LogoutButton = () => {
  let [LogOut, SetLogOut] = useState(false);
  return (
    <div>
      <button
        onClick={() => SetLogOut(true)}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
