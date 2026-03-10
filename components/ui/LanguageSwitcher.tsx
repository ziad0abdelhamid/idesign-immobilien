"use client";

import { useLanguageStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Flag from 'react-flagkit';


// Make sure you have these SVGs in your /public/flags folder
const languages = [
    { code: "de", name: "Deutsch", flag: <Flag country="DE" size={24} /> },
    { code: "en", name: "English", flag: <Flag country="GB" size={24} /> },
];

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguageStore();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const showGlass = !isHome || isScrolled;

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const current = languages.find((l) => l.code === language) ?? languages[0];

    const changeLanguage = (code: "en" | "de") => {
        setLanguage(code);
        setOpen(false);
        document.documentElement.lang = code;
        document.documentElement.dir = "ltr";
        window.location.href = `/${code}${window.location.pathname.slice(3)}`;
    };

    return (
        <div className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--primary-gold) cursor-pointer text-white",
                    showGlass || !isHome
                        ? "bg-white/5 border-neutral-300/30 dark:border-neutral-700/50 text-neutral-900 dark:text-white hover:bg-white/10 dark:hover:bg-white/5"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                )}
                aria-expanded={open}
            >
                {current.flag}
                <span>{current.name}</span>
                <ChevronDown
                    className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className={cn(
                        "absolute top-full mt-2 min-w-max rounded-lg bg-white dark:bg-neutral-900 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-lg z-50 overflow-hidden",
                        "left-0"
                    )}
                >
                    {languages.map((lang, index) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code as any)}
                            className={cn(
                                "w-full px-4 py-3 text-sm flex items-center gap-3 font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors duration-150",
                                index !== languages.length - 1 && "border-b border-neutral-200 dark:border-neutral-800",
                                lang.code === language &&
                                "bg-neutral-50 dark:bg-neutral-800/50 text-(--primary-gold) font-semibold"
                            )}
                        >
                            {lang.flag}
                            <div className="flex flex-col">
                                <div className="font-semibold">{lang.name}</div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {lang.code.toUpperCase()}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}