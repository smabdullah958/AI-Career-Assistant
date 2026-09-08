//to show the credtis when a user is login
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";

let LogInThunck = createAsyncThunk(
  "Loginthunck",
  async (Data, { dispatch, rejectWithValue }) => {
    try {
      let result = await axios.post(`${url}/Auth/login`, Data, {
        withCredentials: true,
      });
      dispatch(setRemainingCalls(result.data?.remainingCalls));

      if (result.status === 200) {
        RegisterFCM();
      }

      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default LogInThunck;
