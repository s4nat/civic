"use client";
import React, { useEffect, useState } from "react";
import ProjectProps from "../props/ProjectProps";
import DonationProps from "../props/DonationProps";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Slider from "@radix-ui/react-slider";
import { randomInt } from "crypto";

interface DonationModalProps {
  drive_id: string;
  project_id: number;
  project_name: string;
  project_description: string;
  target_amount: number;
  donations: number;
  match_amount: number;
}

export default function DonationModal(props: DonationModalProps) {
  const [projectData, setProjectData] = useState<any[]>([]);
  const [valu, setVal] = useState<number[]>([0]);
  const [diff, setDiff] = useState<number>(0);

  async function valChange(val: number[]) {
    var newVal = val[0];
    setVal(val);
  }

  async function calcChange() {
    const response1 = await fetch(
      "https://civic-kohl.vercel.app/project/getProjectByDriveId/" +
        props.drive_id
    );
    const data1: ProjectProps[] = await response1.json();
    setProjectData(data1);

    for (let i = 0; i < projectData.length; i++) {
      //Fetch Donations for each project and set a new key "donations" in the projectData array
      const response2 = await fetch(
        "https://civic-kohl.vercel.app/donation/getByProjectId/" +
          projectData[i].project_id
      );
      const data2: DonationProps[] = await response2.json();
      projectData[i]["donations"] = data2;
    }

    //Calculate sum of square root of individual donations and square the sum
    let sum = 0;
    console.log(valu[0])
    for (let i = 0; i < projectData.length; i++) {
      let projectSum = 0;
      for (let j = 0; j < projectData[i]["donations"].length; j++) {
        projectSum += Math.sqrt(projectData[i]["donations"][j].donation_amount);
      }
      //console.log("ID",projectData[i].project_id)
      if (projectData[i].project_id === props.project_id) {
        projectSum += Math.sqrt(valu[0]);
        //console.log("Blah",projectSum)
      }
      //save the sum as qfamt key in projectData array
      const sum_squared = Math.pow(projectSum, 2);
      console.log("Sum Squared",sum_squared)
      projectData[i]["qfamt"] = sum_squared;
    }

    //Calculate total sum of qfamt
    let totalSum = 0;
    for (let i = 0; i < projectData.length; i++) {
      totalSum += projectData[i]["qfamt"];
    }

    //Get Match Amount for the Drive Pool
    const response3 = await fetch(
      "https://civic-kohl.vercel.app/drive/getAvailableFundingByDriveId/" +
        props.drive_id
    );
    const data3 = await response3.json();
    const matchAmt = data3["drive_amount"];

    //Calculate percentage of each project
    for (let i = 0; i < projectData.length; i++) {
      projectData[i]["new_match_amount"] =
        (projectData[i]["qfamt"] / totalSum) * matchAmt;

        console.log("Match Amount",projectData[i]["new_match_amount"])
    }

    console.log(projectData)
    setDiff((valu[0]/(props.target_amount-props.donations))*props.match_amount+valu[0]);
  }

  return (
    //calcChange(),
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-[#7C0000]/80 hover:bg-[#7C0000] text-white font-bold py-2 px-4 rounded">
          Donate
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-transparent data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-[#7C0000] m-0 text-[17px] font-medium">
            Donate to Project: {props.project_name}
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Description: {props.project_description}. Click Donate when
            you&apos;re done.
          </Dialog.Description>
          <div className="flex justify-between mb-2">
            <div className="text-mauve11 text-[15px] leading-normal">
              Donations: S${props.donations}
            </div>
            <div className="text-mauve11 text-[15px] leading-normal">
              Target Amount: S${props.target_amount}
            </div>
          </div>
          <div className="flex flex-col text-xl font-bold text-[#7C0000] gap-y-2">
            <div className="flex justify-center">
              The Difference your donation Makes:
            </div>
            <div className="flex justify-center">S${diff}</div>
            <div className="flex justify-center">
              {" "}
              Donation Amount: S${valu}
            </div>
          </div>

          <form>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={valu}
              max={props.target_amount - props.donations}
              step={10}
              onValueChange={valChange}
            >
              <Slider.Track className="bg-black relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-white rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-white rounded-[10px] hover:bg-violet3 focus:border-2 focus:bg-indigo-600"
                aria-label="Volume"
              />
            </Slider.Root>
          </form>
          <div className="flex justify-between text-xl font-bold text-[#7C0000]">
            <div>S$0</div>
            <div>S${props.target_amount - props.donations}</div>
          </div>

          <div className="flex justify-center">
            <button onClick={calcChange} className="bg-[#7C0000]/80 hover:bg-[#7C0000] text-white font-bold py-2 px-4 rounded">
              Calculate Your Impact
            </button>
          </div>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Donate
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
