import React from "react";
import { GoPlus } from "react-icons/go";
import { LuPanelsTopLeft } from "react-icons/lu";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";

function Dashboard() {
  const { loading, projects, projectsLoading } = useProjects();

  return (
    <div className={`flex-1 px-5.5 w-full max-w-7xl mx-auto`}>
      <div
        className={`w-full flex flex-col sm:flex-row flex-wrap gap-y-5 justify-between pt-13`}
      >
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

      {projectsLoading ? (
        <div className={`w-full flex justify-center mt-25`}>
          <div
            className={`h-8 w-8 rounded-full border-2 border-transparent border-t-[#f97314] border-b-[#f97314] animate-spin`}
          ></div>
        </div>
      ) : (
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
      )}

      {!projectsLoading && projects.length == 0 && (
        <div className={`w-full`}>
          <div class="border-2 border-dashed border-[#f97314] rounded-xl bg-[#ffffff] py-24 px-6 flex flex-col items-center justify-center text-center">
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
              <LuPanelsTopLeft className={`text-gray-400 text-2xl`} />
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-2">
              No projects yet
            </h3>
            <p class="text-gray-500 max-w-sm mb-8 text-sm">
              You haven't set up any projects for monitoring. Create your first
              project to start tracking errors.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
