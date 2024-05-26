import React from "react";
import { features } from "../constants";
import styles, { layout } from "../constants/style";
import Button from "./Button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";


interface FeatureCardProps {
  icon: any;
  title: string;
  content: string;
  index: number;
  link: string;
}

const FeatureCard = (props: FeatureCardProps) => (
  <Link href={props.link}>

  < div
    className={`flex flex-row p-6 p-6 rounded-[5px] bg-[#fff4f4] hover:translate-y-[5px] hover:scale-101 hover:bg-[#7C0000]/20 ${props.index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card `}
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} m-3`}>
      <Image
        src={props.icon}
        alt="icon"
        width="70"
        height="70"
        className="h-[100%] w-[100%] relative z-[5]"
      />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-playfair font-bold text-[18px] leading-[23.4px] mb-1 text-[#1E1E1E] inline-block">
        {props.title}
      </h4>
      <p className="font-playfair font-semibold text-[#1E1E1E] text-[16px] sm:text-[16px] leading-[24px]">
        {props.content}
      </p>
    </div>
  </div >
</Link >
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Maximize community impact through <br className="sm:block hidden" />
          <div className={styles.heading2}>
            collaborative funding and corporate support.
          </div>
        </h2>
        <p className={`${styles.paragraph} max-w-[500px] mt-5`}>
          73% of community initiatives fizzled out due to lack of funding
        </p>
      </div>
      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard  key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
