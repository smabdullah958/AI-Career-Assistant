import { FiBarChart2, FiUsers, FiBriefcase, FiActivity } from "react-icons/fi";

const stats = [
  { title: "Total Users", value: "12.4K", icon: FiUsers, color: "#2563eb" },
  { title: "Active Jobs", value: "842", icon: FiBriefcase, color: "#16a34a" },
  { title: "Interviews", value: "3.6K", icon: FiActivity, color: "#f59e0b" },
  { title: "Conversion", value: "68%", icon: FiBarChart2, color: "#8b5cf6" },
];

import AdminHeaderWrapper from "@/Component/AdminSidebar/AdminHeaderWrapper";

export default function AdminHomePage() {
  return (
    <div className="admin-page">
      <div className="flex justify-end px-6 py-3 md:hidden">
        <AdminHeaderWrapper />
      </div>

      <header className="admin-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here is your summary of the platform performance.</p>
      </header>

      <section className="admin-grid">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="admin-card">
            <div className="admin-stat">
              <div>
                <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {title}
                </div>
                <div className="admin-stat-value">{value}</div>
              </div>
              <div
                className="admin-icon"
                style={{ background: `${color}20`, color }}
              >
                <Icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-panel">
        <h2>Recent activity</h2>
        <div className="admin-list">
          <div className="admin-list-item">
            <strong>New candidate registered</strong>
            <span>John Doe joined today and completed profile setup.</span>
          </div>
          <div className="admin-list-item">
            <strong>Resume analysis completed</strong>
            <span>42 CVs were reviewed and scored in the last 24 hours.</span>
          </div>
          <div className="admin-list-item">
            <strong>Interview session scheduled</strong>
            <span>14 mock interviews were assigned to users this week.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
