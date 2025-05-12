import { useState } from "react";
import SkillCard from "./SkillCard";
import SectionWrapper from "../SectionWrapper";
import { useMessages, useTranslations } from "next-intl";

interface skill {
  name: string;
  image: string;
  category: string;
}

const Skills = () => {
  const t = useTranslations("Skills");
  const messages = useMessages() as { SkillsData: Record<string, { title: string; [key: string]: any }> };

  // Obter categorias
  const categories = Object.keys(messages.SkillsData);
  const [category, setCategory] = useState(categories[0]);

  // Obter skills da categoria selecionada
  const skills = Object.keys(messages.SkillsData[category])
    .filter((key) => key !== "title") // Exclui a propriedade "title"
    .map((key) => ({
      name: messages.SkillsData[category][key].name,
      image: messages.SkillsData[category][key].image,
      category: messages.SkillsData[category][key].category,
    }));

  return (
    <SectionWrapper id="skills" className="min-h-[80svh] mt-12 md:mt-8 mx-4 xl:my-20">
      <h2 className="text-4xl text-center">{t("title")}</h2>

      {/* Navegação de Categorias */}
      <div className="md:w-1/2 overflow-x-auto scroll-hide lg:w-1/2 mx-auto mt-6 bg-white dark:bg-grey-800 p-2 flex justify-between items-center gap-3 rounded-md">
        {categories.map((c: string) => (
          <span
            key={c}
            onClick={() => setCategory(c)}
            className={`p-1.5 md:p-2 text-sm md:text-base w-full text-center cursor-pointer rounded-md ${
              category === c
                ? "bg-violet-600 dark:bg-violet-600 text-white"
                : "bg-white dark:bg-grey-800 hover:bg-gray-100 hover:dark:bg-grey-900"
            } transition-all capitalize`}
          >
            {messages.SkillsData[c].title} {/* Título da categoria */}
          </span>
        ))}
      </div>

      {/* Renderizar Skills */}
      <div className="lg:w-3/4 2xl:w-3/5 my-8 mx-auto md:px-12 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 place-items-center gap-8">
        {skills.map((s: skill, i: number) => (
          <SkillCard key={i} {...s} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
