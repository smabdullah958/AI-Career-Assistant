import { createSlice } from "@reduxjs/toolkit";
import GoogleThunck from "@/Libraries/Thuncks/Auth/CreateAccountGoogleThunck";

let initialState = {
  errorMessage: "",
  loading: false,
  success: false,
  error:false,
  Role:null,
};

let GoogleSlice = createSlice({
  name: "signupslice",
  initialState,
  reducers: {
    ResetState: (state) => {
      state.errorMessage = "",
    state.loading = false,
    state.success = false;
    state.error=false;
    },
    ClearRole:(state)=>{
      state.Role=null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(GoogleThunck.fulfilled, (state, action) => {
      state.success = true,
        state.errorMessage = "",
        state.loading = false,
        state.Role=action?.payload?.Role;
      state.error=false
        
      })
    .addCase(GoogleThunck.pending,(state)=>{
        state.success=false,
        state.loading=true,
        state.errorMessage=""
              state.error=false

    })
    .addCase(GoogleThunck.rejected,(state,action)=>{
        state.success=false,
        state.loading=false,
        state.errorMessage=action?.payload
        state.error=true

    })
  },
});


export let {ResetState,ClearRole}=GoogleSlice.actions;
export default GoogleSlice.reducer