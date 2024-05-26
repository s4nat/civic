import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from "react";
import ProjectProps from "../props/ProjectProps"
import Link from 'next/link';


interface DrivePopupProps {
    id: string;
    driveName: string;
    driveDescription: string;
}

export default function DrivePopup(props: DrivePopupProps) {

    const [ProjectData, setProjectData] = useState<ProjectProps[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`https://civic-kohl.vercel.app/project/getProjectByDriveId/${props.id}`);
                const data: ProjectProps[] = await response.json();
                console.log(data);
                setProjectData(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [props.id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#7C0000]/50 hover:bg-[#7C0000] px-[15px] font-medium leading-none">
                    View Projects
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Projects in the {props.driveName}
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Description: {props.driveDescription},
                        scroll through the projects to decide who to donate to!
                    </Dialog.Description>
                    <div className="project-carousel">
                        {ProjectData.length === 0 ? (
                            <p>Loading projects...</p>
                        ) : (
                            ProjectData.map(project => (
                                <Link key={project.project_id} href={`/projects/${project.project_id}`}>
                                <div className="project-item mb-4 bg-[#DDC9B4]/20 hover:bg-[#DDC9B4]/45 p-5 rounded-md">
                                    <h3 className="font-medium text-[#7C0000] text-lg">{project.project_name}</h3>
                                    <p className="text-sm">{project.project_description}</p>
                                </div>
                                </Link>
                            ))
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
