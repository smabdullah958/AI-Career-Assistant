import { createSlice } from "@reduxjs/toolkit";
import LogOutThunck from "@/Libraries/Thuncks/Auth/LogOutThunck";

let initialState={
    loading:false,
    success:false,
    error:false,
}

let LogOutSlice=createSlice({
    name:"logoutslice",
    initialState,
    reducers:{
    ResetLogOutState:(state)=>{
        state.success=false,
        state.error=false,
        state.loading=false
    },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LogOutThunck.pending,(state)=>{
            state.success=false,
            state.loading=true,
            state.error=false
        })
           .addCase(LogOutThunck.rejected,(state)=>{
            state.success=false,
            state.loading=false,
            state.error=true
        }) 
            .addCase(LogOutThunck.fulfilled,(state)=>{
            state.success=true,
            state.loading=false,
            state.error=false
        })}
})

export let {ResetLogOutState}=LogOutSlice.actions;

export default LogOutSlice.reducer