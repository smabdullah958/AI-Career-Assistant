import CTA from "@/Component/CTA";
import Features from "@/Component/Features";
import HeaderWrapper from "@/Component/HeaderWrapper";
import HowWorks from "@/Component/HowWorks";
import WhyChoose from "@/Component/WhyChoose";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      {/* Login/Logout button — only on mobile, top right */}
      <div className="flex justify-end px-6 py-3 md:hidden">
        <HeaderWrapper />
      </div>
      {/* Home page content */}
      <section className="text-center py-10 sm:pt-20 lg:pt-28 px-5 ">
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
            href="/Resume"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-indigo-400 shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
      <Features />
      <HowWorks />
      <WhyChoose />
      <CTA />
    </div>
  );
}
