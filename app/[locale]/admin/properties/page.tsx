"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Bed, Bath, Ruler, ChevronLeft, ChevronRight, LogOut, Copy, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { supabase } from "@/lib/db/supabase";
import { clearAdminToken } from "@/lib/admin/auth";
import { duplicateProperty } from "@/lib/admin/propertyActions";
import { useEgptoEur } from "@/lib/hooks/conversionRate";

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

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});
    const [duplicating, setDuplicating] = useState<string | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
    const { locale } = useParams<{ locale: string }>();
    const router = useRouter();
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;
    const { rate: eurRate } = useEgptoEur();

    const handleLogout = () => {
        if (window.confirm(language === "en" ? "Are you sure you want to logout?" : "Möchten Sie sich wirklich abmelden?")) {
            clearAdminToken();
            router.push(`/${locale}/admin/login`);
        }
    };

    useEffect(() => {
        const load = async () => await fetchProperties();
        load();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("properties")
            .select("*")
            .order("display_order"); if (!error && data) {
                // Fetch images for all properties
                const { data: imgData } = await supabase
                    .from("property_images")
                    .select("*")
                    .order("display_order", { ascending: true });

                // Map images to properties
                const propertiesWithImages = data.map((prop: any) => ({
                    ...prop,
                    images: imgData
                        ?.filter((img: any) => img.property_id === prop.id)
                        .map((img: any) => img.image_url) || [],
                }));

                setProperties(propertiesWithImages);
                // Initialize carousel indexes for each property
                const initialIndexes: Record<string, number> = {};
                (propertiesWithImages || []).forEach(p => { initialIndexes[p.id] = 0; });
                setCarouselIndexes(initialIndexes);
            }
        setLoading(false);
    };

    const deleteProperty = async (id: string) => {
        if (!confirm(language === "en" ? "Are you sure?" : "Bist du sicher?")) return;
        await supabase.from("properties").delete().eq("id", id);
        setProperties(prev => prev.filter(p => p.id !== id));
        setCarouselIndexes(prev => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const handleDuplicate = async (propertyId: string) => {
        try {
            setDuplicating(propertyId);
            await duplicateProperty(propertyId);
            await fetchProperties();
        } catch (error) {
            console.error("Failed to duplicate property:", error);
            alert(language === "en" ? "Failed to duplicate property" : "Fehler beim Duplizieren der Eigenschaft");
        } finally {
            setDuplicating(null);
        }
    };

    const updatePropertyField = async (id: string, field: string, value: any) => {
        try {
            setUpdatingStatus(id);
            const { error } = await supabase
                .from("properties")
                .update({ [field]: value })
                .eq("id", id);

            if (!error) {
                setProperties(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
            } else {
                alert(language === "en" ? "Failed to update property" : "Fehler beim Aktualisieren der Eigenschaft");
            }
        } catch (error) {
            console.error("Error updating property:", error);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const getTitle = (property: Property) =>
        language === "en" ? property.title_en : property.title_de;

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverId(id);
    };

    const handleDragLeave = () => {
        setDragOverId(null);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
        e.preventDefault();
        setDragOverId(null);

        if (!draggedId || draggedId === targetId) {
            setDraggedId(null);
            return;
        }

        const draggedIndex = properties.findIndex(p => p.id === draggedId);
        const targetIndex = properties.findIndex(p => p.id === targetId);

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
        setProperties(newProperties);

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

    // const getStatusBadgeColor = (status: string) => {
    //     switch (status) {
    //         case "available": return "bg-green-700 text-white";
    //         case "sold": return "bg-red-700 text-white";
    //         case "draft": return "bg-yellow-600 text-black";
    //         default: return "bg-muted text-foreground";
    //     }
    // };

    // const getStatusLabel = (status: string) => {
    //     if (language === "en") return status === "available" ? "Available" : status === "sold" ? "Sold" : "Draft";
    //     if (language === "ar") return status === "available" ? "متاح" : status === "sold" ? "مباع" : "مسودة";
    //     return status === "available" ? "Verfügbar" : status === "sold" ? "Verkauft" : "Entwurf";
    // };

    const nextImage = (id: string, length: number) => {
        setCarouselIndexes(prev => ({ ...prev, [id]: (prev[id] + 1) % length }));
    };

    const prevImage = (id: string, length: number) => {
        setCarouselIndexes(prev => ({ ...prev, [id]: (prev[id] - 1 + length) % length }));
    };

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary"></div>
                <p className="mt-4 text-foreground font-medium text-lg">
                    {language === "en" ? "Loading..." : "Wird geladen..."}
                </p>
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b pb-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        {language === "en" ? "Properties" : "Grundstücke"}
                    </h2>
                    <p className="text-black text-lg">
                        {language === "en" ? `Number of listed properties: ${properties.length}` :
                            `Anzahl der aufgelisteten Grundstücke: ${properties.length}`}
                    </p>
                </div>
                <div>
                    <Link href={`/${locale}/admin/properties/new`} className="btn btn-primary p-2 m-1 items-center gap-2">
                        <Plus size={15} />
                        {language === "en" ? "New Property" : "Neues Grundstück"}
                    </Link>
                </div>
            </div>


            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
                {properties.length === 0 ? (
                    <div className="col-span-full p-10 bg-card rounded-2xl text-center border border-border">
                        <p className="text-foreground text-lg mb-6">
                            {language === "en" ? "No properties yet. Create your first property!" :
                                "Noch keine Grundstücke. Erstellen Sie Ihr erstes Grundstück!"}
                        </p>
                        <Link href={`/${locale}/admin/properties/new`} className="btn btn-primary">
                            <Plus size={20} /> {language === "en" ? "Create Property" : "Grundstück erstellen"}
                        </Link>
                    </div>
                ) : properties.map(property => {
                    const hasImages = property.images && property.images.length > 0;
                    const displayImage = hasImages ? property.images![carouselIndexes[property.id] || 0] : "/placeholder.jpg";

                    return (
                        <div
                            key={property.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, property.id)}
                            onDragOver={(e) => handleDragOver(e, property.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, property.id)}
                            onDragEnd={handleDragEnd}
                            className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden flex flex-col w-full transition-all duration-200 ${draggedId === property.id ? 'opacity-50 scale-95' : ''
                                } ${dragOverId === property.id && draggedId ? 'ring-2 ring-blue-500 scale-105' : ''
                                } ${draggedId ? 'cursor-grab' : 'cursor-grab'
                                }`}
                        >
                            {/* Image Carousel */}
                            <div className="relative w-full aspect-video bg-neutral-200 dark:bg-neutral-700 overflow-hidden group">
                                {displayImage ? (
                                    <Image
                                        src={displayImage}
                                        alt={getTitle(property) || "Untitled"}
                                        fill
                                        className="object-cover transition-transform duration-300"
                                        sizes="100vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                                        <span className="text-neutral-500 dark:text-neutral-400 text-lg font-semibold">
                                            {language === "de" ? "Keine Bilder" : "No Images"}
                                        </span>
                                    </div>
                                )}

                                {hasImages && property.images!.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => prevImage(property.id, property.images!.length)}
                                            className="absolute top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100 left-4"
                                            aria-label="Previous Image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>

                                        <button
                                            onClick={() => nextImage(property.id, property.images!.length)}
                                            className="absolute top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100 right-4"
                                            aria-label="Next Image"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                            {(carouselIndexes[property.id] || 0) + 1} / {property.images!.length}
                                        </div>
                                    </>
                                )}

                                {/* Display Index Badge */}
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    #{property.display_order}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6 flex flex-col grow">
                                {/* Title & Status */}
                                <div className="flex justify-center items-start mb-2">
                                    <h3 className="text-base sm:text-lg font-bold justify-center text-center text-neutral-900 dark:text-neutral-50 line-clamp-2">{getTitle(property) || "Untitled"}</h3>
                                </div>
                                {/* <span className={`px-3 py-1 justify-center text-center rounded-full text-xs font-bold inline-block mb-3 ${getStatusBadgeColor(property.status)}`}>
                                    {getStatusLabel(property.status)}
                                </span> */}

                                {/* Features */}
                                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-neutral-200 dark:border-neutral-700 text-center text-xs sm:text-sm text-muted font-medium">
                                    <div className="flex flex-col items-center gap-1">
                                        <Bed className="w-4 sm:w-5 h-4 sm:h-5 text-primary-500" />
                                        <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50">{property.bedrooms || "—"}</span>
                                        <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                                            {language === "de" ? "Zimmer" : "Beds"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center gap-1">
                                        <Ruler className="w-4 sm:w-5 h-4 sm:h-5 text-primary-500" />
                                        <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50">{property.area || "—"}</span>
                                        <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                                            {language === "de" ? "qm" : "sqm"}
                                        </span>
                                    </div>
                                </div>

                                {/* Price */}
                                <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
                                    {property.price ? `EGP${property.price.toLocaleString(language === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: 0 })}` : '—'}
                                </p>
                                {property.price && eurRate && (
                                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                                        €{(property.price * eurRate).toLocaleString(language === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: 0 })}
                                    </p>
                                )}

                                {/* Down Payment Indicator */}
                                {property.down_payments && property.down_payments.length > 0 && (
                                    <div className="mb-3 sm:mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <p className="text-[10px] sm:text-xs font-semibold text-green-800 dark:text-green-200 mb-2">
                                            {language === 'en' ? 'Down Payments Available' : 'Zahlungsoptionen verfügbar'}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {property.down_payments.map((dp: any, idx: number) => (
                                                <span key={idx} className="text-[10px] sm:text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">{dp.percentage}% → {dp.years}yrs</span>
                                            ))}
                                        </div>
                                    </div>
                                )}



                                {/* Optional Fields Indicators */}
                                {(property.floor || property.view || property.maintenance || property.cash_discount ||
                                    property.object_number || property.load_factor || property.facilities) && (
                                        <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-t border-neutral-200 dark:border-neutral-700 pt-3 sm:pt-4">
                                            <p className="text-[10px] sm:text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                                                {language === "en" ? "Additional Info:" : "Zusätzliche Info:"}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {property.floor && <span className="text-[10px] sm:text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Floor: {property.floor}</span>}
                                                {property.view && <span className="text-[10px] sm:text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">{property.view}</span>}
                                                {property.cash_discount && <span className="text-[10px] sm:text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Discount: {property.cash_discount}%</span>}
                                                {property.object_number && <span className="text-[10px] sm:text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">Obj: {property.object_number}</span>}
                                            </div>
                                        </div>
                                    )}

                                {/* Status and Sold Status */}
                                <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-t border-neutral-200 dark:border-neutral-700 pt-3 sm:pt-4 flex flex-wrap gap-2">
                                    <div className="flex items-center gap-2 flex-1">
                                        <select
                                            value={property.status || "shown"}
                                            onChange={(e) => updatePropertyField(property.id, "status", e.target.value)}
                                            disabled={updatingStatus === property.id}
                                            className="flex-1 px-2 py-1 text-xs sm:text-sm bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded hover:border-blue-500 cursor-pointer disabled:opacity-50"
                                        >
                                            <option value="shown">{language === "en" ? "Shown" : "Angezeigt"}</option>
                                            <option value="hidden">{language === "en" ? "Hidden" : "Verborgen"}</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => updatePropertyField(property.id, "sold", !property.sold)}
                                        disabled={updatingStatus === property.id}
                                        className={`px-2 py-1 text-xs sm:text-sm rounded font-semibold transition ${property.sold
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            } disabled:opacity-50`}
                                    >
                                        {property.sold ? (language === "en" ? "✓ Sold" : "✓ Verkauft") : (language === "en" ? "Not Sold" : "Nicht verkauft")}
                                    </button>
                                </div>

                                {/* Edit/Delete/Duplicate Actions */}
                                <div className="flex flex-col sm:flex-col gap-2 sm:gap-3 mt-auto">
                                    <Link
                                        href={`/${locale}/admin/properties/edit/${property.id}`}
                                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <Edit2 size={16} className="sm:w-4.5 sm:h-4.5" /> {language === "en" ? "Edit" : "Bearbeiten"}
                                    </Link>
                                    <button
                                        onClick={() => handleDuplicate(property.id)}
                                        disabled={duplicating === property.id}
                                        title={language === "en" ? "Duplicate this property" : "Diese Eigenschaft duplizieren"}
                                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {duplicating === property.id ? (
                                            <Loader2 size={16} className="animate-spin sm:w-4.5 sm:h-4.5" />
                                        ) : (
                                            <Copy size={16} className="sm:w-4.5 sm:h-4.5" />
                                        )}
                                        {language === "en" ? "Duplicate" : "Duplizieren"}
                                    </button>
                                    <button
                                        onClick={() => deleteProperty(property.id)}
                                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                                    >
                                        <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" /> {language === "en" ? "Delete" : "Löschen"}
                                    </button>
                                </div>

                            </div>
                        </div >

                    );
                })}
            </div >

        </div >
    );
}
