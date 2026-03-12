"use client";

import * as Slider from "@radix-ui/react-slider";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface FiltersProps {
    isOpen: boolean;
    onClose: () => void;
    properties: any[];
    setFilteredProperties: (props: any[]) => void;
}

export function PropertyFilters({ isOpen, onClose, properties, setFilteredProperties }: FiltersProps) {
    const { language } = useLanguageStore();

    // Dynamic price range from properties
    const getPriceRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 5000000 };
        }
        const prices = properties.map(p => p.price).filter((p) => p > 0);
        return {
            min: 0,
            max: Math.ceil(Math.max(...prices) / 10000) * 10000 + 50000,
        };
    };

    // Get unique locations from properties
    const getUniqueLocations = () => {
        if (!properties || properties.length === 0) return [];
        const locations = properties
            .map(p => {
                const loc = language === "de" ? p.location_de : p.location_en;
                return loc || p.location || "";
            })
            .filter(Boolean);
        return [...new Set(locations)].sort();
    };

    const dynamicPriceRange = getPriceRange();
    const minPriceEUR = dynamicPriceRange.min;
    const maxPriceEUR = dynamicPriceRange.max;
    const uniqueLocations = getUniqueLocations();

    // State
    const [priceRange, setPriceRange] = useState<[number, number]>([minPriceEUR, maxPriceEUR]);
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCount, setFilteredCount] = useState(properties.length);

    useEffect(() => {
        setPriceRange([minPriceEUR, maxPriceEUR]);
    }, [minPriceEUR, maxPriceEUR]);

    // Filtering logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            const filtered = properties.filter(p => {
                const price = p.price;
                if (price < priceRange[0] || price > priceRange[1]) return false;

                if (selectedRegion) {
                    const propertyLocation = language === "de" ? p.location_de : p.location_en || p.location;
                    if (propertyLocation !== selectedRegion) return false;
                }

                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase();
                    const title = language === "de" ? p.title_de : p.title_en || p.title;
                    const location = language === "de" ? p.location_de : p.location_en || p.location;
                    const titleMatch = title && title.toLowerCase().includes(query);
                    const locationMatch = location && location.toLowerCase().includes(query);
                    if (!titleMatch && !locationMatch) return false;
                }

                return true;
            });
            setFilteredCount(filtered.length);
            setFilteredProperties(filtered);
        }, 100);

        return () => clearTimeout(timeout);
    }, [priceRange, selectedRegion, searchQuery, properties, setFilteredProperties, language]);

    const resetFilters = () => {
        setPriceRange([minPriceEUR, maxPriceEUR]);
        setSelectedRegion("");
        setSearchQuery("");
    };

    return (
        <>
            {/* Mobile overlay & drawer */}
            {isOpen && (
                <>
                    <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
                    <div className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto shadow-xl">
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold tracking-tight">{language === "de" ? "Suche verfeinern" : "Refine Search"}</h2>
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                            </div>
                            <FilterContent
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                minPriceEUR={minPriceEUR}
                                maxPriceEUR={maxPriceEUR}
                                language={language}
                                resetFilters={resetFilters}
                                selectedRegion={selectedRegion}
                                setSelectedRegion={setSelectedRegion}
                                uniqueLocations={uniqueLocations}
                                filteredCount={filteredCount}
                                totalCount={properties.length}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-1/3 xl:w-1/4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-28">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold tracking-tight">{language === "de" ? "Suche verfeinern" : "Refine Search"}</h2>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-bold text-blue-400 hover:text-blue-500 cursor-pointer"
                        >
                            {language === "de" ? "Zurücksetzen" : "Reset"}
                        </button>
                    </div>

                    <FilterContent
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        minPriceEUR={minPriceEUR}
                        maxPriceEUR={maxPriceEUR}
                        language={language}
                        resetFilters={resetFilters}
                        selectedRegion={selectedRegion}
                        setSelectedRegion={setSelectedRegion}
                        uniqueLocations={uniqueLocations}
                        filteredCount={filteredCount}
                        totalCount={properties.length}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </aside>
        </>
    );
}

interface FilterContentProps {
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    minPriceEUR: number;
    maxPriceEUR: number;
    language: "de" | "en" | "ar";
    resetFilters: () => void;
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    uniqueLocations: string[];
    filteredCount: number;
    totalCount: number;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

function FilterContent({
    priceRange,
    setPriceRange,
    minPriceEUR,
    maxPriceEUR,
    language,
    resetFilters,
    selectedRegion,
    setSelectedRegion,
    uniqueLocations,
    filteredCount,
    totalCount,
    searchQuery,
    setSearchQuery,
}: FilterContentProps) {
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `${(price / 1000000).toFixed(1)} Mio. €`;
        }
        return `${(price / 1000).toFixed(0)}k €`;
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div>
                <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest block mb-3">
                    {language === "de" ? "Suche" : "Search"}
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={language === "de" ? "Name, Ort..." : "Name, location..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Region Filter */}
            <div>
                <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest block mb-3">
                    {language === "de" ? "Region" : "Region"}
                </label>
                <div className="relative">
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none appearance-none cursor-pointer hover:bg-blue-100 transition font-medium"
                    >
                        <option value="">{language === "de" ? "Alle Regionen" : "All Regions"}</option>
                        {uniqueLocations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Price Range Slider */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">
                        {language === "de" ? "Preisbereich" : "Price Range"}
                    </label>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                </div>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5 mb-4"
                    value={priceRange}
                    min={minPriceEUR}
                    max={maxPriceEUR}
                    step={10000}
                    onValueChange={(val: number[]) => setPriceRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-blue-100 relative flex-1 h-2 rounded-full">
                        <Slider.Range className="absolute bg-blue-400 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                </Slider.Root>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>€0</span>
                    <span>{formatPrice(maxPriceEUR)}</span>
                </div>
            </div>

            {/* Search Button */}
            <button className="w-full cursor-pointer bg-linear-to-r from-blue-400 to-blue-500 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all active:scale-[0.98]">
                {language === "de" ? "Immobilien anzeigen" : "Show Properties"}
            </button>
        </div>
    );
}