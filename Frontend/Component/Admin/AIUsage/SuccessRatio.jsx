"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useSelector } from "react-redux";

const SuccessRatio = () => {
  const { Success_Ratio, loading } = useSelector((state) => state.AIUsageSlice);

  const chartData = [
    {
      name: "Success",
      value: Success_Ratio?.Success_Ratio ?? 0,
    },
    {
      name: "Failure",
      value: Success_Ratio?.Failure_Ratio ?? 0,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          AI Call Success & Failure
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Success and failure ratio of AI API calls.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[320px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-64 w-64 animate-pulse rounded-full bg-slate-100" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={110}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#16a34a" />
                <Cell fill="#ef4444" />
              </Pie>

              <Tooltip formatter={(value) => [`${value}%`, "Ratio"]} />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SuccessRatio;
