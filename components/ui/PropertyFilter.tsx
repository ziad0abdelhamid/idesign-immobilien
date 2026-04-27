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
    const t = translations[language] || translations.en;
    // Dynamic price range from properties
    const getPriceRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 5000000 };
        }
        const prices = properties.map(p => p.price).filter((p) => p > 0);
        return {
            min: 0,
            max: Math.max(...prices),
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

    // Get unique property types from properties
    const getUniquePropertyTypes = () => {
        if (!properties || properties.length === 0) return [];
        const types = properties
            .map(p => p.propertyType)
            .filter(Boolean);
        return [...new Set(types)].sort();
    };

    // Dynamic Grundflache (land area) range from properties
    const getGrundflacheRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 10000 };
        }
        const areas = properties.map(p => p.land_area).filter((a) => a > 0);
        if (areas.length === 0) {
            return { min: 0, max: 10000 };
        }
        return {
            min: 0,
            max: Math.max(...areas),
        };
    };

    // Dynamic bedrooms range from properties
    const getBedroomsRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 15 };
        }
        const bedrooms = properties.map(p => p.bedrooms).filter((b) => b >= 0);
        if (bedrooms.length === 0) {
            return { min: 0, max: 15 };
        }
        return {
            min: 0,
            max: Math.max(...bedrooms),
        };
    };

    // Dynamic area (living area) range from properties
    const getAreaRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 400 };
        }
        const areas = properties.map(p => p.area).filter((a) => a >= 0);
        if (areas.length === 0) {
            return { min: 0, max: 400 };
        }
        return {
            min: 0,
            max: Math.max(...areas),
        };
    };

    const dynamicPriceRange = getPriceRange();
    const minPriceEUR = dynamicPriceRange.min;
    const maxPriceEUR = dynamicPriceRange.max;
    const dynamicBedroomsRange = getBedroomsRange();
    const minBedrooms = dynamicBedroomsRange.min;
    const maxBedrooms = dynamicBedroomsRange.max;
    const dynamicAreaRange = getAreaRange();
    const minArea = dynamicAreaRange.min;
    const maxArea = dynamicAreaRange.max;
    const dynamicGrundflacheRange = getGrundflacheRange();
    const minGrundflache = dynamicGrundflacheRange.min;
    const maxGrundflache = dynamicGrundflacheRange.max;
    const uniqueLocations = getUniqueLocations();
    const uniquePropertyTypes = getUniquePropertyTypes();

    // State
    const [priceRange, setPriceRange] = useState<[number, number]>([minPriceEUR, maxPriceEUR]);
    const [bedroomsRange, setBedroomsRange] = useState<[number, number]>([minBedrooms, maxBedrooms]);
    const [areaRange, setAreaRange] = useState<[number, number]>([minArea, maxArea]);
    const [grundflacheRange, setGrundflacheRange] = useState<[number, number]>([minGrundflache, maxGrundflache]);
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCount, setFilteredCount] = useState(properties.length);
    // Initialize ranges with dynamic values
    useEffect(() => {
        setPriceRange([minPriceEUR, maxPriceEUR]);
        setBedroomsRange([minBedrooms, maxBedrooms]);
        setAreaRange([minArea, maxArea]);
        setGrundflacheRange([minGrundflache, maxGrundflache]);
    }, [properties, minPriceEUR, maxPriceEUR, minBedrooms, maxBedrooms, minArea, maxArea, minGrundflache, maxGrundflache]);

    // Filtering logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            const filtered = properties.filter(p => {
                const price = p.price;
                if (price < priceRange[0] || price > priceRange[1]) return false;

                const bedrooms = p.bedrooms;
                if (bedrooms < bedroomsRange[0] || bedrooms > bedroomsRange[1]) return false;

                // Allow area = 0, but filter non-zero values by range
                const area = p.area ?? 0;
                if (area !== 0 && (area < areaRange[0] || area > areaRange[1])) return false;

                // Only apply land_area filter if land_area is greater than 0
                const grundflache = p.land_area ?? 0;
                if (grundflache > 0 && (grundflache < grundflacheRange[0] || grundflache > grundflacheRange[1])) return false;

                if (selectedRegion) {
                    const propertyLocation = language === "de" ? p.location_de : p.location_en || p.location;
                    if (propertyLocation !== selectedRegion) return false;
                }

                if (selectedPropertyType) {
                    if (p.propertyType !== selectedPropertyType) return false;
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
    }, [priceRange, bedroomsRange, areaRange, grundflacheRange, selectedRegion, selectedPropertyType, searchQuery, properties, setFilteredProperties, language]);

    const resetFilters = () => {
        setPriceRange([minPriceEUR, maxPriceEUR]);
        setBedroomsRange([minBedrooms, maxBedrooms]);
        setAreaRange([minArea, maxArea]);
        setGrundflacheRange([minGrundflache, maxGrundflache]);
        setSelectedRegion("");
        setSelectedPropertyType("");
        setSearchQuery("");
    };

    return (
        <>
            {/* Mobile overlay & drawer */}
            {isOpen && (
                <>
                    <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
                    <div className="md:hidden fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto shadow-xl">
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg sm:text-xl font-bold tracking-tight">{t.filter.title}</h2>
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                            </div>
                            <FilterContent
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                minPriceEUR={minPriceEUR}
                                maxPriceEUR={maxPriceEUR}
                                bedroomsRange={bedroomsRange}
                                setBedroomsRange={setBedroomsRange}
                                minBedrooms={minBedrooms}
                                maxBedrooms={maxBedrooms}
                                areaRange={areaRange}
                                setAreaRange={setAreaRange}
                                minArea={minArea}
                                maxArea={maxArea}
                                grundflacheRange={grundflacheRange}
                                setGrundflacheRange={setGrundflacheRange}
                                minGrundflache={minGrundflache}
                                maxGrundflache={maxGrundflache}
                                language={language}
                                resetFilters={resetFilters}
                                selectedRegion={selectedRegion}
                                setSelectedRegion={setSelectedRegion}
                                uniqueLocations={uniqueLocations}
                                filteredCount={filteredCount}
                                totalCount={properties.length}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedPropertyType={selectedPropertyType}
                                setSelectedPropertyType={setSelectedPropertyType}
                                uniquePropertyTypes={uniquePropertyTypes}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden md:block lg:w-1/3 xl:w-1/4 max-w-sm lg:max-w-none">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 sticky md:top-20 lg:top-28 max-h-[calc(100vh-120px)] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 lg:mb-6">
                        <h2 className="text-base lg:text-lg font-bold tracking-tight">{t.filter.title}</h2>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-bold text-blue-400 hover:text-blue-500 cursor-pointer"
                        >
                            {t.filter.reset}
                        </button>
                    </div>

                    <FilterContent
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        minPriceEUR={minPriceEUR}
                        maxPriceEUR={maxPriceEUR}
                        bedroomsRange={bedroomsRange}
                        setBedroomsRange={setBedroomsRange}
                        minBedrooms={minBedrooms}
                        maxBedrooms={maxBedrooms}
                        areaRange={areaRange}
                        setAreaRange={setAreaRange}
                        minArea={minArea}
                        maxArea={maxArea}
                        grundflacheRange={grundflacheRange}
                        setGrundflacheRange={setGrundflacheRange}
                        minGrundflache={minGrundflache}
                        maxGrundflache={maxGrundflache}
                        language={language}
                        resetFilters={resetFilters}
                        selectedRegion={selectedRegion}
                        setSelectedRegion={setSelectedRegion}
                        uniqueLocations={uniqueLocations}
                        filteredCount={filteredCount}
                        totalCount={properties.length}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedPropertyType={selectedPropertyType}
                        setSelectedPropertyType={setSelectedPropertyType}
                        uniquePropertyTypes={uniquePropertyTypes}
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
    bedroomsRange: [number, number];
    setBedroomsRange: (range: [number, number]) => void;
    minBedrooms: number;
    maxBedrooms: number;
    areaRange: [number, number];
    setAreaRange: (range: [number, number]) => void;
    minArea: number;
    maxArea: number;
    grundflacheRange: [number, number];
    setGrundflacheRange: (range: [number, number]) => void;
    minGrundflache: number;
    maxGrundflache: number;
    language: "de" | "en" | "ar";
    resetFilters: () => void;
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    uniqueLocations: string[];
    filteredCount: number;
    totalCount: number;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedPropertyType?: string;
    setSelectedPropertyType?: (type: string) => void;
    uniquePropertyTypes?: string[];
}

function FilterContent({
    priceRange,
    setPriceRange,
    minPriceEUR,
    maxPriceEUR,
    bedroomsRange,
    setBedroomsRange,
    minBedrooms,
    maxBedrooms,
    areaRange,
    setAreaRange,
    minArea,
    maxArea,
    grundflacheRange,
    setGrundflacheRange,
    minGrundflache,
    maxGrundflache,
    language,
    resetFilters,
    selectedRegion,
    setSelectedRegion,
    uniqueLocations,
    filteredCount,
    totalCount,
    searchQuery,
    setSearchQuery,
    selectedPropertyType = "",
    setSelectedPropertyType,
    uniquePropertyTypes = [],
}: FilterContentProps) {
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `${(price / 1000000).toFixed(1)} Mio. €`;
        }
        return `${(price / 1000).toFixed(0)}k €`;
    };
    const [DDisOpen, setDDisOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    return (
        <div className="space-y-3 md:space-y-4 lg:space-y-5">
            {/* Search Bar */}
            <div>
                <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest block mb-2">
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
                <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest block mb-2">
                    {language === "de" ? "Region" : "Region"}
                </label>
                <div className="relative w-full">
                    {/* Trigger */}
                    <div
                        onClick={() => setDDisOpen(!DDisOpen)}
                        className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-800 
    shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer flex justify-between items-center
    hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 transition"
                    >
                        <span className="font-medium tracking-tight">
                            {selectedRegion || (language === "de" ? "Alle Regionen" : "All Regions")}
                        </span>

                        <span
                            className={`transition-transform duration-300 text-gray-500 ${DDisOpen ? "rotate-180" : ""
                                }`}
                        >
                            ▼
                        </span>
                    </div>

                    {/* Dropdown */}
                    {DDisOpen && (
                        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl 
                              shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeIn_.2s_ease]">

                            <div
                                onClick={() => {
                                    setSelectedRegion("");
                                    setDDisOpen(false);
                                }}
                                className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition"
                            >
                                {language === "de" ? "Alle Regionen" : "All Regions"}
                            </div>

                            {uniqueLocations.map((location) => (
                                <div
                                    key={location}
                                    onClick={() => {
                                        setSelectedRegion(location);
                                        setDDisOpen(false);
                                    }}
                                    className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition flex justify-between items-center"
                                >
                                    {location}

                                    {selectedRegion === location && (
                                        <span className="text-blue-500 text-xs">✓</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Property Type Filter */}
            {uniquePropertyTypes?.length > 0 && (
                <div>
                    <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest block mb-2">
                        {language === "de" ? "Immobilientyp" : "Property Type"}
                    </label>
                    <div className="relative w-full">
                        {/* Trigger */}
                        <div
                            onClick={() => setIsTypeOpen(!isTypeOpen)}
                            className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-800 
    shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer flex justify-between items-center
    hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 transition"
                        >
                            <span className="font-medium tracking-tight">
                                {selectedPropertyType
                                    ? (language === "de"
                                        ? selectedPropertyType === "villa"
                                            ? "Villa"
                                            : selectedPropertyType === "apartment"
                                                ? "Wohnung"
                                                : "Grundstück"
                                        : selectedPropertyType.charAt(0).toUpperCase() + selectedPropertyType.slice(1))
                                    : (language === "de" ? "Alle Typen" : "All Types")}
                            </span>

                            <span
                                className={`transition-transform duration-300 text-gray-500 ${isTypeOpen ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </div>

                        {/* Dropdown */}
                        {isTypeOpen && (
                            <div
                                className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl 
      shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeIn_.2s_ease]"
                            >
                                {/* Default option */}
                                <div
                                    onClick={() => {
                                        setSelectedPropertyType?.("");
                                        setIsTypeOpen(false);
                                    }}
                                    className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition"
                                >
                                    {language === "de" ? "Alle Typen" : "All Types"}
                                </div>

                                {/* Options */}
                                {uniquePropertyTypes.map((type) => {
                                    const label =
                                        language === "de"
                                            ? type === "villa"
                                                ? "Villa"
                                                : type === "apartment"
                                                    ? "Wohnung"
                                                    : "Grundstück"
                                            : type.charAt(0).toUpperCase() + type.slice(1);

                                    return (
                                        <div
                                            key={type}
                                            onClick={() => {
                                                setSelectedPropertyType?.(type);
                                                setIsTypeOpen(false);
                                            }}
                                            className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition flex justify-between items-center"
                                        >
                                            {label}

                                            {selectedPropertyType === type && (
                                                <span className="text-blue-500 text-xs">✓</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Price Range Slider */}
            <div>
                <div className="flex justify-between items-center mb-2 gap-2">
                    <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">
                        {language === "de" ? "Preisbereich" : "Price Range"}
                    </label>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-right whitespace-nowrap">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                </div>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5 mb-3"
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
                {/* <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>€0</span>
                    <span>{formatPrice(maxPriceEUR)}</span>
                </div> */}
            </div>

            {/* Bedrooms Range Slider */}
            <div>
                <div className="flex justify-between items-center mb-2 gap-2">
                    <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">
                        {language === "de" ? "Zimmer" : "Rooms"}
                    </label>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {bedroomsRange[0]} - {bedroomsRange[1]}
                    </span>
                </div>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5 mb-3"
                    value={bedroomsRange}
                    min={minBedrooms}
                    max={maxBedrooms}
                    step={1}
                    onValueChange={(val: number[]) => setBedroomsRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-blue-100 relative flex-1 h-2 rounded-full">
                        <Slider.Range className="absolute bg-blue-400 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                </Slider.Root>
                {/* <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{minBedrooms}</span>
                    <span>{maxBedrooms}</span>
                </div> */}
            </div>

            {/* Area Range Slider */}
            <div>
                <div className="flex justify-between items-center mb-2 gap-2">
                    <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">
                        {language === "de" ? "Wohnfläche (m²)" : "Living Area (m²)"}
                    </label>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {areaRange[0]}-{areaRange[1]}m²
                    </span>
                </div>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5 mb-3"
                    value={areaRange}
                    min={minArea}
                    max={maxArea}
                    step={10}
                    onValueChange={(val: number[]) => setAreaRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-blue-100 relative flex-1 h-2 rounded-full">
                        <Slider.Range className="absolute bg-blue-400 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                </Slider.Root>
                {/* <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{minArea}m²</span>
                    <span>{maxArea}m²</span>
                </div> */}
            </div>

            {/* Grundflache Range Slider */}
            <div>
                <div className="flex justify-between items-center mb-2 gap-2">
                    <label className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">
                        {language === "de" ? "Grundfläche (m²)" : "Land Area (m²)"}
                    </label>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {grundflacheRange[0]}-{grundflacheRange[1]}m²
                    </span>
                </div>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5 mb-3"
                    value={grundflacheRange}
                    min={minGrundflache}
                    max={maxGrundflache}
                    step={100}
                    onValueChange={(val: number[]) => setGrundflacheRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-blue-100 relative flex-1 h-2 rounded-full">
                        <Slider.Range className="absolute bg-blue-400 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                    <Slider.Thumb className="block w-5 h-5 bg-blue-400 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white" />
                </Slider.Root>
                {/* <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{minGrundflache}m²</span>
                    <span>{maxGrundflache}m²</span>
                </div> */}
            </div>
        </div>
    );
}