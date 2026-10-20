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
  FaGraduationCap,
  FaCertificate,
  FaTrophy,
  FaFileAlt,
} from "react-icons/fa";

const SCORE_WEIGHTS = {
  skillsRelevance: 30,
  projectsPracticalApplication: 25,
  workExperience: 20,
  educationCertifications: 10,
  achievementsImpact: 10,
  resumeClarity: 5,
};

const AnalyzerResult = () => {
  const { response } = useSelector((state) => state.AnalyzeSlice);

  const result =
    response && typeof response === "object" && !Array.isArray(response)
      ? response
      : {};

  const asArray = (value) => (Array.isArray(value) ? value : []);

  const asText = (value) => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    return "";
  };

  const labelize = (value) =>
    String(value)
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^./, (char) => char.toUpperCase());

  const isObject = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  const getItemText = (item, fields = []) => {
    if (typeof item === "string" || typeof item === "number") {
      return String(item);
    }

    if (isObject(item)) {
      for (const field of fields) {
        if (
          typeof item[field] === "string" ||
          typeof item[field] === "number"
        ) {
          if (String(item[field]).trim()) {
            return String(item[field]);
          }
        }
      }
    }

    return "";
  };

  const missingSkills = asArray(result.missingSkills);
  const strengths = asArray(result.strengths);
  const improvements = asArray(result.improvements);

  const projects = asArray(result.projects);
  const workExperience = asArray(result.workExperience);
  const education = asArray(result.education);
  const certifications = asArray(result.certifications);
  const achievements = asArray(result.achievements);
  const formattingIssues = asArray(result.formattingIssues);
  const limitations = asArray(result.limitations);

  const technicalSkills = asArray(result.skills?.technical);
  const softSkills = asArray(result.skills?.soft);
  const tools = asArray(result.skills?.toolsAndTechnologies);
  const skillsNeedingMoreEvidence = asArray(
    result.skills?.skillsNeedingMoreEvidence,
  );

  const categoryScores = isObject(result.categoryScores)
    ? result.categoryScores
    : {};

  const calculateReadinessScore = () => {
    const rawOverallScore = result.roleReadinessScore;

    if (
      rawOverallScore !== null &&
      rawOverallScore !== undefined &&
      rawOverallScore !== "" &&
      Number.isFinite(Number(rawOverallScore))
    ) {
      return Math.min(100, Math.max(0, Number(rawOverallScore)));
    }

    let weightedTotal = 0;
    let availableWeight = 0;

    for (const [key, weight] of Object.entries(SCORE_WEIGHTS)) {
      const rawScore = categoryScores[key]?.score;

      if (rawScore === null || rawScore === undefined || rawScore === "") {
        continue;
      }

      const score = Number(rawScore);

      if (Number.isFinite(score) && score >= 0 && score <= 100) {
        weightedTotal += (score * weight) / 100;
        availableWeight += weight;
      }
    }

    // Calculate a fallback only when all six categories are valid.
    if (availableWeight === 100) {
      return Math.min(100, Math.max(0, weightedTotal));
    }

    return null;
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

  const summary = asText(result.candidateOverview?.summary);
  const professionalTitle = asText(result.candidateOverview?.professionalTitle);
  const experienceLevelEvidence = asText(
    result.candidateOverview?.experienceLevelEvidence,
  );

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

  const renderTextList = (items, emptyMessage, className = "") => {
    if (items.length === 0) {
      return <p className="text-sm leading-6 text-slate-500">{emptyMessage}</p>;
    }

    return (
      <ul className={`space-y-3 ${className}`}>
        {items.map((item, index) => {
          const content = getItemText(item, [
            "title",
            "name",
            "description",
            "achievement",
            "issue",
            "reason",
          ]);

          return (
            <li
              key={`${content || "item"}-${index}`}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <FaInfoCircle className="mt-1 shrink-0 text-indigo-500" />

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6 text-slate-700">
                  {content || "Additional information"}
                </p>

                {isObject(item) && item.evidence && (
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {asText(item.evidence)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="mx-auto mt-16 max-w-7xl animate-in fade-in slide-in-from-bottom-10 px-4 pb-20 duration-700">
      {/* HEADER */}
      <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 px-6 py-3">
        <FaRobot className="text-indigo-600" />

        <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
          AI Analysis Complete
        </span>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN */}
        <aside className="space-y-6 lg:col-span-4">
          {/* ROLE READINESS SCORE */}
          <Card className="relative overflow-hidden">
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
                  const skill = getItemText(item, ["skill", "name", "title"]);
                  const reason = asText(item?.reason);
                  const priority = asText(item?.priority);

                  return (
                    <div
                      key={`${skill || "skill"}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/10 p-4 transition-colors hover:bg-white/15"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-bold leading-6">
                          + {skill || "Unspecified skill"}
                        </span>

                        {priority && (
                          <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-indigo-200">
                            {priority}
                          </span>
                        )}
                      </div>

                      {reason && (
                        <p className="mt-2 text-xs leading-6 text-indigo-200">
                          {reason}
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
                  const name = getItemText(skill, ["name", "skill", "title"]);
                  const evidence = asText(skill?.evidence);
                  const evidenceType = asText(skill?.evidenceType);

                  return (
                    <div
                      key={`${name || "skill"}-${index}`}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <h3 className="text-sm font-bold text-slate-800">
                        {name || "Unspecified skill"}
                      </h3>

                      {evidence && (
                        <p className="mt-2 text-xs leading-6 text-slate-500">
                          {evidence}
                        </p>
                      )}

                      {evidenceType && (
                        <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          {labelize(evidenceType)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No technical skills were identified in the resume.
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
                      key={`${getItemText(skill, ["name", "skill"]) || "soft-skill"}-${index}`}
                      className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                    >
                      {getItemText(skill, ["name", "skill", "title"]) ||
                        "Unspecified skill"}
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
                      key={`${getItemText(tool, ["name", "title"]) || "tool"}-${index}`}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      {getItemText(tool, ["name", "title", "tool"]) ||
                        "Unspecified technology"}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skillsNeedingMoreEvidence.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-amber-600">
                  Skills Needing More Evidence
                </h3>

                <div className="space-y-3">
                  {skillsNeedingMoreEvidence.map((item, index) => (
                    <div
                      key={`${getItemText(item, ["name", "skill", "title"]) || "skill"}-${index}`}
                      className="rounded-2xl bg-amber-50 p-4"
                    >
                      <p className="text-sm font-bold text-slate-800">
                        {getItemText(item, ["name", "skill", "title"]) ||
                          "Unspecified skill"}
                      </p>

                      {item?.evidence && (
                        <p className="mt-2 text-xs leading-6 text-slate-600">
                          {asText(item.evidence)}
                        </p>
                      )}
                    </div>
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
                  const title = getItemText(item, [
                    "title",
                    "name",
                    "strength",
                  ]);
                  const evidence = asText(item?.evidence);

                  return (
                    <div
                      key={`${title || "strength"}-${index}`}
                      className="group flex items-start gap-4 rounded-3xl border border-emerald-100/70 bg-emerald-50/30 p-5 transition-colors hover:bg-emerald-50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold leading-6 text-slate-800 md:text-base">
                          {title || "Strength"}
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
                  const issue = getItemText(item, [
                    "issue",
                    "title",
                    "description",
                  ]);
                  const suggestion = asText(item?.suggestion);
                  const priority = asText(item?.priority);

                  return (
                    <div
                      key={`${issue || "improvement"}-${index}`}
                      className="group flex gap-4 rounded-[2rem] border border-slate-200/60 bg-slate-50 p-5 transition-all hover:bg-white hover:shadow-lg"
                    >
                      <FaExclamationCircle className="mt-1 shrink-0 text-amber-500 transition-transform group-hover:rotate-12" />

                      <div>
                        <h3 className="text-sm font-bold leading-6 text-slate-800">
                          {issue || "Improvement"}
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

          {/* SCORE BREAKDOWN: ALL BACKEND CATEGORIES */}
          {Object.keys(categoryScores).length > 0 && (
            <Card>
              <SectionHeading
                icon={FaChartBar}
                title="Score Breakdown"
                subtitle="Role-specific category evaluation"
              />

              <div className="space-y-6">
                {Object.entries(categoryScores).map(([key, category]) => {
                  const rawScore = category?.score;
                  const value = Number(rawScore);

                  const isValidScore =
                    rawScore !== null &&
                    rawScore !== undefined &&
                    rawScore !== "" &&
                    Number.isFinite(value) &&
                    value >= 0 &&
                    value <= 100;

                  const categoryScore = isValidScore ? value : 0;
                  const weight = SCORE_WEIGHTS[key];

                  return (
                    <div key={key}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-slate-700">
                          {labelize(key)}
                        </span>

                        <span className="shrink-0 text-sm font-black text-slate-800">
                          {isValidScore ? `${value}/100` : "N/A"}
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
                          {asText(category.reason)}
                        </p>
                      )}

                      {weight !== undefined && (
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Score weight: {weight}%
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* PROJECTS */}
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
                      {asText(project?.name) || "Project"}
                    </h3>

                    {project?.purpose && (
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {asText(project.purpose)}
                      </p>
                    )}

                    {asArray(project?.technologies).length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => {
                          const techName = getItemText(tech, [
                            "name",
                            "title",
                            "technology",
                          ]);

                          return (
                            <span
                              key={`${techName || "technology"}-${techIndex}`}
                              className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                            >
                              {techName || "Unspecified technology"}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {asArray(project?.features).length > 0 && (
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
                              <span>
                                {getItemText(feature, [
                                  "name",
                                  "title",
                                  "description",
                                ]) || "Feature"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project?.candidateContribution && (
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        <strong className="text-slate-800">
                          Contribution:{" "}
                        </strong>
                        {asText(project.candidateContribution)}
                      </p>
                    )}

                    {asArray(project?.outcomes).length > 0 && (
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
                              •{" "}
                              {getItemText(outcome, [
                                "description",
                                "title",
                                "outcome",
                              ]) || "Outcome"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project?.evidence && (
                      <p className="mt-4 text-xs leading-6 text-slate-500">
                        <strong>Evidence: </strong>
                        {asText(project.evidence)}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No projects were identified in the resume.
              </p>
            )}
          </Card>

          {/* WORK EXPERIENCE */}
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
                      {asText(job?.jobTitle) || "Position"}
                    </h3>

                    {job?.organization && (
                      <p className="mt-1 text-sm font-bold text-indigo-700">
                        {asText(job.organization)}
                      </p>
                    )}

                    {job?.duration && (
                      <p className="mt-1 text-xs text-slate-400">
                        {asText(job.duration)}
                      </p>
                    )}

                    {asArray(job?.responsibilities).length > 0 && (
                      <div className="mt-4">
                        <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Responsibilities
                        </h4>

                        <ul className="space-y-2">
                          {job.responsibilities.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm leading-6 text-slate-600"
                            >
                              •{" "}
                              {getItemText(item, [
                                "description",
                                "title",
                                "responsibility",
                              ]) || "Responsibility"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {asArray(job?.achievements).length > 0 && (
                      <div className="mt-4">
                        <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Work Accomplishments & Impact
                        </h4>

                        <ul className="space-y-2">
                          {job.achievements.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm leading-6 text-slate-600"
                            >
                              •{" "}
                              {getItemText(item, [
                                "description",
                                "title",
                                "achievement",
                              ]) || "Achievement"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job?.evidence && (
                      <p className="mt-3 text-xs leading-6 text-slate-500">
                        <strong>Evidence: </strong>
                        {asText(job.evidence)}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No work experience was identified in the resume.
              </p>
            )}
          </Card>

          {/* EDUCATION */}
          <Card>
            <SectionHeading
              icon={FaGraduationCap}
              title="Education"
              subtitle="Academic background"
            />

            {education.length > 0 ? (
              <div className="space-y-4">
                {education.map((item, index) => (
                  <article
                    key={`${item?.qualification || "education"}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <h3 className="font-black text-slate-800">
                      {asText(item?.qualification) || "Qualification"}
                    </h3>

                    {item?.institution && (
                      <p className="mt-1 text-sm font-semibold text-indigo-700">
                        {asText(item.institution)}
                      </p>
                    )}

                    {item?.duration && (
                      <p className="mt-1 text-xs text-slate-400">
                        {asText(item.duration)}
                      </p>
                    )}

                    {asArray(item?.details).length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="text-sm leading-6 text-slate-600"
                          >
                            •{" "}
                            {getItemText(detail, [
                              "description",
                              "title",
                              "detail",
                            ]) || "Education detail"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No education details were identified in the resume.
              </p>
            )}
          </Card>

          {/* CERTIFICATIONS */}
          <Card>
            <SectionHeading
              icon={FaCertificate}
              title="Certifications"
              subtitle="Professional credentials"
            />

            {renderTextList(
              certifications,
              "No certifications were identified in the resume.",
            )}
          </Card>

          {/* ACHIEVEMENTS & IMPACT */}
          <Card>
            <SectionHeading
              icon={FaTrophy}
              title="Achievements & Impact"
              subtitle="Accomplishments supported by resume evidence"
            />

            {renderTextList(
              achievements,
              "No specific achievements were identified in the resume.",
            )}
          </Card>

          {/* FORMATTING ISSUES */}
          <Card>
            <SectionHeading
              icon={FaFileAlt}
              title="Formatting & Clarity"
              subtitle="Resume presentation checks"
            />

            {formattingIssues.length > 0 ? (
              <ul className="space-y-3">
                {formattingIssues.map((item, index) => {
                  const issue = getItemText(item, [
                    "issue",
                    "description",
                    "title",
                  ]);

                  return (
                    <li
                      key={`${issue || "formatting-issue"}-${index}`}
                      className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4"
                    >
                      <FaExclamationTriangle className="mt-1 shrink-0 text-amber-500" />

                      <div>
                        <p className="text-sm leading-6 text-slate-700">
                          {issue || "Formatting issue"}
                        </p>

                        {isObject(item) && item.suggestion && (
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            Suggestion: {asText(item.suggestion)}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                No specific formatting issues were identified.
              </p>
            )}
          </Card>

          {/* ANALYSIS LIMITATIONS */}
          {limitations.length > 0 && (
            <Card>
              <SectionHeading
                icon={FaInfoCircle}
                title="Analysis Limitations"
                subtitle="Context for interpreting your results"
              />

              {renderTextList(
                limitations,
                "No additional limitations were reported.",
              )}
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnalyzerResult;
