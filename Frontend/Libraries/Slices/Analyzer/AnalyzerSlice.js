// // import { createSlice } from "@reduxjs/toolkit";
// // import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

// // let initialState = {
// //   loading: false,
// //   response: null,
// //   error: false,
// //   success: false,
// //   errorMessage: null,
// // };

// // let AnalyzeSlice = createSlice({
// //   name: "AnalyzeSlice",
// //   initialState,
// //   reducers: {
// //     ResetAnalyzer: (state) => {
// //       state.error = false;
// //       state.loading = false;
// //       state.response = null;
// //       state.success = false;
// //       state.errorMessage = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder.addCase(AnalyzerThunck.fulfilled, (state, action) => {
// //       state.loading = false;
// //       state.error = false;
// //       state.success = true;
// //       state.response = action?.payload?.result; //get response
// //     });
// //     builder.addCase(AnalyzerThunck.pending, (state) => {
// //       state.error = false;
// //       state.success = false;
// //       state.loading = true;
// //     });
// //     builder.addCase(AnalyzerThunck.rejected, (state, action) => {
// //       state.error = true;
// //       state.success = false;
// //       state.loading = false;
// //       state.errorMessage = action?.payload?.message; //get errror message from backend
// //     });
// //   },
// // });

// // export default AnalyzeSlice.reducer;
// // export let { ResetAnalyzer } = AnalyzeSlice.actions;

// import { createSlice } from "@reduxjs/toolkit";
// import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

// const initialState = {
//   loading: false,
//   response: null,
//   error: false,
//   success: false,
//   errorMessage: null,
//   streamingText: "",
//   streamingResult: null,
// };

// const AnalyzeSlice = createSlice({
//   name: "AnalyzeSlice",
//   initialState,

//   reducers: {
//     ResetAnalyzer: () => initialState,

//     appendStreamingText: (state, action) => {
//       state.streamingText += action.payload;
//     },
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
//         state.streamingText = "";
//       })

//       .addCase(AnalyzerThunck.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = false;
//         state.success = true;
//         state.response = action.payload.result;
//       })

//       .addCase(AnalyzerThunck.rejected, (state, action) => {
//         state.loading = false;
//         state.error = true;
//         state.success = false;
//         state.errorMessage = action.payload?.message || "plz try again later";
//       });
//   },
// });

// export const { ResetAnalyzer, appendStreamingText, setStreamingResult } =
//   AnalyzeSlice.actions;

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
