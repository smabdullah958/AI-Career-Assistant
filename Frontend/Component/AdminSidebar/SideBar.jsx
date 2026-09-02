"use client";

import Link from "next/link";
import { FiHome, FiInfo, FiPhone, FiHelpCircle } from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white md:block">
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
      </div>

      <nav className="px-3">
        <ul className="space-y-2">
          <li>
            <Link
              href="/AdminDashboard"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FiHome size={20} />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/about"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FiInfo size={20} />
              <span>About</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/contact"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FiPhone size={20} />
              <span>Contact</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/faq"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FiHelpCircle size={20} />
              <span>FAQ</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
