import React from "react";
import { features } from "../constants";
import styles, { layout } from "../constants/style";
import Button from "./Button";
import Image, { StaticImageData } from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  content: string;
  index: number;
}

const FeatureCard = (props: FeatureCardProps) => (
  <div
    className={`flex flex-row p-6 p-6 rounded-[20px] bg-gradient-to-r from-slate-600 via-white-100 to-black hover:from-indigo-500 ${
      props.index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card `}
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} m-3`}>
      <h4 className="font-playfair font-semibold text-[25px] sm:text-[30px] leading-[43px] sm:leading-[53px]">
        {props.icon}
      </h4>
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-playfair font-semibold text-[18px] leading-[23.4px] mb-1 text-gradient bg-gradient-to-r from-indigo-400 to-white inline-block text-transparent bg-clip-text">
        {props.title}
      </h4>
      <p className="font-playfair font-normal text-dimWhite text-[16px] sm:text-[16px] leading-[24px]">
        {props.content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          You manage the business, <br className="sm:block hidden" />
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            we&apos;ll handle the energy.
          </div>
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          F&B outlets in Asia use 4X more Energy per Meter<sup>2</sup> than
          office buildings affecting their bottom line by over 15%.
        </p>
      </div>
      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;