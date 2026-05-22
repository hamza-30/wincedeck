import React from "react";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";

function Dashboard() {
  const { loading, projects } = useProjects();

  return (
    <div className={`flex-1 px-5.5 w-full max-w-7xl mx-auto`}>
      <div className={`w-full flex flex-wrap gap-y-4 justify-between pt-13`}>
        <div>
          <div
            className={`font-mono text-[#f97314] text-[0.7rem] tracking-widest mb-1`}
          >
            WORKSPACE
          </div>
          <div className={`text-[1.77rem] font-extrabold`}>Your projects</div>
          <div className={`text-[#808080] text-sm`}>
            {projects.length} {projects.length > 1 ? "projects" : "project"}{" "}
            being monitored
          </div>
        </div>

        <Link
          to={"/dashboard/new"}
          className={`flex justify-center items-center gap-x-1 bg-black text-white h-10 w-fit px-4 rounded-[0.4rem] font-semibold mt-auto  mb-1 hover:bg-[#000000b4] active:bg-[#000000b4]`}
        >
          <GoPlus className={`text-[19px]`} />
          <span className={`text-xs`}>New Project</span>
        </Link>
      </div>

      <div
        className={`w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
      >
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectName={project.name}
              projectId={project.id}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
