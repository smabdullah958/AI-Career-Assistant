// "use client";

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import NotificationThunck from "@/Libraries/Thuncks/Notification/GetNotification";

// const page = () => {
//   let dispatch = useDispatch();
//   let { loading, success, response } = useSelector(
//     (state) => state.GetNotification,
//   );

//   useeffect(() => {
//     dispatch(NotificationThunck());
//   }, []);

//   return <div></div>;
// };

// export default page;

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoNotificationsOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

import NotificationThunck from "@/Libraries/Thuncks/Notification/GetNotification";
import { increment } from "@/Libraries/Slices/Notification/GetNotification";

const Page = () => {
  const dispatch = useDispatch();

  const { response, loading, page, hasMore } = useSelector(
    (state) => state.GetNotification,
  );

  useEffect(() => {
    dispatch(NotificationThunck(page));
  }, [page, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-[#0b0f19] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <IoNotificationsOutline size={24} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Notifications
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stay updated with your latest activity
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          {response?.map((notification) => (
            <div
              key={notification._id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-[#111827]"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <IoInformationCircleOutline size={23} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Title + Type */}
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                      {notification.title}
                    </h2>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {notification.type}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-5 space-y-3">
            <div className="h-24 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          </div>
        )}

        {/* Load More */}
        {response?.length > 0 && !loading && hasMore && (
          <div className="mt-7 flex justify-center">
            <button
              onClick={() => dispatch(increment())}
              className="rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Load More
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && response?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-700 dark:bg-[#111827]">
            <IoNotificationsOutline
              size={42}
              className="mx-auto mb-3 text-gray-400"
            />

            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              No notifications
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You don't have any notifications yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
