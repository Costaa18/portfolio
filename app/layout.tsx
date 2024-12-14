"use client";

import { useEffect, useState } from "react";
import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from './head';
import { FaNodeJs } from 'react-icons/fa';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap', // Ensures the font swaps gracefully
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }
    setIsLoading(false);
  }, []);

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
            <SpeedInsights />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
