"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import GoogleThunk from "@/Libraries/Thuncks/Auth/CreateAccountGoogleThunck";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
const GoogleButton = ({ Provider = "Google" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { errorMessage } = useSelector((state) => state.GoogleSlice);

  const signup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        console.log(data);

        const result = await dispatch(
          GoogleThunk({
            Name: data.name,
            Email: data.email,
            GoogleId: data.sub,
            Provider,
          }),
        );

        if (GoogleThunk.fulfilled.match(result)) {
          router.replace("/");
        }
      } catch (err) {
        console.log(err);
      }
    },

    onError: () => {
      console.log("some thing went wrong");
    },
  });

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="mt-3">
      <button
        onClick={() => signup()}
        className="
    w-full
    mt-3
    flex
    items-center
    justify-center
    gap-3
    rounded-lg
    border
    border-blue-200
    bg-white
    py-3
    text-blue-700
    font-semibold
    shadow-sm
    transition
    duration-300
    hover:bg-blue-50
    hover:border-blue-400
    active:scale-95
  "
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleButton;
