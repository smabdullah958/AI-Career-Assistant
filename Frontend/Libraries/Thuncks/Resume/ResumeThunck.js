import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice"; //fucntion to get  remining calls

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logEvent } from "firebase/analytics";
let url = process.env.NEXT_PUBLIC_BackendURL;
const analytics = await getFirebaseAnalytics();

let ResumeThunck = createAsyncThunk(
  "ResumeThunck",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      let result = await axios.post(`${url}/Resume/createResume`, data, {
        withCredentials: true,
      });
      // get remainingCalls from a backend to display the remaining calls
      dispatch(setRemainingCalls(result.data?.remainingCalls));

      //count the number of api calls and log it in firebase analytics
      if (result.status === 200) {
        if (analytics) {
          logEvent(analytics, "resume_generated");
          logEvent(analytics, "api_call", {
            feature: "resume_builder",
            credit_used: 1,
            status: "success",
          });
        }
      }

      return result.data;
    } catch (err) {
      // get remainingCalls from a backend to display the remaining calls
      console.log("error ina  resume", err);
      dispatch(setRemainingCalls(err?.response?.data?.remainingCalls));
      if (analytics) {
        logEvent(analytics, "api_call", {
          feature: "resume_builder",
          status: "failed",
        });
      }

      return rejectWithValue(err?.response?.data);
    }
  },
);

export default ResumeThunck;
