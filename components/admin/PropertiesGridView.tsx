"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/db/supabase";

interface Property {
    display_order: number;
    id: string;
    title_en: string | null;
    title_ar: string | null;
    title_de: string | null;
    price: number | null;
    area: number | null;
    bedrooms: number | null;
    description?: string;
    images?: string[];
    floor?: number | null;
    view?: string | null;
    maintenance?: string | null;
    cash_discount?: number | null;
    date_of_completion?: string | null;
    object_number?: string | null;
    load_factor?: number | null;
    facilities?: string | null;
    down_payments?: any[] | null;
    status?: string | null;
    sold?: boolean;
}

interface PropertiesGridViewProps {
    properties: Property[];
    language: string;
    onPropertiesChange: (properties: Property[]) => void;
}

export default function PropertiesGridView({
    properties,
    language,
    onPropertiesChange,
}: PropertiesGridViewProps) {
    const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>(
        {}
    );
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);

    const getTitle = (property: Property) =>
        language === "en"
            ? property.title_en
            : language === "ar"
                ? property.title_ar
                : property.title_de;

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverId(id);
    };

    const handleDragLeave = () => {
        setDragOverId(null);
    };

    const handleDrop = async (
        e: React.DragEvent<HTMLTableRowElement>,
        targetId: string
    ) => {
        e.preventDefault();
        setDragOverId(null);

        if (!draggedId || draggedId === targetId) {
            setDraggedId(null);
            return;
        }

        const draggedIndex = properties.findIndex((p) => p.id === draggedId);
        const targetIndex = properties.findIndex((p) => p.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) {
            setDraggedId(null);
            return;
        }

        // Create new array with reordered items
        const newProperties = [...properties];
        const [draggedItem] = newProperties.splice(draggedIndex, 1);
        newProperties.splice(targetIndex, 0, draggedItem);

        // Update display_order for all affected properties
        const updates = newProperties.map((prop, idx) => ({
            id: prop.id,
            display_order: idx,
        }));

        // Update local state immediately for better UX
        onPropertiesChange(newProperties);

        // Update database
        for (const update of updates) {
            await supabase
                .from("properties")
                .update({ display_order: update.display_order })
                .eq("id", update.id);
        }

        setDraggedId(null);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDragOverId(null);
    };

    const nextImage = (id: string, length: number) => {
        setCarouselIndexes((prev) => ({
            ...prev,
            [id]: (prev[id] + 1) % length,
        }));
    };

    const prevImage = (id: string, length: number) => {
        setCarouselIndexes((prev) => ({
            ...prev,
            [id]: (prev[id] - 1 + length) % length,
        }));
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
            <table className="w-full border-collapse bg-white dark:bg-neutral-800">
                <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground w-20">
                            {language === "en"
                                ? "Index"
                                : language === "ar"
                                    ? "الترتيب"
                                    : "Index"}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground min-w-40">
                            {language === "en"
                                ? "Property Name"
                                : language === "ar"
                                    ? "اسم العقار"
                                    : "Grundstücksname"}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground w-48">
                            {language === "en"
                                ? "Images"
                                : language === "ar"
                                    ? "الصور"
                                    : "Bilder"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => {
                        const hasImages = property.images && property.images.length > 0;
                        const displayImage = hasImages
                            ? property.images![carouselIndexes[property.id] || 0]
                            : "/placeholder.jpg";

                        return (
                            <tr
                                key={property.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, property.id)}
                                onDragOver={(e) => handleDragOver(e, property.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, property.id)}
                                onDragEnd={handleDragEnd}
                                className={`border-b border-neutral-200 dark:border-neutral-700 transition-all duration-200 ${draggedId === property.id ? "opacity-50" : ""
                                    } ${dragOverId === property.id && draggedId
                                        ? "bg-blue-100 dark:bg-blue-900"
                                        : "hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                    } ${draggedId ? "cursor-grab" : "cursor-grab"}`}
                            >
                                {/* Index Column */}
                                <td className="px-4 py-3 text-sm font-bold text-blue-600 dark:text-blue-400">
                                    #{property.display_order}
                                </td>

                                {/* Name Column */}
                                <td className="px-4 py-3 text-sm font-medium text-foreground max-w-xs truncate">
                                    {getTitle(property) || "Untitled"}
                                </td>

                                {/* Images Column */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-24 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden group">
                                            {displayImage && displayImage !== "/placeholder.jpg" ? (
                                                <Image
                                                    src={displayImage}
                                                    alt={getTitle(property) || "Untitled"}
                                                    fill
                                                    className=""
                                                    sizes="80px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                                                        {language === "ar"
                                                            ? "لا توجد صور"
                                                            : language === "de"
                                                                ? "Keine Bilder"
                                                                : "No Images"}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Navigation Buttons */}
                                            {hasImages && property.images!.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            prevImage(property.id, property.images!.length)
                                                        }
                                                        className="absolute top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100 left-1"
                                                        aria-label="Previous Image"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            nextImage(property.id, property.images!.length)
                                                        }
                                                        className="absolute top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/40 text-white hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100 right-1"
                                                        aria-label="Next Image"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>

                                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-0.5 rounded text-xs">
                                                        {(carouselIndexes[property.id] || 0) + 1} /{" "}
                                                        {property.images!.length}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
