"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

import LogInWithGoogleThunck from "@/Libraries/Thuncks/Auth/LogInWithGoogle";

const LoginWithGoogle = ({ Provider = "Google" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { errorMessage } = useSelector((state) => state.LogInWithGoogleSlice);

  const GoogleSuccess = async (credentialResponse) => {
    try {
      const user = jwtDecode(credentialResponse.credential);

      console.log(user);

      const result = await dispatch(
        LogInWithGoogleThunck({
          Email: user.email,
          GoogleId: user.sub,
          Provider,
        }),
      );

      if (LogInWithGoogleThunck.fulfilled.match(result)) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="mt-3">
      <GoogleLogin
        theme="outline"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
        onSuccess={GoogleSuccess}
        onError={() => toast.error("Google Login Failed")}
      />
    </div>
  );
};

export default LoginWithGoogle;
