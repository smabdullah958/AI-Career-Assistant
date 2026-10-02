import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logEvent } from "firebase/analytics";
let url = process.env.NEXT_PUBLIC_BackendURL;

import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";

let InterviewThunck = createAsyncThunk(
  "InterviewThunck",
  async (Input, { rejectWithValue, dispatch }) => {
    try {
      let result = await axios.post(`${url}/AiInterviews/Interview`, Input, {
        withCredentials: true,
      });
      // get remainingCalls from a backend to display the remaining calls
      dispatch(setRemainingCalls(result.data?.remainingCalls));
      console.log("inteview data");

      //count the number of api calls and log it in firebase analytics
      if (result.status === 200) {
        const analytics = await getFirebaseAnalytics();

        if (analytics) {
          logEvent(analytics, "mock_interview_started");
          logEvent(analytics, "api_call");
        }
      }
      return result?.data;
    } catch (err) {
      // get remainingCalls from a backend to display the remaining calls
      console.log("error in a interview", err);
      dispatch(setRemainingCalls(err.response.data?.remainingCalls));

      return rejectWithValue(err?.response?.data);
    }
  },
);

export default InterviewThunck;
