import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { toast } from "sonner";

function NewProject() {
  const [projectName, setProjectName] = useState("");
  const { loading, createProject } = useProjects();
  const navigate = useNavigate();

  const onCreateProjectClick = async () => {
    if (projectName) {
      let result = await createProject(projectName);

      if (result.success) {
        toast.success("Project created!");
        navigate("/dashboard");
      } else {
        toast.error("Unable to create project");
      }
    }
  };

  return (
    <div className={`flex-1 flex justify-center px-5.5`}>
      <div className={`mt-17 h-fit w-full max-w-[33rem]`}>
        <Link
          to={"/dashboard"}
          className={`flex items-center mb-7 font-mono gap-x-1.5 text-gray-500 hover:text-gray-800 active:text-gray-800 transition-all ease-in-out duration-150`}
        >
          <GoArrowLeft className={``} />
          <span className={`text-[0.7rem] mt-[1px]`}>BACK TO PROJECTS</span>
        </Link>

        <div>
          <div
            className={`font-mono text-[#f97314] text-[0.7rem] tracking-widest mb-2`}
          >
            NEW PROJECT
          </div>
          <div className={`text-[1.77rem] font-extrabold mb-1`}>
            Create a project
          </div>
          <div className={`text-[#808080] text-sm`}>
            We'll mint a tracker ID and drop you straight into the monitor.
          </div>
        </div>

        <div className={`mt-10`}>
          <label
            htmlFor="nameInput"
            className={`text-[11px] text-gray-500 font-semibold block mb-2 tracking-wider`}
          >
            PROJECT NAME
          </label>
          <input
            id="nameInput"
            type="text"
            value={projectName}
            placeholder="e.g. GitAtlas Production"
            className={`w-full h-11 outline-none border border-gray-300 rounded-lg focus:border-transparent focus:ring focus:ring-[#f97314] transition-discrete ease-in-out duration-200 font-mono text-sm pl-3 mb-1`}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className={`text-[11.5px] mt-1 text-gray-600`}>
          You can change this later in project settings.
        </div>

        <div className={`flex gap-x-2 text-[12px] mt-7 font-semibold`}>
          <button
            className={`w-30 bg-black border border-black text-white rounded-[6px] hover:bg-[#000000d1] transition-all ease-in-out duration-150 flex items-center justify-center`}
            onClick={onCreateProjectClick}
          >
            {loading ? (
              <span
                className={`border-[2.3px] border-transparent border-t-white border-b-white h-4.5 w-4.5 rounded-full inline-block animate-spin`}
              ></span>
            ) : (
              "Create Project"
            )}
          </button>
          <Link
            to={"/dashboard"}
            className={`w-fit h-fit bg-white border border-gray-300 px-4 py-2.5 rounded-[6px] hover:bg-gray-100 active:bg-gray-100 transition-all ease-in-out duration-150`}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewProject;
