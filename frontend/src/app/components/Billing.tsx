import React from "react";
import styles, { layout } from "../constants/style";
import Donut from "./Donut";

interface DeviceCardProps {
  title: string;
  content: string;
}

const DeviceCard = (props: DeviceCardProps) => (
  <div className="flex flex-col w-1/2 h-auto bg-gradient-to-r from-slate-800 via-white-100 to-black hover:from-indigo-700 rounded-[20px] p-6">
    <div className="flex justify-between">
      <h4 className="font-playfair font-semibold text-[18px] leading-[23px] text-gradient mb-1 bg-gradient-to-r from-indigo-400 to-white inline-block text-transparent bg-clip-text">
        {props.title}
      </h4>
    </div>
    <p className="font-playfair font-normal text-dimWhite text-[16px] leading-[24px]">
      {props.content}
    </p>
  </div>
);

const Billing = () => {
  return (
    <section id="product" className={layout.section}>
      <div className={layout.sectionInfo}>
        <Donut />
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-[42px]">
            From Fridge to Fryer:
          </div>
          <br className="sm:block hidden" />
          <div className="text-[42px]">
            What are Restaurants&apos; Biggest Energy Users?
          </div>
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          By tackling these energy vampires, you can keep your kitchen humming
          and your bottom line healthy.
        </p>
        <div className="flex flex-row p-2">
          <DeviceCard
            title="Refrigeration"
            content="Refrigeration units, running 24/7, gobble up energy like a gourmet feast."
          />
          <DeviceCard
            title="Air Conditioning"
            content="Air conditioning, often inefficiently managed, keeps things cool but costs a bundle, leaving your profits on ice."
          />
        </div>
        <div className="flex flex-row p-2">
          <DeviceCard
            title="Lighting"
            content="Lighting, a necessity, can translate into bright lights and big bills unless modernized to minimize energy waste."
          />
          <DeviceCard
            title="Kitchen Appliances"
            content="Kitchen appliances, from ovens roaring to fryers flowing, can drain your profits if not used smartly."
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
