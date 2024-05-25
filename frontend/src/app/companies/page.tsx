'use client';

import styles from "@/app/constants/style";
import CompanyCard from "../components/CompanyCard";
import CompanyProps from "../components/CompanyProps";
import { useState, useEffect } from "react";



export default function Home() {
  const [companyData, setCompanyData] = useState<CompanyProps[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://civic-kohl.vercel.app/project/getProjects");
        const data: CompanyProps[] = await response.json();
        console.log(data);
        setCompanyData(data); 
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}>Companies we&apos;ve partnered with...</div>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
        {companyData.map((company, index) => (
          
            <CompanyCard
              key={company.company_id}
              name={company.company_name}
              link={company.company_link}
              fundCategory={company.fund_target_category}
              fundAmount={company.fund_amount.toString()}
            />
          
        ))}
        </div>
      </div>
    </main>
  );
}
