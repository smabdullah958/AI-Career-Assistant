"use client";
import LogIn from "@/Component/Buttons/LoginButton";
import LogOut from "@/Component/Buttons/LogoutButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
const HeaderWrapper = () => {
  // Get status from BOTH slices
  const IsLoggIn = useSelector((state) => state.LogInSlice.IsLoggIn); //get role frm
  let IsLoggedIn = useSelector((state) => state.GlobalSlice.Role); //get role from a checklogin
  // console.log("HeaderWrapper IsLoggIn:", IsLoggIn);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex gap-5">
      <Link href="/Notifcation">
        <IoNotificationsOutline size={24} className="mt-2 hidden md:block" />
      </Link>
      {IsLoggIn || IsLoggedIn ? <LogOut /> : <LogIn />}
    </div>
  );
};

export default HeaderWrapper;
