import { createAsyncThunk } from "@reduxjs/toolkit";
let url = process.env.NEXT_PUBLIC_BackendURL;
import axios from "axios";

let AnalyzerThunck = createAsyncThunk(
  "Analyzerthunck",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${url}/ResumeAnalyzer/Analyzer`, data, {
        withCredentials: true,
      });
      console.log("get response");
      return response.data;
    } catch (error) {
      console.log("iner error", error);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export default AnalyzerThunck;
