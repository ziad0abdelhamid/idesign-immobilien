"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaBed, FaBath, FaRulerCombined, FaBuilding, FaEye, FaPercent, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaSwimmingPool } from "react-icons/fa";

interface PropertyCardProps {
    title: string;
    location: string;
    price: number;
    area: number;
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const downPaymentEUR = Math.round(price * 0.1);
    const TotalRooms = Math.round(bedrooms);
    const hasDownPayments = has_installments;


    const hasImages = images.length > 0;
    const displayImage = hasImages ? images[currentImageIndex] : "/placeholder.jpg";

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "available": return "bg-green-700 text-white";
            case "sold": return "bg-red-700 text-white";
            case "draft": return "bg-yellow-600 text-black";
            default: return "bg-muted text-foreground";
        }
    };

    const getStatusLabel = (status: string) => {
        if (language === "en") return status === "available" ? "Available" : status === "sold" ? "Sold" : "Reserved";
        return status === "available" ? "Verfügbar" : status === "sold" ? "Verkauft" : "Reserviert";
    };
    return (
        <div
            onClick={!sold ? onClick : undefined}
            className={cn(
                "h-full min-h-150 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col overflow-hidden",
                sold ? "opacity-60 grayscale cursor-not-allowed" : "cursor-pointer hover:shadow-md"
            )}
        >

            {/* IMAGE */}
            <div className="relative aspect-video group overflow-hidden">
                <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {has_installments && (
                    <div
                        className={cn(
                            "absolute bottom-3 z-20 w-auto max-w-105 overflow-hidden shadow-xl"
                        )}
                    >
                        <div
                            className={cn(
                                "relative bg-linear-to-r from-blue-900 to-blue-950 text-white px-10 py-3 text-sm sm:text-base font-semibold transition-all duration-500 ease-out transform animate-slide-in-ltr"
                            )}
                            style={{
                                WebkitMaskImage:
                                    "linear-gradient(to right, black 85%, transparent)",
                                maskImage:
                                    "linear-gradient(to right, black 85%, transparent)",
                            }}
                            dir="ltr"
                        >
                            {/* Content */}
                            <div className="flex flex-col gap-0.5 leading-tight">
                                <div className="text-xs sm:text-sm opacity-90">
                                    {language === "de"
                                        ? "Anzahlung"
                                        : "Down Payments"}
                                </div>
                                <div>
                                    {language === "de" ? "Ab " : "From "}
                                    €{downPaymentEUR.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {hasImages && images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className={cn(
                                "z-20 absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition cursor-pointer"
                            )}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className={cn(
                                "z-20 absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition cursor-pointer"
                            )}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col grow flex-1">
                <h3 className="text-m font-bold justify-left text-left text-neutral-900 dark:text-neutral-50 line-clamp-2">{title}</h3>

                <p className="text-xs text-neutral-500 mt-1">📍 {location}</p>
                {sold && (
                    <p className="text-sm mt-1 font-medium px-2 py-1 rounded-full w-max bg-red-700 text-white">
                        {language === "de" ? "Verkauft" : "Sold"}
                    </p>
                )}

                {/* Price */}
                <div className="mt-3 text-m font-bold text-primary h-6">
                    {`${language === "de" ? "Kaufpreis" : "Price"}: €${price.toLocaleString()}`}
                </div>

                {/* STATS GRID: 2 items per row */}
                <div className="grid grid-cols-2 gap-3 mt-4 mb-4 flex-1">
                    <Feature icon={<FaBed />} value={TotalRooms} label={language === "de" ? "Zimmer" : "Rooms"} labelPosition="inline" />
                    {floor && <Feature icon={<FaBuilding />} value={Math.round(floor)} label={language === "de" ? "Etage" : "Floor"} labelPosition="inline" />}
                    <Feature icon={<FaRulerCombined />} value={Math.round(area)} label={language === "de" ? "Fläche" : "Area"} labelPosition="inline" />
                    <Feature
                        icon={<FaSwimmingPool className="text-blue-500" />}
                        value={has_pool ? (language === "de" ? "Ja" : "Yes") : (language === "de" ? "Nein" : "No")}
                        label={language === "de" ? "Pool" : "Pool"}
                        labelPosition="inline"
                        isNumeric={false}
                        poolClass={true}
                    />
                    <Feature
                        label={
                            hasDownPayments
                                ? language === "de" ? "Ratenzahlung" : "Installments"
                                : language === "de" ? "Verfügbar" : "Available"
                        }
                        value={
                            hasDownPayments
                                ? <div className="flex items-center justify-center"><FaCheckCircle className="text-green-500 text-xs flex text-center" /></div>
                                : language === "de" ? "Ab sofort" : "Immediate"
                        }
                        isNumeric={false}
                    />
                    {view?.length > 0 && (
                        <Feature
                            icon={<FaEye />}
                            value={
                                <ul className="list-disc ml-4 sm:ml-5 text-neutral-700 dark:text-neutral-300 text-xs">
                                    {view.flatMap((v) =>
                                        v
                                            .split(",")
                                            .map((item) => item.trim())
                                            .filter(Boolean)
                                    ).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            }
                            label={language === "de" ? "Ausblick" : "View"}
                            isNumeric={false}
                        />
                    )}

                </div>
                <button className="w-full bg-primary text-white gap-2 py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors hover:shadow-md flex items-center justify-center cursor-pointer hover:-translate-y-1 active:translate-y-1 hover:bg-gray-600/60">
                    {language === "de" ? "Details anzeigen" : "View Details"}
                </button>
            </div>

        </div>
    );
}

/* FEATURE COMPONENT */
function Feature({
    icon,
    value,
    label,
    isNumeric = true,
    labelPosition = "below",
    poolClass = false,
}: {
    icon?: React.ReactNode;
    value: number | string | JSX.Element;
    label: string;
    isNumeric?: boolean;
    labelPosition?: "below" | "inline";
    poolClass?: boolean;
}) {
    return (
        <div
            className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-3 py-2 min-h-20",
                "bg-neutral-100 dark:bg-neutral-800 w-full",
                labelPosition === "below" ? "flex-col items-center justify-center" : "flex-row items-center"
            )}
        >
            {/* Icon + Label */}
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-primary-500">
                    {icon}
                    <span className="text-xs text-neutral-500">{label}</span>
                </div>

                {/* Value below label */}
                <div className="mt-1 text-center w-full">
                    {typeof value === "string" || typeof value === "number" ? (
                        <span className="text-xs font-semibold">{value}</span>
                    ) : (
                        value
                    )}
                </div>
            </div>
        </div>
    );
}
