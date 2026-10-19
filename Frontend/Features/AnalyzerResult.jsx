"use client";

import { useSelector } from "react-redux";
import {
  FaRobot,
  FaCheckCircle,
  FaLightbulb,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaBriefcase,
  FaCode,
  FaChartBar,
  FaFolderOpen,
  FaInfoCircle,
} from "react-icons/fa";

const AnalyzerResult = () => {
  const { response } = useSelector((state) => state.AnalyzeSlice);
  const result = response ?? {};

  const asArray = (value) => (Array.isArray(value) ? value : []);

  const asText = (value) =>
    typeof value === "string" || typeof value === "number" ? String(value) : "";

  const labelize = (value) =>
    String(value)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .replace(/^./, (char) => char.toUpperCase());

  const missingSkills = asArray(result.missingSkills);
  const strengths = asArray(result.strengths);
  const improvements = asArray(result.improvements);
  const projects = asArray(result.projects);
  const workExperience = asArray(result.workExperience);
  const technicalSkills = asArray(result.skills?.technical);
  const softSkills = asArray(result.skills?.soft);
  const tools = asArray(result.skills?.toolsAndTechnologies);
  const categoryScores = result.categoryScores ?? {};

  const scoreWeights = {
    skillsRelevance: 35,
    projectsPracticalApplication: 30,
    workExperience: 25,
    resumeClarity: 10,
  };

  const calculateReadinessScore = () => {
    if (
      typeof result.roleReadinessScore === "number" &&
      Number.isFinite(result.roleReadinessScore)
    ) {
      return Math.min(100, Math.max(0, result.roleReadinessScore));
    }

    let weightedTotal = 0;
    let availableWeight = 0;

    for (const [key, weight] of Object.entries(scoreWeights)) {
      const score = categoryScores[key]?.score;

      if (
        typeof score === "number" &&
        Number.isFinite(score) &&
        score >= 0 &&
        score <= 100
      ) {
        weightedTotal += (score / 100) * weight;
        availableWeight += weight;
      }
    }

    return availableWeight === 100 ? weightedTotal : null;
  };

  const readinessScore = calculateReadinessScore();

  const getScoreStyles = (value) => {
    if (value === null) {
      return {
        color: "text-slate-400",
        bg: "bg-slate-50",
        stroke: "#cbd5e1",
      };
    }

    if (value >= 80) {
      return {
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        stroke: "#10b981",
      };
    }

    if (value >= 50) {
      return {
        color: "text-amber-500",
        bg: "bg-amber-50",
        stroke: "#f59e0b",
      };
    }

    return {
      color: "text-rose-500",
      bg: "bg-rose-50",
      stroke: "#f43f5e",
    };
  };

  const styles = getScoreStyles(readinessScore);
  const circumference = 2 * Math.PI * 88;

  const strokeDashoffset =
    readinessScore === null
      ? circumference
      : circumference - (circumference * readinessScore) / 100;

  const summary = result.candidateOverview?.summary ?? "";
  const professionalTitle = result.candidateOverview?.professionalTitle ?? "";
  const experienceLevelEvidence =
    result.candidateOverview?.experienceLevelEvidence ?? "";

  const Card = ({ children, className = "" }) => (
    <section
      className={`rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/30 md:p-8 ${className}`}
    >
      {children}
    </section>
  );

  const SectionHeading = ({ icon: Icon, title, subtitle }) => (
    <div className="mb-7 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Icon size={22} />
      </div>

      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-800">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto mt-16 max-w-7xl animate-in fade-in slide-in-from-bottom-10 px-4 pb-20 duration-700">
      {/* HEADER */}
      <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 px-6 py-3">
        <FaRobot className="text-indigo-600" />

        <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
          AI Analysis Complete
        </span>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN */}
        <aside className="space-y-6 lg:col-span-4">
          {/* ROLE READINESS SCORE */}
          <Card className="relative overflow-hidden p-7 md:p-8">
            <div
              className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl ${styles.bg}`}
            />

            <h2 className="relative mb-8 text-center text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Role Readiness Score
            </h2>

            <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
              <svg
                viewBox="0 0 192 192"
                className="h-full w-full -rotate-90"
                role="img"
                aria-label={`Role readiness score: ${
                  readinessScore === null
                    ? "unavailable"
                    : `${readinessScore.toFixed(1)}%`
                }`}
              >
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100"
                />

                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={styles.stroke}
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-4xl font-black tracking-tight ${styles.color}`}
                >
                  {readinessScore === null
                    ? "N/A"
                    : `${readinessScore.toFixed(1)}%`}
                </span>

                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Readiness
                </span>
              </div>
            </div>

            {professionalTitle && (
              <div className="mt-7 text-center">
                <h3 className="font-extrabold text-slate-800">
                  {professionalTitle}
                </h3>
              </div>
            )}

            {experienceLevelEvidence && (
              <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                {experienceLevelEvidence}
              </p>
            )}

            {/* EXECUTIVE SUMMARY */}
            <div className="mt-7 rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <FaInfoCircle className="text-xs" />

                <span className="text-[10px] font-black uppercase tracking-widest">
                  Executive Summary
                </span>
              </div>

              <p className="text-sm font-medium italic leading-7 text-slate-600">
                {summary || "No resume summary was provided."}
              </p>
            </div>
          </Card>

          {/* SKILLS TO DEVELOP */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-indigo-950 p-7 text-white shadow-2xl shadow-indigo-950/10 md:p-8">
            <div className="absolute right-0 top-0 p-4 opacity-10 transition-transform group-hover:scale-110">
              <FaChartBar size={80} />
            </div>

            <h3 className="relative mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-indigo-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
              Skills to Develop
            </h3>

            <div className="relative z-10 space-y-3">
              {missingSkills.length > 0 ? (
                missingSkills.map((item, index) => {
                  const skill =
                    typeof item === "string"
                      ? item
                      : item?.skill || item?.name || "Unspecified skill";

                  return (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/10 p-4 transition-colors hover:bg-white/15"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-bold leading-6">
                          + {skill}
                        </span>

                        {item?.priority && (
                          <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-indigo-200">
                            {item.priority}
                          </span>
                        )}
                      </div>

                      {item?.reason && (
                        <p className="mt-2 text-xs leading-6 text-indigo-200">
                          {item.reason}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm leading-6 text-indigo-200">
                  No specific skill gaps were identified.
                </p>
              )}
            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <Card>
            <SectionHeading
              icon={FaCode}
              title="Technical Skills"
              subtitle="Skills identified in your resume"
            />

            {technicalSkills.length > 0 ? (
              <div className="space-y-3">
                {technicalSkills.map((skill, index) => {
                  const name =
                    typeof skill === "string"
                      ? skill
                      : skill?.name || "Unspecified skill";

                  return (
                    <div
                      key={`${name}-${index}`}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <h3 className="text-sm font-bold text-slate-800">
                        {name}
                      </h3>

                      {skill?.evidence && (
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                          {skill.evidence}
                        </p>
                      )}

                      {skill?.evidenceType && (
                        <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          {labelize(skill.evidenceType)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No technical skills were provided.
              </p>
            )}

            {softSkills.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Soft Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                    >
                      {typeof skill === "string" ? skill : skill?.name || ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tools.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Tools & Technologies
                </h3>

                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      {asText(tool)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="space-y-6 lg:col-span-8">
          {/* KEY STRENGTHS */}
          <Card>
            <SectionHeading
              icon={FaCheckCircle}
              title="Key Strengths"
              subtitle="Evidence from your resume"
            />

            <div className="grid gap-4">
              {strengths.length > 0 ? (
                strengths.map((item, index) => {
                  const title =
                    typeof item === "string"
                      ? item
                      : item?.title || item?.name || "Strength";

                  const evidence =
                    typeof item === "object" ? item?.evidence : "";

                  return (
                    <div
                      key={`${title}-${index}`}
                      className="group flex items-start gap-4 rounded-3xl border border-emerald-100/70 bg-emerald-50/30 p-5 transition-colors hover:bg-emerald-50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold leading-6 text-slate-800 md:text-base">
                          {title}
                        </h3>

                        {evidence && (
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {evidence}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-500">
                  No strengths were returned in this analysis.
                </p>
              )}
            </div>
          </Card>

          {/* RECOMMENDED IMPROVEMENTS */}
          <Card>
            <SectionHeading
              icon={FaLightbulb}
              title="Strategy for Success"
              subtitle="Resume improvement recommendations"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {improvements.length > 0 ? (
                improvements.map((item, index) => {
                  const issue =
                    typeof item === "string"
                      ? item
                      : item?.issue || item?.title || "Improvement";

                  const suggestion =
                    typeof item === "object" ? item?.suggestion : "";

                  const priority =
                    typeof item === "object" ? item?.priority : "";

                  return (
                    <div
                      key={`${issue}-${index}`}
                      className="group flex gap-4 rounded-[2rem] border border-slate-200/60 bg-slate-50 p-5 transition-all hover:bg-white hover:shadow-lg"
                    >
                      <FaExclamationCircle className="mt-1 shrink-0 text-amber-500 transition-transform group-hover:rotate-12" />

                      <div>
                        <h3 className="text-sm font-bold leading-6 text-slate-800">
                          {issue}
                        </h3>

                        {suggestion && (
                          <p className="mt-2 text-[13px] leading-6 text-slate-600">
                            {suggestion}
                          </p>
                        )}

                        {priority && (
                          <span className="mt-3 inline-block text-[10px] font-black uppercase tracking-wider text-amber-600">
                            Priority: {priority}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-500">
                  No improvement recommendations were returned.
                </p>
              )}
            </div>
          </Card>

          {/* SCORE BREAKDOWN */}
          {Object.keys(categoryScores).length > 0 && (
            <Card>
              <SectionHeading
                icon={FaChartBar}
                title="Score Breakdown"
                subtitle="Role-specific category evaluation"
              />

              <div className="space-y-6">
                {Object.entries(scoreWeights).map(([key, weight]) => {
                  const category = categoryScores[key];

                  if (!category) return null;

                  const value = Number(category.score);

                  const categoryScore = Number.isFinite(value)
                    ? Math.min(100, Math.max(0, value))
                    : 0;

                  return (
                    <div key={key}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-slate-700">
                          {labelize(key)}
                        </span>

                        <span className="text-sm font-black text-slate-800">
                          {category?.score ?? "N/A"}/100
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                          style={{ width: `${categoryScore}%` }}
                        />
                      </div>

                      {category?.reason && (
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                          {category.reason}
                        </p>
                      )}

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Score weight: {weight}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* PROJECTS */}
          {Array.isArray(result.projects) && (
            <Card>
              <SectionHeading
                icon={FaFolderOpen}
                title="Projects"
                subtitle="Practical application of your skills"
              />

              {projects.length > 0 ? (
                <div className="space-y-5">
                  {projects.map((project, index) => (
                    <article
                      key={`${project?.name || "project"}-${index}`}
                      className="rounded-3xl border border-slate-200 p-5 transition-colors hover:border-indigo-100"
                    >
                      <h3 className="text-lg font-black text-slate-800">
                        {project?.name || "Project"}
                      </h3>

                      {project?.purpose && (
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {project.purpose}
                        </p>
                      )}

                      {asArray(project.technologies).length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={`${tech}-${techIndex}`}
                              className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                            >
                              {asText(tech)}
                            </span>
                          ))}
                        </div>
                      )}

                      {asArray(project.features).length > 0 && (
                        <div className="mt-5">
                          <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Key Features
                          </h4>

                          <ul className="space-y-2">
                            {project.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex gap-2 text-sm leading-6 text-slate-600"
                              >
                                <FaCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                                {asText(feature)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.candidateContribution && (
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          <strong className="text-slate-800">
                            Contribution:{" "}
                          </strong>
                          {project.candidateContribution}
                        </p>
                      )}

                      {asArray(project.outcomes).length > 0 && (
                        <div className="mt-4">
                          <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Outcomes
                          </h4>

                          <ul className="space-y-2">
                            {project.outcomes.map((outcome, outcomeIndex) => (
                              <li
                                key={outcomeIndex}
                                className="text-sm leading-6 text-slate-600"
                              >
                                • {asText(outcome)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.evidence && (
                        <p className="mt-4 text-xs leading-6 text-slate-500">
                          {project.evidence}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No projects were provided.
                </p>
              )}
            </Card>
          )}

          {/* WORK EXPERIENCE */}
          {Array.isArray(result.workExperience) && (
            <Card>
              <SectionHeading
                icon={FaBriefcase}
                title="Work Experience"
                subtitle="Professional and internship experience"
              />

              {workExperience.length > 0 ? (
                <div className="space-y-6">
                  {workExperience.map((job, index) => (
                    <article
                      key={`${job?.jobTitle || "role"}-${index}`}
                      className="border-l-2 border-indigo-200 pl-5"
                    >
                      <h3 className="font-black text-slate-800">
                        {job?.jobTitle || "Position"}
                      </h3>

                      {job?.organization && (
                        <p className="mt-1 text-sm font-bold text-indigo-700">
                          {job.organization}
                        </p>
                      )}

                      {job?.duration && (
                        <p className="mt-1 text-xs text-slate-400">
                          {job.duration}
                        </p>
                      )}

                      {asArray(job.responsibilities).length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {job.responsibilities.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm leading-6 text-slate-600"
                            >
                              • {asText(item)}
                            </li>
                          ))}
                        </ul>
                      )}

                      {asArray(job.achievements).length > 0 && (
                        <div className="mt-4">
                          <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Work Accomplishments
                          </h4>

                          <ul className="space-y-2">
                            {job.achievements.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-sm leading-6 text-slate-600"
                              >
                                • {asText(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.evidence && (
                        <p className="mt-3 text-xs leading-6 text-slate-500">
                          {job.evidence}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No work experience was provided.
                </p>
              )}
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnalyzerResult;
