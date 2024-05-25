"use client"
import Image, { StaticImageData } from "next/image";
import styles, { layout } from "../constants/style";
import { rmurarishetti } from "../../../public";
import { teamMembers } from "../constants";

interface TeamCardProps {
  name: string;
  designation: string;
  image: StaticImageData;
}

const TeamCard = (props: TeamCardProps) => (
  <div className="flex flex-col w-1/4 h-auto bg-[#fff4f4] hover:from-indigo-700 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 rounded-[20px] p-6 mx-2">
    <div className="flex justify-center rounded-full border-2 border-white">
      <Image src={props.image} alt="team" className="rounded-full" />
    </div>
    <div className="w-full flex justify-between mt-2">
      <h4 className="font-playfair font-semibold text-[15px] leading-[23px] text-gradient mb-1 bg-[#1E1E1E] inline-block text-transparent bg-clip-text">
        {props.name}
      </h4>
    </div>
    <p className="font-playfair font-normal text-dimWhite text-[16px] leading-[24px]">
      {props.designation}
    </p>
  </div>
);

export default function Team() {
  return (
    <section id="team" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          <div className="text-[#1E1E1E]">
            Meet Our Team
          </div>
        </h2>
        <p className={`${styles.paragraph} max-w-[460px] mt-5`}>
          We&apos;re a team of passionate engineers. We&apos;re in this to make
          a difference.
        </p>
      </div>
      <div className={styles.flexStart + " flex-col overflow-x-auto scrollbar md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2"}>
        <div className="flex justify-between items-center p-2">
          {teamMembers.slice(0, 7).map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              designation={member.title}
              image={member.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
