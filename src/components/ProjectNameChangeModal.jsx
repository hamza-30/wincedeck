import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useProject } from "../hooks/useProject";
import { toast } from "sonner";

function ProjectNameChangeModal({ setIsModalOpen, onButtonClick }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center px-5.5`}>
      <div
        className={`border border-gray-400 rounded-xl w-[24rem] flex flex-col gap-y-6 px-4 py-5 bg-white`}
      >
        <span className={`text-[15px]`}>
          Are you sure you want to change project name?
        </span>
        <div className={`text-[13px] flex justify-end gap-x-3`}>
          <button
            className={`bg-gray-200 hover:bg-gray-300 active:bg-gray-300 py-1.5 w-[4.3rem] rounded-lg`}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`bg-[#fc750b] hover:bg-[#e46205] active:bg-[#e46205]  py-1.5 w-26 rounded-lg text-white flex items-center justify-center gap-x-1.5`}
            onClick={onButtonClick}
          >
            Change name
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectNameChangeModal;
