import React from "react";

const DashboardPreview = () => {
  const chartData = [
    { hour: "08:00", errors: 1, height: "15%" },
    { hour: "10:00", errors: 3, height: "40%" },
    { hour: "12:00", errors: 0, height: "5%" },
    { hour: "14:00", errors: 2, height: "25%" },
    { hour: "16:00", errors: 5, height: "65%" },
    { hour: "18:00", errors: 7, height: "100%" },
    { hour: "20:00", errors: 4, height: "55%" },
    { hour: "22:00", errors: 2, height: "25%" },
    { hour: "00:00", errors: 1, height: "15%" },
    { hour: "02:00", errors: 1, height: "15%" },
    { hour: "04:00", errors: 0, height: "5%" },
    { hour: "06:00", errors: 2, height: "25%" },
  ];

  return (
    <div className="mt-25 p-3 sm:p-6 md:p-8 rounded-xl border border-gray-200 bg-gray-50 w-full overflow-hidden box-border">
      <div className="bg-white text-gray-900 font-sans p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-200 shadow-2xl w-full overflow-hidden">
        <div className="flex flex-col gap-6 w-full">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2 w-full">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">
                  GitAtlas Production
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                  ACTIVE
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 font-mono truncate">
                ID: px_mpr6nv8n
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <button className="flex-1 md:flex-none px-4 py-2 text-sm font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition shadow-sm whitespace-nowrap">
                Copy Script Tag
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 text-sm font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition shadow-sm">
                Settings
              </button>
            </div>
          </div>

          {/* Integration Script Alert */}
          <div className="border border-orange-200 bg-orange-50/30 rounded-lg p-4 w-full overflow-hidden">
            <div className="flex flex-row justify-between sm:items-center gap-2 mb-3">
              <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Integration Script{" "}
                <span className="text-gray-500 normal-case font-normal tracking-normal sm:ml-2 block sm:inline">
                  Add to your &lt;head&gt; tag
                </span>
              </div>
              <button className="text-xs font-semibold text-orange-600 hover:text-orange-700 self-start sm:self-auto uppercase shrink-0">
                Copy
              </button>
            </div>
            {/* overflow-x-auto so code scrolls instead of breaking layout */}
            <div className="bg-gray-950 text-gray-300 font-mono text-xs sm:text-sm p-3 rounded-md overflow-x-auto w-full">
              <code className="whitespace-nowrap">
                &lt;script <span className="text-emerald-400">src=</span>
                <span className="text-orange-300">
                  "https://wincedeck.vercel.app/tracker.js?id=px_mpr6nv8n"
                </span>
                &gt;&lt;/script&gt;
              </code>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {[
              { label: "TOTAL ERRORS", value: "126" },
              {
                label: "ERRORS TODAY",
                value: "7",
                valueColor: "text-orange-500",
              },
              { label: "AFFECTED PAGES", value: "10" },
              { label: "LAST ERROR", value: "10 mins ago" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white min-w-0 overflow-hidden"
              >
                <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 truncate">
                  {stat.label}
                </h3>
                <p
                  className={`text-2xl sm:text-3xl font-bold truncate ${stat.valueColor || "text-gray-900"}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm bg-white w-full overflow-hidden">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Error Frequency - Last 24 Hours
            </h3>
            <p className="text-2xl font-bold mb-6">
              28{" "}
              <span className="text-sm font-normal text-gray-500 uppercase tracking-wider">
                Total
              </span>
            </p>

            <div className="relative h-40 sm:h-48 w-full border-b border-gray-200 flex items-end justify-between gap-1 sm:gap-2 pb-0 mt-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
              </div>

              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 transition-colors rounded-t-sm z-10 relative group min-w-0"
                  style={{ height: data.height }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap shadow-md z-20 hidden sm:block">
                    {data.errors} Errors
                  </div>
                  <div className="absolute -bottom-6 w-full text-center text-[8px] sm:text-[10px] text-gray-400 truncate">
                    {data.hour.split(":")[0]}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-6"></div>
          </div>

          {/* Recent Errors Table */}
          <div className="border border-gray-200 rounded-lg shadow-sm bg-white w-full overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Recent Errors</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Streaming live - 5 shown
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              {[
                {
                  msg: "ReferenceError: stripe is not defined",
                  file: "checkout.js:2:16",
                  url: "/billing",
                  count: "2",
                  time: "56 mins ago",
                },
                {
                  msg: "TypeError: cannot read 'map' of undefined",
                  file: "UserGrid.js:108",
                  url: "/dashboard",
                  count: "2",
                  time: "13 mins ago",
                },
                {
                  msg: "NetworkError: Failed to fetch API",
                  file: "auth.js:12",
                  url: "/auth/callback",
                  count: "1",
                  time: "21 mins ago",
                },
              ].map((err, i) => (
                <div
                  key={i}
                  className="hover:bg-gray-50 transition cursor-pointer group flex justify-between items-center px-4 py-3"
                >
                  <div className={`w-[40%]`}>
                    <div className="font-mono text-red-600 text-xs mb-1 truncate">
                      {err.msg}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {err.file}
                    </div>
                  </div>
                  <div className={`text-[13px]`}>{err.url}</div>
                  <div className="px-4 py-3 text-right text-gray-500 text-xs">
                    {err.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
