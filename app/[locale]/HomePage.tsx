"use client";
import { data } from "@/types/main";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Socials from "@/components/Socials";
import Experiences from "@/components/experiences/Experiences";
import Contact from "@/components/Contact";
import Header from "../Header";
import Footer from "../Footer";

interface Props {
  data: data;
}

/*
below Hero
<About aboutData={data.about} name={data.main.name} />

below Skills
<Projects projectsData={data.projects} />
*/
const HomePage = ({ data }: Props) => {
  return (
    <>
      <Header />
      <Hero mainData={data.main} />
      <Socials socials={data.socials} />
      <Skills />
      <Projects />
      <Experiences />
      <Contact />
      <Footer socials={data.socials} />
    </>
  );
};

export default HomePage;
