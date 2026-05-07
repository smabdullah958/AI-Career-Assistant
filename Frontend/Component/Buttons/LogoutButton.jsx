"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ResetLogOutState } from "@/Libraries/Slices/Auth/LogOutSlice";
import LogOutThunck from "@/Libraries/Thuncks/Auth/LogOutThunck";

import { ClearSignUpRole } from "@/Libraries/Slices/Auth/SignUpSlice"; //reset the signup rol

import {
  ResetLogOutRole,
  ResetLogInState,
} from "@/Libraries/Slices/Auth/LogInSlice"; //to shwo  the login buutton and also reset the login state when click on a logout button

import { ResetResume } from "@/Libraries/Slices/Resume/ResumeSlice"; //to reset the resume all the state

import { ResetRemainingCalls } from "@/Libraries/Slices/GlobalSlice"; //to reset the interview all the state

import { ResetInterviewState } from "@/Libraries/Slices/Interview/InterviewSlice"; //to reset the intrivew state

import { ResetAnalyzer } from "@/Libraries/Slices/Analyzer/AnalyzerSlice"; //to reset all the state of a resume analyzer

const LogoutButton = () => {
  let dispatch = useDispatch();
  let router = useRouter();

  let { success, loading } = useSelector((state) => state.LogOutSlice); //LogOutSlice is come from a store

  useEffect(() => {
    if (success) {
      // so here we can reset the role and also islogin so that it show a login button
      router.push("/");
      dispatch(ResetLogOutRole()); //to show the login button
      dispatch(ResetLogOutState());
      dispatch(ResetLogInState()); // to reset the login state

      dispatch(ResetRemainingCalls()); //to reset the remaining calls so that no one can access each other remining calls

      dispatch(ClearSignUpRole());
      dispatch(ResetAnalyzer()); //reset the analyzer all the state
      dispatch(ResetInterviewState()); //reset all the state ofa interview
      dispatch(ResetResume()); //reset all the state of a resume
    }
  }, [success]);

  let LogOutFunction = async (Data) => {
    let res = await dispatch(LogOutThunck(Data));
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={LogOutFunction}
        className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ${
          loading
            ? "bg-blue-400 opacity-50 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
        }}`}
      >
        Logout{" "}
      </button>
    </div>
  );
};

export default LogoutButton;
