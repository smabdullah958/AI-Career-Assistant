"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AdminMobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };

  return (
    <header className="md:hidden bg-[#618cf9] shadow-lg">
      {/* Top bar with logo + burger */}
      <div className="px-6 flex items-center justify-between h-16">
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

        {/* Burger / Cross */}
        {showMenu ? (
          <span className="mr-5">
            <button
              onClick={() => setShowMenu(false)}
              className="relative w-6 h-6"
            >
              <span className="absolute left-0 top-3 w-6 h-[2px] bg-white rotate-45" />
              <span className="absolute left-0 top-3 w-6 h-[2px] bg-white -rotate-45" />
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

      {/* Admin Slide-down Menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-[#618cf9] shadow-md z-50 animate-slideDown">
          <nav className="flex flex-col justify-center items-center gap-4 p-6 text-lg font-medium">
            <Link
              href="/AdminDashboard"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              href="/AdminDashboard/About"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              href="/AdminDashboard/Contact"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Contact
            </Link>

            <Link
              href="/AdminDashboard/FAQ"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              FAQ
            </Link>
            <Link
              href="/AdminDashboard/Notification"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Notification
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminMobileHeader;
