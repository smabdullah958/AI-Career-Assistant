//to show the credtis when a user is login
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { RegisterServiceWorker } from "@/Libraries/Firebase/RegisterServiceWorker";

import getDeviceType from "@/Component/getDeviceType";
const deviceType = getDeviceType();

import { FirebaseAuthenticatedUser } from "@/Libraries/Firebase/FirebaseAuthendicateUser";

let LogInThunck = createAsyncThunk(
  "Loginthunck",
  async (Data, { dispatch, rejectWithValue }) => {
    try {
      let result = await axios.post(
        `${url}/Auth/login`,
        { ...Data, deviceType },
        {
          withCredentials: true,
        },
      );
      dispatch(setRemainingCalls(result.data?.remainingCalls));

      if (result.status === 200) {
        await FirebaseAuthenticatedUser(result.data?.UserId, "email", "login");

        const registration = await RegisterServiceWorker();

        if (registration) {
          await RegisterFCM(registration);
        }
      }

      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default LogInThunck;
