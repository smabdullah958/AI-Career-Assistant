"use client";

import { useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaLightbulb,
  FaChartBar,
  FaRobot,
  FaInfoCircle,
} from "react-icons/fa";

const AnalyzerResult = () => {
  const { response } = useSelector((state) => state.AnalyzeSlice);

  // Handle missing response safely.
  const result = response ?? {};

  // The backend now returns roleReadinessScore, not atsScore.
  const parsedScore = Number(result.roleReadinessScore);
  const score = Number.isFinite(parsedScore)
    ? Math.min(100, Math.max(0, parsedScore))
    : 0;

  const summary = result.candidateOverview?.summary ?? "";

  const missingSkills = Array.isArray(result.missingSkills)
    ? result.missingSkills
    : [];

  const strengths = Array.isArray(result.strengths) ? result.strengths : [];

  const improvements = Array.isArray(result.improvements)
    ? result.improvements
    : [];

  const getScoreStyles = (value) => {
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

  const styles = getScoreStyles(score);
  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* HEADER INFO */}
      <div className="flex items-center gap-3 mb-8 bg-indigo-50 w-fit px-6 py-2 rounded-full border border-indigo-100">
        <FaRobot className="text-indigo-600" />
        <span className="text-indigo-900 font-black text-xs uppercase tracking-tighter">
          AI Analysis Complete
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL: SCORE HUB */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${styles.bg}`}
            />

            <h3 className="text-slate-400 font-black text-[11px] uppercase tracking-[0.3em] mb-10 text-center">
              Role Readiness Score
            </h3>

            {/* SAFE SVG SCORE */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg
                viewBox="0 0 192 192"
                className="w-full h-full -rotate-90"
                role="img"
                aria-label={`Role readiness score: ${score}%`}
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
                  className={`text-5xl font-black tracking-tighter ${styles.color}`}
                >
                  {score}%
                </span>

                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Readiness
                </span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <FaInfoCircle className="text-xs" />
                <span className="text-[10px] font-bold uppercase">
                  Executive Summary
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                {summary || "No resume summary was provided."}
              </p>
            </div>
          </div>

          {/* KEYWORDS TO DEVELOP */}
          <div className="bg-indigo-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <FaChartBar size={80} />
            </div>

            <h3 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              Skills to Develop
            </h3>

            <div className="flex flex-wrap gap-2 relative z-10">
              {missingSkills.length > 0 ? (
                missingSkills.map((item, index) => {
                  const skill = typeof item === "string" ? item : item.skill;

                  return (
                    <div
                      key={`${skill}-${index}`}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-3 rounded-xl transition-colors"
                    >
                      <span className="text-[11px] font-bold">
                        + {skill || "Unspecified skill"}
                      </span>

                      {typeof item === "object" && item?.reason && (
                        <p className="mt-1 text-xs text-indigo-200">
                          {item.reason}
                        </p>
                      )}

                      {typeof item === "object" && item?.priority && (
                        <span className="mt-1 block text-[10px] uppercase text-indigo-300">
                          Priority: {item.priority}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-indigo-200">
                  No specific skill gaps were identified.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: DETAILS */}
        <div className="lg:col-span-8 space-y-6">
          {/* STRENGTHS */}
          <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <FaCheckCircle size={24} />
                </div>

                <div>
                  <h3 className="font-black text-slate-800 text-xl tracking-tight">
                    Key Strengths
                  </h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Evidence from your resume
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {strengths.length > 0 ? (
                strengths.map((item, index) => {
                  const title =
                    typeof item === "string" ? item : item.title || "Strength";

                  const evidence =
                    typeof item === "object" ? item.evidence : "";

                  return (
                    <div
                      key={`${title}-${index}`}
                      className="group flex items-start gap-5 p-5 bg-emerald-50/30 hover:bg-emerald-50 rounded-3xl border border-emerald-100/50 transition-all"
                    >
                      <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm font-black text-sm group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>

                      <div>
                        <h4 className="text-slate-700 font-semibold text-sm md:text-base leading-snug">
                          {title}
                        </h4>

                        {evidence && (
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
          </div>

          {/* IMPROVEMENTS */}
          <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
                <FaLightbulb size={24} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 text-xl tracking-tight">
                  Strategy for Success
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                  Resume improvement recommendations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvements.length > 0 ? (
                improvements.map((item, index) => {
                  const issue =
                    typeof item === "string"
                      ? item
                      : item.issue || "Improvement";

                  const suggestion =
                    typeof item === "object" ? item.suggestion : "";

                  const priority =
                    typeof item === "object" ? item.priority : "";

                  return (
                    <div
                      key={`${issue}-${index}`}
                      className="flex gap-4 p-6 bg-slate-50 hover:bg-white hover:shadow-lg rounded-[2rem] border border-slate-200/60 transition-all group"
                    >
                      <FaExclamationCircle className="text-amber-500 mt-1 shrink-0 group-hover:rotate-12 transition-transform" />

                      <div>
                        <h4 className="text-slate-700 text-sm font-bold leading-relaxed">
                          {issue}
                        </h4>

                        {suggestion && (
                          <p className="mt-2 text-slate-600 text-[13px] leading-relaxed">
                            {suggestion}
                          </p>
                        )}

                        {priority && (
                          <span className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-amber-600">
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
          </div>

          {/* CATEGORY SCORE BREAKDOWN */}
          {result.categoryScores && (
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-slate-100">
              <h3 className="font-black text-slate-800 text-xl mb-6">
                Score Breakdown
              </h3>

              <div className="space-y-5">
                {Object.entries(result.categoryScores).map(
                  ([key, category]) => {
                    const value = Number(category?.score);
                    const categoryScore = Number.isFinite(value)
                      ? Math.min(100, Math.max(0, value))
                      : 0;

                    const label = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (char) => char.toUpperCase());

                    return (
                      <div key={key}>
                        <div className="flex justify-between gap-4 mb-2">
                          <span className="text-sm font-bold text-slate-700">
                            {label}
                          </span>
                          <span className="text-sm font-black text-slate-800">
                            {categoryScore}/100
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                            style={{ width: `${categoryScore}%` }}
                          />
                        </div>

                        {category?.reason && (
                          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                            {category.reason}
                          </p>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzerResult;
