import React from "react";
import Link from "next/link";
// import LogIn from "../Buttons/LogIn";
// import LogOut from "../Buttons/LogOut";
import Image from "next/image";
const Header = () => {
  return (
    <header className=" sticky top-0 z-50">
      <div className=" hidden md:flex justify-between items-center md:h-16 bg-[#618cf9] shadow-lg  mx-auto px-3 lg:px-6  h-16 2xl:h-40 ">
        {/* Logo / Brand */}

        <div className="relative size-10 2xl:size-36">
          <Image
            src="/logo.avif"
            alt="logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-lg 2xl:text-4xl font-medium">
          <Link
            href="/"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/Products"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            All Products
          </Link>
          <Link
            href="/About"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/Contact"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            href="/Track"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            Track Order
          </Link>
        </nav>

        {/* <div className="flex gap-2">
          <LogOut />
          <LogIn />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
