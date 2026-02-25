"use client";

import { useState } from "react";
import LoginForm from "../Form/LoginForm";
const LoginButton = () => {
  let [LogIn, SetLogIn] = useState(false);
  return (
    <div>
      <button
        onClick={() => SetLogIn(true)}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Login
      </button>
      {LogIn && <LoginForm HideForm={() => SetLogIn(false)} />}
    </div>
  );
};

export default LoginButton;
