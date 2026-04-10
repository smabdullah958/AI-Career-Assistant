import { createSlice } from "@reduxjs/toolkit";
import  ResumeThunck from "@/Libraries/Thuncks/Resume/ResumeThunck";

let initialState={
    loading:false,
    success:false,
    error:false,
    response:null,
}

let ResumeSlice=createSlice({
    name:"ResumeSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ResumeThunck.rejected,(state)=>{
            state.loading=false,
            state.error=true,
            state.success=false,
            state.response=null
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
            state.response=action?.payload
        })
    }
})


export default ResumeSlice.reducer;