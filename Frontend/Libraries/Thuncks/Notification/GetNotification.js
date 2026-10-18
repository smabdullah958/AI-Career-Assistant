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
    return result?.data;
  } catch {
    // Notification fetch failed silently.
  }
});

export default NotificationThunck;
