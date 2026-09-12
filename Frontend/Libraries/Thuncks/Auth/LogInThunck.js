//to show the credtis when a user is login
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { RegisterServiceWorker } from "@/Libraries/Firebase/RegisterServiceWorker";

let LogInThunck = createAsyncThunk(
  "Loginthunck",
  async (Data, { dispatch, rejectWithValue }) => {
    try {
      console.log("🟢 LOGIN THUNK STARTED");

      let result = await axios.post(`${url}/Auth/login`, Data, {
        withCredentials: true,
      });

      console.log("🟢 LOGIN API RESPONSE:", result.status);
      console.log("🟢 BACKEND URL:", url);

      dispatch(setRemainingCalls(result.data?.remainingCalls));

      if (result.status === 200) {
        console.log("🟢 LOGIN SUCCESS - STARTING FCM");

        const registration = await RegisterServiceWorker();

        console.log("🟢 SERVICE WORKER RESULT:", registration);

        if (registration) {
          console.log("🟢 CALLING RegisterFCM NOW");

          await RegisterFCM(registration);

          console.log("🟢 RegisterFCM FINISHED");
        } else {
          console.log("🔴 SERVICE WORKER REGISTRATION FAILED");
        }
      }

      return result?.data;
    } catch (error) {
      console.error("🔴 LOGIN THUNK ERROR:", error);

      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default LogInThunck;
