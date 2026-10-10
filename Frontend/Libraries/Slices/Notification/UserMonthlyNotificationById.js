import { createSlice } from "@reduxjs/toolkit";
import UserMonthlyNotificationByIdThunck from "@/Libraries/Thuncks/Notification/UserMonthlyNotificationByIdThunck";

let initialState = {
  loading: false,
  error: false,
  Monthly_Credit_Analytics: null,
  success: false,
Monthly_Credit_UsageTrend:null,
Success_Failure_Analytics:null
};

let UserMonthlyNotificationById = createSlice({
  name: "UserMonthlyNotificationById",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(UserMonthlyNotificationByIdThunck.rejected, (state) => {
      state.loading = false, state.error = true, state.success = false;
    });
    builder.addCase(UserMonthlyNotificationByIdThunck.pending, (state) => {
      state.loading = true, state.error = false, state.success = false;
    });
    builder.addCase(UserMonthlyNotificationByIdThunck.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
state.Monthly_Credit_Analytics=action?.payload?.Monthly_Credit_Analytics
state.Monthly_Credit_UsageTrend=action?.payload?.Monthly_Credit_Usage_Trend
state.Success_Failure_Analytics=action?.payload?.Success_Failure_Analytics
    })    
}});

export default UserMonthlyNotificationById.reducer;

