import { createSlice } from "@reduxjs/toolkit";
import LogInThunck from "@/Libraries/Thuncks/Auth/LogInThunck";

let initialState = {
  loading: false,
  errorMessage: "",
  success: false,
  IsLoggIn: false,
  UserRole: null,
};

let LogInSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers: {
    ResetLogInState: (state) => {
      state.errorMessage = null;
      state.loading = false;
      state.success = false;
    },
    //to shwo  the logout button  it mean that whena user is login
    DisplayLogout: (state, action) => {
      console.log("DisplayLogout Payload:", action.payload);
      state.IsLoggIn = action?.payload?.IsLoggIn;
      state.UserRole = action?.payload?.Role;
      console.log(state.IsLoggIn, state.UserRole);
    },
    //to show the login button  it means that when a user is logout
    ResetLogOutRole: (state) => {
      state.IsLoggIn = false;
      state.UserRole = null; //remove ther role when click ona  logout button
      console.log(state.IsLoggIn, state.UserRole);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LogInThunck.pending, (state) => {
        state.errorMessage = null;
        state.loading = true;
        state.success = false;
        console.log("this is a pending state of login thunck");
      })
      .addCase(LogInThunck.rejected, (state, action) => {
        state.errorMessage = action?.payload;
        state.loading = false;
        state.success = false;
        console.log("this is a rejected state of login thunck");
      })
      .addCase(LogInThunck.fulfilled, (state, action) => {
        state.IsLoggIn = action?.payload?.IsLoggIn;
        state.errorMessage = "";
        state.loading = false;
        state.success = true;
        state.UserRole = action?.payload?.Role;
        console.log(
          "this is a fulfilled state of login thunck",
          state.UserRole,
          state.IsLoggIn,
        );
      });
  },
});

export let { ResetLogInState, DisplayLogout, ResetLogOutRole } =
  LogInSlice.actions;
export default LogInSlice.reducer;
