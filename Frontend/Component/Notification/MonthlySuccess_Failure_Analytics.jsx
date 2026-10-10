"use client";

import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = {
  success: "#10b981",
  failure: "#ef4444",
};

export default function MonthlySuccessFailureDonut() {
  const { Success_Failure_Analytics, loading, error } = useSelector(
    (state) => state.UserMonthlyNotificationById,
  );

  const successful = Number(Success_Failure_Analytics?.Successful_APIs ?? 0);
  const failed = Number(Success_Failure_Analytics?.Failed_APIs ?? 0);

  const total = Number(
    Success_Failure_Analytics?.Total_APIs ?? successful + failed,
  );

  const successPercentage = total > 0 ? (successful / total) * 100 : 0;
  const failurePercentage = total > 0 ? (failed / total) * 100 : 0;

  const chartData = [
    { name: "Successful", value: successful, color: COLORS.success },
    { name: "Failed", value: failed, color: COLORS.failure },
  ];

  return (
    <div className="mt-10 w-full max-w-7xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Monthly API Success & Failure
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Successful and failed API calls over the last four weeks
        </p>
      </div>

      {loading ? (
        <div className="flex h-[250px] items-center justify-center text-sm text-gray-500">
          Loading monthly API analytics...
        </div>
      ) : error ? (
        <div className="flex h-[250px] items-center justify-center text-sm text-red-500">
          Failed to load monthly API analytics.
        </div>
      ) : (
        <>
          <div className="relative h-[230px] w-full">
            {total > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={92}
                    paddingAngle={failed > 0 && successful > 0 ? 4 : 0}
                    stroke="none"
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [`${value} API calls`, name]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="h-[184px] w-[184px] rounded-full border-[22px] border-gray-200 dark:border-gray-700" />
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {total > 0 ? `${successPercentage.toFixed(0)}%` : "—"}
              </span>

              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Success rate
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Successful
                </span>
              </div>

              <div className="text-right">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {successPercentage.toFixed(1)}%
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({successful})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Failed
                </span>
              </div>

              <div className="text-right">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {failurePercentage.toFixed(1)}%
                </span>
                <span className="ml-2 text-sm text-gray-500">({failed})</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total API calls
                </span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  {total}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
