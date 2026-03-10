"use client";

import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { useEffect, useRef, useState } from "react";

interface FiltersProps {
    isOpen: boolean;
    onClose: () => void;
    properties: any[];
    setFilteredProperties: (props: any[]) => void;
}

export function PropertyFilters({ isOpen, onClose, properties, setFilteredProperties }: FiltersProps) {
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate price range dynamically from properties
    const getPriceRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 1000000 };
        }
        const prices = properties
            .map(p => p.price)
            .filter((p) => p > 0);
        return {
            min: Math.floor(Math.min(...prices) / 1000) * 1000,
            max: Math.ceil(Math.max(...prices) / 1000) * 1000,
        };
    };

    // Calculate land_area range dynamically from properties
    const getLandAreaRange = () => {
        if (!properties || properties.length === 0) {
            return { min: 0, max: 10000 };
        }
        const landAreas = properties
            .filter((p) => p.land_area)
            .map(p => p.land_area)
            .filter((area): area is number => area !== undefined && area > 0);
        if (landAreas.length === 0) {
            return { min: 0, max: 10000 };
        }
        return {
            min: Math.floor(Math.min(...landAreas) / 100) * 100,
            max: Math.ceil(Math.max(...landAreas) / 100) * 100,
        };
    };

    const dynamicPriceRange = getPriceRange();
    const minPriceEUR = dynamicPriceRange.min;
    const maxPriceEUR = dynamicPriceRange.max;

    const dynamicLandAreaRange = getLandAreaRange();
    const minLandArea = dynamicLandAreaRange.min;
    const maxLandArea = dynamicLandAreaRange.max;

    // Fixed area range: 20 - 300m²
    const minArea = 20;
    const maxArea = 300;

    // Rooms range: 1 - 15
    const minRooms = 1;
    const maxRooms = 15;

    // -------------------- Local State --------------------
    const [priceRange, setPriceRange] = useState<[number, number]>([minPriceEUR, maxPriceEUR]);
    const [areaRange, setAreaRange] = useState<[number, number]>([minArea, maxArea]);
    const [landAreaRange, setLandAreaRange] = useState<[number, number]>([minLandArea, maxLandArea]);
    const [roomsRange, setRoomsRange] = useState<[number, number]>([minRooms, maxRooms]);
    const [hasPool, setHasPool] = useState<boolean | "">("");
    const [installmentOnly, setInstallmentOnly] = useState<boolean | "">("");

    // Update price range when properties change
    useEffect(() => {
        setPriceRange([minPriceEUR, maxPriceEUR]);
    }, [minPriceEUR, maxPriceEUR]);

    // Update land area range when properties change
    useEffect(() => {
        setLandAreaRange([minLandArea, maxLandArea]);
    }, [minLandArea, maxLandArea]);

    // -------------------- Filtering --------------------
    useEffect(() => {
        const timeout = setTimeout(() => {
            const filtered = properties.filter(p => {
                const price = p.price;
                const totalRooms = p.bedrooms;
                const hasInstallments = p.down_payments && Array.isArray(p.down_payments) && p.down_payments.length > 0;

                return (
                    price >= priceRange[0] &&
                    price <= priceRange[1] &&
                    p.area >= areaRange[0] &&
                    p.area <= areaRange[1] &&
                    (!p.land_area || (p.land_area >= landAreaRange[0] && p.land_area <= landAreaRange[1])) &&
                    totalRooms >= roomsRange[0] &&
                    totalRooms <= roomsRange[1] &&
                    (hasPool === "" || p.has_pool === hasPool) &&
                    (installmentOnly === "" || hasInstallments === installmentOnly)
                );
            });
            setFilteredProperties(filtered);
        }, 100);

        return () => clearTimeout(timeout);
    }, [priceRange, areaRange, landAreaRange, roomsRange, hasPool, installmentOnly, properties, setFilteredProperties]);

    const resetFilters = () => {
        setPriceRange([minPriceEUR, maxPriceEUR]);
        setAreaRange([minArea, maxArea]);
        setLandAreaRange([minLandArea, maxLandArea]);
        setRoomsRange([minRooms, maxRooms]);
        setHasPool("");
        setInstallmentOnly("");
    };

    // -------------------- UI Helpers --------------------
    const section = "bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 shadow-md";

    const toggleSwitch = (active: boolean) =>
        `relative inline-flex h-6 w-11 items-center rounded-full transition ${active ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"
        } cursor-pointer`;

    const toggleSwitchThumb = (active: boolean) =>
        `inline-block h-4 w-4 transform rounded-full bg-white transition ${active ? "translate-x-5" : "translate-x-1"
        }`;

    const content = (
        <div ref={containerRef} dir="ltr" className="overflow-y-auto max-h-[calc(100vh-8rem)] p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold tracking-tight">{t.filter.title}</h3>
                <button
                    onClick={resetFilters}
                    className="cursor-pointer text-sm font-medium text-neutral-500 px-2 py-1 rounded-md hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    {t.filter.reset ?? "Reset"}
                </button>
            </div>

            {/* Price Range */}
            <div className={section}>
                <p className="font-medium">{t.filter.price}</p>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={priceRange}
                    min={minPriceEUR}
                    max={maxPriceEUR}
                    step={5000}
                    onValueChange={(val: number[]) => setPriceRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-neutral-300 dark:bg-neutral-700 relative flex-1 h-1 rounded-full cursor-pointer">
                        <Slider.Range className="absolute bg-black dark:bg-white h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                </Slider.Root>
                <p className="text-sm text-neutral-500">
                    €{priceRange[0].toLocaleString()} – €{priceRange[1].toLocaleString()}
                </p>
            </div>

            {/* Area Range */}
            <div className={section}>
                <p className="font-medium">{t.filter.area}</p>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={areaRange}
                    min={minArea}
                    max={maxArea}
                    step={10}
                    onValueChange={(val: number[]) => setAreaRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-neutral-300 dark:bg-neutral-700 relative flex-1 h-1 rounded-full">
                        <Slider.Range className="absolute bg-black dark:bg-white h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                </Slider.Root>
                <p className="text-sm text-neutral-500">
                    {areaRange[0]} – {areaRange[1]} {t.filter.sqm}
                </p>
            </div>

            {/* Land Area Range */}
            <div className={section}>
                <p className="font-medium">{language === "de" ? "Grundstücksfläche" : "Land Area"}</p>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={landAreaRange}
                    min={minLandArea}
                    max={maxLandArea}
                    step={100}
                    onValueChange={(val: number[]) => setLandAreaRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-neutral-300 dark:bg-neutral-700 relative flex-1 h-1 rounded-full">
                        <Slider.Range className="absolute bg-black dark:bg-white h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                </Slider.Root>
                <p className="text-sm text-neutral-500">
                    {landAreaRange[0]} – {landAreaRange[1]} {t.filter.sqm}
                </p>
            </div>

            {/* Rooms Range */}
            <div className={section}>
                <p className="font-medium">{t.filter.rooms ?? "Rooms"}</p>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={roomsRange}
                    min={minRooms}
                    max={maxRooms}
                    step={1}
                    onValueChange={(val: number[]) => setRoomsRange([val[0], val[1]])}
                >
                    <Slider.Track className="bg-neutral-300 dark:bg-neutral-700 relative flex-1 h-1 rounded-full">
                        <Slider.Range className="absolute bg-black dark:bg-white h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                    <Slider.Thumb className="block w-5 h-5 bg-black dark:bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" />
                </Slider.Root>
                <p className="text-sm text-neutral-500">
                    {roomsRange[0]} – {roomsRange[1]} {language === "de" ? "Zimmer" : "rooms"}
                </p>
            </div>

            {/* Pool Toggle */}
            <div className={section}>
                <div className="flex items-center justify-between">
                    <p className="font-medium">
                        {language === "de" ? "Nur mit Pool" : "Pool only"}
                    </p>
                    <button
                        onClick={() => setHasPool(hasPool === true ? "" : true)}
                        className={toggleSwitch(hasPool === true)}
                    >
                        <span className={toggleSwitchThumb(hasPool === true)} />
                    </button>
                </div>
            </div>

            {/* Installment Payment Toggle */}
            {/* <div className={section}>
                <div className="flex items-center justify-between">
                    <p className="font-medium">
                        {language === "de" ? "Nur Ratenzahlung" : "Installment only"}
                    </p>
                    <button
                        onClick={() => setInstallmentOnly(installmentOnly === true ? "" : true)}
                        className={toggleSwitch(installmentOnly === true)}
                    >
                        <span className={toggleSwitchThumb(installmentOnly === true)} />
                    </button>
                </div>
            </div> */}
        </div>
    );

    return (
        <>
            {/* Desktop */}
            <aside className="hidden lg:block w-80 sticky top-24 -ml-6 border-r dark:border-neutral-800 bg-white dark:bg-neutral-950 rounded-2xl shadow-md">
                {content}
            </aside>

            {/* Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.aside
                            className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-neutral-950 z-50 shadow-xl`}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                        >
                            {content}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}