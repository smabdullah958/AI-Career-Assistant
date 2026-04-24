import { createSlice } from "@reduxjs/toolkit";
import  ResumeThunck from "@/Libraries/Thuncks/Resume/ResumeThunck";

const RemainingCalls = //stoer teh remaining calls ina  local storage
  typeof window !== "undefined" &&
  localStorage.getItem("AICredits") &&
  Number(localStorage.getItem("AICredits"));


let initialState={
    loading:false,
    success:false,
    error:false,
    response:null,
    remainingCalls:RemainingCalls,
  errorMessage: null,

}

let ResumeSlice=createSlice({
    name:"ResumeSlice",
    initialState,
    reducers:{
        ResetResume:(state)=>{
                state.error=false;
                state.loading=false;
                state.response=null;
                state.success=false;
                state.errorMessage=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(ResumeThunck.rejected,(state,action)=>{
            state.loading=false,
            state.error=true,
            state.success=false,
            state.response=null,
            state.errorMessage = action?.payload?.message; //get errror message from backend
            state.remainingCalls = action?.payload?.remainingCalls; //get remaining calls from backend 

        })
        builder.addCase(ResumeThunck.pending,(state)=>{
            state.loading=true,
            state.error=false,
            state.response=null,
            state.success=false
        })
        builder.addCase(ResumeThunck.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=false,
            state.success=true,
            state.response=action?.payload?.response,  //get reponse
              state.remainingCalls = action?.payload?.remainingCalls; //get remaining calls

            localStorage.setItem("AICredits", action.payload?.remainingCalls); //store in a local storage when a page is reload or load
 
        })
    }
})


export let {ResetResume}=ResumeSlice.actions;
export default ResumeSlice.reducer;