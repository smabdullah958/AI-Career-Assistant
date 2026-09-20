"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CheckLoginThunk from "@/Libraries/Thuncks/Auth/CheckLoginThunck";
function CheckLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // check login role
  const Role = useSelector((state) => state.GlobalSlice.Role); //this is to chck from global slice

  //login role
  let UserRole = useSelector((state) => state.LogInSlice.UserRole); //to check the role from a login slice

  let GooogleRole = useSelector((state) => state.LogInWithGoogleSlice.Role); //to get role when a user is logi with a google

  // //signup role
  let SignUpRole = useSelector((state) => state.SignUpSlice.Role); //to get  a role whena  create new account

  let GoogleSignUpRole = useSelector((state) => state.GoogleSlice.Role); //get a role when create account witha  google

  const loading = useSelector((state) => state.GlobalSlice.loading);

  // Runs once when the website opens
  useEffect(() => {
    dispatch(CheckLoginThunk());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      return;
    }
    // Do not redirect while already inside AdminDashboard
    if (pathname.startsWith("/AdminDashboard")) {
      return;
    }

    if (
      Role === "Admin" ||
      Role === "SuperAdmin" ||
      UserRole === "Admin" ||
      UserRole === "SuperAdmin" ||
      GooogleRole === "Admin" ||
      GooogleRole === "SuperAdmin" ||
      SignUpRole === "Admin" ||
      SignUpRole === "SuperAdmin" ||
      GoogleSignUpRole === "Admin" ||
      GoogleSignUpRole === "SuperAdmin"
    ) {
      router.replace("/AdminDashboard");
    } else {
      router.replace("/");
    }
  }, [
    Role,
    UserRole,
    GooogleRole,
    SignUpRole,
    GoogleSignUpRole,
    loading,
    pathname,
    router,
  ]);

  return null;
}

export default CheckLogin;
