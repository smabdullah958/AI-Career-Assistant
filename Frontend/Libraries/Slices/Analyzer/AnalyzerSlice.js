import { createSlice } from "@reduxjs/toolkit";
import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

let initialState = {
  loading: false,
  response: null,
  error: false,
  success: false,
  errorMessage: null,
};

let AnalyzeSlice = createSlice({
  name: "AnalyzeSlice",
  initialState,
  reducers: {
    ResetAnalyzer: (state) => {
      state.error = false;
      state.loading = false;
      state.response = null;
      state.success = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AnalyzerThunck.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.response = action?.payload?.result; //get response
    });
    builder.addCase(AnalyzerThunck.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(AnalyzerThunck.rejected, (state, action) => {
      state.error = true;
      state.success = false;
      state.loading = false;
      state.errorMessage = action?.payload?.message; //get errror message from backend
    });
  },
});

export default AnalyzeSlice.reducer;
export let { ResetAnalyzer } = AnalyzeSlice.actions;
