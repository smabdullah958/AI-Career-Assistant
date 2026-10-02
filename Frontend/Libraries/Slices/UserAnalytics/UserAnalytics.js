import { createSlice } from "@reduxjs/toolkit";
import UserAnalyticsThunck from "@/Libraries/Thuncks/UserAnalytics/UserAnalytics";

let initialState = {
  loading: false,
  success: false,
  error: false,
  ActiveUser: null,
  InActiveUser: null,
  TotalUser: null,
  RetentionRate: null,
  NewUser:null,
  UserGrowth:[],
  DeviceType:[],
  UserByCountry: [],
  RetentionRateTrend:[]
};

let UserAnalyticsSlice = createSlice({
  name: "UserAnalyticsSlicies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserAnalyticsThunck.rejected, (state) => {
      state.loading = false,
        state.error = true,
        state.success = false,
        state.ActiveUser=null,
        state.InActiveUser=null,
        state.RetentionRate=null,
        state.TotalUser=null
        state.NewUser=null
        state.UserGrowth=[]
        state.DeviceType=[]
        state.UserByCountry= []
        state.RetentionRateTrend=[]
    });
    builder.addCase(UserAnalyticsThunck.pending, (state) => {
      state.loading = true,
        state.error = false,
        state.response = null,
        state.success = false;
         state.ActiveUser=null,
        state.InActiveUser=null,
        state.RetentionRate=null,
        state.TotalUser=null,
        state.NewUser=null
        state.UserGrowth=[]
        state.DeviceType=[]
        state.UserByCountry= []
                state.RetentionRateTrend=[]


    });
    builder.addCase(UserAnalyticsThunck.fulfilled, (state, action) => {
      state.loading = false,
        state.error = false,
        state.success = true,
        state.ActiveUser = action?.payload?.Active_User; //get active user 
        state.InActiveUser = action?.payload?.In_Active_User; //get In Active User 
         state.RetentionRate = action?.payload?.Retention_Rate; //get Retention Rate 
        state.TotalUser = action?.payload?.Total_User; //get In total User 
        state.NewUser=action?.payload?.New_User  //get new user
        state.UserGrowth=action?.payload?.User_Growth //get guser growth
        state.DeviceType=action?.payload?.Device_Analytics //to get a device type
        state.UserByCountry=action?.payload?.UserBy_Country //to get a user by their country 
              state.RetentionRateTrend=action?.payload?.Retention_Rate_Trend 

    });
  },
});

export default UserAnalyticsSlice.reducer;
