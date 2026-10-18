import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let UserWeeklyNotificationByIdThunck = createAsyncThunk(
  "UserWeeklyNotificationByIdThunck",
  async (userId, { rejectWithValue }) => {
    try {
      let result = await axios.get(
        `${url}/UserAnaltics/WeeklyNotification/${userId}`,
        {
          withCredentials: true,
        },
      );
      console.log("so th reuslt is a ");
      return result?.data;
    } catch (error) {
      console.log("internal error", error);
      return rejectWithValue({
        status: error.response?.status,
        message:
          error.response?.data?.message || "Unable to fetch weekly analytics",
      });
    }
  },
);

export default UserWeeklyNotificationByIdThunck;
