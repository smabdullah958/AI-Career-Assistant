import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let LogOutThunck = createAsyncThunk(
  "LogOutthunck",

  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${url}/Auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export default LogOutThunck;
