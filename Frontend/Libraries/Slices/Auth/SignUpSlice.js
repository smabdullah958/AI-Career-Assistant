import { createSlice } from "@reduxjs/toolkit";
import SignUpThunck from "@/Libraries/Thuncks/Auth/SignUpThunk";

//   Read or get the role and also islogin from memory IMMEDIATELY when the app starts if these are not  already present than assing the null and also false value
const savedRole = typeof window !== 'undefined' ? localStorage.getItem("Role") : '';

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
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(SignUpThunck.fulfilled, (state, action) => {
      state.success = true,
        state.errorMessage = "",
        state.loading = false,
            state.Role=action?.payload?.Role,
            localStorage.setItem("Role",action.payload.Role);
      })
    .addCase(SignUpThunck.pending,(state)=>{
        state.success=false,
        state.loading=true,
        state.Role="",
        state.errorMessage=""
    })
    .addCase(SignUpThunck.rejected,(state,action)=>{
        state.success=false,
        state.loading=false,
        state.Role='',
        state.errorMessage=action?.payload
    })
  },
});


export let {ResetSignUpState}=SignUpSlice.actions;
export default SignUpSlice.reducer