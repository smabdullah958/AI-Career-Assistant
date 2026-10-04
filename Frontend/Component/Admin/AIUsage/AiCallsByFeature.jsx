"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { useSelector } from "react-redux";

const AiCallsByFeature = () => {
  const { AI_Calls_By_Feature, loading } = useSelector(
    (state) => state.AIUsageSlice,
  );

  const featureData = [
    {
      name: "Resume Builder",
      usage: AI_Calls_By_Feature?.Total_Resumes ?? 0,
    },
    {
      name: "ATS Analyzer",
      usage: AI_Calls_By_Feature?.Total_ATS_Scores ?? 0,
    },
    {
      name: "Mock Interview",
      usage: AI_Calls_By_Feature?.Total_Mock_Interviews ?? 0,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          AI Calls By Feature
        </h2>

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
                top: 20,
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
                formatter={(value) => [`${value} API calls`, "Usage"]}
              />

              <Bar
                dataKey="usage"
                name="Feature Usage"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              >
                <LabelList
                  dataKey="usage"
                  position="top"
                  formatter={(value) => value.toLocaleString()}
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    fill: "#0f172a",
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AiCallsByFeature;
