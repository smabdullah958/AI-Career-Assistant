// import { createSlice } from "@reduxjs/toolkit";
// import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

// const initialState = {
//   loading: false,
//   response: null,
//   streamingResult: null,
//   error: false,
//   success: false,
//   errorMessage: null,
// };

// const AnalyzeSlice = createSlice({
//   name: "AnalyzeSlice",
//   initialState,

//   reducers: {
//     ResetAnalyzer: () => ({ ...initialState }),

//     setStreamingResult: (state, action) => {
//       state.streamingResult = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(AnalyzerThunck.pending, (state) => {
//         state.loading = true;
//         state.error = false;
//         state.success = false;
//         state.errorMessage = null;
//         state.response = null;
//         state.streamingResult = null;
//       })

//       .addCase(AnalyzerThunck.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = false;
//         state.success = true;
//         state.response = action.payload.result;
//         state.streamingResult = null;
//       })

//       .addCase(AnalyzerThunck.rejected, (state, action) => {
//         state.loading = false;
//         state.error = true;
//         state.success = false;
//         state.errorMessage =
//           action.payload?.message || "Resume analysis failed.";
//         state.streamingResult = null;
//       });
//   },
// });

// export const { ResetAnalyzer, setStreamingResult } = AnalyzeSlice.actions;

// export default AnalyzeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

const initialState = {
  loading: false,
  response: null,
  streamingResult: null,
  error: false,
  success: false,
  errorMessage: null,
};

const AnalyzeSlice = createSlice({
  name: "AnalyzeSlice",
  initialState,

  reducers: {
    ResetAnalyzer: () => ({ ...initialState }),

    setStreamingResult: (state, action) => {
      state.streamingResult = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AnalyzerThunck.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.errorMessage = null;
        state.response = null;
        state.streamingResult = null;
      })

      .addCase(AnalyzerThunck.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.response = action.payload.result;
        state.streamingResult = null;
      })

      .addCase(AnalyzerThunck.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.errorMessage =
          action.payload?.message || "Resume analysis failed.";
        state.streamingResult = null;
      });
  },
});

export const { ResetAnalyzer, setStreamingResult } = AnalyzeSlice.actions;

export default AnalyzeSlice.reducer;
