"use client"
import React, { useEffect, useState } from "react";
import ProjectProps from "../props/ProjectProps";
import DonationProps from "../props/DonationProps";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface DonationModalProps{
    drive_id: string;
    project_id: number;
}

export default function DonationModal(props: DonationModalProps) {
    const [projectData, setProjectData] = useState<any[]>([]);

    async function calcChange(){
        const response1 = await fetch("https://civic-kohl.vercel.app/project/getProjectByDriveId/"+props.drive_id);
        const data1:ProjectProps[] = await response1.json();
        setProjectData(data1);

        for (let i = 0; i < projectData.length; i++) {
            //Fetch Donations for each project and set a new key "donations" in the projectData array
            const response2 = await fetch("https://civic-kohl.vercel.app/donation/getByProjectId/"+projectData[i].project_id);
            const data2:DonationProps[] = await response2.json();
            projectData[i]["donations"] = data2;
        }

        //Calculate sum of square root of individual donations and square the sum
        let sum = 0;
        for (let i = 0; i < projectData.length; i++) {
            let projectSum = 0;
            for (let j = 0; j < projectData[i]["donations"].length; j++) {
                projectSum += Math.sqrt(projectData[i]["donations"][j].donation_amount);
            }
            //save the sum as qfamt key in projectData array
            const sum_squared = Math.pow(projectSum, 2);
            projectData[i]["qfamt"] = sum_squared;
        }
        
        //Calculate total sum of qfamt
        let totalSum = 0;
        for (let i = 0; i < projectData.length; i++) {
            totalSum += projectData[i]["qfamt"];
        }

        //Get Match Amount for the Drive Pool
        const response3 = await fetch("https://civic-kohl.vercel.app/drive/getAvailableFundingByDriveId/"+props.drive_id);
        const data3 = await response3.json();
        const matchAmt = data3["drive_amount"];

        //Calculate percentage of each project
        for (let i = 0; i < projectData.length; i++) {
            projectData[i]["match_amount"] = (projectData[i]["qfamt"]/totalSum)*matchAmt;
        }
        console.log(projectData);
    }

    return(
        //calcChange(),
        <div>
            <h1>Donation Modal</h1>
        </div>
    )

};


// import React from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';

// const DialogDemo = () => (
//   <Dialog.Root>
//     <Dialog.Trigger asChild>
//       <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
//         Edit profile
//       </button>
//     </Dialog.Trigger>
//     <Dialog.Portal>
//       <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
//       <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
//         <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
//           Edit profile
//         </Dialog.Title>
//         <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
//           Make changes to your profile here. Click save when you're done.
//         </Dialog.Description>
//         <fieldset className="mb-[15px] flex items-center gap-5">
//           <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
//             Name
//           </label>
//           <input
//             className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
//             id="name"
//             defaultValue="Pedro Duarte"
//           />
//         </fieldset>
//         <fieldset className="mb-[15px] flex items-center gap-5">
//           <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
//             Username
//           </label>
//           <input
//             className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
//             id="username"
//             defaultValue="@peduarte"
//           />
//         </fieldset>
//         <div className="mt-[25px] flex justify-end">
//           <Dialog.Close asChild>
//             <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
//               Save changes
//             </button>
//           </Dialog.Close>
//         </div>
//         <Dialog.Close asChild>
//           <button
//             className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
//             aria-label="Close"
//           >
//             <Cross2Icon />
//           </button>
//         </Dialog.Close>
//       </Dialog.Content>
//     </Dialog.Portal>
//   </Dialog.Root>
// );

// export default DialogDemo;