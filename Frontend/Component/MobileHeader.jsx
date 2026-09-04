"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
import GetUnreadNotification from "@/Libraries/Thuncks/Notification/UnreadNotification";
import { useDispatch, useSelector } from "react-redux";
const MobileHeader = () => {
  let dispatch = useDispatch();

  let UnReadCount = useSelector(
    (state) => state.UnreadNotification.UnReadCount,
  );

  const [showMenu, setShowMenu] = useState(false);

  let closeMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };

  useEffect(() => {
    dispatch(GetUnreadNotification());
  }, [dispatch]);

  return (
    <header className="md:hidden bg-[#618cf9] shadow-lg ">
      {/* Top bar with logo + burger */}
      <div className=" px-6 flex items-center justify-between h-16">
        {/* Logo */}

        <div className="relative w-16 h-20">
          <Image
            loading="lazy"
            src="/logo.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex gap-5">
          <div className="relative mt-2 md:hidden block">
            <Link href="/Notifcation" className="md:hidden block">
              <IoNotificationsOutline size={24} />

              {UnReadCount > 0 && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
              )}
            </Link>
          </div>

          {/* Burger button */}
          {showMenu ? (
            //CROSS ICON
            <span className="mr-5">
              <button onClick={() => setShowMenu(false)}>
                <span className="absolute w-6 h-[2px] bg-white rotate-45 "></span>
                <span className="absolute w-6 h-[2px] bg-white -rotate-45"></span>
              </button>
            </span>
          ) : (
            <button
              onClick={() => setShowMenu(true)}
              className="focus:outline-none"
            >
              <Image
                src="/burger.webp"
                alt="menu"
                width={30}
                height={30}
                loading="lazy"
              />
            </button>
          )}
        </div>
      </div>
      {/* Slide-down menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-[#618cf9] shadow-md z-50 animate-slideDown ">
          <nav className="flex flex-col justify-center items-center gap-4 p-6 text-lg font-medium">
            <Link
              href="/"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/Resume"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Resume
            </Link>
            <Link
              href="/ATS_Analyzer"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              ATS Analyzer
            </Link>
            <Link
              href="Interview"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Interview Questions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;
