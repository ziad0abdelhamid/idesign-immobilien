"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaRulerCombined, FaDoorOpen, FaMap } from "react-icons/fa";

interface PropertyCardProps {
    title: string;
    location: string;
    price: number;
    area: number;
    land_area?: number;
    bedrooms: number;
    floor?: number;
    has_installments: boolean;
    has_pool?: boolean;
    down_payments?: string[] | string;
    date_of_completion?: string;
    view?: string[];
    status: string;
    sold?: boolean;
    images?: string[];
    language: "en" | "de";
    onClick: () => void;
}

export function PropertyCard({
    title,
    location,
    price,
    area,
    land_area,
    bedrooms,
    floor,
    status,
    sold = false,
    has_installments,
    has_pool = false,
    date_of_completion,
    view = [],
    images = [],
    language,
    onClick,
}: PropertyCardProps) {
    const hasImages = images.length > 0;
    const displayImage = hasImages ? images[0] : "/placeholder.jpg";

    return (
        <div
            onClick={!sold ? onClick : undefined}
            className={`property-card group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 flex flex-col h-full ${sold ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-xl transition-all"
                }`}
        >
            {/* IMAGE - h-64 fixed height */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                />

                {/* Price Badge - Bottom Right */}
                <div className="absolute bottom-4 right-4 price-badge px-4 py-2 rounded-xl shadow-md backdrop-filter backdrop-blur-lg bg-white/90">
                    <span className="text-[9px] text-gray-400 block font-bold uppercase mb-1">
                        {language === "de" ? "Kaufpreis" : "Price"}
                    </span>
                    <span className="text-xl font-bold text-gray-900">€{price.toLocaleString()}</span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-8 card-content flex flex-col flex-1">
                {/* Title and Description */}
                <div className="grow">
                    <p className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                        {location}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                </div>

                {/* Bottom Section with Specs and Arrow */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">

                    {/* Area */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-black">
                            <FaRulerCombined className="text-blue-600 text-base" />
                            <span className="text-m font-medium">
                                {language === "de" ? "Fläche" : "Area"}
                            </span>
                        </div>
                        <span className="text-m font-semibold text-black">
                            {Math.round(area)} m²
                        </span>
                    </div>

                    {/* Land Area */}
                    {land_area && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-black">
                                <FaMap className="text-blue-600 text-base" />
                                <span className="text-m font-medium">
                                    {language === "de" ? "Grundstück" : "Land Area"}
                                </span>
                            </div>
                            <span className="text-m font-semibold text-black">
                                {Math.round(land_area)} m²
                            </span>
                        </div>
                    )}

                    {/* Rooms (plural-aware) */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-black">
                            <FaDoorOpen className="text-blue-600 text-base" />
                            <span className="text-m font-medium">
                                {language === "de"
                                    ? (Math.round(bedrooms) === 1 ? "Zimmer" : "Zimmer")
                                    : (Math.round(bedrooms) === 1 ? "Room" : "Rooms")}
                            </span>
                        </div>

                        <span className="text-m font-semibold text-black">
                            {Math.round(bedrooms)}{" "}
                            {language === "de"
                                ? (Math.round(bedrooms) === 1 ? "Zi." : "Zi.")
                                : (Math.round(bedrooms) === 1 ? "Room" : "Rooms")}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}
