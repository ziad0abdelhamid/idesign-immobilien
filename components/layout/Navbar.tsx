"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavbarProps {
    isTransparent?: boolean;
}

export function Navbar({ isTransparent = true }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;

    useLayoutEffect(() => {
        // Check initial scroll position before paint
        setIsScrolled(window.scrollY > 150);
    }, []);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: `/${language}`, label: t.nav.home },
        { href: `/${language}/properties`, label: t.nav.properties },
        { href: `/${language}/services`, label: t.nav.services },
        { href: `/${language}/about`, label: t.nav.about },
        { href: `/${language}/partnership`, label: t.nav.partnership },
        { href: `/${language}/contact`, label: t.nav.contact },
    ];

    const showGlass = !isTransparent || isScrolled;

    return (
        <>
            {/* NAVBAR */}
            <nav
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-all duration-500 pb-1 backdrop-blur-xl",
                    showGlass
                        ? "bg-white/75 dark:bg-[#0b1220]/80 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-neutral-800"
                        : "bg-transparent"
                )}
            >
                {/* Gradient glow on scroll */}
                {showGlass && (
                    <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-[#06b6d4] to-transparent opacity-70" />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 md:h-24 items-center justify-between">
                        {/* LOGO */}
                        <Link
                            href={`/${language}`}
                            aria-label="DB ImmoDesign"
                            className="relative flex items-center transition-all duration-500"
                        >
                            <Image
                                src="/logo.png"
                                alt="DB ImmoDesign"
                                width={700}
                                height={700}
                                priority
                                className={cn(
                                    "object-contain transition-all duration-500 ease-in-out opacity-90 pt-0.5",

                                    // MOBILE (default)
                                    isScrolled
                                        ? "w-20 h-20"
                                        : "w-36 h-36",

                                    // TABLET
                                    "md:w-24 md:h-24",

                                    // DESKTOP (no scroll resize)
                                    "lg:w-36 lg:h-36"
                                )}
                            />
                            {/* <motion.h1
                                className={cn(
                                    "relative text-2xl font-semibold tracking-wide transition-colors",
                                    showGlass
                                        ? "text-[#0b1220] dark:text-white hover:(--primary-gold)"
                                        : "text-white/95 hover:text-(--primary-gold)"
                                )}>
                                DB ImmoDesign
                            </motion.h1> */}
                        </Link>

                        {/* DESKTOP NAV */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "relative text-l font-semibold tracking-wide transition-colors",
                                            showGlass
                                                ? "text-[#0b1220] dark:text-white hover:text-(--primary-gold)"
                                                : "text-white/95 hover:text-(--primary-gold)"
                                        )}
                                    >
                                        {link.label}

                                        {/* Active underline animation */}
                                        <span
                                            className={cn(
                                                "absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 transition-transform duration-300 origin-left",
                                                isActive && "scale-x-100",
                                                showGlass
                                                    ? "bg-(--primary-gold)"
                                                    : "bg-white"
                                            )}
                                        />
                                    </Link>
                                );
                            })}
                            <LanguageSwitcher />

                        </div>

                        {/* MOBILE TOGGLE */}
                        <button
                            aria-label="Toggle menu"
                            aria-expanded={isMobileOpen}
                            onClick={() => setIsMobileOpen((v) => !v)}
                            className={cn(
                                "md:hidden rounded-lg p-2 transition-colors backdrop-blur-2xl",
                                showGlass
                                    ? "bg-gray-400/50 backdrop-blur-xl shadow-xl border-b border-white/10"
                                    : "bg-transparent backdrop-blur-none shadow-none border-none",
                            )}
                        >
                            {isMobileOpen ? <X size={36} /> : <Menu size={36} />}
                        </button>
                    </div>

                    {/* MOBILE MENU */}
                    {isMobileOpen && (
                        <div className="md:hidden mt-2 rounded-xl bg-white dark:bg-[#0b1220] border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden z-50000">
                            {/* Language Switcher for Mobile */}
                            <div className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-800">
                                <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                                    Language
                                </div>
                                <LanguageSwitcher />
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block px-5 py-4 text-base font-semibold text-[#0b1220] dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav >

            {/* SPACER — only when navbar is not transparent */}
            {showGlass && <div className="h-20 md:h-24" />}
        </>
    );
}
