import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let AIUsageThunck = createAsyncThunk("AIUsageThunck", async (period) => {
  try {
    let result = await axios.get(`${url}/AI/Analytics/?period=${period}`, {
      withCredentials: true,
    });

    return result.data;
  } catch {
    // AI usage analytics fetch failed silently.
  }
});

export default AIUsageThunck;
