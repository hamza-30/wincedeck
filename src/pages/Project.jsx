import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { LuCopy } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

function Project() {
  const { projectId } = useParams();
  const { projectData, loading } = useProject(projectId);
  const [isSnippetCopied, setIsSnippetCopied] = useState(false);
  const [isButtonCopied, setIsButtonCopied] = useState(false);

  const onCopyClick = async (setCopied) => {
    const scriptTag = `<script src="https://wincedeck.vercel.app/tracker.js?id=${projectId}"></script>`;

    try {
      await navigator.clipboard.writeText(scriptTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className={`w-full flex-1 flex justify-center items-center`}>
        <div
          className={`h-9 w-9 rounded-full border-2 border-transparent border-t-[#f97314] border-b-[#f97314] animate-spin`}
        ></div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex-1 px-5.5 w-full max-w-7xl mx-auto`}>
        <div className={`w-full flex justify-between pt-10 flex-wrap gap-y-4`}>
          <div className={`flex flex-col gap-y-0.5`}>
            <div className={`flex gap-x-3 items-center`}>
              <span className={`text-[1.8rem] font-extrabold`}>
                {projectData.name}
              </span>
              <div
                className={`flex items-center justify-center gap-x-1.5 bg-[#6cc7a82d] h-5 w-16 rounded-xl`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-[#50ac8d]`}
                ></span>
                <span className={`text-[10px] text-[#50ac8d] font-bold`}>
                  ACTIVE
                </span>
              </div>
            </div>

            <div className={`text-[11px] font-mono text-gray-500`}>
              ID: {projectId}
            </div>
          </div>

          <div className={`flex gap-x-2`}>
            <button
              className={`flex h-fit w-fit items-center gap-x-1.5 text-[#414141] border border-gray-200 rounded-md py-2.5 px-3 hover:bg-gray-100 active:bg-gray-100`}
              onClick={() => onCopyClick(setIsButtonCopied)}
            >
              {isButtonCopied ? <IoCheckmark /> : <LuCopy />}
              <span className={`text-xs font-bold`}>
                {isButtonCopied ? "Copied" : "Copy Script Tag"}
              </span>
            </button>
            <Link
              to={`/dashboard/${projectId}/settings`}
              className={`flex h-fit w-fit items-center gap-x-1.5 text-[#414141] border border-gray-200 rounded-md py-2.5 px-3 hover:bg-gray-100 active:bg-gray-100`}
            >
              <MdOutlineSettings />
              <span className={`text-xs font-bold`}>Settings</span>
            </Link>
          </div>
        </div>

        <div
          className={`w-full flex flex-col gap-y-3 py-4 px-3.5 border border-[#f973147c] bg-[#f973140b] mt-8 rounded-[0.6rem]`}
        >
          <div className={`w-full flex items-center justify-between`}>
            <div className={`flex items-center gap-x-2`}>
              <span
                className={`text-[10px] tracking-widest text-[#f97314] font-extrabold`}
              >
                INTEGRATION SCRIPT
              </span>
              <span className={`text-[10px] text-gray-500`}>
                Add to your {"<head>"} tag
              </span>
            </div>

            <button
              className={`flex items-center gap-x-1.5 text-[#f97314] cursor-pointer`}
              onClick={() => onCopyClick(setIsSnippetCopied)}
            >
              {isSnippetCopied ? (
                <IoCheckmark className={`text-sm`} />
              ) : (
                <LuCopy className={`text-sm`} />
              )}
              <span
                className={`text-[9.6px] font-mono tracking-wide font-extrabold hidden sm:inline-block`}
              >
                {isSnippetCopied ? "COPIED" : "COPY SNIPPET"}
              </span>
            </button>
          </div>

          <div className="bg-black flex items-center pl-3 text-white w-full h-11 rounded-sm overflow-hidden font-mono text-sm text-nowrap">
            <span className={`text-zinc-300 text-xs`}>&lt;script&nbsp;</span>
            <span className={`text-emerald-400 text-xs`}>src</span>
            <span className={`text-xs`}>=</span>
            <span className={`text-orange-300 text-xs`}>
              {`"https://wincedeck.vercel.app/tracker.js?id=${projectId}"`}
            </span>
            <span className="text-zinc-300 text-xs">&gt;&lt;/script&gt;</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
