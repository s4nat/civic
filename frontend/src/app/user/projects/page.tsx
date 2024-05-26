"use client";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectProps from "@/app/components/ProjectProps";
import DonationProps from "@/app/props/DonationProps";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserProjectsPage() {
  const { user, error, isLoading } = useUser();

  const [donatedProjects, setDonatedProjects] = useState<ProjectProps[]>([]);
  const [initiatedProjects, setInitiatedProjects] = useState<ProjectProps[]>(
    []
  );

  useEffect(() => {
    async function fetchInitProjects() {
      if (user && user.email) {
        const exists = await fetch(
          `https://civic-kohl.vercel.app/user/getByEmail/${user.email}`
        );
        if (exists.status === 200) {
          const details = await exists.json();
          const user_id = details.user_id;

          const response = await fetch(
            `https://civic-kohl.vercel.app/project/getProjectByUser/${user_id}`
          );
          const data: ProjectProps[] = await response.json();
          setInitiatedProjects(data);
        }
      }
    }

    async function fetchDonatedProjects() {
      //get user id
      if (user && user.email) {
        const exists = await fetch(
          `https://civic-kohl.vercel.app/user/getByEmail/${user.email}`
        );
        if (exists.status === 200) {
          const details = await exists.json();
          const user_id = details.user_id;

          //get all donations by user id
          const response = await fetch(
            `https://civic-kohl.vercel.app/donation/getByUserId/${user_id}`
          );
          const data: DonationProps[] = await response.json();

          //get all projects by project id
          for (let i = 0; i < data.length; i++) {
            const response2 = await fetch(
              `https://civic-kohl.vercel.app/project/getProject/${data[i].project_id}`
            );
            const projectData: ProjectProps = await response2.json();
            donatedProjects.push(projectData);
          }

          //setDonatedProjects(data);
          //console.log(donatedProjects);
        }
      }
    }

    fetchInitProjects();
    fetchDonatedProjects();
  }, [user]);

  //   useEffect(() => {

  //   });

  if (isLoading || error)
    return (
      <div className="min-h-screen flex flex-row flex-wrap">
        <div className="flex basis-full justify-center">
          <h3 className="font-quicksand md:max-lg:text-2xl lg:text-4xl text-xl p-5 font-medium text-[#0B1E5B]">
            Logging In...
          </h3>
        </div>
      </div>
    );
  if (user)
    return (
      <div className="mt-20">
        <div className="xl:ml-14 ml-8 font-playfair font-medium md:text-4xl text-2xl px-5 pt-10 text-[#0B1E5B]">
          Hello, {user?.name}
        </div>
        <div className="xl:ml-14 ml-8 font-playfair font-medium md:text-2xl text-xl px-5 pt-4 text-[#0B1E5B]">
          Welcome To Your Projects
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex justify-center font-playfair text-[28px] text-[#1E1E1E] w-[50%]">
            Projects You&apos;ve Donated to
          </div>
          <div className="flex justify-center font-playfair text-[28px] text-[#1E1E1E] w-[50%]">
            Projects You&apos;ve Initiated
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex flex-col font-playfair text-[28px] text-[#1E1E1E] w-[50%]">
            {donatedProjects.map((project, index) => (
              <div
                key={index}
                className="h-full w-full flex justify-center my-1 "
              >
                <div className="w-1/2">
                  <ProjectCard
                    id={project.project_id}
                    name={project.project_name}
                    description={project.project_description}
                    donation={project.project_donations}
                    target={project.project_target_amount}
                    matchamt={project.project_match_amount}
                    drive_id={project.drive_id}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col font-playfair text-[28px] text-[#1E1E1E] w-[50%]">
            {initiatedProjects.map((project, index) => (
              <div
                key={index}
                className="h-full w-full flex justify-center my-1 "
              >
                <div className="w-1/2">
                  <ProjectCard
                    id={project.project_id}
                    name={project.project_name}
                    description={project.project_description}
                    donation={project.project_donations}
                    target={project.project_target_amount}
                    matchamt={project.project_match_amount}
                    drive_id={project.drive_id}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
