import { social } from "@/types/main";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";


export default function Footer({ socials }: { socials: social[]}) {
    const t = useTranslations('Footer')
    const { theme } = useTheme()

    return (
        <footer className="w-full bg-white dark:bg-grey-800 text-gray-500 dark:text-gray-300">

            <div className="xl:max-w-6xl mx-auto md:mx-6 lg:mx-10 xl:mx-auto py-4 lg:py-6 flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-center items-center">

                <p className="text-sm mt-2 md:mt-0">{t('made')}
                    <span className="animate-pulse"> ❤️ </span>
                    {t('by')}
                    <span className="text-violet-600"> Afonso Veloso</span></p>

                {/* Social Links */}
                <div className="flex xl:hidden items-center gap-2">
                    {socials.map((s: social,) => (
                        <Link href={s.link} target="_blank" rel="noreferrer" key={s.icon} className="grid place-items-center p-3 rounded-full text-lg hover:bg-gray-100 hover:dark:bg-grey-900 transition-colors">

                        </Link>
                    ))}
                </div>

            </div>

        </footer>
    )
}
