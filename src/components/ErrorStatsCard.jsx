import React from "react";

function ErrorStatsCard({ title, data, textColor = "black" }) {
  return (
    <div
      className={`h-fit flex flex-col gap-y-2 justify-start px-6 py-6 border-gray-200
      border-b nth-4:border-b-0 sm:nth-2:border-r-0 lg:border-r lg:nth-1:border-b-0 lg:nth-2:border-b-0  lg:last:border-0 sm:border-r sm:border-b sm:nth-3:border-b-0 sm:nth-4:border-b-0 sm:nth-4:border-r-0 lg:nth-2:border-r`}
    >
      <div className={`text-[10.5px] font-bold text-gray-500 tracking-wider`}>
        {title}
      </div>
      <div className={`text-3xl font-bold`} style={{ color: textColor }}>
        {data}
      </div>
    </div>
  );
}

export default ErrorStatsCard;
