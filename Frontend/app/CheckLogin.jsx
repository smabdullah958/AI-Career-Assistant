"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CheckLoginThunk from "@/Libraries/Thuncks/Auth/CheckLoginThunck";
function CheckLogin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const Role = useSelector((state) => state.GlobalSlice.Role);

  // Runs once when the website opens
  useEffect(() => {
    dispatch(CheckLoginThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Role === "Admin" || Role === "SuperAdmin") {
      router.push("/AdminDashboard");
      return;
    }
    router.push("/");
  }, [Role, router]);

  return null;
}

export default CheckLogin;
