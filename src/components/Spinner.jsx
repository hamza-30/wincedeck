import React from "react";

function Spinner() {
  return (
    <div className={`flex-1 flex flex-col justify-center items-center gap-y-3`}>
      <div
        className={`h-10 w-10 rounded-full border-[2.5px] border-l-transparent border-r-transparent border-b-black border-t-black animate-spin`}
      ></div>
      <div className={`font-mono text-[14px]`}>LOADING</div>
    </div>
  );
}

export default Spinner;
