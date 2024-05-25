"use client";
import React, { useState } from "react";
import { close, logo, menu } from "../../../public";
import { navLinks } from "../constants";
import Image from "next/image";
import Link from "next/link";
import styles from "../constants/style";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { SignOutBtn } from "./SignOutBtn";

const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  const { user, isLoading } = useUser();
  const currentRoute = usePathname();

  return (
    <header>
      <div className={``}>
        <nav className={`${styles.paddingX} xl:max-w-full w-full fixed top-0 flex justify-between py-6 items-center navbar z-10 bg-black px-6`}>
          <div className={`w-1/2 flex justify-start`}>
            <Image src={logo} alt="hoobank" className="w-[54px] h-[52px]" />
            <div className="font-playfair font-medium text-[24px] text-white hover:text-[#7ed957] ml-2 flex items-center">
              CIVIC.
              {/* <div className="font-playfair font-medium text-[24px] text-[#7ed957] hover:text-white flex items-center">
                Electric
              </div> */}
            </div>
          </div>
          <ul className="list-none sm:flex hidden justify-end items-center flex-1 pr-1">
            
            {navLinks.slice(0, user?1:navLinks.length).map((nav, i) => (
              <li
                key={nav.id}
                className={`font-playfair font-normal cursor-pointer text-[16px] ${
                  i === navLinks.length - 1 ? "mr-0" : "mr-10"
                } text-white hover:text-lime-500 mr-10 ${
                  currentRoute === `/#${nav.id}`
                    ? "border-b-4 border-white"
                    : "border-b-4 border-transparent"
                }`}
              >
                <a href={`/#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            {user && (
              <li className="font-playfair font-normal cursor-pointer text-[16px] text-white mr-10">
                <Link href={"/user/home"}>Dashboard</Link>
              </li>
            )}
            <li className="font-playfair font-normal cursor-pointer text-[16px] text-white hover:text-lime-500 mr-10">
              {!isLoading && !user && (
                <Link href={"/api/auth/login"}>Sign In</Link>
              )}
              {user && <SignOutBtn></SignOutBtn>}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
