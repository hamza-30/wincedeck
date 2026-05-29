import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { useProject } from "../hooks/useProject";
import { useParams } from "react-router-dom";
import ProjectNameChangeModal from "../components/ProjectNameChangeModal";
import { toast } from "sonner";

function ProjectSettings() {
  const [isSnippetCopied, setIsSnippetCopied] = useState(false);
  const { projectId } = useParams();
  const { projectData, loading, updateProjectName, nameChangeLoading } =
    useProject(projectId);
  const [projectNewName, setProjectNewName] = useState("");
  const [nameChangeModalOpen, setNameChangeModalOpen] = useState(false);

  const onCopyClick = async (setCopied) => {
    const scriptTag = `<script src="https://wincedeck.vercel.app/tracker.js?id="></script>`;

    try {
      await navigator.clipboard.writeText(scriptTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const onButtonClick = async () => {
    setNameChangeModalOpen(false);

    if (projectNewName) {
      const result = await updateProjectName(projectNewName);

      if (result.success) {
        toast.success("Project name changed!");
      } else {
        toast.error("Failed to change project name");
      }
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
    <div className={`mt-10 mx-auto h-fit w-full max-w-[45.7rem] px-5.5`}>
      <div
        className={`text-[11px] font-mono tracking-widest text-[#f97314] mb-1`}
      >
        PROJECT SETTINGS
      </div>
      <h1 className={`text-[1.8rem] font-extrabold`}>{projectData.name}</h1>
      <div className={`text-[11px] font-mono text-gray-500`}>
        ID: {projectId}
      </div>

      <div className={`text-sm flex flex-col mt-10 gap-y-1`}>
        <span className={`font-bold`}>Tracking Script</span>
        <span className={`text-xs text-gray-500`}>
          Add this to the {"<head>"} of every page you want to monitor.
        </span>
      </div>

      <div
        className={`w-full flex flex-col gap-y-3 py-4 px-3.5 border border-[#f973147c] bg-[#f973140b] mt-4 rounded-[0.6rem]`}
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

      <div className={`text-sm flex flex-col mt-10 gap-y-1`}>
        <span className={`font-bold`}>Project name</span>
        <span className={`text-xs text-gray-500`}>
          Used across the dashboard and exports.
        </span>
      </div>

      <div
        className={`border border-gray-200 h-fit rounded-[0.6rem] mt-4 flex flex-col p-5 gap-y-2`}
      >
        <label
          htmlFor="projectName"
          className={`text-gray-500 text-[11px] font-semibold`}
        >
          NAME
        </label>
        <input
          type="text"
          value={projectNewName}
          id="projectName"
          className={`outline-none border border-gray-200 h-10 rounded-lg font-mono px-3 text-sm focus:border-transparent focus:ring focus:ring-[#f97314] transition-all ease-in-out duration-150`}
          onChange={(e) => setProjectNewName(e.target.value)}
        />
        <button
          className={`bg-gray-950 hover:bg-[#000000d6] w-28 h-9 flex justify-center items-center text-white text-xs font-semibold rounded-[5px] mt-2 ml-auto`}
          onClick={() => setNameChangeModalOpen(true)}
        >
          {nameChangeLoading ? (
            <span
              className={`border-[2.3px] border-transparent border-t-white border-b-white h-4.5 w-4.5 rounded-full inline-block animate-spin`}
            ></span>
          ) : (
            "Save changes"
          )}
        </button>
      </div>

      {nameChangeModalOpen && (
        <ProjectNameChangeModal
          setIsModalOpen={setNameChangeModalOpen}
          onButtonClick={onButtonClick}
        />
      )}

      <div className={`text-sm flex flex-col mt-10 gap-y-1`}>
        <span className={`font-bold text-red-500`}>Danger Zone</span>
        <span className={`text-xs text-gray-500`}>
          Irreversible actions. Take a breath before proceeding.
        </span>
      </div>

      <div
        className={`border border-red-400 bg-red-50 h-40 rounded-[0.6rem] mt-4 mb-10`}
      ></div>
    </div>
  );
}

export default ProjectSettings;
