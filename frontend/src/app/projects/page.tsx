import ProjectCard from "../components/ProjectCard";
import styles from "../constants/style";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 z-0">
      <div className={styles.boxWidth}>
        <div className={`flex justify-start mt-2`}>
          <div
            className={`font-playfair  xs:text-[48px] text-[48px] text-[#1E1E1E] xs:leading-[76.8px] leading-[66.8px] w-full`}
          >
            Our Projects
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-[20px]">
        <ProjectCard name="Project 1" description="Description 1" donation={100} target={1000} matchamt={100} />
      </div>
    </main>
  );
}
