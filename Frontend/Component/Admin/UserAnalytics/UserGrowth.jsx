// "use client";

// import { useSelector } from "react-redux";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const UserGrowth = () => {
//   const { UserGrowth } = useSelector((state) => state.UserAnalyticsSlice);

//   return (
//     <div className="mt-6 w-full max-h-screen rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
//       {/* Header */}
//       <div className="mb-5">
//         <h2 className="text-lg font-semibold text-slate-900">User Growth</h2>

//         <p className="mt-1 text-sm text-slate-500">
//           Track your user growth and activity over time.
//         </p>
//       </div>

//       {/* Chart */}
//       <div className="h-[350px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={UserGrowth}
//             margin={{
//               top: 10,
//               right: 20,
//               left: 0,
//               bottom: 10,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />

//             <XAxis
//               dataKey="label"
//               tickLine={false}
//               axisLine={false}
//               tick={{ fontSize: 12 }}
//             />

//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tick={{ fontSize: 12 }}
//               allowDecimals={false}
//             />

//             <Tooltip />

//             {/* New Users */}
//             <Line
//               type="monotone"
//               dataKey="New_User"
//               name="New Users"
//               stroke="#2563eb"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />

//             {/* Active Users */}
//             <Line
//               type="monotone"
//               dataKey="Active_User"
//               name="Active Users"
//               stroke="#10b981"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />

//             {/* Total Users */}
//             <Line
//               type="monotone"
//               dataKey="Total_User"
//               name="Total Users"
//               stroke="#7c3aed"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default UserGrowth;

"use client";

import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const UserGrowth = () => {
  const { UserGrowth } = useSelector((state) => state.UserAnalyticsSlice);

  const chartData = Array.isArray(UserGrowth) ? UserGrowth : [];

  return (
    <div className="mt-6 w-full max-w-5xl rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">User Growth</h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your user growth and activity over time.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip />

            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              iconType="line"
              wrapperStyle={{
                fontSize: "13px",
              }}
            />

            {/* New Users */}
            <Line
              type="monotone"
              dataKey="New_User"
              name="New Users"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={800}
            />

            {/* Active Users */}
            <Line
              type="monotone"
              dataKey="Active_User"
              name="Active Users"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={800}
            />

            {/* Total Users */}
            <Line
              type="monotone"
              dataKey="Total_User"
              name="Total Users"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowth;
