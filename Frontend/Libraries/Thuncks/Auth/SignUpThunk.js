import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let SignUpThunck = createAsyncThunk(
  "SignupThunck",
  async (Data, { rejectWithValue }) => {
    try {
      let result = await axios.post(`${url}/Auth/signup`, Data, {
        withCredentials: true,
      });
      console.log(result);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default SignUpThunck;
