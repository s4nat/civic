"use client";
import Image from "next/image";
import { heart } from "../../../public";
import DrivePopup from "./DrivePopup";
interface DriveCardProps {
  id: string;
  name: string;
  description: string;
  month: number;
  amount: number;
  category: string;
}
export default function DriveCard(props: DriveCardProps) {
  //Generate a Drive card with the properties from Drive Card Props
  return (
    <div className="flex flex-col bg-[#DDC9B4]/20 hover:bg-[#DDC9B4]/45 rounded-md p-5">
      <div className="flex justify-between">
        <div className="rounded-md w-[15%]">
          <Image src={heart} alt="Heart" className="rounded-md w-full h-full"></Image>
        </div>

        <div className="flex flex-col w-[85%] gap-y-1">
          <div className="text-lg font-bold flex justify-center">
            {props.name}
          </div>
          <div className="text-sm flex justify-center">{props.description}</div>
        </div>
      </div>

        <div className="flex justify-between mt-2">
            <div className="text-sm font-bold">0{props.month}/2024</div>
            <div className="text-sm">Category:{props.category}</div>
        </div>

      <div className="flex justify-center mt-2">
        <div className="text-xl font-bold">{"S$"+props.amount}</div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="text-md font-bold">Fund Pool</div>
      </div>
      <div className="text-sm flex justify-center mt-2">
        <DrivePopup id={props.id} driveDescription={props.description} driveName={props.name}></DrivePopup>
      </div>
    </div>
  );
}
