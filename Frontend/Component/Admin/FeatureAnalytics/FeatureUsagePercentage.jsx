"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import {
  FaFileAlt,
  FaChartLine,
  FaMicrophone,
  FaSpinner,
} from "react-icons/fa";

import { useSelector } from "react-redux";

const FeatureUsagePercentage = () => {
  const { Range_Feature_Usage, loading } = useSelector(
    (state) => state.FeatureAnalyticsSlice,
  );

  const totalApiCalls = Range_Feature_Usage?.Total_API_Calls ?? 0;

  const featureData = [
    {
      name: "Resume Builder",
      value: Range_Feature_Usage?.Total_Resumes ?? 0,
      icon: FaFileAlt,
    },
    {
      name: "ATS Analyzer",
      value: Range_Feature_Usage?.Total_ATS_Scores ?? 0,
      icon: FaChartLine,
    },
    {
      name: "Mock Interview",
      value: Range_Feature_Usage?.Total_Mock_Interviews ?? 0,
      icon: FaMicrophone,
    },
  ];

  const totalFeatureUsage = featureData.reduce(
    (total, item) => total + item.value,
    0,
  );

  const COLORS = ["#2563eb", "#10b981", "#8b5cf6"];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          Feature Usage Percentage
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Usage distribution across AI Career Assistant features.
        </p>
      </div>

      {loading ? (
        /* Loading */
        <div className="flex h-[280px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <FaSpinner size={28} className="animate-spin text-blue-600" />

            <p className="text-sm font-medium text-slate-500">
              Loading feature analytics...
            </p>
          </div>
        </div>
      ) : (
        /* Chart + Feature List */
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          {/* Donut Chart */}
          <div className="relative h-[280px] w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={featureData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={2}
                  stroke="none"
                >
                  {featureData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip formatter={(value, name) => [`${value} uses`, name]} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Content */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">
                {totalApiCalls}
              </span>

              <span className="mt-1 text-sm font-medium text-slate-500">
                Total API Calls
              </span>
            </div>
          </div>

          {/* Feature List */}
          <div className="w-full space-y-4 lg:w-1/2">
            {featureData.map((item, index) => {
              const Icon = item.icon;

              const percentage =
                totalFeatureUsage > 0
                  ? Math.round((item.value / totalFeatureUsage) * 100)
                  : 0;

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${COLORS[index]}15`,
                        color: COLORS[index],
                      }}
                    >
                      <Icon size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.value} api calls
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureUsagePercentage;
