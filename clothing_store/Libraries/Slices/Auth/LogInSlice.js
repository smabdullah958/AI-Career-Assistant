import { createSlice } from "@reduxjs/toolkit";
import LogInThunck from "@/Libraries/Thuncks/Auth/LogInThunck";


let initialState={
    loading:false,
    errorMessage:"",
    success:false,
    Role:''
}

let LogInSlice=createSlice({
    name:"LoginSlice",
    initialState,
    reducers:{
        ResetLogInState: (state) => {
      state.errorMessage = "",
    state.loading = false,
    state.success = false;
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LogInThunck.pending,(state)=>{
            state.Role='',
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
            state.Role=action?.payload,
            state.errorMessage='',
            state.loading=false,
            state.success=true

        })
    }   
})

export let {ResetLogInState}=LogInSlice.actions;
export default LogInSlice.reducer