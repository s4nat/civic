"use client"
import Image from "next/image";
import { heart } from "../../../public";
import DrivePopup from "./DrivePopup";
interface DriveCardProps {
    id: string
    name: string;
    description: string;
    month: number;
    amount: number;
    category: string;
}
export default function DriveCard(props: DriveCardProps) {
    //Generate a Drive card with the properties from Drive Card Props
    return (
        <div className="flex justify-between bg-[#DDC9B4]/20 hover:bg-[#DDC9B4]/45 rounded-md p-5">
            <div className="rounded-md w-[15%]">
                <Image src={heart} alt="Heart" className="rounded-md h-full"></Image>
            </div>

            <div className="flex flex-col w-[85%] gap-y-4">
                <div className="text-lg font-bold flex justify-center">{props.name}</div>
                <div className="text-sm flex justify-center">{props.description}</div>
                <div className="text-sm flex justify-center">
                    <DrivePopup id={props.id}></DrivePopup>
                </div>
            </div>
        </div>
    );
}
