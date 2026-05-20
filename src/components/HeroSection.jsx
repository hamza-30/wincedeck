import React from "react";

function HeroSection() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="absolute inset-0 bg-[#fafafa] bg-[linear-gradient(#f1f1f1_1px,transparent_1px),linear-gradient(90deg,#f1f1f1_1px,transparent_1px)] bg-[length:28px_28px]"></div>

      <div className={`z-10 w-[28.5rem] flex flex-col gap-y-5.5`}>
        <div className={`flex items-center gap-x-2 `}>
          <div className={`h-1.5 w-1.5 rounded-full bg-green-400`}></div>
          <span
            className={`font-mono text-[10.6px] text-gray-600 tracking-wider`}
          >
            LIVE TRACKING STREAM
          </span>
        </div>

        <div
          className={`bg-white w-full h-fit rounded-lg border border-gray-200`}
        >
          <div
            className={`w-full flex flex-col font-mono p-4 gap-y-1 border-b border-b-gray-200 hover:bg-gray-50 active:bg-gray-50`}
          >
            <div className={`flex justify-between`}>
              <span className={`text-[12px] text-red-600 font-semibold`}>
                ReferenceError: stripe is not defined
              </span>
              <span className={`text-[11px] text-gray-600`}>12S AGO</span>
            </div>
            <div className={`text-[11px] text-gray-600`}>checkout.tsx:42</div>
          </div>
          <div
            className={`w-full flex flex-col font-mono p-4 gap-y-1 border-b border-b-gray-200 hover:bg-gray-50 active:bg-gray-50`}
          >
            <div className={`flex justify-between`}>
              <span className={`text-[12px] text-red-600 font-semibold`}>
                TypeError: cannot read 'map'
              </span>
              <span className={`text-[11px] text-gray-600`}>4M AGO</span>
            </div>
            <div className={`text-[11px] text-gray-600`}>UserGrid.tsx:108</div>
          </div>
          <div
            className={`w-full flex flex-col font-mono p-4 gap-y-1 border-b border-b-gray-200 hover:bg-gray-50 active:bg-gray-50`}
          >
            <div className={`flex justify-between`}>
              <span className={`text-[12px] text-red-600 font-semibold`}>
                NetworkError: Failed to fetch
              </span>
              <span className={`text-[11px] text-gray-600`}>14M AGO</span>
            </div>
            <div className={`text-[11px] text-gray-600`}>auth.js:12</div>
          </div>
          <div
            className={`w-full flex flex-col font-mono p-4 gap-y-1 hover:bg-gray-50 active:bg-gray-50`}
          >
            <div className={`flex justify-between`}>
              <span className={`text-[12px] text-red-600 font-semibold`}>
                SyntaxError: Unexpected token {"<"}{" "}
              </span>
              <span className={`text-[11px] text-gray-600`}>1H AGO</span>
            </div>
            <div className={`text-[11px] text-gray-600`}>api.ts:88</div>
          </div>
        </div>

        <div className={`text-[12px] text-gray-600`}>
          Every exception captured, deduplicated, and ranked by frequency. No
          noise, just signal.
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
