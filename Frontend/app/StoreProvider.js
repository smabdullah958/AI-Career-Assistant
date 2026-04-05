"use client";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/Libraries/store";

let StoreProvider = ({ children }) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};
export default StoreProvider;
