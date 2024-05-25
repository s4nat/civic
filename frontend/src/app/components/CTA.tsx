import React from "react";
import styles, { layout } from "../constants/style";
import BookDemo from "./BookDemo";

const CTA = () => {
  return (
    <section
      className={`flex justify-center items-center sm:my-10 my-6 sm:px-4 px-6 sm:py-12 py-4 sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>
          Discover how
          <div></div>
          <div className="bg-[#7C0000] inline-block text-transparent bg-clip-text">
            Our funding works
          </div>
        </h2>
      </div>
      <div className={layout.sectionImg}>
        <BookDemo />
      </div>
    </section>
  );
};

export default CTA;
