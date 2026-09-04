"use client";
import LogIn from "@/Component/Buttons/LoginButton";
import LogOut from "@/Component/Buttons/LogoutButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";

import GetUnreadNotification from "@/Libraries/Thuncks/Notification/UnreadNotification";

import Link from "next/link";
const HeaderWrapper = () => {
  let dispatch = useDispatch();

  let UnReadCount = useSelector(
    (state) => state.UnreadNotification.UnReadCount,
  );

  // Get status from BOTH slices
  const IsLoggIn = useSelector((state) => state.LogInSlice.IsLoggIn); //get role frm
  let IsLoggedIn = useSelector((state) => state.GlobalSlice.Role); //get role from a checklogin
  let UserRole = useSelector((state) => state.LogInSlice.UserRole);

  // console.log("HeaderWrapper IsLoggIn:", IsLoggIn);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    dispatch(GetUnreadNotification());
  }, [dispatch]);

  if (!isClient) return null;

  return (
    <div className="flex gap-5">
      <div className="relative mt-2 hidden md:block">
        <Link href="/Notifcation" className="hidden md:block">
          <IoNotificationsOutline size={24} />

          {UnReadCount > 0 && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </Link>
      </div>
      {IsLoggIn || IsLoggedIn ? <LogOut /> : <LogIn />}
    </div>
  );
};

export default HeaderWrapper;
