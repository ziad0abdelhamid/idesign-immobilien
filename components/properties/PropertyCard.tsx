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
                        {status === "available" ? "Property" : "Property"}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                </div>

                {/* Bottom Section with Specs and Arrow */}
                <div className="flex justify-between items-center pt-8 mt-6 border-t border-gray-50">
                    {/* Specs */}
                    <div className="flex space-x-6">
                        {/* Area */}
                        <div className="text-center">
                            <FaRulerCombined className="text-blue-500 text-sm block mb-1 mx-auto" />
                            <span className="text-xs font-bold text-gray-800">{Math.round(area)}m²</span>
                        </div>

                        {/* Land Area */}
                        {land_area && (
                            <div className="text-center border-l border-gray-100 pl-6">
                                <FaMap className="text-blue-500 text-sm block mb-1 mx-auto" />
                                <span className="text-xs font-bold text-gray-800">{Math.round(land_area)}m²</span>
                            </div>
                        )}

                        {/* Rooms/Bedrooms */}
                        <div className={`text-center ${land_area ? "border-l border-gray-100 pl-6" : ""}`}>
                            <FaDoorOpen className="text-blue-500 text-sm block mb-1 mx-auto" />
                            <span className="text-xs font-bold text-gray-800">{Math.round(bedrooms)} Zi.</span>
                        </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
