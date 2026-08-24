"use client";

import Link from "next/link";

const ClassicalCVPreview = ({ data }) => {
  return (
    <>
      <div
        className="bg-white  p-5 max-w-[210mm] min-h-[297mm] sticky  text-[#333]"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* ================= HEADER ================= */}
        <header className="border-b-2 border-[#263956] pb-4 mb-6">
          <h1 className="text-[32px] leading-none font-bold text-[#1f304b] break-words overflow-wrap-anywhere">
            {data.name || "Abdullah"}
          </h1>

          <p className="mt-2 text-[15px] uppercase tracking-[2px] text-[#405574] break-words overflow-wrap-anywhere">
            {data.Role || "Professional Title"}
          </p>

          {/* Contact Information */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-[#333]">
            {data.email && (
              <span className="break-words overflow-wrap-anywhere">
                {data.email}
              </span>
            )}

            {data.phone && (
              <span className="break-words overflow-wrap-anywhere">
                {data.phone}
              </span>
            )}

            {data.portfolio && (
              <Link
                href={data.portfolio}
                target="_blank"
                className="break-words overflow-wrap-anywhere hover:underline"
              >
                {data.portfolio}
              </Link>
            )}

            {data.Linkedin && (
              <Link
                href={data.Linkedin}
                target="_blank"
                className="break-words overflow-wrap-anywhere hover:underline"
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

            <p className="text-[12px] leading-[1.5] text-[#333] break-words overflow-wrap-anywhere">
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
                      className="bg-[#eef1f5] px-3 py-1 text-[11px] text-[#263956] break-words overflow-wrap-anywhere"
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
                      <h3 className="text-[16px] font-bold text-[#333] break-words overflow-wrap-anywhere">
                        {exp.Role || "Job Position"}
                      </h3>

                      <span className="shrink-0 text-[12px] text-[#333]">
                        {exp.StartDate || ""} {exp.StartDate && " - "}{" "}
                        {exp.EndDate || "Present"}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-[13px] italic text-[#405574]">
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
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="text-[15px] font-bold text-[#333]">
                        {project.title}
                      </h3>

                      <div className="flex gap-2 text-[10px]">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            className="text-[#263956] hover:underline break-words overflow-wrap-anywhere"
                          >
                            {project.link}
                          </Link>
                        )}

                        {project.Github && (
                          <Link
                            href={project.Github}
                            target="_blank"
                            className="text-[#263956] hover:underline break-words overflow-wrap-anywhere"
                          >
                            {project.Github}
                          </Link>
                        )}
                      </div>
                    </div>

                    {project.description && (
                      <p className="text-[12px] leading-[1.45] text-[#333]">
                        {project.description}
                      </p>
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
                        <p className="text-[12px]">{edu.fieldOfStudy}</p>
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
    <h2 className="mb-2 border-b border-[#263956] pb-1 text-[16px] font-bold uppercase tracking-[1.5px] text-[#263956]">
      {title}
    </h2>
  );
};

export default ClassicalCVPreview;
