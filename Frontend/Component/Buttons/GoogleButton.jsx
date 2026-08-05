"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import GoogleThunk from "@/Libraries/Thuncks/Auth/GoogleThunck";

const GoogleButton = ({ Provider = "Google" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const GoogleSuccess = async (credentialResponse) => {
    try {
      const user = jwtDecode(credentialResponse.credential);
      console.log("decode the google id", user);
      const result = await dispatch(
        GoogleThunk({
          Name: user.name,
          Email: user.email,
          GoogleId: user.sub,
          Provider,
        }),
      );

      if (GoogleThunk.fulfilled.match(result)) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3">
      <GoogleLogin
        theme="outline"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
        onSuccess={GoogleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
};

export default GoogleButton;
