import DriveCard from "../components/DriveCard";
import styles from "../constants/style";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-left p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div
            className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}
          >
            Current Drives
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-[20px]">
        <DriveCard name="Drive 1" description="A very impactful drive" month={12} amount={0} category="Fitness" />
      </div>
    </main>
  );
}
