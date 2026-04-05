"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ResetLogOutState } from "@/Libraries/Slices/Auth/LogOutSlice";
import LogOutThunck from "@/Libraries/Thuncks/Auth/LogOutThunck";
import { ResetLogOutRole } from "@/Libraries/Slices/Auth/LogInSlice"; //to shwo  the login buutton
const LogoutButton = () => {
  let dispatch = useDispatch();
  let router = useRouter();

  let { success, loading } = useSelector((state) => state.LogOutSlice); //LogOutSlice is come from a store

  useEffect(() => {
    if (success) {
      // so here we can reset the role and also islogin so that it show a login button
      router.push("/");
      dispatch(ResetLogOutRole()); //to show the login button
      dispatch(ResetLogOutState());
    }
  }, [success]);

  let LogOutFunction = async (Data) => {
    let res = await dispatch(LogOutThunck(Data));
    console.log(res);
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={LogOutFunction}
        className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ${
          loading
            ? "bg-blue-400 opacity-50 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
        }}`}
      >
        Logout{" "}
      </button>
    </div>
  );
};

export default LogoutButton;
