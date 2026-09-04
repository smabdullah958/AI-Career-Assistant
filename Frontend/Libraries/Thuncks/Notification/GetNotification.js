import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let NotificationThunck = createAsyncThunk("notification", async (page = 1) => {
  try {
    let result = await axios.get(
      `${url}/NotiicationRoute/Notification?page=${page}`,
      {
        withCredentials: true,
      },
    );
    console.log("so th reuslt is a ", result?.paylod);
    return result?.data;
  } catch (error) {
    console.log("internal error", error);
  }
});

export default NotificationThunck;
