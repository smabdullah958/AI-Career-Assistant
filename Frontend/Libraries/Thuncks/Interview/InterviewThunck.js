import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

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
      return result?.data;
    } catch (err) {
      // get remainingCalls from a backend to display the remaining calls
      console.log("error in a interview");
      dispatch(setRemainingCalls(err.response.data?.remainingCalls));

      return rejectWithValue(err?.response?.data);
    }
  },
);

export default InterviewThunck;
