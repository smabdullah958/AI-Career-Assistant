"use client";

import { Provider } from "react-redux";
import { store } from "@/Libraries/store";

import { RegisterServiceWorker } from "@/Libraries/Firebase/RegisterServiceWorker";
import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { useEffect } from "react";

let StoreProvider = ({ children }) => {
  useEffect(() => {
    const setupFirebase = async () => {
      const registration = await RegisterServiceWorker();

      if (registration) {
        await RegisterFCM(registration);
      }
    };

    setupFirebase();
  }, []);

  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default StoreProvider;
