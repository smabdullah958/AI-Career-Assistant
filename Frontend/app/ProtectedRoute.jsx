"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CheckLoginThunk from "@/Libraries/Thuncks/Auth/CheckLoginThunck";
function ProtectedRoute() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false);

  // check login role
  const Role = useSelector((state) => state.GlobalSlice.Role); //this is to chck from global slice

  const loading = useSelector((state) => state.GlobalSlice.loading);

  // Runs once when the website opens
  useEffect(() => {
    dispatch(CheckLoginThunk()).finally(() => setHasCheckedLogin(true));
  }, [dispatch]);

  useEffect(() => {
    if (loading || !hasCheckedLogin) {
      return;
    }

    const isAdmin = Role === "Admin" || Role === "SuperAdmin";
    const isAdminRoute = pathname.startsWith("/AdminDashboard");

    if (isAdminRoute && !isAdmin) {
      router.replace("/");
      return;
    }

    if (!isAdminRoute && isAdmin) {
      router.replace("/AdminDashboard");
    }
  }, [Role, hasCheckedLogin, loading, pathname, router]);

  return null;
}

export default ProtectedRoute;
