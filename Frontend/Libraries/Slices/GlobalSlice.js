import { createSlice } from "@reduxjs/toolkit";

const RemainingCalls = //stoer teh remaining calls ina  local storage
  typeof window !== "undefined" &&
  localStorage.getItem("AICredits") &&
  Number(localStorage.getItem("AICredits"));

let initialState = {
  remainingCalls: RemainingCalls,
  ShowPopUp: false,
};

let GlobalSlice = createSlice({
  name: "GlobalSLice",
  initialState,
  reducers: {
    //get reamaining calls from a backend
    setRemainingCalls: (state, action) => {
      state.remainingCalls = action?.payload;
      localStorage.setItem("AICredits", action.payload); //store in a local storage when a page is reload or load
      state.ShowPopUp = true;
    },
    ResetRemainingCalls: (state) => {
      localStorage.removeItem("AICredits");
      state.ShowPopUp = false;
    },
  },
});
export default GlobalSlice.reducer;

export let { ResetRemainingCalls, setRemainingCalls } = GlobalSlice.actions;
