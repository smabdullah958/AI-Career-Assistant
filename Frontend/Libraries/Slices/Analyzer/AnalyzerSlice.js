import { createSlice } from "@reduxjs/toolkit";
import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

const RemainingCalls =
  typeof window !== "undefined" &&
  localStorage.getItem("AICredits") &&
  Number(localStorage.getItem("AICredits"));

let initialState = {
  loading: false,
  response: null,
  error: false,
  success: false,
  remainingCalls: RemainingCalls,
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AnalyzerThunck.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.response = action?.payload?.result; //get response
      state.remainingCalls = action?.payload?.remainingCalls; //get remaining calls

      localStorage.setItem("AICredits", action.payload?.remainingCalls); //store in a local storage when a page is reload or load
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
      state.errorMessage = action?.payload?.message; //get errror message
      state.remainingCalls = action?.payload?.remainingCalls; //get remaining calls
    });
  },
});

export default AnalyzeSlice.reducer;
export let { ResetAnalyzer } = AnalyzeSlice.actions;
