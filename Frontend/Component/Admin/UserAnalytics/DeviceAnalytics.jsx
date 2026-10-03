"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const DEVICE_COLORS = {
  desktop: "#2563eb",
  mobile: "#10b981",
  tablet: "#f97316",
};

const DeviceAnalytics = () => {
  const { DeviceType, TotalUser, loading } = useSelector(
    (state) => state.UserAnalyticsSlice,
  );

  const chartData = useMemo(() => {
    if (!Array.isArray(DeviceType)) {
      return [];
    }

    const total = DeviceType.reduce((sum, item) => sum + Number(item.users), 0);

    return DeviceType.map((item) => {
      const users = Number(item.users);

      return {
        device: item.device,
        users,
        percentage: total > 0 ? ((users / total) * 100).toFixed(1) : 0,
      };
    });
  }, [DeviceType]);

  return (
    <div className="w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Users by Device
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          See how users access your application across different devices.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full">
        {loading ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            {/* Donut Skeleton */}
            <div className="relative h-[230px] w-[230px] animate-pulse">
              <div className="h-full w-full rounded-full border-[35px] border-slate-200" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-7 w-16 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Legend Skeleton */}
            <div className="mt-4 flex items-center gap-6">
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Loading device analytics...
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="users"
                nameKey="device"
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={125}
                paddingAngle={3}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.device}
                    fill={
                      DEVICE_COLORS[entry.device.toLowerCase()] || "#94a3b8"
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => {
                  const device = chartData.find((item) => item.device === name);

                  return [
                    `${device?.percentage ?? 0}%`,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ];
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                formatter={(value) => {
                  const device = chartData.find(
                    (item) => item.device === value,
                  );

                  return (
                    <span className="text-sm text-slate-600">
                      {value.charAt(0).toUpperCase() + value.slice(1)}{" "}
                      <span className="font-semibold text-slate-900">
                        {device?.percentage ?? 0}%
                      </span>
                    </span>
                  );
                }}
              />

              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-900 text-3xl font-bold"
              >
                {TotalUser ?? 0}
              </text>

              <text
                x="50%"
                y="56%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-500 text-sm"
              >
                Total Users
              </text>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DeviceAnalytics;
