"use client";

import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: number;
    name: string;
    comment: string;
    avatar: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Nika und Marko Cipot",
        comment:
            "Wir waren relativ neu in Graz und wollten unsere erste Wohnung kaufen. Daniel hat uns von Beginn an bis zur Übergabe begleitet und jede Entscheidung verständlich gemacht.",
        avatar: "/Nika&Marko_Cipot.jpeg",
        rating: 5,
    },
    {
        id: 2,
        name: "Elvira und Kemal Alikovic",
        comment:
            "2019 wollten wir unser Haus verkaufen. Heute haben wir bereits die dritte Immobilie mit Daniels Unterstützung erfolgreich abgeschlossen.",
        avatar: "/Elvira&Kemal_Alikovic.jpeg",
        rating: 5,
    },
    {
        id: 3,
        name: "Peter Pache",
        comment:
            "Daniel erkannte sofort den besonderen Charakter meines Objekts und half mir mit viel Geduld, meinen Wunschpreis zu realisieren.",
        avatar: "/Peter_Pache.jpeg",
        rating: 5,
    },
];

export function ReviewsCinematic() {
    const { language } = useLanguageStore();
    const [index, setIndex] = useState(0);

    const title =
        language === "de"
            ? "Kunden, die bleiben"
            : "Clients Who Stay";

    const subtitle =
        language === "de"
            ? "Jede Immobilie erzählt eine Geschichte. Jede Zusammenarbeit auch."
            : "Every property tells a story. So does every collaboration.";

    useEffect(() => {
        const t = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 9000);

        return () => clearInterval(t);
    }, []);

    const current = testimonials[index];

    return (
        <section className="relative w-full py-28 overflow-hidden">

            {/* ===== CINEMATIC BACKGROUND ===== */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[#05070d]" />

                {/* moving glow field */}
                <div className="absolute -top-40 -left-40 w-150 h-150 bg-cyan-500/20 blur-[140px] animate-pulse" />
                <div className="absolute top-1/2 -right-40 w-175 h-175 bg-blue-500/10 blur-[160px] animate-pulse delay-700" />
                <div className="absolute bottom-0 left-1/3 w-125 h-125 bg-indigo-500/10 blur-[140px] animate-pulse delay-1000" />

                {/* grain */}
                <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]" />
            </div>

            {/* ===== HEADER ===== */}
            <div className="relative text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-cyan-400"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* ===== FEATURED STORY ===== */}
            <div className="relative max-w-5xl mx-auto px-6">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -20 }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >

                        {/* glow frame */}
                        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-transparent to-blue-500/10 blur-2xl rounded-3xl" />

                        <div className="relative grid md:grid-cols-[140px_1fr] gap-8 items-center p-8 md:p-12 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)]">

                            {/* avatar */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-cyan-400/40 mx-auto md:mx-0"
                            >
                                <Image
                                    src={current.avatar}
                                    alt={current.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* story content */}
                            <div>

                                {/* quote mark */}
                                <Quote className="text-cyan-400/60 mb-4" size={34} />

                                {/* name */}
                                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                                    {current.name}
                                </h3>

                                {/* stars */}
                                <div className="flex gap-1 mt-3 mb-5">
                                    {[...Array(current.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className="text-cyan-300 fill-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                        />
                                    ))}
                                </div>

                                {/* quote */}
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed italic tracking-wide max-w-2xl">
                                    “{current.comment}”
                                </p>

                                {/* cinematic progress indicator */}
                                <div className="mt-8 h-0.5 w-full bg-white/10 overflow-hidden rounded-full">
                                    <motion.div
                                        key={index}
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 9 }}
                                        className="h-full bg-linear-to-r from-cyan-400 to-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ===== MINI STORY STRIP ===== */}
                <div className="flex justify-center gap-3 mt-10">
                    {testimonials.map((t, i) => (
                        <button
                            key={t.id}
                            onClick={() => setIndex(i)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                i === index
                                    ? "bg-cyan-400 w-10"
                                    : "bg-white/20 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}