import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let ResumeThunck = createAsyncThunk(
  "ResumeThunck",
  async (data, { rejectWithValue }) => {
    try {
      let result = await axios.post(`${url}/Resume/createResume`, data, {
        withCredentials: true,
      });
      return result.data;
    } catch (err) {
      console.log("internal error", err);
      return rejectWithValue(err?.response?.data);
    }
  },
);

export default ResumeThunck;
