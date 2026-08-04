//to show the credtis when a user is signup
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";
import { DisplayLogout } from "@/Libraries/Slices/Auth/LogInSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
let SignUpThunck = createAsyncThunk(
  "SignupThunck",
  async (Data, { dispatch, rejectWithValue }) => {
    try {
      let result = await axios.post(`${url}/Auth/signup`, Data, {
        withCredentials: true,
      });
      console.log("user is reggister");
      dispatch(
        //to show a logout button when a user is signup
        DisplayLogout({
          IsLoggIn: result.data?.IsLoggIn,
          Role: result.data.Role,
        }),
      );
      console.log("result data ", result.data?.IsLoggIn, result.data?.Role);
      dispatch(setRemainingCalls(result?.data?.remainingCalls));
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default SignUpThunck;
