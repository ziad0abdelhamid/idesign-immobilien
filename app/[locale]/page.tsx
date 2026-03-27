"use client";

import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReviewsCarousel } from "@/components/ui/ReviewCarousel";
import RouteSkeleton from "@/components/ui/RouteSkeleton";
import "flag-icons/css/flag-icons.min.css";


export default function HomePage() {
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const fadeScale = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.18,
            },
        },
    };
    const buttonPress = {
        whileTap: { y: 2, scale: 0.97 },
    };
    return (

        <div className="w-full overflow-hidden">
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <img
                    src="/heroBG.jpeg"
                    alt="Hero background"
                    className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 pt-28 sm:pt-32 lg:pt-0">
                    {/* Main Title */}
                    <motion.h1
                        className={cn(
                            "relative z-10 text-white font-extrabold text-center",
                            "font-['Playfair_Display',serif]",

                            // better scaling on mobile
                            "text-[clamp(2rem,8vw,5rem)]",

                            "mb-3",
                            "tracking-[3px] sm:tracking-[4px]",
                            "uppercase",
                            "drop-shadow-[2px_2px_20px_rgba(0,0,0,0.5)]"
                        )}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        {t.home.greeting}
                    </motion.h1>
                    <motion.div
                        className={cn(
                            "relative overflow-hidden text-center",
                            "bg-(--glass) backdrop-blur-md",

                            // responsive padding
                            "py-5 px-5 sm:py-7 sm:px-10 lg:py-7.5 lg:px-12.5",

                            // width
                            "max-w-xl sm:max-w-3xl lg:max-w-260 mx-auto",

                            // border + shadow
                            "border-t-2 border-t-(--primary-gold)",
                            "shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                        )}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >



                        {/* Subtitle */}
                        <motion.h2
                            className="relative text-sm sm:text-base md:text-lg lg:text-xl text-white drop-shadow-lg z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {t.home.subtitle}
                        </motion.h2>

                        {/* Services */}
                        <motion.p
                            className="relative mt-4 text-lg sm:text-xl md:text-2xl text-(--primary-gold) drop-shadow-md z-10"
                        >
                            {t.home.basedinAustria}
                            <span className="fi fi-at ml-2" />
                        </motion.p>
                    </motion.div>


                    {/* CTA Buttons */}
                    <motion.div className="relative mt-6 sm:mt-8 flex justify-center z-10">
                        <motion.div
                            {...buttonPress}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
                        >
                            {/* Properties CTA */}
                            <Link
                                href={`/${language}/properties`}
                                className={cn(
                                    "inline-flex items-center justify-center gap-2",
                                    "px-6 py-3 sm:px-8 sm:py-4",
                                    "bg-cyan-500/60 text-white",
                                    "font-bold uppercase tracking-[1px]",
                                    "text-xs sm:text-sm",
                                    "transition-all duration-400 ease-btn-ease",
                                    "hover:brightness-[1.05] hover:-translate-y-px hover:text-black"
                                )}
                            >
                                {t.home.cta}
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>

                            {/* Services CTA */}
                            <Link
                                href={`/${language}/services`}
                                className={cn(
                                    "inline-flex items-center justify-center gap-2",
                                    "px-6 py-3 sm:px-8 sm:py-4",
                                    "border border-(--primary-gold) bg-white",
                                    "text-(--primary-gold)",
                                    "font-bold uppercase tracking-[1px]",
                                    "text-xs sm:text-sm",
                                    "transition-all duration-400 ease-btn-ease",
                                    "hover:bg-(--primary-gold) hover:text-black hover:-translate-y-px"
                                )}
                            >
                                {t.home.cta2}
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>

            </section >

            <section className="relative py-12 sm:py-16 md:py-24 lg:py-40 px-3 sm:px-4 md:px-6 lg:px-8 min-h-auto md:min-h-screen flex items-center justify-center">
                {/* linear background */}
                <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 -z-20" />

                {/* Animated linear orbs - hidden on small screens for better performance */}
                <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse hidden sm:block" />
                <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -z-10 animate-pulse animation-delay-2000 hidden sm:block" />

                {/* Reviews */}
                <motion.div
                    className="w-full max-w-6xl z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <ReviewsCarousel />
                </motion.div>
            </section>
            {/* FINAL CTA SECTION */}


        </div >
    );
}

