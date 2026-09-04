import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let url = process.env.NEXT_PUBLIC_BackendURL;

let GetUnreadNotification = createAsyncThunk(
  "notification/unread",
  async () => {
    try {
      let result = await axios.get(`${url}/NotiicationRoute/UnRead`, {
        withCredentials: true,
      });

      return result.data;
    } catch (error) {
      console.log("Unread notification error:", error);
    }
  },
);

export default GetUnreadNotification;
