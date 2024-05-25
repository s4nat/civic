import styles from "../constants/style";
import { tesselation, logo1 } from "../../../public";
import GetStarted from "./GetStarted";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <Image
          src={logo1}
          alt="billing"
          className="w-[40%] h-[40%] relative z-[5]"
        />
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-playfair font-semibold ss:text-[72px] text-[52px] ss:leading-[100.8px] leading-[75px] inline-block text-[#1E1E1E]">
            The Pulse of the<br className="sm:block hidden" />{" "}
          </h1>
          {/* <div className="ss:flex sm:invisible xl:visible lg:visible 2xl:visible md:mr-4 mr-0">
            <GetStarted />
          </div> */}
        </div>
        <h1 className="font-playfair font-semibold ss:text-[68px] text-[52px] ss:leading-[100.8px] leading-[75px] w-full text-[#1E1E1E] inline-block">
          Community.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          A crowdfunding platform for community initiatives which empowers communities to create real social impact.
        </p>
      </div>
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 relative`}
      >
        <Image
          src={tesselation}
          alt="billing"
          className="h-[120%] w-[95%] relative z-[5]"
        />
      </div>

      {/* <div className={`ss:hidden sm:visible xl:invisible lg:invisible 2xl:invisible ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;
