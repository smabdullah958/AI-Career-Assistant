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
  ShowPopUp:false
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
    },
//get reamaining calls from a backend
    setRemainingCalls:(state,action)=>{
      state.remainingCalls=action?.payload
          localStorage.setItem("AICredits", action.payload); //store in a local storage when a page is reload or load
      state.ShowPopUp=true
    },
    ResetRemainingCalls:(state)=>{
      localStorage.removeItem("AICredits")
      state.ShowPopUp=false
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
    });
  },
});

export default InterviewSlice.reducer;

export let {ResetInterviewState,setRemainingCalls,ResetRemainingCalls}=InterviewSlice.actions