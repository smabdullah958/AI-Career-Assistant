"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LogInThunck from "@/Libraries/Thuncks/Auth/LogInThunck";
import { ResetLogInState } from "@/Libraries/Slices/Auth/LogInSlice";
import ButtonLoader from "../Loader/ButtonLoader";
import LoginWithGoogle from "../Buttons/LoginWithGoogle";
import toast from "react-hot-toast";
import { ResetState } from "@/Libraries/Slices/Auth/LogInWithGoogle"; //this si used to reset the state of a login with google
const LoginForm = ({ HideForm }) => {
  let [hideErrorMessage, SethideErrorMessage] = useState(false);
  let dispatch = useDispatch();
  let router = useRouter();

  let { loading, errorMessage, UserRole, success } = useSelector(
    (state) => state.LogInSlice, //LogInSlice is come from a store
  );

  console.log("🔥 LOGIN FORM RENDER");
  console.log("loading:", loading);
  console.log("success:", success);
  console.log("UserRole:", UserRole);

  let [Field, SetField] = useState({
    Email: "",
    Password: "",
  });
  let FormFunction = (e) => {
    SetField((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //disable button when  loading or a name or a email or a password is not
  let DisableButton = loading || !Field.Email || !Field.Password;

  let LogInFunction = async (Data) => {
    let result = await dispatch(LogInThunck(Data));

    //navigation
    const Role = result?.payload?.Role;

    console.log("🔥 LOGIN SUCCESS");
    console.log("🔥 ROLE:", Role);

    if (Role === "Admin" || Role === "SuperAdmin") {
      console.log("🚀 ADMIN → /AdminDashboard");

      HideForm();
      router.replace("/AdminDashboard");

      return;
    }

    console.log("👤 USER → /");

    HideForm();
    router.replace("/");
  };

  useEffect(() => {
    if (
      errorMessage ===
      "This account was created with Google. Please sign in with Google"
    ) {
      toast.error(errorMessage);
      SethideErrorMessage(true);
    }
  }, [errorMessage]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-blue-50 shadow-2xl rounded-2xl p-8 w-[90vw] sm:w-[400px] border border-amber-200 relative">
        {/* Heading */}
        <div className="flex">
          <button
            onClick={() => {
              HideForm();
              dispatch(ResetLogInState());
              SethideErrorMessage(false);
              dispatch(ResetState());
            }}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 active:scale-95 transition-all duration-200 text-blue-700 font-bold text-lg"
          >
            X
          </button>
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
            Welcome Back
          </h2>
        </div>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Login to your account
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {errorMessage && hideErrorMessage === false && (
            <p className="text-red-500 text-sm mt-3 text-center">
              {errorMessage}
            </p>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">Email</label>
            <input
              type="email"
              placeholder="test@gmail.com"
              onChange={FormFunction}
              name="Email"
              value={Field.Email}
              className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={Field.Password}
              onChange={FormFunction}
              name="Password"
              className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            disabled={DisableButton}
            onClick={() => LogInFunction(Field)}
            className={`w-full text-white font-semibold py-3 rounded-lg shadow-md mt-5 transition-all duration-200 ${
              DisableButton
                ? "bg-blue-200 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>

          <LoginWithGoogle />
        </form>

        {/* Signup redirect */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            onClick={() => {
              (HideForm(), dispatch(ResetLogInState()));
            }}
            href="/SignUp"
            className="text-blue-500 hover:text-blue-600 duration-300 transition-all hover:text-[15px]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
