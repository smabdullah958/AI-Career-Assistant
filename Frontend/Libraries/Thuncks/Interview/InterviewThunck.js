import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

let InterviewThunck = createAsyncThunk("InterviewThunck", async (Input) => {
  try {
    let result = await axios.post(`${url}/AiInterviews/Interview`, Input, {
      withCredentials: true,
    });
    console.log(result.data.response);
    return result?.data.response;
  } catch (err) {
    console.log("eror is occur data is not being fetch", err);
  }
});

export default InterviewThunck;
