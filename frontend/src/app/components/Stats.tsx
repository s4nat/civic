"use client"

import React from 'react'
import styles from '../constants/style'
import { useState, useEffect } from "react";


export default function Stats() {

  const [totalCompanyFunds, setTotalCompanyFunds] = useState<number>()
  const [totalDonors, setTotalDonors] = useState<number>()
  const [totalProjects, setTotalProjects] = useState<number>()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response1 = await fetch("https://civic-kohl.vercel.app/company/sumCompanyFunds");
        const data1 = await response1.json();
        console.log(data1);
        setTotalCompanyFunds(data1["_sum"]["fund_amount"]);

        const response2 = await fetch("https://civic-kohl.vercel.app/donation");
        const data2 = await response2.json();
        console.log(data2);
        setTotalDonors(data2["totalDonations"]);

        const response3 = await fetch("https://civic-kohl.vercel.app/project/getProjects");
        const data3 = await response3.json();
        console.log(data3);
        setTotalProjects(data3["totalProjects"]);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      <div className={`flex-1 flex justify-start items-center flex-row m-3 rounded-md bg-[#fff4f4]`}>
        <h4 className='font-playfair font-bold xs:text-[40px] text-[35px] xs:leading-[53px] leading-[43px] text-[#7C0000] mx-10 my-10'>${totalCompanyFunds}</h4>
        <p className='font-playfair font-semibold xs:text-[20px] text-[18px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>Total Corporate Donations</p>
      </div>
      <div className={`flex-1 flex justify-start items-center flex-row m-3 rounded-md bg-[#fff4f4]`}>
        <h4 className='font-playfair font-bold xs:text-[40px] text-[35px] xs:leading-[53px] leading-[43px] text-[#7C0000] mx-10 my-10'>{totalDonors}</h4>
        <p className='font-playfair font-semibold xs:text-[20px] text-[18px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>Individual Donors</p>
      </div>
      <div className={`flex-1 flex justify-start items-center flex-row m-3 rounded-md bg-[#fff4f4]`}>
        <h4 className='font-playfair font-bold xs:text-[40px] text-[35px] xs:leading-[53px] leading-[43px] text-[#7C0000] mx-10 my-10'>{totalProjects}</h4>
        <p className='font-playfair font-semibold xs:text-[20px] text-[18px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>Total Projects Funded</p>
      </div>
    </section>
  )
}
