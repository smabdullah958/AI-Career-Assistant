import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice"; //fucntion to get  remining calls

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let ResumeThunck = createAsyncThunk(
  "ResumeThunck",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      let result = await axios.post(`${url}/Resume/createResume`, data, {
        withCredentials: true,
      });
      // get remainingCalls from a backend to display the remaining calls
      dispatch(setRemainingCalls(result.data?.remainingCalls));

      return result.data;
    } catch (err) {
      // get remainingCalls from a backend to display the remaining calls
      console.log("error ina  resume");
      dispatch(setRemainingCalls(err?.response?.data?.remainingCalls));

      return rejectWithValue(err?.response?.data);
    }
  },
);

export default ResumeThunck;
