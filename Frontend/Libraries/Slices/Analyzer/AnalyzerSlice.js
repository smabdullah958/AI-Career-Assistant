import { createSlice } from "@reduxjs/toolkit";
import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

let initialState = {
  loading: false,
  response: null,
  error: false,
  success: false,
};

let AnalyzeSlice = createSlice({
  name: "AnalyzeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AnalyzerThunck.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.response = action?.payload;
    });
    builder.addCase(AnalyzerThunck.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(AnalyzerThunck.rejected, (state) => {
      state.error = true;
      state.success = false;
      state.loading = false;
    });
  },
});

export default AnalyzeSlice.reducer;
