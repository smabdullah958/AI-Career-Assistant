import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="bg-[#618cf9] flex flex-col sm:flex-row p-5  justify-around items-center w-full 
    h-[21vh]  sm:h-[14vh] xl:h-32"
    >
      {/* Social Icons */}
      <div className="flex gap-x-8">
        <Link href="https://github.com/smabdullah958" target="_blank">
          <FaGithub
            size={40}
            className="text-white hover:text-black duration-500 transition transform hover:scale-110"
          />
        </Link>

        <Link
          href="https://www.linkedin.com/in/syed-muhammad-abdullah-201a1028a/"
          target="_blank"
        >
          <FaLinkedin
            size={40}
            className="text-white hover:text-blue-900 duration-500 transition transform hover:scale-110"
          />
        </Link>
      </div>
      <div>
        {/* Footer Text */}
        <p className="text-gray-200 mt-5 text-sm">
          © {new Date().getFullYear()} Abdullah | All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
