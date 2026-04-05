"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUpThunck from "@/Libraries/Thuncks/Auth/SignUpThunk";
import { useRouter } from "next/navigation";
import { ResetSignUpState } from "@/Libraries/Slices/Auth/SignUpSlice";
import { DisplayLogout } from "@/Libraries/Slices/Auth/LogInSlice";
import ButtonLoader from "@/Component/ButtonLoader";
const page = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  let [field, setfield] = useState({
    Name: "",
    Password: "",
    Email: "",
  });
  let { loading, errorMessage, success } = useSelector(
    (state) => state.SignUpSlice, //SignUpSlice is come from a store
  );

  //disable button when  loading or a name or a email or a password is not
  let DisableButton = loading || !field.Name || !field.Email || !field.Password;
  // redirect after success
  useEffect(() => {
    if (success) {
      router.push("/");
    }
    dispatch(ResetSignUpState());
    //to shwo a logout button
    dispatch(DisplayLogout());
  }, [success]);

  let FieldFunction = (e) => {
    setfield((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // for check the length ofa  passsword
  let [CheckPassword, SetCheckPassword] = useState("");

  let SignupFunction = async (Data) => {
    // for check the length ofa  passsword
    if (field.Password?.length < 6) {
      SetCheckPassword("Password must be at least 6 character");
      return;
    }
    SetCheckPassword("");
    let res = await dispatch(SignUpThunck(Data));
    console.log(res);
  };

  useEffect(() => {
    dispatch(ResetSignUpState()); // clears Redux errorMessage
    SetCheckPassword(""); // clears local password error
  }, []); // runs once when page is opens
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Sign up to get started
        </p>
        {/* Name */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {errorMessage}
          </p>
        )}
        {/* password length issue */}
        {CheckPassword && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {CheckPassword}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-blue-700 mb-2 mt-5">
            Full Name
          </label>
          <input
            type="text"
            placeholder="UserName"
            onChange={FieldFunction}
            name="Name"
            value={field.Name}
            className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-blue-700 mb-2 mt-5">
            Email
          </label>
          <input
            type="email"
            placeholder="test@gmail.com"
            onChange={FieldFunction}
            name="Email"
            value={field.Email}
            className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-blue-700 mb-2 mt-5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={FieldFunction}
            name="Password"
            value={field.Password}
            className="border border-blue-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        {/* Submit Button */}
        <button
          disabled={DisableButton}
          onClick={() => SignupFunction({ ...field, Role: "User" })}
          className={`w-full text-white font-semibold py-3 rounded-lg shadow-md mt-5 transition-all duration-200 ${
            DisableButton
              ? "bg-blue-200 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? <ButtonLoader /> : "Sign Up"}
        </button>
      </div>
    </div>
  );
};
export default page;
