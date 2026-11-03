

import { createAsyncThunk } from "@reduxjs/toolkit";
import { parse as parsePartialJson } from "partial-json";
import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";
import { setRemainingCalls } from "@/Libraries/Slices/GlobalSlice";
import { setStreamingResult } from "@/Libraries/Slices/Analyzer/AnalyzerSlice";
import { logEvent } from "firebase/analytics";

const url = process.env.NEXT_PUBLIC_BackendURL;
const analytics = await getFirebaseAnalytics();

const AnalyzerThunck = createAsyncThunk(
  "Analyzerthunck",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${url}/ResumeAnalyzer/Analyzer`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        let errorData = {};

        try {
          errorData = await response.json();
        } catch {
          errorData = { message: "plz try again later" };
        }

        dispatch(setRemainingCalls(errorData?.remainingCalls));

        throw Object.assign(
          new Error(errorData?.message || "plz try again later"),
          { apiData: errorData },
        );
      }

      if (!response.body) {
        throw new Error("plz try again later");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let rawResponse = "";
      let completedResponse = null;

      // Parse accumulated JSON without showing the raw text to the user.
      const updateStreamingResult = (chunk) => {
        rawResponse += chunk;

        let cleanedResponse = rawResponse.trimStart();

        // Support models that wrap JSON in Markdown code fences.
        cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*/i, "");

        // Ignore any text before the start of the JSON object.
        const jsonStart = cleanedResponse.indexOf("{");

        if (jsonStart === -1) {
          return;
        }

        cleanedResponse = cleanedResponse.slice(jsonStart);

        try {
          const parsed = parsePartialJson(cleanedResponse);

          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            dispatch(setStreamingResult(parsed));
          }
        } catch {
          // Incomplete JSON is normal during streaming.
          // Keep the last successfully parsed result and retry
          // when the next chunk arrives.
        }
      };

      const processEvent = (eventBlock) => {
        let eventName = "";
        let eventData = "";

        for (const line of eventBlock.split(/\r?\n/)) {
          if (line.startsWith("event:")) {
            eventName = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            eventData += line.slice(5).trim();
          }
        }

        if (!eventName || !eventData) {
          return;
        }

        const payload = JSON.parse(eventData);

        if (eventName === "chunk") {
          updateStreamingResult(payload.chunk);
        }

        if (eventName === "complete") {
          completedResponse = payload;

          dispatch(setRemainingCalls(payload?.remainingCalls));

          // Keep existing Firebase event names and parameters.
          if (analytics) {
            logEvent(analytics, "ats_score_generated");

            logEvent(analytics, "api_call", {
              feature: "ats_analyzer",
              credit_used: 1,
              status: "success",
            });
          }
        }

        if (eventName === "error") {
          throw new Error(payload?.message || "plz try again later");
        }
      };

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() || "";

        for (const eventBlock of events) {
          processEvent(eventBlock);
        }
      }

      buffer += decoder.decode();

      if (buffer.trim()) {
        processEvent(buffer);
      }

      if (!completedResponse) {
        throw new Error("plz try again later");
      }

      return completedResponse;
    } catch (error) {
      dispatch(setRemainingCalls(error?.apiData?.remainingCalls));

      if (analytics) {
        logEvent(analytics, "api_call", {
          feature: "ats_analyzer",
          status: "failed",
        });
      }

      return rejectWithValue(
        error?.apiData || {
          message: error?.message || "plz try again later",
        },
      );
    }
  },
);

export default AnalyzerThunck;
