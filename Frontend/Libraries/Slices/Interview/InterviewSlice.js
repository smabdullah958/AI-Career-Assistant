import { createSlice } from "@reduxjs/toolkit";
import InterviewThunck from "@/Libraries/Thuncks/Interview/InterviewThunck";

const RemainingCalls = //stoer teh remaining calls ina  local storage
  typeof window !== "undefined" &&
  localStorage.getItem("AICredits") &&
  Number(localStorage.getItem("AICredits"));


let initialState = {
  loading: false,
  error: false,
  response: null,
  success: false,
  remainingCalls:RemainingCalls,
  errorMessage: null,
};

let InterviewSlice = createSlice({
  name: "Interviewslice",
  initialState,
  reducers: {
    ResetInterviewState:(state)=>{
      state.error=false;
        state.loading=false;
        state.response=null;
        state.success=false
        state.errorMessage=null
    }
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(InterviewThunck.rejected, (state,action) => {
      state.loading = false,
        state.error = true,
        state.success = false,
        state.response = null;
        state.errorMessage = action?.payload?.message; //get errror message from backend
         state.remainingCalls = action?.payload?.remainingCalls; //get remaining calls from backend 
    });
    builder.addCase(InterviewThunck.pending, (state) => {
      state.loading = true,
        state.error = false,
        state.response = null,
        state.success = false;
    });
    builder.addCase(InterviewThunck.fulfilled, (state, action) => {
      state.loading = false,
        state.error = false,
        state.success = true,
        state.response = action?.payload?.response; //getresposne
          state.remainingCalls = action?.payload?.remainingCalls; //get remaining calls

          localStorage.setItem("AICredits", action.payload?.remainingCalls); //store in a local storage when a page is reload or load
    });
  },
});

export default InterviewSlice.reducer;

export let {ResetInterviewState}=InterviewSlice.actions