"use client";
import { Provider } from "react-redux";
import { store } from "@/Libraries/store";
// import { useEffect } from "react";

import { RegisterFCM } from "@/Libraries/Firebase/RegisterFCM";
import { useEffect } from "react";

let StoreProvider = ({ children }) => { 
  useEffect(() => {
    RegisterFCM();
  }, []);

  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};
export default StoreProvider;
