"use client";

import { useLanguageStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: number;
    name: string;
    comment: string;
    position?: string;
    avatar: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Nika und Marko Cipot",
        comment:
            "Wir waren relativ neu in Graz und wollten unsere erste Wohnung kaufen. Daniel hat uns von Beginn an bis zur Übergabe - und danach super unterstützt und alle unsere Fragen beantwortet.",
        position: "",
        avatar: "/Nika&Marko_Cipot.jpeg",
        rating: 5,
    },
    {
        id: 2,
        name: "Elvira und Kemal Alikovic",
        comment:
            "2019 wollten wir unser Haus verkaufen und haben Daniel kennenlernt - inzwischen haben wir schon die dritte Immobilie mit seiner Hilfe veräußert, Danke!!",
        position: "",
        avatar: "/Elvira&Kemal_Alikovic.jpeg",
        rating: 5,
    },
    {
        id: 3,
        name: "Peter Pache",
        comment:
            "Daniel verstand schon beim ersten Treffen, dass es sich um ein Liebhaberobjekt handelt und hat mir mit viel Geduld dabei geholfen meinen Wunschpreis zu erzielen, ich bin sehr dankbar dafür.",
        position: "",
        avatar: "/Peter_Pache.jpeg",
        rating: 5,
    },
];

export function ReviewsCarousel() {
    const { language } = useLanguageStore();
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragStart, setDragStart] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const title = language === "de" ? "Was unsere Kunden sagen" : "What Our Clients Say";
    const subtitle = language === "de"
        ? "Vertrautheit und langjährige Beziehungen sind das Herz unseres Geschäfts"
        : "Trust and long-term relationships are the heart of our business";

    // Auto-rotate testimonials every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Handle swipe gestures
    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setDragStart(clientX);
    };

    const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
        const diff = dragStart - clientX;
        const threshold = 50;

        if (diff > threshold) {
            // Swiped left - go to next
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        } else if (diff < -threshold) {
            // Swiped right - go to previous
            setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <section className="w-full">
            <div className="w-full">
                {/* Title Section */}
                <motion.div
                    className="text-center mb-12 sm:mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        {title}
                    </motion.h2>
                    {/* <motion.p
                        className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {subtitle}
                    </motion.p> */}
                </motion.div>

                {/* Desktop View - Grid */}
                <motion.div
                    className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            variants={fadeUp}
                            className={cn(
                                "relative overflow-hidden text-center",
                                "bg-(--glass) backdrop-blur-md",
                                "py-8 px-6",
                                "border border-cyan-500/40",
                                "rounded-xl",
                                "shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
                                "hover:border-cyan-400/80 hover:shadow-[0_15px_40px_rgba(0,200,255,0.2)]",
                                "transition-all duration-500 group",
                                "hover:-translate-y-2"
                            )}
                        >
                            {/* Quote Icon */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.3 }}
                                transition={{ delay: 0.2 + index * 0.15 }}
                                className="absolute top-4 right-4"
                            >
                                <Quote size={32} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                            </motion.div>

                            {/* Avatar */}
                            <motion.div
                                className="relative w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden mx-auto mb-4 border-3 border-cyan-500 shrink-0 group-hover:border-cyan-400 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Image
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Name */}
                            <motion.h3
                                className="text-white font-bold text-base mb-3 group-hover:text-cyan-300 transition-colors"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.15 + index * 0.15 }}
                            >
                                {testimonial.name}
                            </motion.h3>

                            {/* Stars */}
                            <motion.div
                                className="flex justify-center gap-1.5 mb-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 + index * 0.15 }}
                            >
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.2, rotate: 15 }}
                                    >
                                        <Star
                                            size={18}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Comment */}
                            <motion.p
                                className="text-neutral-200 text-sm leading-relaxed italic group-hover:text-neutral-100 transition-colors"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.25 + index * 0.15 }}
                            >
                                "{testimonial.comment}"
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile View - Carousel */}
                <div className="sm:hidden">
                    <motion.div
                        ref={containerRef}
                        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        onTouchStart={handleDragStart}
                        onTouchEnd={handleDragEnd}
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                    >
                        {/* Main Carousel */}
                        <div className="perspective">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    variants={fadeUp}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.4 }}
                                    className={cn(
                                        "relative overflow-hidden text-center",
                                        "bg-(--glass) backdrop-blur-md",
                                        "py-6 px-4 sm:py-8 sm:px-6",
                                        "border border-cyan-500/40",
                                        "rounded-xl",
                                        "shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
                                        "min-h-95 flex flex-col justify-center"
                                    )}
                                >
                                    {/* Quote Icon */}
                                    <div className="absolute top-4 right-4 opacity-30">
                                        <Quote size={28} className="text-cyan-400" />
                                    </div>

                                    {/* Avatar */}
                                    <motion.div
                                        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 border-3 border-cyan-500 shrink-0"
                                        variants={scaleIn}
                                    >
                                        <Image
                                            src={testimonials[activeIndex].avatar}
                                            alt={testimonials[activeIndex].name}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    {/* Name */}
                                    <h3 className="text-white font-bold text-sm sm:text-base mb-2 sm:mb-3">
                                        {testimonials[activeIndex].name}
                                    </h3>

                                    {/* Stars */}
                                    <div className="flex justify-center gap-1 mb-3 sm:mb-4">
                                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed italic line-clamp-4">
                                        "{testimonials[activeIndex].comment}"
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-6 sm:mt-8 select-none">
                            {testimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full transition-all",
                                        index === activeIndex
                                            ? "bg-cyan-500 w-8"
                                            : "bg-cyan-500/30 hover:bg-cyan-500/60"
                                    )}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>

                        {/* Swipe Hint */}
                        <p className="text-center text-xs text-gray-400 mt-4 select-none">
                            {language === "de" ? "Wischen zum Navigieren" : "Swipe to navigate"}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
