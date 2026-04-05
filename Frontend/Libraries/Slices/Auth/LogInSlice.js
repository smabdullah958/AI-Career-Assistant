import { createSlice } from "@reduxjs/toolkit";
import LogInThunck from "@/Libraries/Thuncks/Auth/LogInThunck";

const savedIsLoggedIn=typeof window !== 'undefined' ? localStorage.getItem("IsLoggIn") === "true" : false;
let initialState={

    loading:false,
    errorMessage:"",
    success:false,
    IsLoggIn:savedIsLoggedIn
}

let LogInSlice=createSlice({
    name:"LoginSlice",
    initialState,
    reducers:{
        ResetLogInState: (state) => {
      state.errorMessage = "",
    state.loading = false,
    state.success = false;
    },
    //to shwo  the logout button 
    DisplayLogout:(state)=>{
        state.IsLoggIn=false
        localStorage.setItem("IsLoggIn","false");

    },
    //to show the login button 
    ResetLogOutRole:(state)=>{
        state.IsLoggIn=true
        localStorage.setItem("IsLoggIn","true");

    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LogInThunck.pending,(state)=>{
            state.errorMessage='',
            state.loading=true,
            state.success=false
        })
        .addCase(LogInThunck.rejected,(state,action)=>{
            state.errorMessage=action?.payload,
            state.loading=false,
            state.success=false
        })
        .addCase(LogInThunck.fulfilled,(state,action)=>{
            state.IsLoggIn=action?.payload?.IsLoggIn,
            state.errorMessage='',
            state.loading=false,
            state.success=true,
            localStorage.setItem("IsLoggIn",action?.payload?.IsLoggIn)            
        })
    }   
})

export let {ResetLogInState,DisplayLogout,ResetLogOutRole}=LogInSlice.actions;
export default LogInSlice.reducer