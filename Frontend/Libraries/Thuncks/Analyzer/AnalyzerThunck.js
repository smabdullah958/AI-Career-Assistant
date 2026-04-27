import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice"; //fucntion to get  remining calls and it is present ina  interview slice

import { createAsyncThunk } from "@reduxjs/toolkit";
let url = process.env.NEXT_PUBLIC_BackendURL;
import axios from "axios";

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
      return response.data;
    } catch (error) {
      // get remainingCalls from a backend to display the remaining calls
      dispatch(setRemainingCalls(error.response.data?.remainingCalls));

      return rejectWithValue(error?.response?.data);
    }
  },
);

export default AnalyzerThunck;
