import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let ResumeThunck = createAsyncThunk("ResumeThunck", async (data) => {
  try {
    let result = await axios.post(`${url}/Resume/createResume`, data);
    return result.data?.response;
  } catch (err) {
    console.log("internal error", err);
  }
});

export default ResumeThunck;
