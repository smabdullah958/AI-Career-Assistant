"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
const HeroSection = () => {
  //signup role
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  let IsRole = Role === "User" || UserRole === "User";

  return (
    <div>
      <section className="text-center py-10 sm:pt-20 lg:pt-28 px-5 2xl:h-[45vh] content-center  ">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl  md:px-20 font-extrabold text-gray-800">
          Turn your experience into a{" "}
          <span className="text-indigo-600"> professional resume </span> in
          seconds
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Generate resumes, prepare for interviews, and optimize your CV with
          AI.
        </p>
        <div className="mt-6 mb-10 flex justify-center ">
          <Link
            href={IsRole ? "/Resume" : "/SignUp"} //if the user is login  than it will go to resume page otherwise it will go to a signup page
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-indigo-400 shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
