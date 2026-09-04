import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let url = process.env.NEXT_PUBLIC_BackendURL;

let MarkNotificationsAsRead = createAsyncThunk(
  "notification/markAsRead",
  async () => {
    try {
      let result = await axios.put(
        `${url}/NotiicationRoute/MarkAsRead`,
        {},
        {
          withCredentials: true,
        },
      );

      return result.data;
    } catch (error) {
      console.log("Mark notification read error:", error);
    }
  },
);

export default MarkNotificationsAsRead;
