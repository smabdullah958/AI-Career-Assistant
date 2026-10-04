"use client";

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

import { useSelector } from "react-redux";

const AiCallsTrend = () => {
  const { AI_Calls_Trend, loading } = useSelector(
    (state) => state.AIUsageSlice,
  );

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">AI Calls Trend</h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare total and successful AI API calls over time.
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
            <LineChart
              data={AI_Calls_Trend || []}
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

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="Total_API_Calls"
                name="Total API Calls"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="Successful_API_Calls"
                name="Successful API Calls"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AiCallsTrend;
