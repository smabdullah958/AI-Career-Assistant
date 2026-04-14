//this is show during awhen we enter the data

"use client";

import Link from "next/link";

const ResumePreview = ({ data }) => {
  return (
    <div
      id="resumePDF"
      className="bg-white ml-5 border border-gray-200 shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight uppercase text-black">
          {data.name || "User Name"}
        </h1>
        <p className="text-md font-semibold text-gray-700 mt-1 uppercase tracking-wide">
          {data.Role || "User Role"}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-3">
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.email && <span>|</span>}
          {data.email && <span>{data.email}</span>}
          {data.portfolio && (
            <>
              <span>|</span>
              <Link
                href={data.portfolio}
                target="_blank"
                className="hover:underline font-medium"
              >
                Portfolio
              </Link>
            </>
          )}
          {data.Linkedin && (
            <>
              <span>|</span>
              <Link
                href={data.Linkedin}
                target="_blank"
                className="hover:underline font-medium"
              >
                LinkedIn
              </Link>
            </>
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase">
          About Me
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">
          {data.Summary || "About Me"}
        </p>
      </div>

      {/* Skills Section */}
      {data.Skills?.some((s) => s.value) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
            Skills
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {data.Skills.map(
              (skill, i) =>
                skill.value && (
                  <div
                    key={i}
                    className="text-sm text-gray-700 border-l-2 border-gray-200 pl-2"
                  >
                    {skill.value}
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {data.Experience?.some((exp) => exp.CompanyName) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
            Experience
          </h2>

          {data.Experience.map(
            (exp, i) =>
              exp.CompanyName && (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[15px]">{exp.Role}</h3>
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      {exp.StartDate} — {exp.EndDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 italic">
                    {exp.CompanyName}
                  </p>
                  <p className="text-sm text-gray-700 mt-1 leading-snug">
                    {exp.Description}
                  </p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Projects Section */}
      {data.Projects?.some((p) => p.title) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
            Projects
          </h2>

          {data.Projects.map(
            (project, i) =>
              project.title && (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[15px]">{project.title}</h3>
                    <div className="text-xs flex gap-2">
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          className="text-blue-700 hover:underline"
                        >
                          Live Link
                        </Link>
                      )}
                      {project.Github && (
                        <Link
                          href={project.Github}
                          target="_blank"
                          className="text-blue-700 hover:underline"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 leading-snug">
                    {project.description}
                  </p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Education Section */}
      {data.Education?.some((edu) => edu.nameOfInstitute) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
            Education
          </h2>

          {data.Education.map(
            (edu, i) =>
              edu.nameOfInstitute && (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[15px]">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-gray-500">
                      {edu.graduationYear}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.fieldOfStudy}</p>
                  <p className="text-sm text-gray-600">{edu.nameOfInstitute}</p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Certifications Section */}
      {data.Certifications?.some((c) => c.CertifcateName) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
            Certifications
          </h2>

          <div className="space-y-4">
            {data.Certifications.map(
              (cert, i) =>
                cert.CertifcateName && (
                  <div
                    key={i}
                    className="relative pl-4 border-l-2 border-gray-800"
                  >
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[15px] text-gray-900">
                        {cert.CertifcateName}
                      </h3>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">
                        {cert.IssueDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      {cert.nameOfInstitute}
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
