import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import ErrorRowCard from "./ErrorRowCard";
import { CiViewTable } from "react-icons/ci";

const dateFilterList = ["Today", "Last 7 days", "Last 30 days", "All time"];

function ErrorTable({ errorData, onResolve, onUnresolve, activeTab }) {
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("Today");
  const [searchError, setSearchError] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const filteredErrors = errorData.filter((err) => {
    const matchesSearch =
      !searchError ||
      err.message.toLowerCase().includes(searchError.toLowerCase());

    const matchesUrl =
      !searchUrl || err.pageUrl.toLowerCase().includes(searchUrl.toLowerCase());

    const matchesDate =
      dateFilter === "All time" ||
      (() => {
        const errorDate = new Date(err.lastSeen);
        const now = new Date();

        if (dateFilter === "Today") {
          return errorDate.toDateString() === now.toDateString();
        }
        if (dateFilter === "Last 7 days") {
          return errorDate >= new Date(now - 7 * 24 * 60 * 60 * 1000);
        }
        if (dateFilter === "Last 30 days") {
          return errorDate >= new Date(now - 30 * 24 * 60 * 60 * 1000);
        }
      })();

    return matchesSearch && matchesUrl && matchesDate;
  });

  return (
    <div
      className={`w-full h-fit border border-gray-200 rounded-xl mb-10 overflow-hidden`}
    >
      <div
        className={`w-full h-fit rounded-t-[inherit] p-5 border-b border-gray-200 flex flex-col gap-y-3.5 lg:flex-row justify-between lg:items-center`}
      >
        <div className={`flex flex-col gap-y-1 justify-start`}>
          <span className={`text-sm font-bold`}>Recent Errors</span>
          <div className={`flex items-center gap-x-1.5 text-gray-500`}>
            <div className={`h-1.5 w-1.5 rounded-full bg-green-500`}></div>
            <span className={`text-xs`}>
              Streaming live - {filteredErrors.length} shown
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-x-2 flex-wrap gap-y-2`}>
          <div className={`relative`}>
            <div
              className={`border border-gray-200 rounded-lg h-7.5 w-28 flex items-center justify-between text-xs pl-2.5 cursor-pointer transition-discrete ease-in-out duration-150 ${isDateFilterOpen && "ring-2 ring-[#f97314b2]"}`}
              onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
            >
              {dateFilter}
              <MdKeyboardArrowDown
                className={`text-lg transition-transform ease-in-out duration-150
                ${isDateFilterOpen && "rotate-180"}`}
              />
            </div>
            <div
              className={`top-8 text-xs bg-white border border-gray-200 rounded-lg w-full overflow-auto
                ${isDateFilterOpen ? "absolute" : "hidden"}`}
            >
              {dateFilterList.map((filter, index) => (
                <div
                  key={index}
                  className={`py-1 hover:bg-[#f973144e] pl-2.5 cursor-pointer`}
                  onClick={() => {
                    setDateFilter(filter);
                    setIsDateFilterOpen(false);
                  }}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`border border-gray-200 rounded-lg h-7.5 w-50 pl-1.5 flex items-center text-xs cursor-pointer font-mono
                focus-within:ring-2 focus-within:ring-[#f97314b2] transition-discrete ease-in-out duration-150`}
          >
            <CiSearch className={`text-[14px] text-gray-700`} />
            <input
              type="text"
              value={searchError}
              placeholder="Search error message"
              className={`h-full flex-1 outline-none px-1.5`}
              onChange={(e) => setSearchError(e.target.value)}
            />
          </div>
          <div
            className={`border border-gray-200 rounded-lg h-7.5 w-38 pl-1.5 flex items-center text-xs cursor-pointer font-mono
                focus-within:ring-2 focus-within:ring-[#f97314b2] transition-discrete ease-in-out duration-150`}
          >
            <input
              type="text"
              value={searchUrl}
              placeholder="Filter by URL"
              className={`h-full w-full outline-none px-1.5`}
              onChange={(e) => setSearchUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        {filteredErrors.length > 0 ? (
          <table className="w-full min-w-160 border-collapse align-middle">
            <thead>
              <tr className="h-9 text-[10.5px] bg-gray-50 text-gray-500 tracking-wider border-b border-gray-200">
                <th className="text-left pl-5.5 font-medium">ERROR MESSAGE</th>
                <th className="text-left pl-5.5 min-w-30 font-medium hidden md:table-cell">
                  PAGE URL
                </th>
                <th className="text-right pr-14 min-w-28 font-medium">COUNT</th>
                <th className="text-left pl-5.5 min-w-28 font-medium">TIME</th>
                <th>{""}</th>
              </tr>
            </thead>

            <tbody>
              {filteredErrors.length > 0 &&
                filteredErrors.map((err, index) => (
                  <ErrorRowCard
                    key={index}
                    message={err.message}
                    source={err.source}
                    pageUrl={err.pageUrl}
                    frequency={err.count}
                    timeAgo={err.timeAgo}
                    severity={err.severity}
                    stackTrace={err.stackTrace}
                    capturedAt={err.capturedAt}
                    activeTab={activeTab}
                    onResolve={onResolve}
                    onUnresolve={onUnresolve}
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <div className={`h-75 flex items-center justify-center`}>
            <div className={`flex flex-col gap-y-0.5 items-center`}>
              <CiViewTable className={`text-[2.3rem] text-[#f97314]`} />
              <span className={`text-sm text-gray-600`}>No errors to show</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorTable;
