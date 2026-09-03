"use client";

import Link from "next/link";
import { FiHome, FiInfo, FiPhone, FiHelpCircle } from "react-icons/fi";
import HeaderWrapper from "@/Component/HeaderWrapper";

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-56 flex-col border-r border-gray-200 bg-[#618cf9] md:flex">
      {/* Top */}
      <div className="p-5">
        <h2 className="text-white hover:text-blue-700 transition-colors duration-300">
          Admin Dashboard
        </h2>
      </div>

      {/* Center Navigation */}
      <nav className="flex flex-1 items-center px-3">
        <ul className="w-full space-y-2">
          <li>
            <Link
              href="/AdminDashboard"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-blue-700"
            >
              <FiHome size={20} />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/About"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-blue-700"
            >
              <FiInfo size={20} />
              <span>About</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/Contact"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-blue-700"
            >
              <FiPhone size={20} />
              <span>Contact</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/FAQ"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-blue-700"
            >
              <FiHelpCircle size={20} />
              <span>FAQ</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/Notification"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-blue-700"
            >
              Notification
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom - Logout */}
      <div className="p-5">
        <HeaderWrapper />
      </div>
    </aside>
  );
};

export default AdminSidebar;
