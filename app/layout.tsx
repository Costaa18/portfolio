"use client"; // Isso diz ao Next.js que o código abaixo deve ser executado no lado do cliente

import { useEffect, useState } from "react";
import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import Head from './head';
import { FaNodeJs } from 'react-icons/fa'; // Importa o ícone de Node.js

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap', // Ensures the font swaps gracefully
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>(null); // Mantém o tema no estado
  const [isLoading, setIsLoading] = useState(true); // Estado para controle de loading

  useEffect(() => {
    // Recupera o tema armazenado no localStorage, se houver
    const savedTheme = localStorage.getItem("theme");
    console.log("Saved", savedTheme);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark"); // Tema padrão, caso não haja configuração salva
    }
    setIsLoading(false); // Tema carregado, desativa o loading
  }, []);

  // Exibe o carregamento enquanto o tema estiver sendo recuperado
  if (isLoading) {
    return (
      <html lang="en">
        <Head />
        <body className={`${poppins.className} bg-gray-100 text-black min-h-screen`}>
          <div className="h-screen w-screen flex flex-col items-center justify-center gap-5 text-violet-600 fixed z-30 bg-grey-900">
            <FaNodeJs size={100} className="animate-pulse" />
            <p className="animate-pulse text-xl">Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  // Depois que o tema for recuperado, renderiza com a classe apropriada
  return (
    <html lang="en" className={theme ?? "dark"} style={{ colorScheme: theme ?? "dark" }}>
      <Head />
      <body className={`${poppins.className} bg-gray-100 dark:bg-grey-900 text-black dark:text-white min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
