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

const ACTIVE_INACTIVE_COLORS = {
  Active: "#2563eb",
  Inactive: "#94a3b8",
};

const Active_V_InActive = () => {
  const { ActiveUser, InActiveUser, TotalUser } = useSelector(
    (state) => state.UserAnalyticsSlice,
  );

  const chartData = useMemo(() => {
    const total = Number(TotalUser) || 0;
    const active = Number(ActiveUser) || 0;
    const inactive = Number(InActiveUser) || 0;

    if (total === 0) {
      return [];
    }

    return [
      {
        name: "Active",
        users: active,
        percentage: ((active / total) * 100).toFixed(1),
      },
      {
        name: "Inactive",
        users: inactive,
        percentage: ((inactive / total) * 100).toFixed(1),
      },
    ];
  }, [ActiveUser, InActiveUser, TotalUser]);

  return (
    <div className="mt-6 w-full max-w-5xl rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Active vs Inactive Users
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          See the distribution of active and inactive registered users.
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="users"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={125}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={ACTIVE_INACTIVE_COLORS[entry.name] || "#94a3b8"}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => {
                const user = chartData.find((item) => item.name === name);

                return [`${user?.percentage ?? 0}%`, name];
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => {
                const user = chartData.find((item) => item.name === value);

                return (
                  <span className="text-sm text-slate-600">
                    {value}{" "}
                    <span className="font-semibold text-slate-900">
                      {user?.percentage ?? 0}%
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
      </div>
    </div>
  );
};

export default Active_V_InActive;
