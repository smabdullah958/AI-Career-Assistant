import { createSlice } from "@reduxjs/toolkit";
import AIUsageThunck from "@/Libraries/Thuncks/UserAnalytics/AIUsageThunck";

let initialState = {
  loading: false,
  success: false,
  error: false,
  Total_AI_Calls:{
          Total_Credits: 0,
      Credits_Consumed: 0,
      Credits_Wasted: 0,
      Average_Credits_Per_Feature: 0,
  },  
  AI_Calls_By_Feature:{
              Total_API_Calls: 0,
      Total_Resumes: 0,
      Total_Mock_Interviews: 0,
      Total_ATS_Scores: 0,
  },
  AI_Calls_Trend: [],
  Success_Ratio:{
    Success_Ratio:0,
    Failure_Ratio:0
  }

};

let AIUsageSlice = createSlice({
  name: "FeatureAnalyticsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AIUsageThunck.rejected, (state) => {
      state.loading = false,
        state.error = true,
        state.success = false
    });
    builder.addCase(AIUsageThunck.pending, (state) => {
      state.loading = true,
        state.error = false,
        state.success = false;
 
    });
    builder.addCase(AIUsageThunck.fulfilled, (state, action) => {
      state.loading = false,
        state.error = false,
        state.success = true,
        state.Total_AI_Calls=action?.payload?.Total_AI_Calls,
        state.AI_Calls_By_Feature=action?.payload?.AI_Calls_By_Feature,
        state.AI_Calls_Trend=action?.payload?.AI_Calls_Trend,
        state.Success_Ratio=action?.payload?.Success_Ratio
        });
  },
});

export default AIUsageSlice.reducer;
