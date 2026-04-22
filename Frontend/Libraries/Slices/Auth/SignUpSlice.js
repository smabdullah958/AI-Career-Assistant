import { createSlice } from "@reduxjs/toolkit";
import SignUpThunck from "@/Libraries/Thuncks/Auth/SignUpThunk";

const savedRole = typeof window !== 'undefined' ? localStorage.getItem("UserRole") : null; //mainly we use it so that any one can not use a feature without alogin or signup

let initialState = {
  errorMessage: "",
  loading: false,
  success: false,
  Role:savedRole,
};


let SignUpSlice = createSlice({
  name: "signupslice",
  initialState,
  reducers: {
    ResetSignUpState: (state) => {
      state.errorMessage = "",
    state.loading = false,
    state.success = false;
    },
    ClearSignUpRole:(state)=>{
      state.Role=null;
    localStorage.removeItem("UserRole"); 
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(SignUpThunck.fulfilled, (state, action) => {
      state.success = true,
        state.errorMessage = "",
        state.loading = false,
        state.Role=action?.payload?.Role
        localStorage.setItem("UserRole", action?.payload?.Role); //  Save role ina localstorage

      })
    .addCase(SignUpThunck.pending,(state)=>{
        state.success=false,
        state.loading=true,
        state.errorMessage=""
    })
    .addCase(SignUpThunck.rejected,(state,action)=>{
        state.success=false,
        state.loading=false,
        state.errorMessage=action?.payload
    })
  },
});


export let {ResetSignUpState,ClearSignUpRole}=SignUpSlice.actions;
export default SignUpSlice.reducer