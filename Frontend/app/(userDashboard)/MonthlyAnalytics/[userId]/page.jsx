"use client";

import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserMonthlyNotificationById from "@/Libraries/Thuncks/Notification/UserMonthlyNotificationByIdThunck";
import MonthlyUsageTrend from "@/Component/Notification/MonthlyAiUsageTrend";
import MonthlySuccessFailureDonut from "@/Component/Notification/MonthlySuccess_Failure_Analytics";

export default function MonthlyAnalyticsPage({ params }) {
  const { userId } = use(params);

  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);

  const { Monthly_Credit_Analytics, loading, error } = useSelector(
    (state) => state.UserMonthlyNotificationById,
  );

  useEffect(() => {
    if (!userId) {
      setPageLoading(false);
      return;
    }

    setPageLoading(true);

    dispatch(UserMonthlyNotificationById(userId)).finally(() => {
      setPageLoading(false);
    });
  }, [userId, dispatch]);

  if (pageLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-[#0b0f19]">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-[#0b0f19]">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
            Failed to load weekly analytics.
          </div>
        </div>
      </div>
    );
  }

  if (!Monthly_Credit_Analytics) {
    return null;
  }

  const {
    Total_Credits,
    Credits_Consumed,
    Credits_Unused,
    Credits_By_Feature,
    Average_Credits_Per_Feature,
  } = Monthly_Credit_Analytics;

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-6 dark:bg-[#0b0f19] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Weekly Analytics
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            AI feature usage for the last 7 days
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Credits
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {Total_Credits}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Credits Consumed
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {Credits_Consumed}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Credits Unused
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {Credits_Unused}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average Per Feature
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {Average_Credits_Per_Feature}
            </h2>
          </div>
        </div>

        {/* Credits By Feature */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Credits By Feature
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Resume Builder
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {Credits_By_Feature?.resume_builder || 0}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ATS Analyzer
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {Credits_By_Feature?.ats_analyzer || 0}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mock Interview
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {Credits_By_Feature?.mock_interview || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="mt-6 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <MonthlyUsageTrend />
          <MonthlySuccessFailureDonut />
        </div>
      </div>
    </div>
  );
}
