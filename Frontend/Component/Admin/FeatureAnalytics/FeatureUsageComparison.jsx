"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";

const FeatureUsageComparison = () => {
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

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Feature Usage</h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare usage across AI Career Assistant features.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[320px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-full w-full animate-pulse rounded-lg bg-slate-100" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={featureData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="30%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={40}
              />

              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                formatter={(value) => [`${value} uses`, "Usage"]}
              />

              <Bar
                dataKey="usage"
                name="Feature Usage"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FeatureUsageComparison;
