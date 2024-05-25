import Image from "next/image";
import Billing from "./components/Billing";
import Business from "./components/Business";
import CTA from "./components/CTA";
import CardDeal from "./components/CardDeal";
import Hero from "./components/Hero";
import styles from "./constants/style";
import Pricing from "./components/Pricing";
import Team from "./components/Team";

export default function Home() {
  return (
    <div className="bg-primary w-full pt-24 z-0 overflow-hidden">
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Business />
          <Billing />
          <CardDeal />
          <Pricing />
          <Team />
          <CTA />
        </div>
      </div>
    </div>
  );
}
