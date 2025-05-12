"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { FiSun, FiMoon } from "react-icons/fi";
import { CgClose, CgMenuRight } from "react-icons/cg";
import { FaNodeJs } from "react-icons/fa";
import { useMessages, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/Language-Switcher";

export default function Header() {
  const t = useTranslations("Header");
  const [navCollapse, setNavCollapse] = useState(true);
  const [scroll, setScroll] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const updateScroll = () => {
      window.scrollY >= 90 ? setScroll(true) : setScroll(false);
    };
    window.addEventListener("scroll", updateScroll);
  }, []);

  const messages = useMessages() as {
    Header: {
      navbar: {
        home: string;
        skills: string;
        projects: string;
        experience: string;
        contact: string;
      };
    };
  };

  // Obtemos as chaves de navegação
  const navKeys = Object.keys(messages.Header.navbar);
  // Obtemos as traduções das chaves de navegação
  const navs = Object.values(messages.Header.navbar);

  // Criamos o mapeamento de chave para tradução
  const navMap = navKeys.reduce((acc, key, index) => {
    acc[key] = navs[index]; // Mapeando chave para tradução
    return acc;
  }, {} as Record<string, string>);

  return (
    <header
      className={`backdrop-filter backdrop-blur-lg ${
        scroll ? "border-b bg-white bg-opacity-40" : "border-b-0"
      } dark:bg-grey-900 dark:bg-opacity-40 border-gray-200 dark:border-b-0 z-30 min-w-full flex flex-col fixed`}
    >
      <nav className="lg:w-11/12 2xl:w-4/5 w-full md:px-6 2xl:px-0 mx-auto py-4 hidden sm:flex items-center justify-between">
        <Link
          aria-label="Logo"
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
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navKeys.map((key) => (
              <li key={key}>
                <ScrollLink
                  href={`#${key}`} // Usando a chave para navegar para o id correto da div
                  className="hover:text-violet-700 hover:dark:text-violet-500 transition-colors capitalize cursor-pointer"
                  to={key} // Usando a chave para navegar
                  offset={-80}
                  smooth={true}
                  duration={500}
                  isDynamic={true}
                >
                  {navMap[key]} {/* Exibindo a tradução correta */}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-gray-100 hover:dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <LanguageSwitcher /> {/* Merge Error */}
        </div>
      </nav>

      <nav className="p-4 flex sm:hidden items-center justify-between">
        <Link
          href="/"
          className="2xl:ml-6 hover:text-violet-700 hover:dark:text-violet-500 transition-colors duration-300"
        >
          <span className="flex gap-2 items-center">
            <svg
              className="w-[28px] h-[28px] fill-current" // Adicionando transição ao logo também
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
        <div className="flex items-center gap-4">
          <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-100 dark:bg-violet-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </span>
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
          <CgClose className="self-end my-2" size={20} onClick={() => setNavCollapse(true)} />{" "}
          {navKeys.slice(0, 4).map((key) => (
            <ScrollLink
              key={key}
              className="hover:text-purple-600 py-1.5 px-4 rounded transition-colors capitalize cursor-pointer"
              to={key} // Usando a chave para navegar
              href={`#${key}`} // Adding href for crawlability
              offset={-60}
              smooth={true}
              duration={500}
              isDynamic={true}
              onClick={() => setNavCollapse(true)}
            >
              {navMap[key]} {/* Exibindo a tradução correta */}
            </ScrollLink>
          ))}{" "}
          <ScrollLink
            to="contact"
            href="#contact"
            offset={-60}
            smooth={true}
            duration={500}
            onClick={() => setNavCollapse(true)}
            className="px-6 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-center"
          >
            Contact
          </ScrollLink>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
