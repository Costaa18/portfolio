import { education, experience } from "@/types/main"
import { useState } from "react"
import { ViewAll } from "../projects/Projects"
import SectionWrapper from "../SectionWrapper"
import ExperienceCard from "./ExperienceCard"
import { useMessages, useTranslations } from "next-intl"

const Experiences = () => {

    const t = useTranslations('Experience');

    const experiencesMessages = useMessages() as {
      Experience: {
        title: string;
        career: Record<
          string,
          {
            company: string;
            position: string;
            startDate: string;
            endDate: string;
            desc: string;
          }
        >;
      };
    };

    const educationMessages = useMessages() as {
        Experience: {
            title: string;
            educations: Record<
            string,
            {
                institute: string;
                degree: string;
                startDate: string;
                endDate: string;
                desc: string;
            }
            >;
        };
        };
    
    const experiences = Object.keys(experiencesMessages.Experience.career)
    const educations = Object.keys(educationMessages.Experience.educations)
    
    const career = experiences.map((key) => ({
        company: experiencesMessages.Experience.career[key].company,
        position: experiencesMessages.Experience.career[key].position,
        startDate: experiencesMessages.Experience.career[key].startDate,
        endDate: experiencesMessages.Experience.career[key].endDate,
        desc: experiencesMessages.Experience.career[key].desc.split('|').map((item) => item.trim()), // Divide a string por vírgulas
      }));

    const education = educations.map((key) => ({
        institute: educationMessages.Experience.educations[key].institute,
        degree: educationMessages.Experience.educations[key].degree,
        startDate: educationMessages.Experience.educations[key].startDate,
        endDate: educationMessages.Experience.educations[key].endDate,
        desc: educationMessages.Experience.educations[key].desc.split('|').map((item) => item.trim()), // Divide a string por vírgulas
      }));
      
    
    const [show, setShow] = useState(t('experience'))
    const [viewAll, setViewAll] = useState(false)


    return (
        <SectionWrapper id="experience" className="min-h-screen">
            <h2 className="text-4xl text-center">{t('title')}</h2>

            <div className="w-fit mx-auto mt-6 p-2 bg-white dark:bg-grey-800 rounded-md flex gap-2 items-center">
                {[t('experience'), t('education')].map((e, i) => (
                    <button key={i} onClick={() => setShow(e)} className={`py-2 px-4 rounded-md transition-colors ${show === e ? 'bg-violet-600 text-white' : 'hover:bg-gray-100 hover:dark:bg-grey-900 text-black dark:text-white'}`}>{e}</button>
                ))
                }
            </div>

            <div className="lg:container sm:mx-4 lg:mx-auto lg:w-5/6 2xl:w-3/4">
                <div className="relative wrap overflow-hidden p-4 md:py-10 md:px-0">
                    <div className="left-6 md:left-1/2 absolute border-opacity-20 border-gray-400 dark:border-grey-800 h-full border"></div>

                    {viewAll ?
                        (show === t('experience') ? career : education).map((e, i) => (
                            // @ts-ignore
                            <ExperienceCard key={i} {...e} index={i} />
                        ))
                        :
                        (show === t('experience') ? career : education).slice(0, 2).map((e, i) => (
                            // @ts-ignore
                            <ExperienceCard key={i} {...e} index={i} />
                        ))
                    }

                </div>
            </div>

            {(show === t('experience') ? career : education).length > 2 &&
                <ViewAll scrollTo='experience' title={viewAll ? t('okay') : t('view all')} handleClick={() => setViewAll(!viewAll)} />
            }

        </SectionWrapper>
    )
}

export default Experiences