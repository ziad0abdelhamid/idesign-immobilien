"use client";
import { FaBed, FaBath, FaRulerCombined, FaBuilding, FaEye, FaTools, FaPercent, FaCalendarAlt, FaCheckCircle, FaSwimmingPool, FaMap } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useContactStore } from "@/lib/store/contactStore";
import { ImageViewModal } from "./ImageViewModal";
import { span } from "framer-motion/m";

interface Props {
    property: any;
    onClose: () => void;
    language: "en" | "de";
}

const TEXT = {
    en: {
        contact: "Contact Agent",
        facilities: "Facilities",
        floorPlans: "Floor Plans",
        area: "Area",
        landArea: "Land Area",
        bedrooms: "Rooms",
        floor: "Floor",
        view: "View",
        maintenance: "Maintenance Fee (One-time payment)",
        cashDiscount: "Cash Discount",
        objectNumber: "Object Number",
        loadFactor: "Load Factor",
        dateOfCompletion: "Delivery Date",
        downPayments: "Installment plan",
        downPaymentSlider: "Adjust Down Payment",
        remaining: "Remaining",
        monthly: "Monthly",
        totalPrice: "Total Price",
        installments: "Installments",
        sending: "Sending...",
        success: "Message sent!",
        agentMessage: "Hello, I am interested in the property",
        agentMessage2: "Could you please contact me with further details?",
        shareProperty: "Share Property"
    },
    de: {
        contact: "Makler kontaktieren",
        facilities: "Ausstattung",
        floorPlans: "Grundrisse",
        area: "Fläche",
        landArea: "Grundstücksfläche",
        bedrooms: "Zimmer",

        floor: "Etage",
        view: "Ausblick",
        maintenance: "Wartungspauschale (einmalig)",
        cashDiscount: "Preis bei Barzahlung:",
        objectNumber: "Objektnummer",
        loadFactor: "Nutzflächenfaktor",
        dateOfCompletion: "Auslieferung am",
        downPayments: "Ratenzahlung",
        downPaymentSlider: "Anzahlung anpassen",
        remaining: "Restbetrag",
        monthly: "Monatsraten zu je:",
        totalPrice: "Kaufpreis",
        installments: "Ratenzahlung",
        sending: "Wird gesendet...",
        success: "Nachricht gesendet!",
        agentMessage: "Hallo! Ich interessiere mich für diese Immobilie",
        agentMessage2: "Bitte schicken Sie mir weitere Details zu.",
        shareProperty: "Immobilie teilen"
    },
};

export function PropertyDetailsModal({ property, onClose, language }: Props) {
    const t = TEXT[language];
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const downPaymentOptions = property.down_payments || [];
    const ghostMin = downPaymentOptions[0]
        ? { percentage: Math.max(0, downPaymentOptions[0].percentage - 10) }
        : null;
    const ghostMax = downPaymentOptions.at(-1)
        ? { percentage: downPaymentOptions.at(-1)!.percentage + 10 }
        : null;
    const setPrefill = useContactStore((state) => state.setPrefill);
    const [showOverlay, setShowOverlay] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (property.has_installments) {
            setShowOverlay(true);
            setFadeOut(false);

            const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
            const hideTimer = setTimeout(() => setShowOverlay(false), 3800);

            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [property.has_installments]);

    // Work with EUR prices directly - no conversion
    const priceEUR = Math.round(property.price);
    const downPaymentEUR = Math.round(priceEUR * 0.1);
    const TotalRooms = Math.round(property.bedrooms);
    const cashDiscountAmount = property.cash_discount ? Math.round((priceEUR * property.cash_discount) / 100) : 0;
    const maintenanceFeeEUR = property.maintenance_type === "percentage" && property.maintenance_percentage !== null
        ? Math.round((priceEUR * property.maintenance_percentage) / 100)
        : 0;

    const getText = (key: "title" | "location" | "description" | "object_number") =>
        language === "de"
            ? property[`${key}_de`]
            : property[`${key}_en`];

    const images = property.images?.filter((i: string) => i && i.trim() !== "") || ["/placeholder.jpg"];

    /* ---------------- ESC + Scroll Lock ---------------- */
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

    /* ---------------- Stat Component ---------------- */
    const Stat = ({ label, value, suffix = "", icon, isNumeric = true, poolClass = false }: any) => (
        <div className={`rounded-xl p-3 flex flex-col items-center justify-center text-center md:flex-row md:items-center md:gap-2 bg-blue-100/70 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 shadow-sm`}>
            {icon && (
                <span className={`${poolClass ? "text-blue-600 dark:text-blue-400" : "text-primary-500"} text-2xl md:text-base mb-2 md:mb-0`}>
                    {icon}
                </span>
            )}
            <div className="flex flex-col items-center justify-center">
                <div className="text-xs uppercase tracking-wide text-neutral-500 mb-1 md:mb-0">{label}</div>
                <div className="text-sm md:text-base font-semibold flex items-center justify-center gap-1">
                    {isNumeric ? (
                        <>
                            <CountUp end={value} duration={0.8} />
                            {suffix}
                        </>
                    ) : (
                        value
                    )}
                </div>
            </div>
        </div>
    );


    /* ---------------- Price Calculations ---------------- */
    const originalPrice = property.price;

    const formatPrice = (value: number) =>
        value.toLocaleString(language === "de" ? "de-DE" : "en-US", { maximumFractionDigits: 0, style: "currency", currency: "EUR" });

    /* ---------------- Down Payment Slider ---------------- */
    const [dpIndex, setDpIndex] = useState(0);
    const [imageViewModalOpen, setImageViewModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const selectedDP = downPaymentOptions[dpIndex]?.percentage || 0;
    const dpYears = downPaymentOptions[dpIndex]?.years || 1;


    const handleDPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        // Match backend available options
        const closest = property.down_payments.reduce((prev: any, curr: any) =>
            Math.abs(curr.percentage - value) < Math.abs(prev.percentage - value) ? curr : prev
        );
        selectedDP(closest.percentage);
        dpYears(closest.years);
    };

    const downPaymentAmount = priceEUR! * (selectedDP / 100);
    const remainingAmount = priceEUR! - downPaymentAmount;
    const months = dpYears * 12;
    const monthlyPayment = remainingAmount / months;

    return (
        <AnimatePresence>
            <motion.div
                key="property-modal"
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center sm:p-4 p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    ref={modalRef}
                    id={`property-modal-${property.id}`}
                    dir="ltr"
                    className="
                                relative w-full
                                max-w-7xl
                                h-[92vh] sm:h-[94vh]
                                bg-linear-to-br from-white via-neutral-50 to-white
                                dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800
                                rounded-3xl shadow-2xl
                                overflow-hidden
                                flex flex-col
                                border border-neutral-200 dark:border-neutral-700
                                "
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer top-4 sm:top-6 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                        style={{ right: "1rem" }}
                    >
                        ✕
                    </button>
                    {/* TOP SECTION: Sticky Images (mobile only) */}
                    <div className="md:hidden sticky top-0 z-10 h-40 sm:h-64 rounded-none overflow-hidden p-0 bg-white dark:bg-neutral-900">
                        {/* IMAGE */}
                        <div className="relative w-full h-full rounded-none overflow-hidden p-0">
                            <Swiper
                                modules={[Navigation, Pagination, Keyboard, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                keyboard
                                autoplay={{ delay: 4000 }}
                                className="h-full"
                            >
                                {images.map((img: string, i: number) => (
                                    <SwiperSlide key={i} className="relative cursor-pointer">
                                        {/* Down Payment Overlay */}
                                        {property.has_installments && showOverlay && (
                                            <div
                                                className={`absolute bottom-6 left-0 z-20 w-[65%] max-w-140 overflow-hidden shadow-2xl ${fadeOut ? "animate-lower-third-out" : "animate-lower-third-in"
                                                    }`}
                                            >
                                                <div
                                                    className={`relative bg-linear-to-r from-blue-900 via-blue-800 to-blue-700 backdrop-blur-md bg-opacity-90 px-5 py-3 text-white font-bold leading-tight drop-shadow-lg text-lg sm:text-xl transition-all duration-500 ease-out transform animate-slide-in`}
                                                    style={{
                                                        WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)",
                                                        maskImage: "linear-gradient(to right, black 85%, transparent)",
                                                    }}
                                                >
                                                    {/* Right fade overlay */}
                                                    <div
                                                        className="pointer-events-none absolute top-0 h-full w-14"
                                                        style={{
                                                            right: 0,
                                                            background: "linear-gradient(to left, rgba(55,65,81,1), rgba(55,65,81,0))",
                                                        }}
                                                    />

                                                    {/* Content */}
                                                    <div className="flex flex-col gap-0.5">
                                                        <div>
                                                            {language === "de" ? "Ab " : "From "}
                                                            {downPaymentEUR.toLocaleString()}€
                                                        </div>

                                                        <div className="text-xs sm:text-sm opacity-90 tracking-wide">
                                                            {language === "de" ? "Anzahlung" : "Down Payment from:"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Image */}
                                        <Image
                                            src={img}
                                            alt={getText("title")}
                                            fill
                                            className="object-cover rounded-2xl cursor-pointer hover:opacity-90 transition"
                                            priority={i === 0}
                                            onClick={() => {
                                                setSelectedImageIndex(i);
                                                setImageViewModalOpen(true);
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-4 flex-1 overflow-hidden">
                        {/* DESKTOP IMAGE SECTION (hidden on mobile) */}
                        <div className="hidden md:flex md:flex-col gap-4 overflow-y-auto overscroll-contain scrollbar-hide md:scrollbar-show"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgb(107 114 128) rgb(229 231 235)'
                            }}
                        >
                            {/* DESKTOP IMAGE */}
                            <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-130 rounded-2xl overflow-hidden bg-black m-2 p-2">
                                <Swiper
                                    modules={[Navigation, Pagination, Keyboard, Autoplay]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    keyboard
                                    autoplay={{ delay: 4000 }}
                                    className="h-full"
                                >
                                    {images.map((img: string, i: number) => (
                                        <SwiperSlide key={i} className="relative cursor-pointer">
                                            {property.has_installments && (
                                                <div className="absolute bottom-8 left-0 z-20 w-auto max-w-105 overflow-hidden shadow-lg">
                                                    <div
                                                        className={`relative bg-linear-to-br from-blue-900 to-blue-950 text-white px-20 py-4 text-sm sm:text-base font-bold transition-all duration-500 ease-out transform animate-slide-in`}
                                                        style={{
                                                            WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)",
                                                            maskImage: "linear-gradient(to right, black 85%, transparent)",
                                                        }}
                                                    >
                                                        {/* Right fade overlay */}
                                                        <div
                                                            className="pointer-events-none absolute top-0 h-full w-14"
                                                            style={{
                                                                right: 0,
                                                                background: "linear-gradient(to left, rgba(30, 64, 175, 1), rgba(30, 64, 175, 0))",
                                                            }}
                                                        />

                                                        {/* Content */}
                                                        <div className="flex flex-col gap-0.5 text-center leading-tight">

                                                            <div className="text-xs opacity-90">
                                                                {
                                                                    language === "de"
                                                                        ? "Anzahlung"
                                                                        : "Down payments"}
                                                            </div>
                                                            <div>
                                                                {language === "de" ? "Ab " : "From "}€{downPaymentEUR.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <Image
                                                src={img}
                                                alt={getText("title")}
                                                fill
                                                className="object-contain rounded-2xl cursor-pointer hover:opacity-90 transition bg-black"
                                                priority={i === 0}
                                                onClick={() => {
                                                    setSelectedImageIndex(i);
                                                    setImageViewModalOpen(true);
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* DESKTOP STATS */}
                            <div className="hidden md:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2 lg:gap-4 px-2">
                                {property.area && <Stat label={t.area} value={Math.round(property.area)} suffix=" m²" icon={<FaRulerCombined />} />}
                                {property.land_area && <Stat label={t.landArea} value={Math.round(property.land_area)} suffix=" m²" icon={<FaMap />} />}
                                {property.bedrooms && <Stat label={t.bedrooms} value={TotalRooms} icon={<FaBed />} />}
                                {property.floor && <Stat label={t.floor} value={Math.round(property.floor)} icon={<FaBuilding />} />}
                                <Stat
                                    icon={<FaSwimmingPool className="text-blue-500" />}
                                    label={language === "de" ? "Pool" : "Pool"}
                                    value={property.has_pool ? (language === "de" ? "Ja" : "Yes") : (language === "de" ? "Nein" : "No")}
                                    isNumeric={false}
                                    poolClass={true}
                                />
                                {property.view?.length > 0 && (
                                    <ul className="rounded-xl bg-blue-100/60 dark:bg-neutral-800 p-2 sm:p-3 md:p-3 lg:p-4 flex flex-col gap-1 border border-blue-300">
                                        <li className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-500 list-none">
                                            <FaEye /> {t.view}
                                        </li>

                                        {(
                                            Array.isArray(property.view)
                                                ? property.view
                                                : typeof property.view === "string"
                                                    ? property.view.split(",").map((v: string) => v.trim()).filter(Boolean)
                                                    : []
                                        ).map((v: string, i: number) => (
                                            <li
                                                key={i}
                                                className="list-disc ml-4 sm:ml-5 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm"
                                            >
                                                {v}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Stat
                                    label={
                                        property.has_installments
                                            ? language === "de"
                                                ? "Ratenzahlung"
                                                : "Installments"
                                            : language === "de"
                                                ? "Verfügbar"
                                                : "Available"
                                    }
                                    value={
                                        // Replace text with icon
                                        property.has_installments ? (
                                            <FaCheckCircle className="text-green-500 text-lg" />
                                        ) : (
                                            <FaBuilding className="text-green-500 text-lg" />
                                        )
                                    }
                                    isNumeric={false}
                                />
                            </div>

                        </div>

                        {/* CONTENT */}
                        <div className="p-3 sm:p-5 md:p-6 lg:p-6 space-y-4 sm:space-y-5 md:space-y-6 overflow-y-auto overscroll-contain"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgb(107 114 128) rgb(229 231 235)'
                            }}
                        >
                            {/* TITLE */}
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold leading-tight ">{getText("title")}</h1>
                                <p className="text-xs sm:text-sm md:text-sm text-neutral-500 mt-1 sm:mt-2">{getText("location")}</p>
                                {property.object_number && (
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                                        {language === "de"
                                            ? `Objektnummer: ${property.object_number}`
                                            : `Object Number: ${property.object_number}`}</p>
                                )}
                            </div>

                            {/* TOTAL PRICE (mobile priority) */}
                            <div className="space-y-2">
                                <div className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold text-primary-600 dark:text-primary-400">
                                    {language === "de"
                                        ? `Kaufpreis: ${formatPrice(priceEUR)}`
                                        : `Total Price: ${formatPrice(priceEUR)}`}
                                </div>
                                {property.cash_discount && (
                                    <div className="inline-block bg-linear-to-r from-green-100 to-green-100 dark:from-yellow-900/40 dark:to-amber-900/40 border border-green-300 dark:border-green-700 rounded-full px-2 sm:px-3 md:px-3 py-1 text-xs sm:text-xs md:text-sm font-semibold text-green-700 dark:text-green-300">
                                        {t.cashDiscount} {formatPrice(priceEUR - cashDiscountAmount)}
                                    </div>
                                )}
                            </div>
                            {/* DOWN PAYMENT CALCULATOR */}
                            {property.down_payments?.length > 0 && property.price && (
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold">{t.downPayments}</h3>

                                    {/* DOWN PAYMENT SELECTOR - Only show if more than 1 option */}
                                    {downPaymentOptions.length > 1 && (
                                        <div className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg space-y-4">
                                            <label className="block text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-50">
                                                {t.downPaymentSlider}
                                            </label>

                                            {/* Mobile: Segmented buttons */}
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:hidden">
                                                {downPaymentOptions.map((opt: any, i: number) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setDpIndex(i)}
                                                        className={`px-2 sm:px-3 py-2 rounded-lg text-xs font-semibold border transition${dpIndex === i
                                                            ? "bg-blue-600 text-black border-blue-600"
                                                            : "bg-blue-300  text-neutral-700  border-neutral-300"}`}
                                                    >
                                                        {opt.percentage}%
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Desktop: Slider */}
                                            <div className="hidden sm:block space-y-3">
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={downPaymentOptions.length - 1}
                                                    step={1}
                                                    value={dpIndex}
                                                    onChange={(e) => setDpIndex(Number(e.target.value))}
                                                    className="
                                                                w-full h-2 rounded-lg appearance-none cursor-pointer
                                                                bg-neutral-300 dark:bg-neutral-600
                                                                focus:outline-none focus:ring-0 focus:ring-offset-0
                                                                active:outline-none active:ring-0 active:ring-offset-0
                                                            "
                                                />

                                                {/* Tick Marks */}
                                                <div className="relative h-6">
                                                    {downPaymentOptions.map((opt: any, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="absolute -translate-x-1/2 text-xs font-bold text-blue-600 dark:text-blue-400"
                                                            style={{ left: `${(i / (downPaymentOptions.length - 1)) * 100}%` }}
                                                        >
                                                            {opt.percentage}%
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Calculations (DOWN PAYMENT now included) */}
                                    <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg shadow-md border-2 border-blue-300 dark:border-blue-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                                                {language === "de" ? "Anzahlung" : "Down Payment"}
                                            </span>
                                            <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-300 bg-white dark:bg-neutral-800 px-2 sm:px-3 py-1 rounded-lg">
                                                {formatPrice(downPaymentAmount)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200">{t.remaining}</span>
                                            <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-50">
                                                {formatPrice(remainingAmount)}
                                            </span>
                                        </div>

                                        <div className="border-t-2 border-blue-300 dark:border-blue-500 pt-2 sm:pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                                                    {language === "de"
                                                        ? `${months} Monatsraten zu je:`
                                                        : `${months} monthly installments of`}
                                                </span>
                                                <span className="text-base sm:text-lg font-bold text-primary-600 dark:text-primary-300 bg-white dark:bg-neutral-800 px-2 sm:px-3 py-1 rounded-lg">
                                                    {formatPrice(monthlyPayment)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Description Field - Left side below stats (desktop only) */}
                            <div className="hidden md:block bg-neutral-50 dark:bg-neutral-800 rounded-lg p-2 sm:p-3 md:p-4 m-2 sm:m-3 md:m-4 text-xs sm:text-sm space-y-2 wrap-break-word overflow-hidden prose dark:prose-invert max-w-none">
                                {getText("description") && (
                                    <div
                                        className="text-neutral-600 dark:text-neutral-300 leading-snug whitespace-normal"
                                        dangerouslySetInnerHTML={{ __html: getText("description").replace(/\n/g, '<br/>') }}
                                    />
                                )}
                            </div>
                            {/* MOBILE STATS - Only show on mobile */}
                            <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {property.area && <Stat label={t.area} value={Math.round(property.area)} suffix=" m²" icon={<FaRulerCombined />} />}
                                {property.land_area && <Stat label={t.landArea} value={Math.round(property.land_area)} suffix=" m²" icon={<FaMap />} />}
                                {property.bedrooms && <Stat label={t.bedrooms} value={TotalRooms} icon={<FaBed />} />}
                                {property.floor && <Stat label={t.floor} value={Math.round(property.floor)} icon={<FaBuilding />} />}
                                <Stat
                                    icon={<FaSwimmingPool className="text-blue-500" />}
                                    label={language === "de" ? "Pool" : "Pool"}
                                    value={property.has_pool ? (language === "de" ? "Ja" : "Yes") : (language === "de" ? "Nein" : "No")}
                                    isNumeric={false}
                                    poolClass={true}
                                />
                                {property.view?.length > 0 && (
                                    <ul className="rounded-xl bg-blue-100/60 dark:bg-neutral-800 p-2 sm:p-3 md:p-3 lg:p-4 flex flex-col gap-1 border border-blue-300">
                                        <li className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-500 list-none">
                                            <FaEye /> {t.view}
                                        </li>

                                        {(
                                            Array.isArray(property.view)
                                                ? property.view
                                                : typeof property.view === "string"
                                                    ? property.view.split(",").map((v: string) => v.trim()).filter(Boolean)
                                                    : []
                                        ).map((v: string, i: number) => (
                                            <li
                                                key={i}
                                                className="list-disc ml-4 sm:ml-5 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm"
                                            >
                                                {v}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <Stat
                                    label={
                                        property.has_installments
                                            ? language === "de"
                                                ? "Ratenzahlung"
                                                : "Installments"
                                            : language === "de"
                                                ? "Verfügbar"
                                                : "Available"
                                    }
                                    value={
                                        // Replace text with icon
                                        property.has_installments ? (
                                            <FaCheckCircle className="text-green-500 text-lg" />
                                        ) : (
                                            <FaBuilding className="text-green-500 text-lg" />
                                        )
                                    }
                                    isNumeric={false}
                                />
                            </div>


                            {/* Mobile Description - Only show on mobile */}
                            <div className="sm:hidden bg-neutral-50 dark:bg-neutral-800 rounded-lg p-2 sm:p-3 md:p-4 m-2 sm:m-3 md:m-4 text-xs sm:text-sm space-y-2 wrap-break-word overflow-hidden">
                                {getText("description") && (
                                    <p className="text-neutral-600 dark:text-neutral-300 leading-snug wrap-break-word whitespace-normal">
                                        {getText("description")}
                                    </p>
                                )}

                                {property.date_of_completion && (
                                    <p className="wrap-break-word whitespace-normal">
                                        <span className="font-semibold">{t.dateOfCompletion}:</span>{" "}
                                        <span className="wrap-break-word">{property.date_of_completion}</span>
                                    </p>
                                )}
                                {(property.maintenance || (property.maintenance_type === "percentage" && property.maintenance_percentage !== null)) && (
                                    <p className="wrap-break-word whitespace-normal">
                                        <span className="font-semibold">{t.maintenance}:</span>{" "}
                                        <span className="wrap-break-word">
                                            {property.maintenance_type === "percentage" && property.maintenance_percentage !== null && maintenanceFeeEUR > 0
                                                ? formatPrice(maintenanceFeeEUR)
                                                : property.maintenance}
                                        </span>
                                    </p>
                                )}

                                {property.load_factor && (
                                    <p className="wrap-break-word whitespace-normal">
                                        <span className="font-semibold">{t.loadFactor}:</span>{" "}
                                        <span className="wrap-break-word">{property.load_factor}</span>
                                    </p>
                                )}
                            </div>
                            {/* Text Details */}
                            <div className="hidden sm:block bg-neutral-50 dark:bg-neutral-800 rounded-lg p-2 sm:p-2 md:p-2 m-1 sm:m-1 md:m-1 text-xs sm:text-sm space-y-2 wrap-break-word overflow-hidden">
                                {property.facilities?.length > 0 && (
                                    <div className="text-neutral-700 dark:text-neutral-300">
                                        <div className="font-semibold mb-1">{t.facilities}:</div>

                                        <ul className="list-disc pl-4 space-y-1 wrap-break-word">
                                            {property.facilities.map((f: string, i: number) => (
                                                <li key={i} className="wrap-break-word">
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {(property.maintenance || (property.maintenance_type === "percentage" && property.maintenance_percentage !== null)) && (
                                    <p className="wrap-break-word whitespace-normal">
                                        <span className="font-semibold">{t.maintenance}:</span>{" "}
                                        <span className="wrap-break-word">
                                            {property.maintenance_type === "percentage" && property.maintenance_percentage !== null && maintenanceFeeEUR > 0
                                                ? formatPrice(maintenanceFeeEUR)
                                                : property.maintenance}
                                        </span>
                                    </p>
                                )}

                                {property.load_factor && (
                                    <p className="wrap-break-word whitespace-normal">
                                        <span className="font-semibold">{t.loadFactor}:</span>{" "}
                                        <span className="wrap-break-word">{property.load_factor}</span>
                                    </p>
                                )}

                                {property.date_of_completion && (
                                    <p className="wrap-break-word whitespace-normal">
                                        <span className="font-semibold">{t.dateOfCompletion}:</span>{" "}
                                        <span className="wrap-break-word">{property.date_of_completion}</span>
                                    </p>
                                )}

                            </div>




                        </div>
                    </div>

                    {/* Mobile CTA Button - Only visible on mobile */}
                    <div className="sm:hidden bg-linear-to-r from-blue-50 to-neutral-50 dark:from-blue-900/30 dark:to-neutral-900/50 border-t border-blue-200 dark:border-blue-800 px-3 sm:px-4 py-3">
                        <div className="flex flex-col gap-3">
                            <div className="text-center text-primary-600 dark:text-primary-300 font-bold text-xs sm:text-sm">
                                {t.totalPrice}: {formatPrice(priceEUR)}
                            </div>
                            <button
                                className="
                                                w-full px-6 py-3 font-bold text-white text-sm sm:text-base
                                                rounded-lg
                                                bg-linear-to-r from-blue-600 via-blue-500 to-blue-900
                                                transition-all duration-300
                                                active:scale-95
                                                ring-2 ring-blue-400/50
                                                select-none
                                                uppercase tracking-wide cursor-pointer
                    "
                                onClick={() => {
                                    setPrefill({
                                        subject: `${getText("title")} - ${property.object_number ? `(${property.object_number})` : ""}`,
                                        message: `${t.agentMessage}. ${t.agentMessage2}`,
                                    });
                                    router.push("/contact");
                                }}
                            >
                                {t.contact}
                            </button>
                        </div>
                    </div>

                    {/* STICKY CTA - Desktop Only */}
                    <div className="hidden sm:flex bg-linear-to-r from-blue-50 to-neutral-50 dark:from-blue-900/30 dark:to-neutral-900/50 border-t border-blue-200 dark:border-blue-800 px-4 md:px-6 py-3 md:py-4 items-center justify-between gap-3 md:gap-4 shrink-0 backdrop-blur-sm">
                        <div className="text-primary-600 dark:text-primary-300 font-bold text-sm md:text-base">
                            {t.totalPrice}: {formatPrice(priceEUR)}
                        </div>

                        <button
                            className="
                                        relative inline-block px-6 md:px-8 py-2 md:py-3 font-bold text-white text-sm md:text-base
                                        rounded-xl
                                        bg-linear-to-r from-blue-600 via-blue-500 to-blue-900
                                        transition-all duration-300
                                        transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg
                                        active:scale-95
                                        ring-2 ring-blue-400/50
                                        focus:outline-none focus:ring-offset-2 focus:ring-blue-400
                                        select-none
                                        uppercase tracking-wider cursor-pointer
"
                            onClick={() => {
                                setPrefill({
                                    subject: `${getText("title")} -${property.object_number ? `(${property.object_number})` : ""}`,
                                    message: `${t.agentMessage}. ${t.agentMessage2}`,
                                });
                                router.push("/contact");
                            }}
                        >
                            {t.contact}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
            <ImageViewModal
                key="image-modal"
                images={images}
                initialIndex={selectedImageIndex}
                isOpen={imageViewModalOpen}
                onClose={() => setImageViewModalOpen(false)}
            />
        </AnimatePresence >
    );
}
