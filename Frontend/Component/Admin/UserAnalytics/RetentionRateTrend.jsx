"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";

const RetentionRateTrend = () => {
  const { RetentionRateTrend, loading } = useSelector(
    (state) => state.UserAnalyticsSlice,
  );

  const chartData =
    RetentionRateTrend?.map((item) => ({
      label: item.label,
      RetentionRate: Number(item.RetentionRate || 0),
    })) || [];

  return (
    <div className="mt-6 w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Retention Rate Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Retention rate according to the selected time period.
        </p>
      </div>

      {loading ? (
        <div className="flex h-72 items-center justify-center text-sm text-slate-500">
          Loading retention trend...
        </div>
      ) : chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="label" />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value) => [`${value}%`, "Retention Rate"]}
              />

              <Line
                type="monotone"
                dataKey="RetentionRate"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center text-sm text-slate-500">
          No retention data available.
        </div>
      )}
    </div>
  );
};

export default RetentionRateTrend;