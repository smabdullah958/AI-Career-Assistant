"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaServer, FaFileAlt, FaMicrophone, FaChartLine } from "react-icons/fa";

import GetFeatureUsage from "@/Libraries/Thuncks/UserAnalytics/FeatureAnalyzerThunck";
import FeatureUsagePercentage from "@/Component/Admin/FeatureAnalytics/FeatureUsagePercentage";
import FeatureUsageComparison from "@/Component/Admin/FeatureAnalytics/FeatureUsageComparison";
import FeatureUsageOverTime from "@/Component/Admin/FeatureAnalytics/FeatureUsageOverTime";
import FeatureUsageHorizental from "@/Component/Admin/FeatureAnalytics/FeatureUsageHorizental";

const FeatureAnalytics = () => {
  const dispatch = useDispatch();

  // Monthly selected by default
  const [period, setPeriod] = useState("30d");

  const { Feature_Analytics, loading } = useSelector(
    (state) => state.FeatureAnalyticsSlice,
  );

  useEffect(() => {
    dispatch(GetFeatureUsage(period));
  }, [dispatch, period]);

  const periods = [
    {
      label: "Weekly",
      value: "7d",
    },
    {
      label: "Monthly",
      value: "30d",
    },
    {
      label: "Yearly",
      value: "1y",
    },
  ];

  const analytics = [
    {
      title: "Total API Calls",
      value: Feature_Analytics?.Total_API_Calls,
      icon: FaServer,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Resumes",
      value: Feature_Analytics?.Total_Resumes,
      icon: FaFileAlt,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Mock Interviews",
      value: Feature_Analytics?.Total_Mock_Interviews,
      icon: FaMicrophone,
      iconClass: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total ATS Scores",
      value: Feature_Analytics?.Total_ATS_Scores,
      icon: FaChartLine,
      iconClass: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="h-full w-full px-5 py-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Feature Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track API usage and AI feature activity.
          </p>
        </div>

        {/* ================= PERIOD BUTTONS ================= */}
        <div className="flex w-fit items-center gap-1 rounded-xl bg-white p-1 shadow-md">
          {periods.map((item) => {
            const isActive = period === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setPeriod(item.value)}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= ANALYTICS CARDS ================= */}
      {/* ================= ANALYTICS CARDS ================= */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analytics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconClass}`}
                >
                  <Icon size={20} />
                </div>

                <p className="text-sm font-medium text-slate-600">
                  {item.title}
                </p>
              </div>

              {/* Card Value */}
              <div className="mt-5">
                {loading ? (
                  <div className="h-9 w-20 animate-pulse rounded-md bg-slate-200" />
                ) : (
                  <p className="text-3xl font-bold text-slate-900">
                    {item.value ?? 0}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FEATURE ANALYTICS ================= */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <FeatureUsagePercentage />

        <FeatureUsageComparison />

        <FeatureUsageOverTime />

        <FeatureUsageHorizental />
      </div>
    </div>
  );
};

export default FeatureAnalytics;
