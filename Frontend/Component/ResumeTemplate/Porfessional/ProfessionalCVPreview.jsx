"use client";

import Link from "next/link";

const ProfessionalCVPreview = ({ data = {} }) => {
  const skills = (data.Skills || [])
    .map((skill) => skill?.value)
    .filter(Boolean);

  const experiences = (data.Experience || []).filter(
    (experience) => experience?.CompanyName,
  );

  const projects = (data.Projects || []).filter((project) => project?.title);

  const education = (data.Education || []).filter(
    (item) => item?.nameOfInstitute,
  );

  const certifications = (data.Certifications || []).filter(
    (cert) => cert?.CertifcateName,
  );

  return (
    <div className="w-full flex justify-center">
      {/* =====================================================
          A4 RESUME
      ===================================================== */}

      <div
        className="
          w-[210mm]
          min-h-[297mm]
          bg-white
          text-[#111827]
          shadow-md
          overflow-hidden
        "
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="h-[32mm] bg-[#0B2D5B] flex flex-col items-center justify-center text-white">
          <h1 className="text-[30px] font-bold tracking-normal break-words overflow-wrap-anywhere text-center px-5">
            {data.name || "Your Name"}
          </h1>

          <p
            className="
              mt-1
              text-[13px]
              font-bold
              uppercase
              tracking-normal
              break-words
              overflow-wrap-anywhere
              px-5
              text-center
              text-white
            "
          >
            {data.Role || "Your Role"}
          </p>
        </header>

        {/* ===================================================
            BODY
            MAIN CONTENT LEFT + SIDEBAR RIGHT
        =================================================== */}

        <div className="grid grid-cols-[66%_34%] min-h-[265mm]">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <main className="px-3 sm:px-[9mm] py-[8mm]">
            {/* ===============================================
                SUMMARY
            =============================================== */}

            {data.Summary && (
              <ResumeSection title="SUMMARY">
                <p className="text-[12px] leading-[1.55] text-[#111827] break-words overflow-wrap-anywhere">
                  {data.Summary}
                </p>
              </ResumeSection>
            )}

            {/* ===============================================
                EXPERIENCE
            =============================================== */}

            {experiences.length > 0 && (
              <ResumeSection title="EXPERIENCE">
                <div className="space-y-[14px]">
                  {experiences.map((experience, index) => (
                    <div key={index}>
                      {/* Job title + date */}

                      <div className="flex-col sm:flex justify-between items-start gap-4">
                        <h3 className="text-[13px] font-bold text-[#111827] break-words overflow-wrap-anywhere">
                          {experience.Role || "Job Position"}
                        </h3>

                        {(experience.StartDate || experience.EndDate) && (
                          <span className="text-[10px] text-[#6B7280] break-words overflow-wrap-anywhere">
                            {experience.StartDate || ""}
                            {experience.StartDate && " - "}
                            {experience.EndDate || "Present"}
                          </span>
                        )}
                      </div>

                      {/* Company */}

                      <p className="mt-[1px] text-[11px] font-bold text-[#164A8A] break-words overflow-wrap-anywhere">
                        {experience.CompanyName}
                      </p>

                      {/* Description */}

                      {experience.Description && (
                        <div className="mt-[3px] space-y-[3px]">
                          {experience.Description.split("\n")
                            .filter((item) => item.trim())
                            .map((item, i) => (
                              <div
                                key={i}
                                className="flex gap-[6px] text-[11px] leading-[1.35] text-[#111827]"
                              >
                                <span className="font-bold text-[#111827]">
                                  •
                                </span>

                                <span className="break-words overflow-wrap-anywhere">
                                  {item}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ResumeSection>
            )}

            {/* ===============================================
                PROJECTS
            =============================================== */}

            {projects.length > 0 && (
              <ResumeSection title="PROJECTS">
                <div className="space-y-[12px]">
                  {projects.map((project, index) => (
                    <div key={index}>
                      {/* Project title */}

                      <h3 className="text-[12px] font-bold text-[#111827] break-words overflow-wrap-anywhere">
                        {project.title}
                      </h3>

                      {/* Project description */}

                      {project.description && (
                        <p className="mt-[2px] text-[11px] leading-[1.35] text-[#111827] break-words overflow-wrap-anywhere">
                          {project.description}
                        </p>
                      )}

                      {/* Project links */}

                      {(project.link || project.Github) && (
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[10px] break-words overflow-wrap-anywhere">
                          {project.link && (
                            <Link
                              href={project.link}
                              target="_blank"
                              className="text-[#164A8A] font-semibold hover:underline break-words overflow-wrap-anywhere"
                            >
                              Live Demo: {project.link}
                            </Link>
                          )}

                          {project.Github && (
                            <Link
                              href={project.Github}
                              target="_blank"
                              className="text-[#164A8A] font-semibold hover:underline break-words overflow-wrap-anywhere"
                            >
                              GitHub: {project.Github}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ResumeSection>
            )}
          </main>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside
            className="
              bg-[#EAF2FB]
              border-l
              border-[#0B2D5B]
              px-2
              sm:px-[6.5mm]
              py-[8mm]
            "
          >
            {/* ===============================================
                CONTACT
            =============================================== */}

            <SidebarTitle title="CONTACT" />

            <div className="space-y-[5px] text-[12px] leading-[1.35] text-[#111827]">
              {data.email && (
                <p className="break-words overflow-wrap-anywhere">
                  {data.email}
                </p>
              )}

              {data.phone && (
                <p className="break-words overflow-wrap-anywhere">
                  {data.phone}
                </p>
              )}

              {data.address && (
                <p className="break-words overflow-wrap-anywhere">
                  {data.address}
                </p>
              )}

              {data.portfolio && (
                <p className="break-words overflow-wrap-anywhere">
                  {data.portfolio}
                </p>
              )}

              {data.Linkedin && (
                <p className="break-words overflow-wrap-anywhere">
                  {data.Linkedin}
                </p>
              )}
            </div>

            {/* ===============================================
                SKILLS
            =============================================== */}

            {skills.length > 0 && (
              <div className="mt-[22px]">
                <SidebarTitle title="SKILLS" />

                <ul className="space-y-[5px] text-[12px] leading-[1.3] text-[#111827]">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-[5px]">
                      <span className="font-bold text-[#164A8A]">•</span>

                      <span className="break-words overflow-wrap-anywhere">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ===============================================
                EDUCATION
            =============================================== */}

            {education.length > 0 && (
              <div className="mt-[22px]">
                <SidebarTitle title="EDUCATION" />

                <div className="space-y-[10px]">
                  {education.map((item, index) => (
                    <div key={index}>
                      <div className="flex-col sm:flex justify-between items-start gap-2">
                        <h3 className="text-[13px] font-bold text-[#111827] break-words overflow-wrap-anywhere">
                          {item.degree || "Degree"}
                        </h3>

                        {item.graduationYear && (
                          <span className="text-[10px] text-[#6B7280] whitespace-nowrap break-words overflow-wrap-anywhere">
                            {item.graduationYear}
                          </span>
                        )}
                      </div>

                      {item.nameOfInstitute && (
                        <p className="text-[11px] text-[#164A8A] break-words overflow-wrap-anywhere">
                          {item.nameOfInstitute}
                        </p>
                      )}

                      {item.fieldOfStudy && (
                        <p className="text-[11px] text-[#111827] break-words overflow-wrap-anywhere">
                          {item.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================
                CERTIFICATIONS
            =============================================== */}

            {certifications.length > 0 && (
              <div className="mt-[22px]">
                <SidebarTitle title="CERTIFICATIONS" />

                <div className="space-y-[9px] text-[11px] leading-[1.25] text-[#111827] break-words overflow-wrap-anywhere">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <p className="break-words overflow-wrap-anywhere">
                        {cert.CertifcateName}
                      </p>

                      {cert.IssueDate && (
                        <p className="text-[#111827] break-words overflow-wrap-anywhere">
                          {cert.IssueDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SIDEBAR TITLE
============================================================ */

const SidebarTitle = ({ title }) => {
  return (
    <div className="mb-[8px]">
      <h2
        className="
          text-[12px]
          font-bold
          tracking-[2px]
          text-[#0B2D5B]
          whitespace-normal
          break-words
          overflow-wrap-anywhere
          [word-break:break-word]
        "
      >
        {title}
      </h2>

      <div className="mt-[4px] h-[1px] w-full bg-[#6FA3DD]" />
    </div>
  );
};

/* ============================================================
   MAIN SECTION
============================================================ */

const ResumeSection = ({ title, children }) => {
  return (
    <section className="mb-[19px]">
      <h2
        className="
          text-[13px]
          font-bold
          tracking-[2px]
          text-[#0B2D5B]
        "
      >
        {title}
      </h2>

      <div className="h-[1px] w-full bg-[#6FA3DD]" />

      <div className="mt-[8px]">{children}</div>
    </section>
  );
};

export default ProfessionalCVPreview;
