"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/constants/style";
import ProjectProps from "@/app/props/ProjectProps";
import { singapore } from "../../../../public";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ProgressDemo from "@/app/components/ProgressBar";
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
  const [projectData, setProjectData] = useState<ProjectProps>({
    project_id: 0,
    user_id: 0,
    drive_id: "",
    project_name: "",
    project_description: "",
    project_donations: 0,
    project_target_amount: 0,
    project_match_amount: 0,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        //await console.log(params.id);
        const response = await fetch(
          `https://civic-kohl.vercel.app/project/getProject/${params.id}`
        );
        const data: ProjectProps = await response.json();
        //console.log(data);
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProject();
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`mt-2`}>
          {projectData ? (
            <div className="flex flex-col gap-y-4">
              <Link
                href={"./"}
                className="flex items-center font-playfair xs:text-[28px] text-[28px] text-[#1E1E1E] hover:scale-102 hover:translate-y-1 hover:text-[#1E1E1E]/80 w-full"
              >
                <FiArrowLeft />
                &nbsp;Our Projects
              </Link>
              <div className="flex justify-center">
                <Image
                  src={singapore}
                  alt={"Singapore"}
                  className="w-[60%] rounded-md"
                ></Image>
              </div>

              <div
                className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}
              >
                {projectData.project_name}
              </div>

              <div className="font-playfair  xs:text-[24px] text-[24px] text-[#1E1E1E] xs:leading-[38.4px] leading-[33.4px] w-full">
                {projectData.project_description}
              </div>

              <div>
                <ProgressDemo
                  fundAmount={projectData.project_donations}
                  targetAmount={projectData.project_target_amount}
                ></ProgressDemo>
              </div>
              <div className="flex justify-between">
                <div className="font-playfair  xs:text-[24px] text-[24px] text-[#1E1E1E] xs:leading-[38.4px] leading-[33.4px] w-full">
                  Donations: S${projectData.project_donations}
                </div>
                <div className="font-playfair  xs:text-[24px] text-[24px] text-[#1E1E1E] xs:leading-[38.4px] leading-[33.4px] w-full flex justify-end">
                  Target Amount: S${projectData.project_target_amount}
                </div>
              </div>

              <div className="flex justify-center text-3xl font-playfair text-[#1E1E1E] w-full">
                Match Amount Recieved From Drive Pool:
              </div>
              <div className="flex justify-center text-3xl font-bold font-playfair text-[#1E1E1E] w-full">
                S${projectData.project_match_amount}
              </div>
              <div className="flex justify-center">
              <button className="w-1/2 bg-[#7C0000]/80 hover:bg-[#7C0000] text-white font-bold py-2 px-4 rounded">
                    Donate
                </button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </main>
  );
}
