import { configureStore } from "@reduxjs/toolkit";

//for a Auth
import SignUpSlice from "@/Libraries/Slices/Auth/SignUpSlice";
import LogInSlice from "@/Libraries/Slices/Auth/LogInSlice";
import LogOutSlice from "@/Libraries/Slices/Auth/LogOutSlice";

// for generating resume
import ResumeSlice from "@/Libraries/Slices/Resume/ResumeSlice";

//for interivew
import InterviewSlice from "@/Libraries/Slices/Interview/InterviewSlice";

// for Analyze resume
import AnalyzeSlice from "@/Libraries/Slices/Analyzer/AnalyzerSlice";

export let store = configureStore({
  reducer: {
    SignUpSlice,
    LogInSlice,
    LogOutSlice,
    ResumeSlice,
    InterviewSlice,
    AnalyzeSlice,
  },
});
