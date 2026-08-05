import { createSlice } from "@reduxjs/toolkit";
import CheckLoginThunk from "@/Libraries/Thuncks/Auth/CheckLoginThunck";

let initialState = {
  remainingCalls: 0,
  ShowPopUp: false,

  // Authentication state
  IsLoggIn: false,
  Role: null,

  // Check Login Loading
  loading: false,
  errorMessage: null,
};

let GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState,
  reducers: {
    // Update remaining credits
    setRemainingCalls: (state, action) => {
      state.remainingCalls = action.payload;
      state.ShowPopUp = action.payload?.ShowPopUp || true;
    },

    // Reset credits
    ResetRemainingCalls: (state) => {
      state.remainingCalls = 0;
      state.ShowPopUp = false;
    },

    // Clear auth when user logs out
    ResetGlobalAuth: (state) => {
      state.IsLoggIn = false;
      state.Role = null;
      state.remainingCalls = 0;
      state.ShowPopUp = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CheckLoginThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })

      .addCase(CheckLoginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.IsLoggIn = action.payload?.IsLoggIn;
        state.Role = action.payload?.Role;
        state.remainingCalls = action.payload?.RemainingCalls;
        state.ShowPopUp = action.payload?.ShowPopUp;
        // console.log(
        //   "the role and remaining calls and islogin is ",
        //   state.IsLoggIn,
        //   state.Role,
        //   state.remainingCalls,
        // );
      })

      .addCase(CheckLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;

        state.IsLoggIn = false;
        state.Role = null;
        state.remainingCalls = 0;
      });
  },
});

export const { setRemainingCalls, ResetRemainingCalls, ResetGlobalAuth } =
  GlobalSlice.actions;

export default GlobalSlice.reducer;
