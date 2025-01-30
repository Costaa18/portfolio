import { useState } from "react";
import { Link } from "react-scroll";
import SectionWrapper from "../SectionWrapper";
import ProjectCard from "./ProjectCard";
import { useMessages, useTranslations } from "next-intl";

interface Project {
  name: string;
  image: string;
  techstack: string;
  category: string;
  links: {
    visit: string;
    code: string;
    video: string;
  };
}

interface Category {
  title: string; // Cada categoria tem um título.
  [projectKey: string]: Project | string; // Projetos estão dentro, exceto "title".
}

interface ProjectsMessages {
  Projects: {
    title: string; // Título geral dos projetos.
    [categoryKey: string]: Category | string; // Outras chaves são categorias ou strings.
  };
}

const Projects = () => {
  const t = useTranslations("Projects");
  const projectsMessages = useMessages() as unknown as ProjectsMessages;

  // Filtra apenas categorias (excluindo "title")
  const categories = Object.keys(projectsMessages.Projects).filter(
    (key) => key !== "title"
  );

  // Inicialização do estado
  const [category, setCategory] = useState(categories[0] || ""); // Define a categoria inicial
  const [viewAll, setViewAll] = useState(false);

  // Extrai os projetos da categoria
  const projects = categories.flatMap((catKey) => {
    const categoryData = projectsMessages.Projects[catKey] as Category;

    if (typeof categoryData === "string") {
      return []; // Caso seja uma string (não deveria acontecer, mas é seguro).
    }

    const categoryTitle = categoryData.title;
    const projectKeys = Object.keys(categoryData).filter((key) => key !== "title");

    return projectKeys.map((projectKey) => ({
      ...(typeof categoryData[projectKey] === "object" ? categoryData[projectKey] : {}), // Dados do projeto.
      category: categoryTitle, // Adiciona o título da categoria ao projeto.
    }));
  });

  // Função para filtrar projetos por categoria
  const filteredProjects = projects.filter((p) => p.category === category);

  const filterProjects = (cat: string) => {
    setViewAll(false);
    setCategory(cat);
  };

  console.log("Categories" + categories); 
  console.log("Projects" + filteredProjects);

  return (
    <SectionWrapper id="projects" className="mx-4 md:mx-0 min-h-screen">
      <h2 className="text-4xl text-center">{t("title")}</h2>

      {/* Categorias */}
      <div className="overflow-x-auto scroll-hide md:w-full max-w-screen-sm mx-auto mt-6 flex justify-between items-center gap-2 md:gap-3 bg-white dark:bg-grey-800 p-2 rounded-md">
        {categories.map((c: string, i: number) => {
          const categoryData = projectsMessages.Projects[c] as Category;

          return (
            <span
              key={i}
              onClick={() => filterProjects(c)}
              className={`p-1.5 md:p-2 w-full text-sm md:text-base text-center capitalize rounded-md ${
                category === c
                  ? "bg-violet-600 text-white"
                  : "hover:bg-gray-100 hover:dark:bg-grey-900"
              } cursor-pointer transition-all`}
            >
              {categoryData.title}
            </span>
          );
        })}
      </div>

      {/* Grid de Projetos */}
      <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-4 md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
  {filteredProjects
    .slice(0, viewAll ? filteredProjects.length : 6)
    .map((p, i) => (
      <ProjectCard
        key={i}
        name={p.name || ""}
        image={p.image || ""}
        techstack={p.techstack || ""}
        category={p.category}
        links={p.links || { visit: "", code: "", video: "" }}
      />
    ))}
</div>


      {/* Botão View All */}
      {filteredProjects.length > 6 && (
        <ViewAll
          scrollTo="projects"
          title={viewAll ? "Okay, I got it" : "View All"}
          handleClick={() => setViewAll(!viewAll)}
        />
      )}
    </SectionWrapper>
  );
};

export default Projects;

type MouseEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

export const ViewAll = ({ handleClick, title, scrollTo }: { handleClick: MouseEventHandler, title: string, scrollTo: string }) => {
    return (
        <>
            <div className="bg-white dark:bg-grey-900 w-4/5 mx-auto blur-xl z-20 -translate-y-14 h-16"></div>
            <div className="text-center -translate-y-24">
                {title === 'View All' ?
                    <button onClick={handleClick} className={`bg-violet-600 text-white px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} py-1.5 rounded-md hover:shadow-xl transition-all`}>
                        {title}
                    </button>
                    :
                    <Link
                        to={scrollTo}
                        className={`bg-violet-600 text-white px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} cursor-pointer py-1.5 rounded-md hover:shadow-xl transition-all`}
                        offset={-60}
                        smooth={true}
                        duration={500}
                        // @ts-ignore
                        onClick={() => handleClick()}
                    >{title}</Link>
                }
            </div>
        </>
    )
}