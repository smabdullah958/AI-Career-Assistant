"use client";

import { useSelector } from "react-redux";

const AnalyzerPartialResult = () => {
  const { streamingResult } = useSelector((state) => state.AnalyzeSlice);

  const result = streamingResult ?? {};

  if (Object.keys(result).length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-800">
              AI is analyzing your resume...
            </h2>
          </div>

          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Generating your first insights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
          <h2 className="text-lg font-bold text-slate-800">
            AI is analyzing your resume...
          </h2>
        </div>

        {result.candidateOverview?.summary && (
          <section className="mb-6">
            <h3 className="font-bold text-slate-800 mb-2">
              {result.candidateOverview.professionalTitle ||
                "Candidate Overview"}
            </h3>
            <p className="text-sm leading-7 text-slate-600 whitespace-pre-wrap">
              {result.candidateOverview.summary}
            </p>
          </section>
        )}

        {Array.isArray(result.strengths) && result.strengths.length > 0 && (
          <section className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3">Key Strengths</h3>
            <ul className="space-y-3">
              {result.strengths.map((item, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-4"
                >
                  <p className="font-semibold text-slate-800">
                    {typeof item === "string" ? item : item.title}
                  </p>
                  {item?.evidence && (
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.evidence}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {Array.isArray(result.missingSkills) &&
          result.missingSkills.length > 0 && (
            <section className="mb-6">
              <h3 className="font-bold text-slate-800 mb-3">
                Skills to Develop
              </h3>
              <ul className="space-y-3">
                {result.missingSkills.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-slate-50 border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-slate-800">
                        {typeof item === "string" ? item : item.skill}
                      </p>
                      {item?.priority && (
                        <span className="text-xs text-amber-700 font-semibold">
                          {item.priority}
                        </span>
                      )}
                    </div>
                    {item?.reason && (
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.reason}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {Array.isArray(result.improvements) &&
          result.improvements.length > 0 && (
            <section className="mb-6">
              <h3 className="font-bold text-slate-800 mb-3">
                Recommended Improvements
              </h3>
              <ul className="space-y-3">
                {result.improvements.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-slate-50 border border-slate-200 p-4"
                  >
                    <p className="font-semibold text-slate-800">
                      {typeof item === "string" ? item : item.issue}
                    </p>
                    {item?.suggestion && (
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.suggestion}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {result.categoryScores &&
          Object.keys(result.categoryScores).length > 0 && (
            <section className="mb-6">
              <h3 className="font-bold text-slate-800 mb-3">Score Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(result.categoryScores).map(
                  ([key, category]) => (
                    <div key={key}>
                      <div className="flex justify-between gap-4 text-sm mb-1">
                        <span className="font-medium text-slate-700">
                          {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </span>
                        <span className="font-semibold text-indigo-700">
                          {typeof category?.score === "number"
                            ? `${category.score}/100`
                            : "Generating..."}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 transition-all duration-300"
                          style={{
                            width: `${
                              typeof category?.score === "number"
                                ? Math.min(100, Math.max(0, category.score))
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      {category?.reason && (
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {category.reason}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </div>
            </section>
          )}

        <p className="text-xs text-slate-400">
          More insights will appear automatically as the AI generates them.
        </p>
      </div>
    </div>
  );
};

export default AnalyzerPartialResult;
