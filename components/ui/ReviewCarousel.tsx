"use client";

import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
    const [isAutoplay, setIsAutoplay] = useState(true);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const title = language === "de" ? "Das sagen unsere Kunden" : "What Our Clients Say";
    const description = language === "de"
        ? "Hören Sie von zufriedenen Kunden, die ihre perfekten Immobilien mit uns gefunden haben"
        : "Hear from satisfied customers who found their perfect properties with us";

    // Auto-rotate testimonials
    useEffect(() => {
        if (!isAutoplay) return;

        autoplayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [isAutoplay]);

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoplay(false);
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoplay(false);
    };

    // Swipe handlers
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX.current - touchEndX.current;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
    };

    const goToSlide = (index: number) => {
        setActiveIndex(index);
        setIsAutoplay(false);
    };

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section className="py-20 bg-linear-to-b from-white dark:from-neutral-900 to-neutral-50 dark:to-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <div className="h-1 w-20 bg-linear-to-r from-cyan-500 to-cyan-300 mx-auto mt-6 rounded-full"></div>
                </motion.div>

                {/* Main Carousel */}
                <div className="relative">
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-full max-w-4xl" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                            {/* Premium Testimonial Card */}
                            <div className="relative h-full">
                                <motion.div
                                    key={currentTestimonial.id}
                                    className="bg-linear-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl shadow-2xl border border-cyan-200 dark:border-neutral-700 p-8 md:p-12"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Quote Mark */}
                                    <div className="text-6xl text-cyan-500 opacity-10 mb-2">"</div>

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <Star
                                                    size={20}
                                                    className="fill-cyan-500 text-cyan-500"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <motion.p
                                        className="text-lg md:text-xl text-neutral-700 dark:text-neutral-200 leading-relaxed mb-8 italic"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        "{currentTestimonial.comment}"
                                    </motion.p>

                                    {/* Author Section */}
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        {/* Avatar */}
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500 shrink-0">
                                            <Image
                                                src={currentTestimonial.avatar}
                                                alt={currentTestimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-lg">
                                                {currentTestimonial.name}
                                            </p>
                                            {currentTestimonial.position && (
                                                <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                                                    {currentTestimonial.position}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <motion.button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight size={24} />
                    </motion.button>
                </div>

                {/* Dot Indicators */}
                <motion.div
                    className="flex justify-center gap-2 mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all rounded-full ${index === activeIndex
                                ? "bg-cyan-600 w-8 h-3"
                                : "bg-neutral-300 dark:bg-neutral-600 w-3 h-3 hover:bg-cyan-400"
                                }`}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
