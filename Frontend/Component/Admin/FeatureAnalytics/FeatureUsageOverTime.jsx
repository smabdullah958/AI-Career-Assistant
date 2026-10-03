"use client";

import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FeatureUsageOverTime = () => {
  const { Feature_Usage_Over_Time, loading } = useSelector(
    (state) => state.FeatureAnalyticsSlice,
  );

  const chartData = Feature_Usage_Over_Time || [];

  return (
    <div className="mt-6 w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Feature Usage</h2>

        <p className="mt-1 text-sm text-slate-500">
          Track Resume Builder, ATS Analyzer, and Mock Interview usage.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex h-[350px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="text-sm text-slate-500">Loading feature usage...</p>
          </div>
        </div>
      ) : (
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />

              <Tooltip />

              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="line"
                wrapperStyle={{
                  fontSize: "13px",
                }}
              />

              <Line
                type="monotone"
                dataKey="Total_Resumes"
                name="Resume Builder"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="Total_ATS_Scores"
                name="ATS Analyzer"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="Total_Mock_Interviews"
                name="Mock Interview"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default FeatureUsageOverTime;
