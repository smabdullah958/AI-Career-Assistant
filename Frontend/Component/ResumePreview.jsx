"use client";

import Link from "next/link";

const ResumePreview = ({ data }) => {
  return (
    <div className="bg-white ml-5  border-2 border-gray-300 shadow-2xl rounded-3xl p-8 max-w-2xl mx-auto sticky top-8">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          {data.name || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 mt-1">{data.Role || "Your Role"}</p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-4">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}

          {data.portfolio && (
            <Link
              href={data.portfolio}
              target="_blank"
              className="hover:text-blue-600"
            >
              Portfolio
            </Link>
          )}

          {data.Linkedin && (
            <Link
              href={data.Linkedin}
              target="_blank"
              className="hover:text-blue-600"
            >
              LinkedIn
            </Link>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.Summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-600 leading-relaxed">{data.Summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.Skills?.some((s) => s.value) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.Skills.map(
              (skill, i) =>
                skill.value && (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {skill.value}
                  </span>
                ),
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.Experience?.some((exp) => exp.CompanyName) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Experience
          </h2>

          {data.Experience.map(
            (exp, i) =>
              exp.CompanyName && (
                <div key={i} className="mb-5">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.Role}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.StartDate} - {exp.EndDate || "Present"}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">{exp.CompanyName}</p>

                  <p className="text-gray-600 text-sm mt-1">
                    {exp.Description}
                  </p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Projects */}
      {data.Projects?.some((p) => p.title) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Projects</h2>

          {data.Projects.map(
            (project, i) =>
              project.title && (
                <div key={i} className="mb-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{project.title}</h3>

                    <div className="text-sm text-gray-500 flex gap-3">
                      {project.link && (
                        <Link href={project.link} target="_blank">
                          Live
                        </Link>
                      )}
                      {project.Github && (
                        <Link href={project.Github} target="_blank">
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">
                    {project.description}
                  </p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Education */}
      {data.Education?.some((edu) => edu.nameOfInstitute) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Education
          </h2>

          {data.Education.map(
            (edu, i) =>
              edu.nameOfInstitute && (
                <div key={i} className="mb-4">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>
                  <p className="text-gray-500 text-sm">
                    {edu.nameOfInstitute} • {edu.graduationYear}
                  </p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Certifications */}
      {data.Certifications?.some((c) => c.CertifcateName) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Certifications
          </h2>

          {data.Certifications.map(
            (cert, i) =>
              cert.CertifcateName && (
                <div key={i} className="mb-3">
                  <h3 className="font-semibold">{cert.CertifcateName}</h3>
                  <p className="text-gray-600 text-sm">
                    {cert.nameOfInstitute}
                  </p>
                  <p className="text-gray-500 text-sm">{cert.IssueDate}</p>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
