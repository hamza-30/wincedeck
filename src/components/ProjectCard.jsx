import React from "react";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

function ProjectCard({
  projectName,
  status,
  projectId,
  errorsToday,
  lastErrorTime,
}) {
  return (
    <Link
      to={`/dashboard/${projectId}`}
      className={`min-h-fit border border-gray-200 hover:border-gray-300 active:border-gray-300 rounded-xl px-6 py-5.5 group hover:shadow-[0_3px_10px_rgba(0,0,0,0.09)] active:shadow-[0_3px_10px_rgba(0,0,0,0.09)] transition-discrete ease-in-out duration-200`}
    >
      <div className={`flex justify-between items-center`}>
        <span className={`text-sm font-extrabold tracking-tight`}>
          GitAtlas Production
        </span>
        {status == "active" ? (
          <div
            className={`w-fit flex items-center gap-x-1.5 bg-[#6cc7a82d] px-2 py-0.5 rounded-xl`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-[#50ac8d]`}></span>
            <span className={`text-[10px] text-[#50ac8d] font-bold`}>
              ACTIVE
            </span>
          </div>
        ) : (
          <div
            className={`w-fit flex items-center gap-x-1.5 bg-gray-100 px-2 py-0.5 rounded-xl`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-gray-500`}></span>
            <span className={`text-[10px] text-gray-500 font-bold`}>IDLE</span>
          </div>
        )}
      </div>

      <div className={`text-[10.5px] font-mono text-gray-500 mt-1`}>
        ID: px_2881_z
      </div>

      <div className={`mt-6 flex`}>
        <div className={`flex flex-col gap-y-0.5`}>
          <span
            className={`text-[11px] tracking-wider font-bold text-[#7c7c7c] `}
          >
            ERRORS TODAY
          </span>
          <span className={`text-[1.4rem] font-extrabold text-[#f97314]`}>
            42
          </span>
        </div>

        <div className={`flex flex-col gap-y-1.5 ml-[6.5vw]`}>
          <span
            className={`text-[11px] tracking-wider font-bold text-[#7c7c7c] `}
          >
            LAST ERROR
          </span>
          <span className={`text-sm font-mono`}>{`12s ago`}</span>
        </div>
      </div>

      <div
        className={`flex justify-between items-center pt-3.5 mt-5 border-t border-t-gray-200`}
      >
        <span className={`font-mono text-[11px] text-gray-500 tracking-wide`}>
          VIEW DASHBOARD
        </span>
        <HiMiniArrowUpRight
          className={`text-gray-500 group-hover:text-[#f97314] group-active:text-[#f97314]`}
        />
      </div>
    </Link>
  );
}

export default ProjectCard;
