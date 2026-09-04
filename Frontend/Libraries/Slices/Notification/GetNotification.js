import { createSlice } from "@reduxjs/toolkit";
import NotificationThunck from "@/Libraries/Thuncks/Notification/GetNotification";

let initialState = {
  loading: false,
  error: false,
  response: [],
  success: false,
  page: 1,
    // This tells us whether Load More should appear
  hasMore: true,

};

let GetNotification = createSlice({
  name: "GetNOTIFICATION",
  initialState,
  reducers: {
    increment(state) {
      state.page += 1;
    },
  },
    extraReducers: (builder) => {
    builder;
    builder.addCase(NotificationThunck.rejected, (state) => {
      state.loading = false,
        state.error = true,
        state.success = false
    });
    builder.addCase(NotificationThunck.pending, (state) => {
      state.loading = true,
        state.error = false,
        state.success = false;
    });
    builder.addCase(NotificationThunck.fulfilled, (state, action) => {
      state.loading = false;
        state.error = false;
        state.success = true;

        //  state.response = action?.payload?.response; //getresposne
        let newNotifications =
          action?.payload?.response || [];

        // If first page
        if (state.page === 1) {
          state.response = newNotifications;
        }

        // If page 2, 3, 4...
        else {
          state.response = [
            ...state.response,
            ...newNotifications,
          ];
        }

        // --------------------------------
        // Decide whether Load More exists
        // --------------------------------

        if (newNotifications.length < 10) {
          // Less than 10 means no more notifications
          state.hasMore = false;
        } else {
          // Exactly 10 means there MAY be more
          state.hasMore = true;
        }
    
    })
    }
});


export default GetNotification.reducer;

export let {increment}=GetNotification.actions