"use client"
import Image from "next/image";
import { singapore } from "../../../public";
import ProgressBar from "./ProgressBar";
import Link from "next/link";
interface ProjectCardProps {
    id:number;
    name: string;
    description: string;
    donation: number;
    target: number;
    matchamt: number;
}
export default function ProjectCard(props: ProjectCardProps) {
    //Generate a Project card with the properties from Project Card Props
    return (
        <Link href={"./projects/"+props.id}>
        <div className="flex bg-[#DDC9B4]/20 hover:bg-[#DDC9B4]/45 flex flex-col rounded-md p-5">
            <div className="rounded-md">
                <Image src={singapore} alt="Singapore" className="rounded-md"></Image>
            </div>
            <div className="flex flex-col my-1">
                <div className="text-lg font-bold">{props.name}</div>
                <div className="text-sm mb-1">{props.description}</div>
            </div>
            <div className="flex flex-col">
                <ProgressBar fundAmount={props.donation} targetAmount={props.target}/>
                <div className="flex justify-between my-1">
                    <div className="text-sm font-bold">Donated: {props.donation}</div>
                    <div className="text-sm font-bold">Target: {props.target}</div>
                </div>
            </div>
            
            <div className="flex flex-col">
                <div className="text-sm font-bold">Match Amount from Drive Pool</div>
                <div className="flex justify-center text-2xl font-bold my-1"> {"S$"+props.matchamt}</div>
                <button className="bg-[#7C0000]/80 hover:bg-[#7C0000] text-white font-bold py-2 px-4 rounded">
                    Donate
                </button>
            </div>
        </div>
        </Link>
    );
}
