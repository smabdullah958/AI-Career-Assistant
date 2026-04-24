import { createSlice } from "@reduxjs/toolkit";
import InterviewThunck from "@/Libraries/Thuncks/Interview/InterviewThunck";

let initialState = {
  loading: false,
  error: false,
  response: null,
  success: false,
  remainingCalls:null
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
    }
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(InterviewThunck.rejected, (state) => {
      state.loading = false,
        state.error = true,
        state.success = false,
        state.response = null;
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
        state.remainingCalls=action?.payload?.remainingCalls;  //get remainning slice
    });
  },
});

export default InterviewSlice.reducer;

export let {ResetInterviewState}=InterviewSlice.actions