"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useSelector } from "react-redux";

const FeatureUsageHorizental = () => {
  const { Range_Feature_Usage, loading } = useSelector(
    (state) => state.FeatureAnalyticsSlice,
  );

  const featureData = [
    {
      name: "Resume Builder",
      usage: Range_Feature_Usage?.Total_Resumes ?? 0,
    },
    {
      name: "ATS Analyzer",
      usage: Range_Feature_Usage?.Total_ATS_Scores ?? 0,
    },
    {
      name: "Mock Interview",
      usage: Range_Feature_Usage?.Total_Mock_Interviews ?? 0,
    },
  ];

  const totalUsage = featureData.reduce(
    (total, feature) => total + feature.usage,
    0,
  );

  const data = featureData.map((feature) => ({
    ...feature,
    percentage:
      totalUsage > 0 ? Math.round((feature.usage / totalUsage) * 100) : 0,
  }));

  return (
    <div className="w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Feature Usage</h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare usage across AI Career Assistant features.
        </p>
      </div>

      {loading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="mb-2 h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-full rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Total */}
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">
              Total Feature Usage
            </p>

            <h3 className="mt-1 text-3xl font-bold text-slate-900">
              {totalUsage.toLocaleString()}
            </h3>
          </div>

          {/* Feature Bars */}
          <div className="space-y-5">
            {data.map((feature) => (
              <div key={feature.name}>
                {/* Feature Name */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {feature.name}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    {feature.usage.toLocaleString()}{" "}
                    <span className="text-slate-400">
                      ({feature.percentage}%)
                    </span>
                  </span>
                </div>

                {/* Background Bar */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-blue-100">
                  {/* Usage Bar */}
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${feature.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeatureUsageHorizental;
