"use client";
import { useSelector } from "react-redux";

const DisplayResume = () => {
  const { response } = useSelector((state) => state.ResumeSlice);

  // If there is no response, or if it's still a string (hasn't parsed yet), don't render
  if (!response || typeof response === "string") return null;

  //remove teh unknow part ofa date
  const cleanDate = (date) => {
    if (!date) return "Present";
    return date.split("T")[0]; // 👈 removes time part
  };

  return (
    <div
      id="resumePDF"
      className="bg-white ml-5 border border-gray-200 shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* HEADER SECTION */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl md:text-center font-bold tracking-tight uppercase text-black m-0">
          {response.name}
        </h1>
        <h2 className="text-md font-bold md:text-center tracking-tight uppercase text-black m-0">
          {response.Role}
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-3">
          <span>{response.email}</span>
          <span>|</span>
          <span>{response.phone}</span>
          {response.Linkedin && (
            <>
              <span>|</span>
              <a
                href={response.Linkedin}
                target="_blank"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {response.portfolio && (
            <>
              <span>|</span>
              <a
                href={response.portfolio}
                target="_blank"
                className="text-blue-700 hover:underline"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Professional Summary
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-4">
        {response.Summary}
      </p>

      {/* SKILLS GRID */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Skills
      </h2>
      <div className="grid grid-cols-4 gap-2 mb-8 mt-3">
        {response.Skills?.map((skill, index) => (
          <div
            key={index}
            className="text-sm text-gray-700 border-l-2 border-gray-200 pl-2"
          >
            {skill.value}
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Experience
      </h2>
      {response.Experience?.map((exp, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-baseline mt-4">
            <h3 className="font-bold text-[15px] text-black">{exp.Role}</h3>
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {cleanDate(exp.StartDate)} — {cleanDate(exp.EndDate) || "Present"}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-800 italic">
            {exp.CompanyName}
          </p>
          <p className="text-sm text-gray-700 mt-2">{exp.Description}</p>
        </div>
      ))}

      {/* PROJECTS */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Projects
      </h2>
      {response.Projects?.map((proj, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-baseline mt-4">
            <h3 className="font-bold text-[15px] text-black">{proj.title}</h3>
            <div className="flex gap-2">
              <a
                href={proj.link}
                target="_blank"
                className="text-blue-700 hover:underline text-xs"
              >
                Live Link
              </a>
              <a
                href={proj.Github}
                target="_blank"
                className="text-blue-700 hover:underline text-xs"
              >
                GitHub
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
        </div>
      ))}

      {/* EDUCATION */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Education
      </h2>
      {response.Education?.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-[15px] text-black">
              {edu.degree} in {edu.fieldOfStudy}
            </h3>
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {cleanDate(edu.graduationYear)}
            </span>
          </div>
          <p className="text-sm text-gray-800">{edu.nameOfInstitute}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayResume;
