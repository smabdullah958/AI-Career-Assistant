import { createSlice } from "@reduxjs/toolkit";
import SignUpThunck from "@/Libraries/Thuncks/Auth/SignUpThunk";


const savedRole = typeof window !== 'undefined' ? localStorage.getItem("UserRole") : null; //mainly we use it so that any one can not use a feature without alogin or signup

const savedUserId  = typeof window !== 'undefined' ? localStorage.getItem("UserID") : null; //mainly we use it so that aI can not mix chat of a multiple user


let initialState = {
  errorMessage: "",
  loading: false,
  success: false,
  Role:savedRole,
  UserId:savedUserId
};


let SignUpSlice = createSlice({
  name: "signupslice",
  initialState,
  reducers: {
    ResetSignUpState: (state) => {
      state.errorMessage = "",
    state.loading = false,
    state.success = false;
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
       
        state.UserId=action?.payload?.UserId
        localStorage.setItem("UserID", action?.payload?.UserID); //  Save UserId ina localstorage

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


export let {ResetSignUpState}=SignUpSlice.actions;
export default SignUpSlice.reducer