"use client";

import { useSelector } from "react-redux";

const UserByCountry = () => {
  const { UserByCountry, loading } = useSelector(
    (state) => state.UserAnalyticsSlice,
  );

  const totalActiveUsers =
    UserByCountry?.reduce(
      (total, item) => total + Number(item.activeUsers || 0),
      0,
    ) || 0;

  return (
    <div className="mt-6 w-full max-w-5xl rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Active Users by Country
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Active users according to the selected time period.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                #
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Country
              </th>

              <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                Active Users
              </th>

              <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                Ratio
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  Loading country analytics...
                </td>
              </tr>
            ) : UserByCountry?.length > 0 ? (
              UserByCountry.map((item, index) => {
                const activeUsers = Number(item.activeUsers || 0);

                const ratio =
                  totalActiveUsers > 0
                    ? ((activeUsers / totalActiveUsers) * 100).toFixed(1)
                    : "0.0";

                return (
                  <tr
                    key={`${item.country}-${index}`}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {item.country}
                    </td>

                    <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                      {activeUsers}
                    </td>

                    <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                      {ratio}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No country data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserByCountry;
