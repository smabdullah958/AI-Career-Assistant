"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import LogInWithGoogleThunck from "@/Libraries/Thuncks/Auth/LogInWithGoogle";

const LoginWithGoogle = ({ Provider = "Google" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { errorMessage } = useSelector((state) => state.LogInWithGoogleSlice);

  // Google Login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user information from Google
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        console.log("Google User:", data);

        // Send data to backend
        const result = await dispatch(
          LogInWithGoogleThunck({
            Email: data.email,
            GoogleId: data.sub,
            Provider,
          }),
        );

        // Redirect if login successful
        if (LogInWithGoogleThunck.fulfilled.match(result)) {
          router.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      console.log("interna error");
    },
  });

  // Show toast if backend returns an error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => login()}
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

export default LoginWithGoogle;
