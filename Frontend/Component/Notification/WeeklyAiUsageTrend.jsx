"use client";

import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const featureLines = [
  {
    key: "resume_builder",
    name: "Resume Builder",
    color: "#8b5cf6",
  },
  {
    key: "ats_analyzer",
    name: "ATS Analyzer",
    color: "#06b6d4",
  },
  {
    key: "mock_interview",
    name: "Mock Interview",
    color: "#10b981",
  },
];

const getLastSevenDays = () => {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    days.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      resume_builder: 0,
      ats_analyzer: 0,
      mock_interview: 0,
    });
  }

  return days;
};

export default function WeeklyUsageTrend() {
  const { Weekly_Credit_UsageTrend, loading, error } = useSelector(
    (state) => state.UserWeeklyNotificationById,
  );

  const apiData = Weekly_Credit_UsageTrend?.WeeklyData;

  const data =
    Array.isArray(apiData) && apiData.length > 0
      ? apiData.map((item) => ({
          ...item,
          resume_builder: Number(item.resume_builder ?? 0),
          ats_analyzer: Number(item.ats_analyzer ?? 0),
          mock_interview: Number(item.mock_interview ?? 0),
        }))
      : getLastSevenDays();

  return (
    <div className="mt-10 w-full max-w-7xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weekly Usage Trend
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Daily API calls across your AI features
        </p>
      </div>

      {loading ? (
        <div className="flex h-[300px] animate-pulse items-center justify-center text-sm text-gray-500">
          Loading weekly usage...
        </div>
      ) : error ? (
        <div className="flex h-[300px] items-center justify-center text-center text-sm text-red-500">
          Failed to load weekly usage data.
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 12, left: -15, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#9ca3af"
                vertical={false}
                opacity={0.25}
              />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />

              <YAxis
                allowDecimals={false}
                domain={[0, "auto"]}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={35}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [`${value} API calls`, name]}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "12px",
                }}
              />

              {featureLines.map((feature) => (
                <Line
                  key={feature.key}
                  type="monotone"
                  dataKey={feature.key}
                  name={feature.name}
                  stroke={feature.color}
                  strokeWidth={2.5}
                  dot={{ r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
