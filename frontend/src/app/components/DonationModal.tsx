"use client"
import React, { useEffect, useState } from "react";
import ProjectProps from "../props/ProjectProps";
import DonationProps from "../props/DonationProps";

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