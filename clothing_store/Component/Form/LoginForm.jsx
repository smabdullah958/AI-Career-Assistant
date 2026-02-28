"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LogInThunck from "@/Libraries/Thuncks/Auth/LogInThunck";
import { ResetLogInState, ResetRole } from "@/Libraries/Slices/Auth/LogInSlice";
import ButtonLoader from "../ButtonLoader";
const LoginForm = ({ HideForm }) => {
  let dispatch = useDispatch();
  let router = useRouter();

  let { loading, Role, errorMessage, success } = useSelector(
    (state) => state.LogInSlice, //LogInSlice is come from a store
  );

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
    await dispatch(LogInThunck(Data));
    console.log("role si ", Role, "the succes is :", success);
    // DO NOT navigate here
    // DO NOT reset state here
  };

  useEffect(() => {
    if (!success) return console.log("success is false", success);
    if (!Role) return console.log("role  is empty", Role);

    if (Role === "Admin") {
      router.push("/AdminDashboard");
      console.log("Redirecting:", Role);
      HideForm();
    } else {
      console.log("red", Role);
      router.push("/");
      HideForm();
    }
    dispatch(ResetRole()); //to shwo the logout button
    dispatch(ResetLogInState());
  }, [success, Role]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-blue-50 shadow-2xl rounded-2xl p-8 w-[90vw] sm:w-[400px] border border-amber-200 relative">
        {/* Heading */}
        <div className="flex">
          <button
            onClick={() => {
              HideForm();
              dispatch(ResetLogInState());
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
          {errorMessage && (
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
              className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
              className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
        </form>

        {/* Signup redirect */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            onClick={HideForm}
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
