import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let UserMonthlyNotificationByIdThunck = createAsyncThunk(
  "UserMonthlyNotificationByIdThunck",
  async (userId) => {
    try {
      let result = await axios.get(
        `${url}/UserAnalytic/MonthlyNotification/${userId}`,
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

export default UserMonthlyNotificationByIdThunck;
