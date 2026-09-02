"use client";

import Link from "next/link";
import { FiHome, FiInfo, FiPhone, FiHelpCircle } from "react-icons/fi";

const AdminMobileSidebar = () => {
  return (
    <aside className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white sm:block md:hidden">
      <nav className="w-full">
        <ul className="flex items-center justify-around">
          <li>
            <Link
              href="/AdminDashboard"
              className="flex flex-col items-center gap-1 px-4 py-3 text-gray-700"
            >
              <FiHome size={20} />
              <span className="text-xs">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/about"
              className="flex flex-col items-center gap-1 px-4 py-3 text-gray-700"
            >
              <FiInfo size={20} />
              <span className="text-xs">About</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/contact"
              className="flex flex-col items-center gap-1 px-4 py-3 text-gray-700"
            >
              <FiPhone size={20} />
              <span className="text-xs">Contact</span>
            </Link>
          </li>

          <li>
            <Link
              href="/AdminDashboard/faq"
              className="flex flex-col items-center gap-1 px-4 py-3 text-gray-700"
            >
              <FiHelpCircle size={20} />
              <span className="text-xs">FAQ</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminMobileSidebar;
