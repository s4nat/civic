import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default withPageAuthRequired(
  async function UserPage() {
    const session = await getSession();
    const user = session?.user;
   
    async function createUser() {
      if (user && user.name && user.email) {
        const userData = {
          //name: user.name,
          email: user.email,
        };

        const exists = await fetch(
          `https://elgo-backend.vercel.app/users/getByEmail/${user.email}`
        );
        if (exists.status === 200) {
          const details = await exists.json();
          console.log("exists")
          //name = details.name;
          return;
        } else {
          const userJson = JSON.stringify(userData);
          const response = await fetch(
            "https://civic-kohl.vercel.app/user/createUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: userJson,
            }
          );
        }
        console.log("created user");
      }
    }

    return (
      createUser(),
      <div className="mt-20">
        <div className="xl:ml-14 ml-8 font-playfair font-medium md:text-4xl text-2xl px-5 pt-10 text-[#0B1E5B]">
          Hello, {user?.name}
        </div>
        <div className="xl:ml-14 ml-8 font-playfair font-medium md:text-2xl text-xl px-5 pt-4 text-[#0B1E5B]">
          Welcome To Your Dashboard
        </div>
        <div className="flex md:justify-center md:items-center">
          <div className="flex flex-row flex-wrap justify-center items-center md:mt-20 mt-5 md:mb-16 mb-8">
            
            <Link
              className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-playfair font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200"
              href="./projects"
            >
              <div className="md:text-2xl text-lg md:mb-10 mb-6 inline-flex items-center">
                <h3>Your Projects</h3>
                <FiArrowRight />
              </div>
              <div className="md:text-lg text-sm">
                Click Here To Explore Your Projects
              </div>
            </Link>
            <Link
              className="border-[2px] border-[#ffaeae] rounded-3xl bg-[#f2e9e4] hover:bg-[#eadbd3] hover:border-[#ff9090] py-4 px-4 m-10 font-playfair font-medium text-[#0b1e5b] transition ease-in-out delay-50 duration-200"
              href="/projects"
            >
              <div className="md:text-2xl text-lg md:mb-10 mb-6 inline-flex items-center">
                <h3>Explore Projects</h3>
                <FiArrowRight />
              </div>
              <div className="md:text-lg text-sm">
                View All Active Projects raising funds 
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  },
  { returnTo: "/user/home" }
);