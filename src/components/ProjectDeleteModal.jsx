import React, { useState } from "react";
import { BiError } from "react-icons/bi";

function ProjectDeleteModal({
  setIsModalOpen,
  projectData,
  projectName,
  setProjectName,
  onDeleteClick,
}) {
  return (
    <div
      className={`absolute inset-0 backdrop-blur-sm flex items-center justify-center px-5.5`}
    >
      <div
        className={`border border-gray-400 rounded-xl w-113 flex flex-col px-5 py-5 bg-white`}
      >
        <span className={`bg-red-100 w-fit p-2 rounded-lg`}>
          <BiError className={`text-xl text-red-500`} />
        </span>

        <h1 className={`mt-4.5 font-semibold text-lg`}>
          Delete {projectData.name}?
        </h1>
        <span className={`text-xs mt-2 text-gray-500`}>
          This will permanently erase the project, its tracker ID, and all
          captured errors.
        </span>

        <span
          className={`font-mono text-xs text-gray-500 mt-6 font-semibold text-[11px] tracking-wide`}
        >
          TYPE{" "}
          <span className={`text-red-500 font-medium`}>{projectData.name}</span>{" "}
          TO CONFIRM
        </span>

        <input
          type="text"
          value={projectName}
          className={`mt-2.5 mb-6 outline-none border border-gray-200 h-10 rounded-lg px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-red-300 transition-all ease-in-out duration-150`}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <div
          className={`text-[13px] flex justify-end gap-x-3 border-t border-t-gray-300 pt-4`}
        >
          <button
            className={`border border-gray-200 hover:bg-gray-200 active:bg-gray-200 py-1.5 w-[4.3rem] rounded-lg`}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`bg-red-500 hover:bg-red-400 active:bg-red-400  py-1.5 w-26 rounded-lg text-white flex items-center justify-center gap-x-1.5`}
            onClick={onDeleteClick}
          >
            Delete forever
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDeleteModal;
