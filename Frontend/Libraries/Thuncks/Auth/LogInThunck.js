import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let LogInThunck = createAsyncThunk(
  "Loginthunck",
  async (Data, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${url}/Auth/login`, Data, {
        withCredentials: true,
      });
      console.log(response.data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default LogInThunck;
