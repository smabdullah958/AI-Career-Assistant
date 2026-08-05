import { configureStore } from "@reduxjs/toolkit";

//for a Auth
import SignUpSlice from "@/Libraries/Slices/Auth/SignUpSlice";
import LogInSlice from "@/Libraries/Slices/Auth/LogInSlice";
import LogOutSlice from "@/Libraries/Slices/Auth/LogOutSlice";
import GoogleSlice from "@/Libraries/Slices/Auth/CreateAccountGoogleSlice";
import LogInWithGoogleSlice from "@/Libraries/Slices/Auth/LogInWithGoogle"

// for generating resume
import ResumeSlice from "@/Libraries/Slices/Resume/ResumeSlice";

//for interivew
import InterviewSlice from "@/Libraries/Slices/Interview/InterviewSlice";

// for Analyze resume
import AnalyzeSlice from "@/Libraries/Slices/Analyzer/AnalyzerSlice";

//to get and reset the remaining api call
import GlobalSlice from "@/Libraries/Slices/GlobalSlice";
export let store = configureStore({
  reducer: {
    SignUpSlice,
    LogInSlice,
    LogOutSlice,
    GoogleSlice,  //creat acount through a google brtohe r
    LogInWithGoogleSlice, //login witha google
    ResumeSlice,
    InterviewSlice,
    AnalyzeSlice,
    GlobalSlice,
  },
});
