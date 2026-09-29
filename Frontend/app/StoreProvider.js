"use client";

import { Provider } from "react-redux";
import { store } from "@/Libraries/store";

import { RegisterServiceWorker } from "@/Libraries/Firebase/RegisterServiceWorker";
import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";

import { useEffect } from "react";
import { logEvent } from "firebase/analytics";

const StoreProvider = ({ children }) => {
  useEffect(() => {
    const setupFirebase = async () => {
      try {
        // -------------------------
        // Firebase Analytics
        // -------------------------
        const analytics = await getFirebaseAnalytics();

        if (analytics) {
          console.log("Firebase Analytics initialized");

          logEvent(analytics, "test_analytics_event");

          console.log("Test Analytics event sent");
        } else {
          console.log("Firebase Analytics is not supported");
        }

        // -------------------------
        // Firebase FCM
        // -------------------------
        const registration = await RegisterServiceWorker();

        if (registration) {
          await RegisterFCM(registration);
        }
      } catch (error) {
        console.error("Firebase setup error:", error);
      }
    };

    setupFirebase();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
