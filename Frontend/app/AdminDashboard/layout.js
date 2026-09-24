"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import AdminSidebar from "@/Component/AdminSidebar/SideBar";
import AdminMobileSidebar from "@/Component/AdminSidebar/AdminMobileHeader";
import HomeLoading from "../loading";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const Role = useSelector((state) => state.GlobalSlice.Role);

  const UserRole = useSelector((state) => state.LogInSlice.UserRole);

  const GooogleRole = useSelector((state) => state.LogInWithGoogleSlice.Role);

  const SignUpRole = useSelector((state) => state.SignUpSlice.Role);

  const GoogleSignUpRole = useSelector((state) => state.GoogleSlice.Role);

  const loading = useSelector((state) => state.GlobalSlice.loading);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (
      Role !== "Admin" &&
      Role !== "SuperAdmin" &&
      UserRole !== "Admin" &&
      UserRole !== "SuperAdmin" &&
      GooogleRole !== "Admin" &&
      GooogleRole !== "SuperAdmin" &&
      SignUpRole !== "Admin" &&
      SignUpRole !== "SuperAdmin" &&
      GoogleSignUpRole !== "Admin" &&
      GoogleSignUpRole !== "SuperAdmin"
    ) {
      router.replace("/");
    }
  }, [
    Role,
    UserRole,
    GooogleRole,
    SignUpRole,
    GoogleSignUpRole,
    loading,
    router,
  ]);

  if (loading) {
    return <HomeLoading />;
  }

  if (
    Role !== "Admin" &&
    Role !== "SuperAdmin" &&
    UserRole !== "Admin" &&
    UserRole !== "SuperAdmin" &&
    GooogleRole !== "Admin" &&
    GooogleRole !== "SuperAdmin" &&
    SignUpRole !== "Admin" &&
    SignUpRole !== "SuperAdmin" &&
    GoogleSignUpRole !== "Admin" &&
    GoogleSignUpRole !== "SuperAdmin"
  ) {
    return <HomeLoading />;
  }

  return (
    <div>
      <AdminSidebar />
      <AdminMobileSidebar />

      <main className="md:ml-64">{children}</main>
    </div>
  );
};

export default AdminLayout;
