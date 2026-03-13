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

                        {/* Subtitle */}
                        <motion.h2
                            className="relative text-sm sm:text-base md:text-lg lg:text-xl text-(--primary-gold) drop-shadow-lg z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {t.home.subtitle}
                        </motion.h2>

                        {/* Services */}
                        {t.home.titleServices && (
                            <motion.div
                                className="relative mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 z-10"
                                variants={container}
                                initial="hidden"
                                animate="visible"
                            >
                                {t.home.titleServices.map((service, index) => (
                                    <motion.span
                                        key={index}
                                        variants={fadeUp}
                                        className="text-white text-xs sm:text-sm md:text-base drop-shadow-md"
                                    >
                                        {service}
                                        {index < t.home.titleServices.length - 1 && (
                                            <span className="ml-2">•</span>
                                        )}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}

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

            </section>

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
            <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <img
                    src="/hero-bg-new.jpg"
                    alt="Hero background"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 blur-lg" />
                <div className="absolute inset-0 bg-black/45" />
                {/* Clean gradient background */}
                <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 -z-20" />

                {/* Dark overlay only - no decorative glowing elements */}
                <div className="absolute inset-0 bg-black/30 -z-10"></div>

                <div className="max-w-4xl mx-auto relative z-10 text-center px-2 sm:px-4">
                    {/* Main content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.h2
                            className="font-['Playfair_Display',serif] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {t.home.dreamTitle}
                        </motion.h2>
                        <motion.p
                            className="font-['Inter',sans-serif] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {t.home.dreamDesc}
                        </motion.p>
                        <motion.div
                            {...buttonPress}
                            className="inline-block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <Link
                                href={`/${language}/properties`}
                                className="inline-flex items-center justify-center px-5 sm:px-7 md:px-9 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-cyan-500 hover:bg-cyan-600 text-white no-underline font-['Inter',sans-serif] font-bold uppercase tracking-[0.5px] text-xs sm:text-xs md:text-sm lg:text-base rounded-lg transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-lg shadow-cyan-500/30"
                            >
                                {t.home.dreamCta}
                                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}

