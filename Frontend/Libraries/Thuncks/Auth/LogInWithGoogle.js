//to show the credtis when a user is signup
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";
import { DisplayLogout } from "@/Libraries/Slices/Auth/LogInSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;
import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { RegisterServiceWorker } from "@/Libraries/Firebase/RegisterServiceWorker";

import getDeviceType from "@/Component/getDeviceType";
const deviceType = getDeviceType();

import { FirebaseAuthenticatedUser } from "@/Libraries/Firebase/FirebaseAuthendicateUser";

let LogInWithGoogleThunck = createAsyncThunk(
  "Loginwithgoglethunck",
  async (Data, { dispatch, rejectWithValue }) => {
    try {
      let result = await axios.post(
        `${url}/Auth/LogInThroughGoogle`,
        { ...Data, deviceType },
        {
          withCredentials: true,
        },
      );
      // console.log("user is reggister");
      dispatch(
        //to show a logout button when a user is signup
        DisplayLogout({
          IsLoggIn: result.data?.IsLoggIn,
          Role: result.data.Role,
        }),
      );
      // console.log("result data ", result.data?.IsLoggIn, result.data?.Role);
      dispatch(setRemainingCalls(result?.data?.remainingCalls));

      if (result.status === 200) {
        // Firebase Analytics
        await FirebaseAuthenticatedUser(result.data?.UserId, "google","login");

        const registration = await RegisterServiceWorker();

        if (registration) {
          await RegisterFCM(registration);
        }
        console.log("Service worker registration:", registration);
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export default LogInWithGoogleThunck;
