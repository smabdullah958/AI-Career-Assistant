"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AdminMobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  let closeMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };

  return (
    <header className="md:hidden bg-[#618cf9] shadow-lg ">
      {/* Top bar with logo + burger */}
      <div className=" px-6 flex items-center justify-between h-16">
        {/* Logo */}

        <div className="relative w-16 h-20">
          <Image
            loading="lazy"
            src="/logo.avif"
            alt="logo"
            fill
            className="object-contain"
          />
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
              href="/Products"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              href="/About"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/Contact"
              className="text-white hover:text-blue-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminMobileHeader;
