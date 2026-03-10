"use client";

import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";
import { ArrowRight, Mouse } from "lucide-react";
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
        <div className="w-full overflow-hidden bg-charcoal-900">
            {/* HERO SECTION */}
            <section className="relative min-h-screen lg:h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-0 lg:pt-20 px-4 sm:px-6 lg:px-8">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
                    aria-hidden="true"
                    src={'hero-video.mp4'}
                />
                <div className="absolute inset-0 bg-black/50 hidden lg:block" />
                <div className="absolute inset-0 bg-charcoal-900 lg:hidden" />

                {/* MAIN CONTENT CARD */}
                <div className="relative z-10 w-full max-w-5xl lg:max-w-7xl px-0 sm:px-2 md:px-4">
                    <div className="relative flex flex-col items-center text-center backdrop-blur-md bg-white/5 border border-gold/30 rounded-lg px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-6 md:py-8 lg:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">

                        {/* TITLE */}
                        <motion.h1
                            className="font-['Playfair_Display',serif] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider text-cyan-400 drop-shadow-lg mb-3 sm:mb-4 md:mb-5"
                        >
                            {t.home.greeting}
                        </motion.h1>

                        {/* SUBTITLE */}
                        <motion.h2 className="max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 drop-shadow-md mb-5 sm:mb-6 md:mb-8 font-['Inter',sans-serif] leading-relaxed px-2">
                            {t.home.subtitle}
                        </motion.h2>

                        {/* SERVICES - Hidden on mobile, shown on tablet+ */}
                        {t.home.titleServices && (
                            <motion.div className="w-full max-w-3xl mb-5 sm:mb-6 md:mb-8 lg:mb-10 block" variants={container} initial="hidden" animate="visible">
                                <ul className="text-left space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                                    {t.home.titleServices.map((service, index) => (
                                        <motion.li
                                            key={index}
                                            variants={fadeUp}
                                            className="text-white font-['Inter',sans-serif] flex items-start gap-2 sm:gap-3"
                                        >
                                            <span className="text-cyan-400 font-bold mt-0.5 shrink-0">•</span>
                                            <span>{service}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* CTA BUTTONS */}
                        <motion.div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 justify-center mb-5 sm:mb-6 md:mb-8 lg:mb-10 w-full sm:w-auto">
                            {/* PRIMARY */}
                            <motion.div {...buttonPress} className="w-full sm:w-auto">
                                <Link
                                    href={`/${language}/properties`}
                                    className="inline-flex items-center gap-2 justify-center px-5 sm:px-7 md:px-9 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-['Inter',sans-serif] font-semibold uppercase tracking-[0.5px] text-xs sm:text-xs md:text-sm lg:text-sm rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-cyan-500/30 w-full sm:w-auto"
                                >
                                    {t.home.cta}
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                </Link>
                            </motion.div>

                            {/* SECONDARY */}
                            <motion.div {...buttonPress} className="w-full sm:w-auto">
                                <Link
                                    href={`/${language}/services`}
                                    className="inline-flex items-center justify-center px-5 sm:px-7 md:px-9 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 border-2 border-gold text-gold font-['Inter',sans-serif] font-semibold uppercase tracking-[0.5px] text-xs sm:text-xs md:text-sm lg:text-sm rounded-lg transition-all duration-300 hover:bg-gold/10 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
                                >
                                    {t.home.ctaTwo}
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* REVIEWS - Only shown on desktop */}
                        <div className="w-full max-w-4xl hidden lg:block">
                            <ReviewsCarousel />
                        </div>

                    </div>
                </div>
            </section>

            {/* REVIEWS SECTION - Mobile only */}
            <section className="lg:hidden relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-linear-to-br from-cyan-900 via-cyan-800 to-cyan-900">
                <div className="w-full max-w-4xl mx-auto">
                    <ReviewsCarousel />
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Blurry background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center blur-xl"
                    style={{
                        backgroundImage: "url('/house-bg.jpg')",
                        opacity: 0.9, // optional, can reduce for more transparency
                    }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50"></div> {/* 50% black overlay */}
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10 pointer-events-none hidden sm:block">
                    <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-gold rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center px-2 sm:px-4">
                    {/* Main content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-['Playfair_Display',serif] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                            {t.home.dreamTitle}
                        </h2>
                        <p className="font-['Inter',sans-serif] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed">
                            {t.home.dreamDesc}
                        </p>
                        <motion.div {...buttonPress} className="inline-block">
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

