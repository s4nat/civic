"use client";
import DriveCard from "../components/DriveCard";
import DriveProps from "../props/DriveProps";
import styles from "../constants/style";
import { useState, useEffect } from "react";

export default function Home() {
  const [drives, setDrives] = useState<DriveProps[]>([]);
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await fetch("https://civic-kohl.vercel.app/drive");
        const data: DriveProps[] = await response.json();
        setDrives(data);
      } catch (error) {
        console.error("Error fetching Drives:", error);
      }
    };

    fetchDrives();
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div
            className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}
          >
            Our Drives
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-[20px]">
        {drives.map((drive, index) => {
          return (
            <div key={drive.drive_id}>
              <DriveCard
                id={drive.drive_id}
                name={drive.drive_name}
                description={drive.drive_description}
                month={drive.drive_month}
                amount={drive.drive_amount}
                category={drive.drive_category}

              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
