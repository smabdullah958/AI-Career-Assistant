import { createSlice } from "@reduxjs/toolkit";
import  ResumeThunck from "@/Libraries/Thuncks/Resume/ResumeThunck";

let initialState={
    loading:false,
    success:false,
    error:false,
    response:null,
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
            state.response=action?.payload?.response //get reponse 
        })
    }
})


export let {ResetResume}=ResumeSlice.actions;
export default ResumeSlice.reducer;