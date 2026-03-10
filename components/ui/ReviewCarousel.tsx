"use client";

import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import React from "react";
import { Star } from "lucide-react";
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

    const title = language === "de" ? "Was unsere Kunden sagen" : "What Our Clients Say";

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section className="w-full">
            <div className="w-full">
                {/* Title */}


                {/* Reviews Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 lg:gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={fadeUp}
                            className={cn(
                                "relative overflow-hidden text-center",
                                "bg-(--glass) backdrop-blur-md",
                                "py-5 md:py-6 lg:py-7 px-4 md:px-5 lg:px-6",
                                "border border-cyan-500/60",
                                "rounded-lg",
                                "shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
                                "hover:border-cyan-400/80 transition-all duration-300"
                            )}
                        >
                            {/* Avatar */}
                            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-cyan-500 shrink-0">
                                <Image
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-white font-bold text-sm md:text-base mb-2">
                                {testimonial.name}
                            </h3>

                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-neutral-200 text-xs md:text-xs leading-relaxed italic ">
                                "{testimonial.comment}"
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
