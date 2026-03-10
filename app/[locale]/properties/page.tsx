"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/db/supabase";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/ui/PropertyFilter";
import { PropertyDetailsModal } from "@/components/properties/PropertyDetailsModal";


interface Property {
    has_installments: boolean;
    has_pool?: boolean;
    id: string;
    title_en: string;
    title_ar: string;
    title_de: string;
    location_en: string;
    location_ar: string;
    location_de: string;
    description_en: string;
    description_ar: string;
    description_de: string;
    price: number;
    area: number;
    bedrooms: number;
    down_payments?: string;
    view?: string[] | string;
    date_of_completion?: string;
    maintenance?: number;
    load_factor?: number;
    object_number?: string;
    floor?: number;
    facilities?: string;
    status: string;
    sold?: boolean;
    created_at: string;
    updated_at: string;
    language: string;
    images: string[];
    display_order: number;
}

export default function PropertiesPage() {
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;
    const tFilters = translations[language] || translations.en;
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false);
    // Mobile drawer state
    const [isOpen, setIsOpen] = useState(false);

    // Function to close drawer
    const handleClose = () => setIsOpen(false);
    // Filters
    const [maxPrice, setMaxPrice] = useState(20_000_000);
    const [maxArea, setMaxArea] = useState(1000);
    const [bedrooms, setBedrooms] = useState<number | "">("");

    /* ---------------- Fetch Properties ---------------- */
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const { data: propData, error: propError } = await supabase
                    .from("properties")
                    .select("*")
                    .order("display_order", { ascending: true });

                if (propError) {
                    console.error("Properties fetch error:", propError);
                    throw propError;
                }

                console.log("Fetched properties:", propData?.length);

                const { data: imgData, error: imgError } = await supabase
                    .from("property_images")
                    .select("*")
                    .order("display_order", { ascending: true });

                if (imgError) {
                    console.error("Images fetch error:", imgError);
                    throw imgError;
                }

                console.log("Fetched images:", imgData?.length);

                const mapped = propData.map((prop: any) => ({
                    ...prop,
                    images:
                        imgData
                            ?.filter((img: any) => img.property_id === prop.id)
                            .map((img: any) => img.image_url) || [],
                }));

                // Filter out hidden properties
                const visibleProperties = mapped.filter((prop: any) => {
                    const status = prop.status;
                    // Handle JSONB status - could be string "hidden" or just the string value
                    return status !== "hidden";
                });

                console.log("Visible properties count:", visibleProperties.length);
                setProperties(visibleProperties);
                setFilteredProperties(visibleProperties);
            } catch (err) {
                console.error("Error fetching properties:", err);
                setProperties([]);
                setFilteredProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    /* ---------------- Filtering Logic ---------------- */
    useEffect(() => {
        const filtered = properties.filter((prop) => {
            if (prop.price > maxPrice) return false;
            if (prop.area > maxArea) return false;
            if (bedrooms !== "" && prop.bedrooms < bedrooms) return false;

            return true;
        });

        setFilteredProperties(filtered);
    }, [maxPrice, maxArea, bedrooms, properties]);

    const getText = (
        prop: Property,
        key: "title" | "location" | "description"
    ) =>
        language === "de"
            ? (prop as any)[`${key}_de`]
            : (prop as any)[`${key}_en`];

    /* ====================== JSX ====================== */
    return (
        <div className="w-full">
            {/* Header */}
            <section className="relative py-16">
                {/* Background Image + Frosted Glass Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center -z-10"
                    style={{ backgroundImage: `url('/headers-bg.jpg')` }}
                >
                    {/* Overlay for frosted effect */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
                </div>

                <motion.div
                    className="relative max-w-7xl mx-auto px-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-3xl font-bold text-white mb-4 overflow-hidden text-ellipsis">
                        {t.properties.title}
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                        {language === "de"
                            ? "Renditestarke Investment Immobilien am roten Meer"
                            : "Browse our comprehensive collection of premium properties"}
                    </p>
                </motion.div>
            </section>



            {/* Content */}
            <section className="bg-neutral-50 dark:bg-neutral-950 py-12">
                <div className="max-w-7xl mx-auto px-4 flex gap-8">
                    {/* Filters */}
                    <PropertyFilters
                        isOpen={filtersOpen}
                        onClose={() => setFiltersOpen(false)}
                        properties={properties}
                        setFilteredProperties={setFilteredProperties}
                    />

                    {/* Main */}
                    <div className="flex-1">
                        {/* Mobile Filters Button */}
                        <div className="lg:hidden mb-6">
                            <button
                                onClick={() => setFiltersOpen(true)}
                                className="px-4 py-2 rounded bg-black text-white"
                            >
                                {t.filter.openFilters}
                            </button>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64 p-6">
                                <p className="text-center text-gray-600">Loading properties…</p>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md text-center space-y-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-neutral-400 dark:text-neutral-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h18v18H3V3z M6 9h12 M6 15h12"
                                    />
                                </svg>
                                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
                                    No properties loaded
                                </h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    Database connection issue. Please refresh the page or check back later.
                                </p>
                            </div>) : filteredProperties.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md text-center space-y-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 text-neutral-400 dark:text-neutral-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h18v18H3V3z M6 9h12 M6 15h12"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
                                        No properties found
                                    </h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Try adjusting your filters or explore all available properties.
                                    </p>
                                </div>) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}

                            >
                                {filteredProperties.map((prop, idx) => (
                                    <motion.div
                                        key={prop.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}

                                    >
                                        <PropertyCard
                                            title={getText(prop, "title")}
                                            location={getText(prop, "location")}
                                            price={prop.price}
                                            area={prop.area}
                                            bedrooms={prop.bedrooms}
                                            images={prop.images.length ? prop.images : ["/placeholder.jpg"]}
                                            language={language === "de" ? "en" : language}
                                            status={prop.status}
                                            sold={prop.sold}
                                            onClick={() => setSelectedProperty(prop)}
                                            view={Array.isArray(prop.view) ? prop.view : prop.view ? [prop.view] : undefined}
                                            floor={prop.floor}
                                            has_pool={prop.has_pool}
                                            date_of_completion={prop.date_of_completion}
                                            has_installments={prop.has_installments}
                                        />

                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                        {selectedProperty && (
                            <PropertyDetailsModal
                                property={selectedProperty}
                                language={language}
                                onClose={() => setSelectedProperty(null)}
                            />
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
}
