"use client"
import Image from "next/image";
import { singapore } from "../../../public";
import ProgressBar from "./ProgressBar";
interface ProjectCardProps {
    name: string;
    description: string;
    donation: number;
    target: number;
    matchamt: number;
}
export default function ProjectCard(props: ProjectCardProps) {
    //Generate a Project card with the properties from Project Card Props
    return (
        <div className="flex bg-[#DDC9B4]/20 hover:bg-[#DDC9B4]/45 flex flex-col rounded-md p-5">
            <div className="rounded-md">
                <Image src={singapore} alt="Singapore" className="rounded-md"></Image>
            </div>
            <div className="flex justify-between mt-2">
                <div className="text-lg font-bold">{props.name}</div>
            </div>
            <div>
                <ProgressBar fundAmount={100} targetAmount={1000}/>
            </div>
            <div className="text-sm">{props.description}</div>
            <div className="flex justify-between">
                <div className="text-sm">Matching Amount: {props.matchamt}</div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Donate
                </button>
            </div>
        </div>
    );
}
