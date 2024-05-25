import React from "react";
import Image from "next/image";
import { coinbase } from "../../../public";
import Link from "next/link";
interface CompanyCardProps {
  name: string;
  fundAmount: string;
  fundCategory: string;
  link: any;
}

export default function CompanyCard(props: CompanyCardProps) {
  return (
    <Link href={props.link}>
      <div className="flex bg-[#DDC9B4]/20 hover:bg-[#DDC9B4]/45 flex flex-col rounded-md p-5 ">
        <div className="flex justify-around items-center my-2">
          <div>
            <Image src={coinbase} alt="team" className="w-[100px]" />
          </div>
          <div>
            <div className="font-playfair font-medium text-[#7C0000] text-[24px]">
              {props.name}
            </div>
            <div className="flex justify-center border-2 border-[#466362] rounded-full">
              <div className="flex justify-center text-[#466362] text-[16px] font-playfair mx-2">
                {props.fundCategory}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-black text-[25px] font-playfair mx-2">
          Donated
        </div>

        <div className="flex justify-center text-[65px] font-playfair font-bold">
          {"S$" + props.fundAmount}
        </div>
      </div>
    </Link>
  );
}
