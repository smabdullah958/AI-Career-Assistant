import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderWrapper from "./HeaderWrapper";
const Header = () => {
  return (
    <header className=" sticky top-0 z-50">
      <div className=" hidden md:flex justify-between items-center md:h-16 bg-[#618cf9] shadow-lg  mx-auto px-3 lg:px-6  h-16 2xl:h-40 ">
        {/* Logo / Brand */}
        <div className="relative size-10 2xl:size-36">
          <Image
            loading="lazy"
            src="/logo.png"
            alt="logo"
            fill
            className="object-contain"
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
            href="/Resume"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            Resume
          </Link>
          <Link
            href="/ATS_Analyzer"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            Resume Analyzer
          </Link>
          <Link
            href="/Interview"
            className="text-white hover:text-blue-700 transition-colors duration-300"
          >
            Interview Questions
          </Link>
        </nav>
        <HeaderWrapper />
      </div>
    </header>
  );
};

export default Header;
