import Image from "next/image"
import { useEffect, useState } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { useTheme } from "next-themes";

interface skill {
    name: string;
    image: string;
}

const Skill = ({ name, image }: skill) => {

    const { theme } = useTheme();
    const [bgColor, setBgColor] = useState("")
    useEffect(() => {
        new FastAverageColor().getColorAsync(image)
            .then(color => {
                const rgba = color.rgb.split(')')
                setBgColor(rgba[0] + ',0.07)')
            })
            .catch(e => {
                console.log(e);
            })
    }, [image])

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div title={name} style={{ backgroundColor: bgColor }}
                className={"h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-100 dark:bg-grey-800 flex items-center justify-center"}>
                <Image alt="skill" width={100} height={100} className={`h-12 w-12 md:h-14 md:w-14 object-contain ${theme === 'dark' && (name === "GitHub" || name === "WordPress" || name === "NextJS" || name === "ExpressJS" || name === "Shadcn/ui" ? 'invert' : 'invert-0')}`} src={image} />
            </div>
            <p className="text-sm md:text-base">{name}</p>
        </div>
    )
}

export default Skill