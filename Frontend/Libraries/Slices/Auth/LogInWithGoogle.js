import { createSlice } from "@reduxjs/toolkit";
import LogInWithGoogleThunck from "@/Libraries/Thuncks/Auth/LogInWithGoogle";

let initialState = {
  errorMessage: "",
  loading: false,
  success: false,
  error:false,
  Role:null,
};

let LogInWithGoogleSlice = createSlice({
  name: "signupslice",
  initialState,
  reducers: {
    ResetState: (state) => {
      state.errorMessage = "",
    state.loading = false,
    state.success = false;
    state.error=false;
    },
    ClearUserRole:(state)=>{
      state.Role=null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(LogInWithGoogleThunck.fulfilled, (state, action) => {
      state.success = true,
        state.errorMessage = "",
        state.loading = false,
        state.Role=action?.payload?.Role;
      state.error=false
        
      })
    .addCase(LogInWithGoogleThunck.pending,(state)=>{
        state.success=false,
        state.loading=true,
        state.errorMessage=""
              state.error=false

    })
    .addCase(LogInWithGoogleThunck.rejected,(state,action)=>{
        state.success=false,
        state.loading=false,
        state.errorMessage=action?.payload
        state.error=true

    })
  },
});


export let {ResetState,ClearUserRole}=LogInWithGoogleSlice.actions;
export default LogInWithGoogleSlice.reducer