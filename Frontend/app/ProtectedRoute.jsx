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

  const loading = useSelector((state) => state.GlobalSlice.loading);

  // Runs once when the website opens
  useEffect(() => {
    dispatch(CheckLoginThunk());
  }, [dispatch]);

  useEffect(() => {
    if (loading || pathname.startsWith("/AdminDashboard")) {
      return;
    }

    if (Role === "Admin" || Role === "SuperAdmin") {
      router.replace("/AdminDashboard");
    }
  }, [Role, loading, pathname, router]);

  return null;
}

export default CheckLogin;
