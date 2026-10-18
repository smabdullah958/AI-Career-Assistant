import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let UserMonthlyNotificationByIdThunck = createAsyncThunk(
  "UserMonthlyNotificationByIdThunck",
  async (userId, { rejectWithValue }) => {
    try {
      let result = await axios.get(
        `${url}/UserAnalytic/MonthlyNotification/${userId}`,
        {
          withCredentials: true,
        },
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message:
          error.response?.data?.message || "Unable to fetch monthly analytics",
      });
    }
  },
);

export default UserMonthlyNotificationByIdThunck;
