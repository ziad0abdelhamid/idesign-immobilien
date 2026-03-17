"use client";
import { FaBed, FaRulerCombined, FaMap, FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useContactStore } from "@/lib/store/contactStore";
import { X } from "lucide-react";

interface Props {
    property: any;
    onClose: () => void;
    language: "en" | "de";
}

const TEXT = {
    en: {
        contact: "Send Inquiry",
        area: "Floor Area",
        landArea: "Land Area",
        bedrooms: "Rooms",
        objectDescription: "Property Description",
        interested: "Interested?",
        propertyConsultant: "Property Consultant",
        inquiry: "Send Inquiry",
        agentMessage: "Hello, I am interested in the property",
        agentMessage2: "Could you please contact me with further details?"
    },
    de: {
        contact: "Anfrage senden",
        area: "Fläche",
        landArea: "Grundstücksfläche",
        bedrooms: "Zimmer",
        objectDescription: "Objektbeschreibung",
        interested: "Interesse?",
        propertyConsultant: "Immobilienberater",
        inquiry: "Anfrage senden",
        agentMessage: "Hallo! Ich interessiere mich für diese Immobilie",
        agentMessage2: "Bitte schicken Sie mir weitere Details zu."
    },
};

export function PropertyDetailsModal({ property, onClose, language }: Props) {
    const t = TEXT[language];
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const setPrefill = useContactStore((state) => state.setPrefill);

    const getText = (key: "title" | "location" | "description" | "object_number") =>
        language === "de"
            ? property[`${key}_de`]
            : property[`${key}_en`];

    // Strip HTML tags and decode HTML entities to plain text
    const stripHtml = (html: string): string => {
        if (!html) return "";
        // Decode entities like &ouml; to ö and remove tags
        const decoded = new DOMParser().parseFromString(html, "text/html").documentElement.textContent || "";
        return decoded.replace(/<[^>]*>/g, "");
    };

    const images = property.images?.filter((i: string) => i && i.trim() !== "") || ["/placeholder.jpg"];

    const formatPrice = (value: number) =>
        value.toLocaleString(language === "de" ? "de-DE" : "en-US", {
            maximumFractionDigits: 0,
            style: "currency",
            currency: "EUR"
        });

    const priceEUR = Math.round(property.price);

    /* Scroll Lock */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                key="property-modal"
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    ref={modalRef}
                    id={`property-modal-${property.id}`}
                    className="relative w-screen h-screen bg-white dark:bg-neutral-900 rounded-none shadow-2xl overflow-hidden flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-20 w-10 cursor-pointer h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                    >
                        <X size={24} />
                    </button>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* PAGE HEADER */}
                        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 text-center border-b border-neutral-200 dark:border-neutral-700">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight uppercase mb-2 sm:mb-3">
                                {getText("title")}
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-neutral-500 tracking-widest uppercase">
                                {getText("location")}
                            </p>
                        </div>

                        {/* HERO IMAGE WITH PRICE BADGE */}
                        <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[75vh] bg-black group overflow-hidden">
                            <Swiper
                                modules={[Navigation, Pagination, Keyboard]}
                                navigation={{
                                    prevEl: ".swiper-button-prev-custom",
                                    nextEl: ".swiper-button-next-custom",
                                }}
                                pagination={{ clickable: true }}
                                keyboard
                                className="h-full"
                            >
                                {images.map((img: string, i: number) => (
                                    <SwiperSlide
                                        key={i}
                                        className="relative"
                                    >
                                        <Image
                                            src={img}
                                            alt={getText("title")}
                                            fill
                                            className="object-cover"
                                            priority={i === 0}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Arrows */}
                            <button
                                className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-white/40 text-white flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer"
                                aria-label="Previous image"
                            >
                                <FaChevronLeft size={24} />
                            </button>
                            <button
                                className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-white/40 text-white flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer"
                                aria-label="Next image"
                            >
                                <FaChevronRight size={24} />
                            </button>

                            {/* Price Badge */}
                            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 bg-white dark:bg-neutral-800 px-3 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6 rounded-sm shadow-lg z-999999">
                                <div className="text-lg sm:text-2xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
                                    {formatPrice(priceEUR)}
                                </div>
                            </div>
                        </div>

                        {/* SPECS BAR */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 w-full border-b border-neutral-200 dark:border-neutral-700">
                            {property.area && (
                                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center border-b sm:border-b-0 sm:border-r border-neutral-200 dark:border-neutral-700">
                                    <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-widest mb-1 sm:mb-2">
                                        {t.area}
                                    </div>
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-light">
                                        {Math.round(property.area)} m²
                                    </div>
                                </div>
                            )}
                            {property.land_area && (
                                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center border-b sm:border-b-0 sm:border-r border-neutral-200 dark:border-neutral-700">
                                    <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-widest mb-1 sm:mb-2">
                                        {t.landArea}
                                    </div>
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-light">
                                        {Math.round(property.land_area)} m²
                                    </div>
                                </div>
                            )}
                            {property.bedrooms && (
                                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center">
                                    <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-widest mb-1 sm:mb-2">
                                        {t.bedrooms}
                                    </div>
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-light">
                                        {Math.round(property.bedrooms)}.0
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CONTENT & SIDEBAR */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                            {/* DESCRIPTION - Left side (takes 2 columns on desktop) */}
                            <div className="lg:col-span-2">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-light mb-4 sm:mb-6 lg:mb-8 tracking-tight">
                                    {t.objectDescription}
                                </h2>
                                <div className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-3 sm:space-y-4 whitespace-pre-line">
                                    {getText("description") ? (
                                        <p>{stripHtml(getText("description"))}</p>
                                    ) : (
                                        <p>Keine Beschreibung verfügbar</p>
                                    )}
                                </div>
                            </div>

                            {/* CONTACT SIDEBAR - Right side (sticky on desktop, full-width on mobile) */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-8 bg-neutral-50 dark:bg-neutral-800 p-6 sm:p-8 rounded-lg">
                                    <h3 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 tracking-tight">
                                        {t.interested}
                                    </h3>

                                    <button
                                        onClick={() => {
                                            setPrefill({
                                                subject: `${getText("title")} - ${property.object_number ? `(${property.object_number})` : ""}`,
                                                message: `${t.agentMessage}. ${t.agentMessage2}`,
                                            });
                                            router.push("/contact");
                                        }}
                                        className="w-full cursor-pointer px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold uppercase tracking-wider text-sm sm:text-base rounded-sm hover:opacity-90 transition"
                                    >
                                        {t.inquiry}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
