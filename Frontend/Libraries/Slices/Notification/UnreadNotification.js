import { createSlice } from "@reduxjs/toolkit";

import GetUnreadNotification from "@/Libraries/Thuncks/Notification/UnreadNotification";

let initialState = {
  UnReadCount: 0,
  loading: false,
  error: false,
};

let UnreadNotification = createSlice({
  name: "UnreadNotification",

  initialState,

  reducers: {
    clearUnreadCount: (state) => {
      state.UnReadCount = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(GetUnreadNotification.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(GetUnreadNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;

      state.UnReadCount = action?.payload?.UnReadCount || 0;
    });

    builder.addCase(GetUnreadNotification.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const { clearUnreadCount } = UnreadNotification.actions;

export default UnreadNotification.reducer;
