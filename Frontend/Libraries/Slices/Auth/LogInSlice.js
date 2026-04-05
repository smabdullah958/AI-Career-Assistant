import { createSlice } from "@reduxjs/toolkit";
import LogInThunck from "@/Libraries/Thuncks/Auth/LogInThunck";

//   Read or get the role and also islogin from memory IMMEDIATELY when the app starts if these are not  already present than assing the null and also false value
const savedRole = typeof window !== 'undefined' ? localStorage.getItem("Role") : '';
const savedIsLoggedIn=typeof window !== 'undefined' ? localStorage.getItem("IsLoggIn") === "true" : false;
let initialState={

    loading:false,
    errorMessage:"",
    success:false,
    Role:savedRole,
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
        state.Role='',
        state.IsLoggIn=true
          localStorage.removeItem("Role");
        localStorage.setItem("IsLoggIn","true");

    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LogInThunck.pending,(state)=>{
            // state.Role='',
            state.errorMessage='',
            state.loading=true,
            state.success=false
        })
        .addCase(LogInThunck.rejected,(state,action)=>{
            state.Role='',
            state.errorMessage=action?.payload,
            state.loading=false,
            state.success=false
        })
        .addCase(LogInThunck.fulfilled,(state,action)=>{
            state.Role=action?.payload?.Role,
            state.IsLoggIn=action?.payload?.IsLoggIn,
            state.errorMessage='',
            state.loading=false,
            state.success=true,
            //these are useful to keep the role and also the islogin informatio a in a frontend memroy  so that we can shwo and hdie teh button easily on a refresh
            localStorage.setItem("Role",action?.payload?.Role);
            localStorage.setItem("IsLoggIn",action?.payload?.IsLoggIn)
            
        })
    }   
})

export let {ResetLogInState,DisplayLogout,ResetLogOutRole}=LogInSlice.actions;
export default LogInSlice.reducer