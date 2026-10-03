"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";

import UserAnalyticsThunck from "@/Libraries/Thuncks/UserAnalytics/UserAnalytics";
import UserGrowth from "@/Component/Admin/UserAnalytics/UserGrowth";
import DeviceAnalytics from "@/Component/Admin/UserAnalytics/DeviceAnalytics";
import Active_V_InActive from "@/Component/Admin/UserAnalytics/ActiveVInactive";
import UserByCountry from "@/Component/Admin/UserAnalytics/UserByCountry";
import RetentionRateTrend from "@/Component/Admin/UserAnalytics/RetentionRateTrend";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Monthly will be selected by default
  const [period, setPeriod] = useState("30d");

  const { loading, ActiveUser, InActiveUser, TotalUser, RetentionRate } =
    useSelector((state) => state.UserAnalyticsSlice);

  // Call analytics API whenever period changes
  useEffect(() => {
    dispatch(UserAnalyticsThunck(period));
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
      title: "Total Registered Users",
      value: TotalUser,
      icon: FaUsers,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Users",
      value: ActiveUser,
      icon: FaUserCheck,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Inactive Users",
      value: InActiveUser,
      icon: FaUserTimes,
      iconClass: "bg-red-100 text-red-600",
    },
    {
      title: "Retention Rate",
      value: RetentionRate !== null ? `${RetentionRate}%` : null,
      icon: MdOutlineQueryStats,
      iconClass: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="w-full px-5 py-6 h-[100%]">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Heading */}
        <div>
          <p className="mt-1 text-sm text-slate-500">
            Track your user base, engagement and growth.
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

      {/* ================= USER ANALYTICS ================= */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <UserGrowth />

        <DeviceAnalytics />

        <Active_V_InActive />

        <UserByCountry />

        <RetentionRateTrend />
      </div>
    </div>
  );
};

export default AdminDashboard;
