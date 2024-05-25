"use client";
import styles from "@/app/constants/style";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}>Companies we&apos;ve partnered with...</div>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CompanyCard key={index} name="DBS" fundAmount="10,000" link="https://google.com" fundCategory="Humanitarian"/>
          ))}
        </div>
      </div>
    </main>
  );
}
