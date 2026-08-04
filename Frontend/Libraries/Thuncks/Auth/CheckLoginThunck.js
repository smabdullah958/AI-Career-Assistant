import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let CheckLoginThunck = createAsyncThunk(
  "CheckLoginthunck",
  async (_, { rejectWithValue }) => {
    try {
      let result = await axios.get(`${url}/Auth/checklogin`, {
        withCredentials: true,
      });
      return result?.data;
    } catch (error) {
      return console.log(rejectWithValue(error.response?.data?.message));
    }
  },
);

export default CheckLoginThunck;
