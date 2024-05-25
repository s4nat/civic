"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/constants/style";
import ProjectProps from "@/app/props/ProjectProps";
// {
//   "project_id": 1,
//   "user_id": 1,
//   "drive_id": "Fitness2",
//   "project_name": "Walk with homeless",
//   "project_description": "Walk with the homeless of singapore, and give them company!",
//   "project_donations": 7000,
//   "project_target_amount": 10000,
//   "project_match_amount": 0
// }

export default function Page({ params }: { params: { id: string } }) {
  const [projectData, setProjectData] = useState<ProjectProps>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `https://civic-kohl.vercel.app/project/getProject/1`
        );
        const data: ProjectProps = await response.json();
        console.log(data);
        //setProjectData(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProject();
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div
            className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}
          >
            {projectData?.project_name}
          </div>
        </div>
      </div>
    </main>
  );
}
