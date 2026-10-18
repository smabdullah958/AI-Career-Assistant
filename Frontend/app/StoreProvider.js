"use client";

import { Provider } from "react-redux";
import { store } from "@/Libraries/store";

import { RegisterServiceWorker } from "@/Libraries/Firebase/RegisterServiceWorker";
import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";

import { useEffect } from "react";


const StoreProvider = ({ children }) => {
  useEffect(() => {
    const setupFirebase = async () => {
      try {
        // -------------------------
        // Firebase Analytics
        // -------------------------
        await getFirebaseAnalytics();

        // -------------------------
        // Firebase FCM
        // -------------------------
        const registration = await RegisterServiceWorker();

        if (registration) {
          await RegisterFCM(registration);
        }
      } catch {
        // Firebase setup failed silently to avoid exposing runtime details in the console.
      }
    };

    setupFirebase();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
