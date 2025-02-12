"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Languages");
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [isOpen]);

  const availableLocales = [
    { code: "en", label: "EN", flag: "/flags/en.svg" },
    { code: "pt", label: "PT", flag: "/flags/pt.svg" },
  ];

  const selectedLocale = availableLocales.find((l) => l.code === locale) || availableLocales[0];
  const filteredLocales = availableLocales.filter((l) => l.code !== selectedLocale.code);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-md transition duration-300 hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLocale && (
          <Image src={selectedLocale.flag} alt={selectedLocale.label} width={28} height={20} className="rounded-sm" />
        )}
        <ChevronDown className="ml-2 w-5 h-5 text-white" />
      </button>
      {isOpen && (
        <motion.div
          className="absolute bg-gray-900 border border-gray-700 shadow-lg rounded-lg overflow-hidden z-10 mt-2"
          style={{ width: buttonWidth }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {filteredLocales.map(({ code, flag, label }) => (
            <button
              key={code}
              className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-gray-800 transition duration-300"
              onClick={() => {
                const newPath = pathname ? `/${code}${pathname.substring(3)}` : `/${code}`;
                router.push(newPath);
                setIsOpen(false);
              }}
            >
              <Image src={flag} alt={code} width={28} height={20} className="rounded-sm" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
