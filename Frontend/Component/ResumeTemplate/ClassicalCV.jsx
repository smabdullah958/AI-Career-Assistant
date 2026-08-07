// //this is show during awhen we enter the data

// "use client";

// import Link from "next/link";

// const ResumePreview = ({ data }) => {
//   return (
//     <>
//       <h1 className="md:hidden text-2xl sm:text-3xl pl-10 pb-5 xl:text-4xl font-bold  text-slate-800">
//         Live Preview
//       </h1>

//       <div
//         id="resumePDF"
//         className="bg-white ml-5 border border-gray-200 shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333] rounded-xl"
//         style={{ fontFamily: "'Inter', sans-serif" }}
//       >
//         {/* Header */}
//         <div className="border-b-2 border-gray-800 pb-4 mb-6">
//           <h1 className="text-3xl font-bold tracking-tight uppercase text-black">
//             {data.name || "User Name"}
//           </h1>
//           <p className="text-md font-semibold text-gray-700 mt-1 uppercase tracking-wide">
//             {data.Role || "User Role"}
//           </p>

//           <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-3">
//             {data.phone && <span>{data.phone}</span>}
//             {data.phone && data.email && <span>|</span>}
//             {data.email && <span>{data.email}</span>}
//             {data.portfolio && (
//               <>
//                 <span>|</span>
//                 <Link
//                   href={data.portfolio}
//                   target="_blank"
//                   className="hover:underline font-medium"
//                 >
//                   Portfolio
//                 </Link>
//               </>
//             )}
//             {data.Linkedin && (
//               <>
//                 <span>|</span>
//                 <Link
//                   href={data.Linkedin}
//                   target="_blank"
//                   className="hover:underline font-medium"
//                 >
//                   LinkedIn
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* About Me or a Professional Detail Section */}
//         <div className="mb-8">
//           <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase">
//             Professional Detail
//           </h2>
//           <p className="text-sm leading-relaxed text-gray-700">
//             {data.Summary || "Professional Detail"}
//           </p>
//         </div>

//         {/* Skills Section */}
//         {data.Skills?.some((s) => s.value) && (
//           <div className="mb-8">
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
//               Skills
//             </h2>
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//               {data.Skills.map(
//                 (skill, i) =>
//                   skill.value && (
//                     <div
//                       key={i}
//                       className="text-sm text-gray-700 border-l-2 border-gray-200 pl-2"
//                     >
//                       {skill.value}
//                     </div>
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//         {/* Experience Section */}
//         {data.Experience?.some((exp) => exp.CompanyName) && (
//           <div className="mb-8">
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
//               Experience
//             </h2>

//             {data.Experience.map(
//               (exp, i) =>
//                 exp.CompanyName && (
//                   <div key={i} className="mb-4">
//                     <div className="flex justify-between items-baseline">
//                       <h3 className="font-bold text-[15px]">{exp.Role}</h3>
//                       <span className="text-xs font-semibold text-gray-500 uppercase">
//                         {exp.StartDate} — {exp.EndDate || "Present"}
//                       </span>
//                     </div>
//                     <p className="text-sm font-medium text-gray-800 italic">
//                       {exp.CompanyName}
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1 leading-snug">
//                       {exp.Description}
//                     </p>
//                   </div>
//                 ),
//             )}
//           </div>
//         )}

//         {/* Projects Section */}
//         {data.Projects?.some((p) => p.title) && (
//           <div className="mb-8">
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
//               Projects
//             </h2>

//             {data.Projects.map(
//               (project, i) =>
//                 project.title && (
//                   <div key={i} className="mb-4">
//                     <div className="flex justify-between items-baseline">
//                       <h3 className="font-bold text-[15px]">{project.title}</h3>
//                       <div className="text-xs flex gap-2">
//                         {project.link && (
//                           <Link
//                             href={project.link}
//                             target="_blank"
//                             className="text-blue-700 hover:underline"
//                           >
//                             Live Link
//                           </Link>
//                         )}
//                         {project.Github && (
//                           <Link
//                             href={project.Github}
//                             target="_blank"
//                             className="text-blue-700 hover:underline"
//                           >
//                             GitHub
//                           </Link>
//                         )}
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-700 mt-1 leading-snug">
//                       {project.description}
//                     </p>
//                   </div>
//                 ),
//             )}
//           </div>
//         )}

//         {/* Education Section */}
//         {data.Education?.some((edu) => edu.nameOfInstitute) && (
//           <div className="mb-8">
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
//               Education
//             </h2>

//             {data.Education.map(
//               (edu, i) =>
//                 edu.nameOfInstitute && (
//                   <div key={i} className="mb-3">
//                     <div className="flex justify-between items-baseline">
//                       <h3 className="font-bold text-[15px]">{edu.degree}</h3>
//                       <span className="text-xs font-semibold text-gray-500">
//                         {edu.graduationYear}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-700">{edu.fieldOfStudy}</p>
//                     <p className="text-sm text-gray-600">
//                       {edu.nameOfInstitute}
//                     </p>
//                   </div>
//                 ),
//             )}
//           </div>
//         )}

//         {/* Certifications Section */}
//         {data.Certifications?.some((c) => c.CertifcateName) && (
//           <div className="mb-8">
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 uppercase">
//               Certifications
//             </h2>

//             <div className="space-y-4">
//               {data.Certifications.map(
//                 (cert, i) =>
//                   cert.CertifcateName && (
//                     <div
//                       key={i}
//                       className="relative pl-4 border-l-2 border-gray-800"
//                     >
//                       <div className="flex justify-between items-baseline">
//                         <h3 className="font-bold text-[15px] text-gray-900">
//                           {cert.CertifcateName}
//                         </h3>
//                         <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">
//                           {cert.IssueDate}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 italic">
//                         {cert.NameOfInstitute}
//                       </p>
//                     </div>
//                   ),
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ResumePreview;

"use client";

import Link from "next/link";

const ResumePreview = ({ data }) => {
  return (
    <>
      <div
        id="resumePDF"
        className="bg-white ml-5 border border-gray-200 shadow-xl p-[18mm] w-full max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333]"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* ================= HEADER ================= */}
        <header className="border-b-2 border-[#263956] pb-4 mb-6">
          <h1 className="text-[32px] leading-none font-bold text-[#1f304b]">
            {data.name || "Abdullah"}
          </h1>

          <p className="mt-2 text-[15px] uppercase tracking-[2px] text-[#405574]">
            {data.Role || "Professional Title"}
          </p>

          {/* Contact Information */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-[#333]">
            {data.email && <span>{data.email}</span>}

            {data.phone && <span>{data.phone}</span>}

            {data.location && <span>{data.location}</span>}

            {data.portfolio && (
              <Link
                href={data.portfolio}
                target="_blank"
                className="hover:underline"
              >
                Portfolio
              </Link>
            )}

            {data.Linkedin && (
              <Link
                href={data.Linkedin}
                target="_blank"
                className="hover:underline"
              >
                LinkedIn
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
                      className="bg-[#eef1f5] px-3 py-1 text-[11px] text-[#263956]"
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
                            className="text-[#263956] hover:underline"
                          >
                            Live Link
                          </Link>
                        )}

                        {project.Github && (
                          <Link
                            href={project.Github}
                            target="_blank"
                            className="text-[#263956] hover:underline"
                          >
                            GitHub
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

export default ResumePreview;
