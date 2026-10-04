import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice"; //fucntion to get  remining calls and it is present ina  interview slice

import { createAsyncThunk } from "@reduxjs/toolkit";
let url = process.env.NEXT_PUBLIC_BackendURL;
import axios from "axios";
import { logEvent } from "firebase/analytics";
const analytics = await getFirebaseAnalytics();

let AnalyzerThunck = createAsyncThunk(
  "Analyzerthunck",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let response = await axios.post(`${url}/ResumeAnalyzer/Analyzer`, data, {
        withCredentials: true,
      });
      // get remainingCalls from a backend to display the remaining calls
      dispatch(setRemainingCalls(response.data?.remainingCalls));

      console.log("get response");

      //count the number of api calls and log it in firebase analytics
      if (response.status === 200) {
        if (analytics) {
          logEvent(analytics, "ats_score_generated");
          logEvent(analytics, "api_call", {
            feature: "ats_analyzer",
            credit_used: 1,
            status: "success",
          });
        }
      }

      return response.data;
    } catch (error) {
      // get remainingCalls from a backend to display the remaining calls
      dispatch(setRemainingCalls(error.response.data?.remainingCalls));

      if (analytics) {
        logEvent(analytics, "api_call", {
          feature: "ats_analyzer",
          status: "failed",
        });
      }

      return rejectWithValue(error?.response?.data);
    }
  },
);

export default AnalyzerThunck;
