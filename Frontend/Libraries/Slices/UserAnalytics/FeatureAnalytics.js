import { createSlice } from "@reduxjs/toolkit";
import FeatureAnalyticsThunck from "@/Libraries/Thuncks/UserAnalytics/FeatureAnalyzerThunck";

let initialState = {
  loading: false,
  success: false,
  error: false,
  Feature_Analytics:{
          Total_API_Calls: 0,
      Total_Resumes: 0,
      Total_Mock_Interviews: 0,
      Total_ATS_Scores: 0,
  },
  Range_Feature_Usage:{
          Total_API_Calls: 0,
      Total_Resumes: 0,
      Total_Mock_Interviews: 0,
      Total_ATS_Scores: 0,

  }
 
};

let FeatureAnalyticsSlice = createSlice({
  name: "FeatureAnalyticsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FeatureAnalyticsThunck.rejected, (state) => {
      state.loading = false,
        state.error = true,
        state.success = false
    });
    builder.addCase(FeatureAnalyticsThunck.pending, (state) => {
      state.loading = true,
        state.error = false,
        state.success = false;
 
    });
    builder.addCase(FeatureAnalyticsThunck.fulfilled, (state, action) => {
      state.loading = false,
        state.error = false,
        state.success = true,
         state.Feature_Analytics = action.payload?.Total_Feature_Usage;
         state.Range_Feature_Usage = action.payload?.Range_Feature_Usage;
    });
  },
});

export default FeatureAnalyticsSlice.reducer;
