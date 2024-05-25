"use client";
import ProjectCard from "../components/ProjectCard";
import ProjectProps from "../components/ProjectProps";
import styles from "../constants/style";
import { useState, useEffect } from "react";

export default function Home() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://civic-kohl.vercel.app/project/getProjects");
        const data: ProjectProps[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div
            className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}
          >
            Our Projects
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-[20px]">
        {projects.map((project, index) => {
          return (
            <div key={project.project_id}>
              <ProjectCard
                id={project.project_id}
                name={project.project_name}
                description={project.project_description}
                donation={project.project_donations}
                target={project.project_target_amount}
                matchamt={project.project_match_amount}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
