import { createSlice } from "@reduxjs/toolkit";
import UserWeeklyNotificationByIdThunck from "@/Libraries/Thuncks/Notification/UserWeeklyNotificationByIdThunck";

let initialState = {
  loading: false,
  error: false,
  Weekly_Credit_Analytics: null,
  success: false,
Weekly_Credit_UsageTrend:null,
Success_Failure_Analytics:null
};

let UserWeeklyNotificationById = createSlice({
  name: "UserWeeklyNotificationByID",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(UserWeeklyNotificationByIdThunck.rejected, (state) => {
      state.loading = false, state.error = true, state.success = false;
    });
    builder.addCase(UserWeeklyNotificationByIdThunck.pending, (state) => {
      state.loading = true, state.error = false, state.success = false;
    });
    builder.addCase(UserWeeklyNotificationByIdThunck.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
state.Weekly_Credit_Analytics=action?.payload?.Weekly_Credit_Analytics
state.Weekly_Credit_UsageTrend=action?.payload?.Weekly_Credit_UsageTrend
state.Success_Failure_Analytics=action?.payload?.Success_Failure_Analytics
    })    
}});

export default UserWeeklyNotificationById.reducer;

