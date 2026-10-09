import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let UserWeeklyNotificationByIdThunck = createAsyncThunk(
  "UserMonthlyNotificationById",
  async (userId) => {
    try {
      let result = await axios.get(
        `${url}/UserAnaltics/WeeklyNotification/${userId}`,
        {
          withCredentials: true,
        },
      );
      console.log("so th reuslt is a ", result?.paylod);
      return result?.data;
    } catch (error) {
      console.log("internal error", error);
    }
  },
);

export default UserWeeklyNotificationByIdThunck;
