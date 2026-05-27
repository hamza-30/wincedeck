import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TfiBarChart } from "react-icons/tfi";

function ErrorBarChart({ last24HoursErrors, barChartData }) {
  return (
    <div
      className={`w-full h-88 flex flex-col gap-y-2 border border-gray-200 py-5 px-6 mt-8 mb-8 rounded-xl`}
    >
      <div
        className={`text-[12.5px] font-semibold text-gray-500 tracking-wider`}
      >
        ERROR FREQUENCY - LAST 24 HOURS
      </div>
      <div className={`flex items-baseline gap-x-1 mb-3`}>
        <span className={`text-2xl font-bold`}>{last24HoursErrors}</span>
        <span className={`font-mono text-[13px] text-gray-600`}>TOTAL</span>
      </div>

      {barChartData.length > 0 ? (
        <div className={`flex-1`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 0, right: 0, left: 3, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#e5e7eb"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="hour"
                className="font-mono text-gray-400"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(value) => value.split(" ")[0]}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="font-mono text-gray-400"
                width={30}
                hide={true}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                wrapperClassName="font-mono text-xs"
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#6b7280" }}
                labelStyle={{ color: "#6b7280" }}
                cursor={{ fill: "#f3f4f6" }}
                formatter={(value) => [`${value} errors`, ""]} // Appends "errors" to the value and removes the dataKey name
                separator="" // Removes the default colon (:) separator
              />
              <Bar dataKey="errorFreq" fill="#f97314" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className={`flex-1 flex justify-center items-center`}>
          <div className={`flex flex-col gap-y-1.5 items-center mb-15`}>
            <TfiBarChart className={`text-3xl text-[#f97314]`} />
            <span className={`text-sm text-gray-500`}>No data available</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrorBarChart;
