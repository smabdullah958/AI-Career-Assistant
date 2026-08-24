"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

//remaining api calls per day
import RemainingAPICalls from "@/Features/RemainingAPICalls";

import {
  FaArrowRight,
  FaCheckCircle,
  FaFileAlt,
  FaMagic,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const templates = [
  {
    id: 1,
    name: "Classical Resume",
    image: "/classicalCV.png",
    description: "Clean and traditional layout for a professional appearance.",
    slug: "classical-cv",
  },
  {
    id: 2,
    name: "Modern CV",
    image: "/modernCV.png",
    description: "A modern and balanced design for today's job market.",
    slug: "modern-cv",
  },
  {
    id: 3,
    name: "Optimized CV",
    image: "/optimizedCV.png",
    description: "Structured specifically for ATS-friendly applications.",
    slug: "optimized-cv",
  },
  {
    id: 4,
    name: "Elegant CV",
    image: "/elegantCV.png",
    description: "Minimal and elegant design with a professional appearance.",
    slug: "elegant-cv",
  },
  {
    id: 5,
    name: "Bold CV",
    image: "/boldCV.png",
    description: "A confident layout designed to highlight your strengths.",
    slug: "bold-cv",
  },
  {
    id: 6,
    name: "Professional CV",
    image: "/professionalCV.png",
    description: "A polished layout suitable for corporate applications.",
    slug: "professional-cv",
  },
];

export default function Resume() {
  const router = useRouter();

  const handleTemplateClick = (slug) => {
    router.push(`/Resume/${slug}`);
  };

  //these are used to ceck that if a user is login or signup  if user is login than it will show ther remaining number of a api calls
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  //  let role = useSelector((state) => state.GlobalSlice.Role); //get role froma gloabl slice and also it run when we can open  website or  reload a website

  let {
    remainingCalls,
    ShowPopUp,
    success,
    Role: role,
  } = useSelector((state) => state.GlobalSlice);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {(Role === "User" || UserRole === "User" || role === "User") &&
        (success || //here the Successs is come from a global slice it is run wehna  user is reload a webite
          remainingCalls === 0 ||
          //show popups is also use to show the popup when thre remaining calls is greater than a 0 brother
          ShowPopUp === true) && (
          <RemainingAPICalls remaining={remainingCalls} />
        )}

      {/* ================= HEADER ================= */}
      <section className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-5">
              <FaFileAlt className="text-gray-500" />
              <span>Professional Resume Builder</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Choose Your Resume
            </h1>

            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-500">
              Template
            </h2>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-7 text-gray-500 max-w-2xl mx-auto">
              Choose from professionally designed, ATS-friendly templates and
              create a resume that helps you stand out to recruiters.
            </p>

            {/* Features */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-gray-400" />
                ATS Friendly
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-gray-400" />
                Professional Design
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-gray-400" />
                Easy to Customize
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEMPLATE SECTION ================= */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                <FaMagic />
                <span>Resume Templates</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Select a template
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Start with a design and customize it with your information.
              </p>
            </div>

            <div className="text-sm text-gray-400">
              {templates.length} templates available
            </div>
          </div>

          {/* ================= GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {templates.map((resume) => (
              <div
                key={resume.id}
                onClick={() => handleTemplateClick(resume.slug)}
                className="
                  group
                  cursor-pointer
                  flex
                  flex-col
                  h-full
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* ================= IMAGE ================= */}
                <div
                  className="
                    relative
                    w-full
                    h-[420px]
                    sm:h-[450px]
                    lg:h-[460px]
                    bg-gray-100
                    overflow-hidden
                  "
                >
                  {/* ATS Badge */}
                  <div
                    className="
                      absolute
                      top-4
                      left-4
                      z-10
                      flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-white/95
                      backdrop-blur-sm
                      border
                      border-gray-200
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-gray-600
                      shadow-sm
                    "
                  >
                    <FaCheckCircle className="text-gray-400" />
                    ATS Friendly
                  </div>

                  {/* Resume Image */}
                  <div className="w-full h-full overflow-hidden">
                    <Image
                      src={resume.image}
                      alt={resume.name}
                      width={600}
                      height={850}
                      priority={resume.id <= 3}
                      className="
                        w-full
                        h-full
                        object-contain
                        object-top
                        bg-gray-100
                        transition-transform
                        duration-500
                        group-hover:scale-[1.03]
                      "
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/5
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                  />
                </div>

                {/* ================= CARD CONTENT ================= */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Name + Arrow */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 capitalize">
                        {resume.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {resume.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className="
                        shrink-0
                        w-9
                        h-9
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-500
                        group-hover:bg-gray-200
                        transition-colors
                        duration-300
                      "
                    >
                      <FaArrowRight
                        className="
                          text-sm
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                        "
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-5" />

                  {/* Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateClick(resume.slug);
                    }}
                    className="
                      mt-auto
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-gray-300
                      bg-gray-900
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-gray-800
                      active:scale-[0.98]
                    "
                  >
                    <span className="hover:cursor-pointer">
                      Use This Template
                    </span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= BOTTOM INFO ================= */}
          <div className="mt-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left */}
                <div className="flex items-start gap-4">
                  <div
                    className="
                      shrink-0
                      w-11
                      h-11
                      rounded-xl
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                      text-gray-600
                    "
                  >
                    <FaMagic />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Not sure which template to choose?
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 max-w-xl">
                      All templates are designed to keep your information
                      readable, organized, and suitable for Applicant Tracking
                      Systems.
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 whitespace-nowrap">
                  <FaCheckCircle />
                  <span>ATS Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
