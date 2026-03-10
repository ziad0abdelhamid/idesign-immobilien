"use client";

import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";
import { ArrowRight, Building2, Users, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReviewsCarousel } from "@/components/ui/ReviewCarousel";
import { section } from "framer-motion/m";
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
            <section className="relative min-h-screen flex items-center justify-center">
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale"
                    aria-hidden="true"
                    src={'hero-video.mp4'}
                />
                {/* <img
                    src="/graz-bg.jpg"
                    alt="Hero background"
                    className="absolute inset-0 w-full h-full object-cover opacity-110" /> */}
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute top-30 inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 translate-y-[-4%]">

                    <div
                        className={cn(
                            "relative overflow-hidden text-center",
                            // glass background + blur
                            "bg-(--glass) backdrop-blur-md",
                            // spacing (30px 50px)
                            "py-7.5 px-12.5",
                            // sizing
                            "max-w-260 mx-auto",
                            // top gold border
                            "border-t-2 border-t-(--primary-gold)",
                            // shadow equivalent to: 0 10px 30px rgba(0,0,0,0.3)
                            "shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
                            // spacing below
                        )}
                    >
                        <motion.h1
                            className={cn(
                                "relative z-10 text-white font-extrabold justfiy-center text-center",
                                // font family (ensure Playfair Display is loaded in your project)
                                "font-['Playfair_Display',serif]",
                                // clamp(3rem, 8vw, 5.5rem)
                                "text-[clamp(3rem,8vw,5.5rem)]",
                                // spacing
                                "mb-3.75",
                                // letter spacing
                                "tracking-[4px]",
                                // uppercase
                                "uppercase",
                                // text shadow (2px 2px 20px rgba(0,0,0,0.5))
                                "drop-shadow-[2px_2px_20px_rgba(0,0,0,0.5)]"
                            )}
                        >
                            {t.home.greeting}
                        </motion.h1>
                        {/* Heading */}
                        <motion.h1
                            className="relative text-m sm:text-l md:text-xl lg:text-m text-(--primary-gold) drop-shadow-lg z-10"
                        >
                            {t.home.subtitle}
                        </motion.h1>

                        {/* Services List */}
                        {t.home.titleServices && (
                            <motion.div
                                className="relative mt-6 flex flex-wrap justify-center gap-2 z-10"
                                variants={container}
                                initial="hidden"
                                animate="visible"
                            >
                                {t.home.titleServices.map((service, index) => (
                                    <motion.span
                                        key={index}
                                        variants={fadeUp}
                                        className="text-white text-sm sm:text-base drop-shadow-md"
                                    >
                                        {service}
                                        {index < t.home.titleServices.length - 1 && (
                                            <span className="ml-2">•</span>
                                        )}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* CTAs */}
                    <motion.div className="relative mt-8 flex flex-col sm:flex-row gap-4 justify-center z-10">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                            {/* Primary CTA with Austria Flag */}
                            <motion.div {...buttonPress} className="relative flex items-center">
                                <Link
                                    href={`/${language}/properties`}
                                    className={cn(
                                        "inline-flex items-center justify-center",
                                        "px-8.75 py-4.5",
                                        "bg-cyan-500/60 text-white",
                                        "no-underline font-bold uppercase tracking-[1px] text-[0.8rem]",
                                        "transition-all duration-400 ease-btn-ease will-change-transform",
                                        "hover:brightness-[1.05] hover:-translate-y-px hover:text-black"
                                    )}
                                >
                                    {t.home.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                            </motion.div>

                            {/* Secondary CTA */}
                            <motion.div {...buttonPress}>
                                <Link
                                    href={`/${language}/services`}
                                    className={cn(
                                        "inline-flex items-center justify-center",
                                        "px-8.75 py-4.5",
                                        "border border-white text-white",
                                        "no-underline font-bold uppercase tracking-[1px] text-[0.8rem]",
                                        "transition-all duration-400 ease-out will-change-transform",
                                        "hover:bg-white hover:text-black hover:-translate-y-0.75 hover:shadow-lg",
                                        "active:translate-y-0 active:shadow-md"
                                    )}
                                >
                                    {t.home.ctaTwo}
                                </Link>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>

            </section>

            {/* REVIEWS */}
            <ReviewsCarousel />

        </div>
    );
}

