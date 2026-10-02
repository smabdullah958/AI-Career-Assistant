import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let FeatureAnalyticsThunck = createAsyncThunk(
  "FeatureAnalyticsThunck",
  async (period) => {
    try {
      let result = await axios.get(
        `${url}/Feature/Analytics/?period=${period}`,
        {
          withCredentials: true,
        },
      );

      return result.data;
    } catch (err) {
      console.log("error ina  user analytics", err);
    }
  },
);

export default FeatureAnalyticsThunck;
