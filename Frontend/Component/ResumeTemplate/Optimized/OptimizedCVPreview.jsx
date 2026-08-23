"use client";

import Link from "next/link";

const OptimizedCVPreview = ({ data }) => {
  return (
    <>
      <div
        className="bg-white p-5 max-w-[210mm] min-h-[297mm] sticky text-[#333]"
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* ================= HEADER ================= */}
        <header className="bg-[#0E7C73] -mx-5 -mt-5 px-8 pt-7 pb-6 mb-6">
          {/* Name */}
          <h1 className="text-[32px] leading-none font-bold text-white">
            {data.name || "Abdullah"}
          </h1>

          {/* Role */}
          <p className="mt-2 text-[15px] uppercase tracking-[2px] text-white">
            {data.Role || "Professional Title"}
          </p>

          {/* Contact Information */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-white">
            {data.email && <span>{data.email}</span>}

            {data.phone && <span>{data.phone}</span>}

            {data.address && <span>{data.address}</span>}

            {data.portfolio && (
              <Link
                href={data.portfolio}
                target="_blank"
                className="hover:underline"
              >
                {data.portfolio}
              </Link>
            )}

            {data.Linkedin && (
              <Link
                href={data.Linkedin}
                target="_blank"
                className="hover:underline"
              >
                {data.Linkedin}
              </Link>
            )}
          </div>
        </header>

        {/* ================= SUMMARY ================= */}
        {data.Summary && (
          <section className="mb-7">
            <SectionTitle title="Summary" />

            <p className="text-[12px] leading-[1.5] text-[#333]">
              {data.Summary}
            </p>
          </section>
        )}

        {/* ================= SKILLS ================= */}
        {data.Skills?.some((skill) => skill.value) && (
          <section className="mb-7">
            <SectionTitle title="Skills" />

            <div className="flex flex-wrap gap-2">
              {data.Skills.map(
                (skill, index) =>
                  skill.value && (
                    <span
                      key={index}
                      className="rounded-full bg-[#E6F3F1] px-3 py-1 text-[11px] font-semibold text-[#0E7C73]"
                    >
                      {skill.value}
                    </span>
                  ),
              )}
            </div>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {data.Experience?.some((exp) => exp.CompanyName) && (
          <section className="mb-7">
            <SectionTitle title="Experience" />

            {data.Experience.map(
              (exp, index) =>
                exp.CompanyName && (
                  <div key={index} className="mb-5">
                    {/* Job title + Date */}
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="text-[16px] font-bold text-[#333]">
                        {exp.Role || "Job Position"}
                      </h3>

                      <span className="shrink-0 text-[12px] text-[#333]">
                        {exp.StartDate || ""}
                        {exp.StartDate && " - "}
                        {exp.EndDate || "Present"}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-[13px] font-semibold text-[#0E7C73]">
                      {exp.CompanyName}
                    </p>

                    {/* Description */}
                    {exp.Description && (
                      <div className="mt-1 text-[12px] leading-[1.45] text-[#333]">
                        {exp.Description.split("\n")
                          .filter((item) => item.trim())
                          .map((item, i) => (
                            <div key={i} className="flex gap-2">
                              <span>•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ),
            )}
          </section>
        )}

        {/* ================= PROJECTS ================= */}
        {data.Projects?.some((project) => project.title) && (
          <section className="mb-7">
            <SectionTitle title="Projects" />

            {data.Projects.map(
              (project, index) =>
                project.title && (
                  <div key={index} className="mb-4">
                    {/* Project title */}
                    <h3 className="text-[15px] font-bold text-[#333]">
                      {project.title}
                    </h3>

                    {/* Project description */}
                    {project.description && (
                      <p className="text-[12px] leading-[1.45] text-[#333]">
                        {project.description}
                      </p>
                    )}

                    {/* Project links */}
                    {(project.link || project.Github) && (
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            className="text-[#0E7C73] hover:underline"
                          >
                            Live Demo: {project.link}
                          </Link>
                        )}

                        {project.Github && (
                          <Link
                            href={project.Github}
                            target="_blank"
                            className="text-[#0E7C73] hover:underline"
                          >
                            GitHub: {project.Github}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ),
            )}
          </section>
        )}

        {/* ================= EDUCATION + CERTIFICATIONS ================= */}
        <div className="grid grid-cols-2 gap-10">
          {/* EDUCATION */}
          {data.Education?.some((edu) => edu.nameOfInstitute) && (
            <section>
              <SectionTitle title="Education" />

              {data.Education.map(
                (edu, index) =>
                  edu.nameOfInstitute && (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className="text-[15px] font-bold text-[#333]">
                          {edu.degree || "Degree"}
                        </h3>

                        <span className="shrink-0 text-[11px] text-[#333]">
                          {edu.graduationYear}
                        </span>
                      </div>

                      {edu.fieldOfStudy && (
                        <p className="text-[12px] text-[#333]">
                          {edu.fieldOfStudy}
                        </p>
                      )}

                      <p className="text-[12px] text-[#555]">
                        {edu.nameOfInstitute}
                      </p>
                    </div>
                  ),
              )}
            </section>
          )}

          {/* CERTIFICATIONS */}
          {data.Certifications?.some((cert) => cert.CertifcateName) && (
            <section>
              <SectionTitle title="Certifications" />

              <ul className="space-y-2 text-[12px]">
                {data.Certifications.map(
                  (cert, index) =>
                    cert.CertifcateName && (
                      <li key={index} className="flex gap-2 leading-[1.4]">
                        <span>•</span>

                        <div>
                          <span>{cert.CertifcateName}</span>

                          {cert.IssueDate && (
                            <span className="text-[#555]">
                              {" "}
                              ({cert.IssueDate})
                            </span>
                          )}
                        </div>
                      </li>
                    ),
                )}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

/* ================= SECTION TITLE ================= */

const SectionTitle = ({ title }) => {
  return (
    <h2 className="mb-2 border-b border-[#B5DAD6] pb-1 text-[16px] font-bold uppercase tracking-[1.5px] text-[#0E7C73]">
      {title}
    </h2>
  );
};

export default OptimizedCVPreview;
