import { createSlice } from "@reduxjs/toolkit";
import GoogleThunck from "@/Libraries/Thuncks/Auth/GoogleThunck";

let initialState = {
  errorMessage: "",
  loading: false,
  success: false,
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
         console.log(state.Role)

      })
    .addCase(GoogleThunck.pending,(state)=>{
        state.success=false,
        state.loading=true,
        state.errorMessage=""
    })
    .addCase(GoogleThunck.rejected,(state,action)=>{
        state.success=false,
        state.loading=false,
        state.errorMessage=action?.payload
    })
  },
});


export let {ResetState,ClearRole}=GoogleSlice.actions;
export default GoogleSlice.reducer