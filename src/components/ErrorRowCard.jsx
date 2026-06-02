import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function ErrorRowCard({
  message,
  source,
  pageUrl,
  frequency,
  timeAgo,
  severity,
  stackTrace,
  capturedAt,
  activeTab,
  onResolve,
  onUnresolve,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const stack = stackTrace.split("\n");

  return (
    <>
      <tr
        className="font-mono border-b border-gray-200 hover:bg-gray-50 active:bg-gray-50 transition-colors last:border-b-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="pl-5.5 py-4 align-middle">
          <div className="text-xs text-red-500 font-semibold mb-0.5">
            {message}
          </div>
          <div className="text-[11px] text-gray-500">{source}</div>
        </td>

        <td className="text-xs pl-5.5 py-4 text-gray-500 align-middle hidden md:table-cell">
          {pageUrl}
        </td>

        <td className="text-xs text-right pr-14 w-28 py-4 text-gray-600 font-semibold align-middle">
          {frequency}
        </td>

        <td className="text-[11px] pl-5.5 py-4 text-gray-500 align-middle pr-2">
          <div className="flex items-center justify-between whitespace-nowrap">
            <span>{timeAgo}</span>
          </div>
        </td>

        <td className="text-xs text-right pr-2 w-46 py-4 text-gray-600 font-semibold align-middle">
          <div className="flex items-center justify-between whitespace-nowrap">
            {activeTab == "active" ? (
              <button
                className={`border border-gray-300 p-1.5 rounded-lg hover:text-green-500 hover:border-green-300 active:text-green-500 active:border-green-300 cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  onResolve(message, source);
                }}
              >
                Mark as Resolved
              </button>
            ) : (
              <button
                className={`border border-gray-300 p-1.5 rounded-lg hover:text-red-500 hover:border-red-300 active:text-red-500 active:border-red-300 cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUnresolve(message, source);
                }}
              >
                Mark as Unresolved
              </button>
            )}
            <MdKeyboardArrowRight
              className={`text-[1.20rem] text-gray-500 ml-2 transition-transform ease-in-out duration-150
              ${isOpen && "rotate-90"}`}
            />
          </div>
        </td>
      </tr>

      {isOpen && (
        <tr>
          <td colSpan={5} className="p-0 border-b border-gray-200 bg-gray-50">
            <div className="w-full px-5.5 h-fit p-4 flex flex-col gap-y-2">
              <span
                className={`text-[11px] text-gray-500 font-semibold tracking-wide`}
              >
                STACK TRACE
              </span>
              <div
                className={`h-fit bg-black rounded-lg text-white font-mono text-xs p-5 overflow-x-auto`}
              >
                {stack.map((msg, index) => (
                  <div key={index} className={`mb-1 whitespace-pre`}>
                    {msg}
                  </div>
                ))}
              </div>
              <div className={`flex gap-x-3 font-mono text-[11px]`}>
                <span className={`text-gray-500`}>
                  URL: <span className={`text-black`}>{pageUrl}</span>{" "}
                </span>
                <span className={`text-gray-500`}>
                  Captured At:{" "}
                  <span className={`text-black`}>{capturedAt}</span>{" "}
                </span>
                <span className={`text-gray-500`}>
                  Severity:{" "}
                  <span className={`text-black`}>{severity}</span>{" "}
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default ErrorRowCard;
