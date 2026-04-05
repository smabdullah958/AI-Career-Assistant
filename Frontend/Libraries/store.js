import { configureStore } from "@reduxjs/toolkit";

//for a Auth
import SignUpSlice from "@/Libraries/Slices/Auth/SignUpSlice";
import LogInSlice from "@/Libraries/Slices/Auth/LogInSlice";
import LogOutSlice from "@/Libraries/Slices/Auth/LogOutSlice";
export let store = configureStore({
  reducer: {
    SignUpSlice,
    LogInSlice,
    LogOutSlice,
  },
});
