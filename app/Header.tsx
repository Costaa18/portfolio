"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { FiSun, FiMoon } from "react-icons/fi";
import { SiNestjs } from "react-icons/si";
import { CgClose, CgMenuRight } from "react-icons/cg";
import { FaNodeJs } from "react-icons/fa";
import Image from "next/image";

export default function Header({ logo }: { logo: string }) {
  const [navCollapse, setNavCollapse] = useState(true);
  const [scroll, setScroll] = useState(false);
  const { theme, setTheme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo/dark.svg" : "/logo/light.svg";

  useEffect(() => {
    const updateScroll = () => {
      window.scrollY >= 90 ? setScroll(true) : setScroll(false);
    };
    window.addEventListener("scroll", updateScroll);
  }, []);

  const navs = ["home", "skills", "projects", "experience", "contact"];

  return (
    <header
      className={`backdrop-filter backdrop-blur-lg ${
        scroll ? "border-b bg-white bg-opacity-40" : "border-b-0"
      } dark:bg-grey-900 dark:bg-opacity-40 border-gray-200 dark:border-b-0 z-30 min-w-full flex flex-col fixed`}
    >
      <nav className="lg:w-11/12 2xl:w-4/5 w-full md:px-6 2xl:px-0 mx-auto py-4 hidden sm:flex items-center justify-between">
        <Link
          href="/"
          className="2xl:ml-6 hover:text-violet-700 hover:dark:text-violet-500 transition-colors duration-300"
        >
          <span className="flex gap-2 items-center">
            <svg
              className="w-10 h-10 fill-current" // Adicionando transição ao logo também
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 105 68"
            >
              <path
                d="M59.856 67.4L30.864 0.200005H47.664L73.008 59.72H63.12L88.848 0.200005H104.304L75.216 67.4H59.856Z"
                fill="currentColor"
              />
              <path
                d="M0 67.2L29.952 0H45.312L75.36 67.2H59.04L34.464 7.872H40.608L15.936 67.2H0ZM14.976 52.8L19.104 40.992H41.088L45.312 52.8H14.976Z"
                fill="currentColor"
              />
            </svg>
            {/* <span className="text-xl font-medium">Afonso Veloso</span> */}
          </span>
        </Link>

        <ul className="flex items-center gap-8">
          {navs.map((e, i) => (
            <li key={i}>
              <ScrollLink
                href={`#${e}`}
                className="hover:text-violet-700 hover:dark:text-violet-500 transition-colors capitalize cursor-pointer"
                to={e}
                offset={-60}
                smooth={true}
                duration={500}
                isDynamic={true}
              >
                {e}
              </ScrollLink>
            </li>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-gray-100 hover:dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </ul>
      </nav>

      <nav className="p-4 flex sm:hidden items-center justify-between">
        <span className="flex gap-2 items-center">
          <FaNodeJs size={28} />
          <span className="text-lg font-medium">Afonso Veloso</span>
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-100 dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <CgMenuRight size={20} onClick={() => setNavCollapse(false)} />
        </div>
      </nav>

      <div
        className={`flex min-h-screen w-screen absolute md:hidden top-0 ${
          !navCollapse ? "right-0" : "right-[-100%]"
        } bottom-0 z-50 ease-in duration-300`}
      >
        <div className="w-1/4" onClick={() => setNavCollapse(true)}></div>

        <div className="flex flex-col p-4 gap-5 bg-gray-100/95 backdrop-filter backdrop-blur-sm dark:bg-grey-900/95 w-3/4">
          <CgClose className="self-end my-2" size={20} onClick={() => setNavCollapse(true)} />

          {navs.slice(0, 3).map((e) => (
            <ScrollLink
              key={e}
              className="hover:text-purple-600 py-1.5 px-4 rounded transition-colors capitalize cursor-pointer"
              to={e}
              offset={-60}
              smooth={true}
              duration={500}
              isDynamic={true}
              onClick={() => setNavCollapse(true)}
            >
              {e}
            </ScrollLink>
          ))}
          <ScrollLink
            to="contact"
            offset={-60}
            smooth={true}
            duration={500}
            onClick={() => setNavCollapse(true)}
            className="px-6 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-center"
          >
            Contact
          </ScrollLink>
        </div>
      </div>
    </header>
  );
}
