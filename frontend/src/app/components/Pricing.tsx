"use client";

import styles, { layout } from "../constants/style";
import { LuCheckCircle } from "react-icons/lu";
import { MdOutlineStars } from "react-icons/md";
import { pricingPackages } from "../constants";
import { useEffect, useState } from "react";

interface PricingCardProps {
  title: string;
  recommended: string;
  content: string[];
  pricing: string;
  elgoPackage?: boolean;
  buttontext: string;
}

const PricingCard = (props: PricingCardProps) => (
  <div
    className={`bg-${
      props.elgoPackage ? "black" : "white"
    } flex flex-col w-full h-auto sm:h-auto md:h-auto rounded-[20px] p-4 mx-1 transition-all duration-200 ease-in-out hover:-translate-y-1 scale-98 hover:scale-103 mb-3 ${
      props.elgoPackage ? "border-[#56c210] border-[0.5px]" : ""
    }`}
  >
    <div className="flex justify-start ml-2 my-2">
      <div
        className={`bg-${
          props.elgoPackage
            ? "[#56c210] text-black font-bold"
            : "black text-white font-light"
        } flex items-center w-auto p-2 rounded-md font-playfair text-xs sm:text-sm md:text-[10px] text-[12px]`}
      >
        {props.elgoPackage ? <MdOutlineStars /> : <></>}
        {props.recommended}
      </div>
    </div>
    <div className="flex justify-start ml-2 my-2">
      <h4
        className={`font-playfair font-semibold text-lg sm:text-xl md:text-[20px] leading-[23px] ${
          props.elgoPackage ? "text-white" : "text-black"
        } mb-1 inline-block`}
      >
        {props.title}
      </h4>
    </div>
    <div className="flex justify-start m-2 items-center">
      <div className="h-[1px] w-full bg-slate-500"></div>
    </div>
    <div className="flex justify-start ml-2">
      <div
        className={`font-playfair font-medium text-sm sm:text-base md:text-[15px] inline-block ${
          props.elgoPackage ? "text-white" : "text-black"
        }`}
      >
        Services
      </div>
    </div>
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col space-y-4">
          {props.content.map((contentItem, index) => (
            <div key={index} className="flex items-baseline">
              <LuCheckCircle className="text-[12px] text-[#56C210] mr-1" />
              <div
                className={`w-full sm:w-4/5 font-playfair font-medium text-xs sm:text-sm md:text-[12px] inline-block ${
                  props.elgoPackage ? "text-white" : "text-black"
                }`}
              >
                {contentItem}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full mt-2">
          <h4
            className={`font-playfair font-semibold text-sm sm:text-base md:text-[12px] leading-[23px] ${
              props.elgoPackage ? "text-white" : "text-black"
            } mb-1 inline-block`}
          >
            Pay 50% of What you Save
          </h4>
        </div>
        <div className="flex items-end justify-start ml-2 mb-2">
          <h4
            className={`font-playfair font-semibold text-lg sm:text-xl md:text-[20px] leading-[23px] ${
              props.elgoPackage ? "text-white" : "text-black"
            } mb-1 inline-block`}
          >
            {props.pricing}
            <div
              className={`font-playfair font-light text-sm sm:text-base md:text-[15px] ${
                props.elgoPackage ? "text-white" : "text-black"
              } inline-block`}
            >
              /month
            </div>
          </h4>
        </div>
        <div className="flex mt-2 justify-center items-center">
          <button
            className={`w-3/4 flex justify-center rounded-md p-2 items-center ${
              props.elgoPackage
                ? "bg-[#56c210] text-black font-bold"
                : "bg-black text-white"
            } text-xs sm:text-sm md:text-[10px]`}
          >
            {props.buttontext}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function Pricing() {
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 1920,
      height: 1080,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
            
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();
  return (
    <section id="pricing" className={layout.section}>
      <div
       style={{
        position: "relative",
        width: size.width <= 750 ? "100%" : "62%",
      }}
        className={
          layout.sectionInfoUpdated +
          " pr-6 overflow-auto scrollbar"
        }
      >
        <div className="flex flex-row">
          {pricingPackages.map((pricingPackage, index) => (
            <PricingCard key={index} {...pricingPackage} />
          ))}
        </div>
      </div>
      <div
        className={`${layout.sectionInfo} flex flex-col justify-between h-full`}
      >
        <h2 className={styles.heading2}>
          Worried about the cost?{" "}
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Pay a share of
          </div>
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            what you Save.
          </div>
        </h2>

        <p className={`${styles.paragraph} max-w-[460px] mt-5`}>
          You read that right! Pay a share of only what you save. Our attractive
          three tier pricing model ensures you don&apos;t have to worry about
          the cost. We only charge you 50% of what you save, meaning you profit
          50% of what you save. Additional charges may apply based on
          customizations to the base package. We got you covered.
        </p>
      </div>
    </section>
  );
}
