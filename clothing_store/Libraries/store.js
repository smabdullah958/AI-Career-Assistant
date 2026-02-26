import { configureStore } from "@reduxjs/toolkit";

//for a Auth
import SignUpSlice from "@/Libraries/Slices/Auth/SignUpSlice";
export let store = configureStore({
  reducer: {
    SignUpSlice,
  },
});
