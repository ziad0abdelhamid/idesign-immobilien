"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/db/supabase";
import { useParams, useRouter } from "next/navigation";
import { Upload, X, Loader2 } from "lucide-react";
import { translations } from "@/lib/i18n/translations";
import { useLanguageStore } from "@/lib/store";


interface Props {
    propertyId?: string;
    onSuccess?: (id: string) => void;
}

interface FormData {
    title_en: string;
    title_de: string;
    description_en: string;
    description_de: string;
    price: number | null;
    area: number | null;
    bedrooms: number | null;
    land_area: number | null;
    location_en: string;
    location_de: string;
    // Optional fields
    facilities: string[];
    floor: number | null;
    view: string;
    maintenance: string;
    maintenance_type: "text" | "percentage";
    maintenance_percentage: number | null;
    has_pool: boolean;
    date_of_completion: string;
    object_number: string;
    load_factor: string | null;
    cash_discount: number | null;
    status: "shown" | "hidden";
    sold: boolean;
    // Toggles for optional fields
    hasFacilities: boolean;
    hasFloor: boolean;
    hasView: boolean;
    hasMaintenance: boolean;
    hasDateOfCompletion: boolean;
    hasObjectNumber: boolean;
    hasLoadFactor: boolean;
    hasCashDiscount: boolean;
    hasDownPayments: boolean;
}

interface PropertyImage {
    id?: string;
    image_url: string;
    display_order: number;
    file?: File;
    isNew?: boolean;
}

interface DownPaymentOption {
    percentage: number;
    years: number;
}

export default function PropertyForm({ propertyId, onSuccess }: Props) {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;
    const [draggedNewIndex, setDraggedNewIndex] = useState<number | null>(null);

    const [formData, setFormData] = useState<FormData>({
        title_en: "",
        title_de: "",
        description_en: "",
        description_de: "",
        price: null,
        area: null,
        bedrooms: null,
        land_area: null,
        location_en: "",
        location_de: "",
        facilities: [],
        floor: null,
        view: "",
        maintenance: "",
        maintenance_type: "text",
        maintenance_percentage: null,
        has_pool: false,
        date_of_completion: "",
        object_number: "",
        load_factor: null,
        cash_discount: null,
        status: "shown",
        sold: false,
        hasFacilities: false,
        hasFloor: false,
        hasView: false,
        hasMaintenance: false,
        hasDateOfCompletion: false,
        hasObjectNumber: false,
        hasLoadFactor: false,
        hasCashDiscount: false,
        hasDownPayments: false,
    });

    const [downPayments, setDownPayments] = useState<DownPaymentOption[]>([]);

    const [images, setImages] = useState<PropertyImage[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const onDragStart = (index: number) => setDraggedIndex(index);

    const onDragOver = (index: number, e: React.DragEvent) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newImages = [...images];
        const dragged = newImages[draggedIndex];
        newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, dragged);
        setDraggedIndex(index);
        setImages(newImages.map((img, idx) => ({ ...img, display_order: idx })));
    };

    const onDragEnd = () => {
        if (draggedIndex === null) return;
        setDraggedIndex(null);
        saveImageOrder(images);
    };

    const handleNewDragStart = (index: number) => {
        setDraggedNewIndex(index);
    };

    const handleNewDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (draggedNewIndex === null || draggedNewIndex === index) return;

        setNewImages((prev) => {
            const copy = [...prev];
            const draggedItem = copy[draggedNewIndex];
            copy.splice(draggedNewIndex, 1);
            copy.splice(index, 0, draggedItem);
            return copy;
        });

        setDraggedNewIndex(index);
    };

    const handleNewDrop = () => {
        setDraggedNewIndex(null);
    };

    const handleImageUpload = async (propertyIdToUse: string, files: File[]) => {
        if (!files.length) return;

        for (const file of files) {
            const ext = file.name.split(".").pop();
            if (!ext) continue;

            const path = `${propertyIdToUse}/${crypto.randomUUID()}.${ext}`;

            // Upload to bucket
            const { error: uploadError } = await supabase.storage
                .from("properties")
                .upload(path, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                continue;
            }

            // Get public URL
            const { data } = supabase.storage.from("properties").getPublicUrl(path);
            if (!data?.publicUrl) {
                console.error("Failed to get public URL for:", path);
                continue;
            }

            // Insert into property_images table
            const { error: insertError } = await supabase
                .from("property_images")
                .insert({
                    property_id: propertyIdToUse,
                    image_url: data.publicUrl,
                });

            if (insertError) {
                console.error("DB insert error:", insertError);
                continue;
            }

            console.log("Image uploaded and saved:", data.publicUrl);
        }
    };

    /* Load existing property */
    useEffect(() => {
        if (!propertyId) return;

        const fetchProperty = async () => {
            const { data } = await supabase
                .from("properties")
                .select("*")
                .eq("id", propertyId)
                .single();

            if (data) {
                setFormData({
                    title_en: data.title_en || "",
                    title_de: data.title_de || "",
                    description_en: data.description_en || "",
                    description_de: data.description_de || "",
                    price: data.price || null,
                    area: data.area || null,
                    bedrooms: data.bedrooms || null,
                    land_area: data.land_area || null,
                    location_en: data.location_en || "",
                    location_de: data.location_de || "",
                    facilities: Array.isArray(data.facilities) ? data.facilities : [],
                    floor: data.floor || null,
                    view: data.view || "",
                    maintenance: data.maintenance || "",
                    maintenance_type: data.maintenance_type || "text",
                    maintenance_percentage: data.maintenance_percentage || null,
                    date_of_completion: data.date_of_completion || "",
                    object_number: data.object_number || "",
                    load_factor: data.load_factor || null,
                    cash_discount: data.cash_discount || null,
                    status: data.status || "shown",
                    sold: data.sold || false,
                    hasFacilities: Array.isArray(data.facilities) && data.facilities.length > 0,
                    hasFloor: data.floor !== null,
                    hasView: !!data.view,
                    hasMaintenance: !!data.maintenance || (data.maintenance_type === "percentage" && data.maintenance_percentage !== null),
                    hasDateOfCompletion: !!data.date_of_completion,
                    has_pool: data.has_pool || false,
                    hasObjectNumber: !!data.object_number,
                    hasLoadFactor: data.load_factor !== null,
                    hasCashDiscount: data.cash_discount !== null,
                    hasDownPayments: Array.isArray(data.down_payments) && data.down_payments.length > 0,
                });

                if (data.down_payments && Array.isArray(data.down_payments)) {
                    setDownPayments(data.down_payments);
                }
            }

            // Fetch existing images
            const { data: imgs } = await supabase
                .from("property_images")
                .select("*")
                .eq("property_id", propertyId)
                .order("display_order");

            setImages(imgs || []);
        };

        fetchProperty();
    }, [propertyId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: keyof FormData
    ) => {
        const value =
            e.target.type === "number" ? (e.target.value ? parseInt(e.target.value) : null) : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewImages((prev) => [...prev, ...filesArray]);
        }
    };


    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const deleteExistingImage = async (imageId: string) => {
        try {
            await supabase.from("property_images").delete().eq("id", imageId);
            setImages((prev) => prev.filter((img) => img.id !== imageId));
        } catch (err) {
            console.error("Error deleting image:", err);
        }
    };

    const saveImageOrder = async (updatedImages: PropertyImage[]) => {
        try {
            // Map to { id, display_order } for update
            const updates = updatedImages.map((img) => ({
                id: img.id,
                display_order: img.display_order,
            }));

            // Update each image in Supabase
            for (const u of updates) {
                if (!u.id) continue; // skip new images
                await supabase
                    .from("property_images")
                    .update({ display_order: u.display_order })
                    .eq("id", u.id);
            }

            console.log("Image order saved!");
        } catch (err) {
            console.error("Failed to save image order:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let propertyIdToUse = propertyId;
            // Build the property data to save
            const dataToSave = {
                title_en: formData.title_en,
                title_de: formData.title_de,
                description_en: formData.description_en,
                description_de: formData.description_de,
                price: formData.price,
                area: formData.area,
                bedrooms: formData.bedrooms,
                land_area: formData.land_area,
                location_en: formData.location_en,
                location_de: formData.location_de,
                facilities: formData.hasFacilities ? formData.facilities : null,
                floor: formData.hasFloor ? formData.floor : null,
                view: formData.hasView ? formData.view : null,
                maintenance: formData.hasMaintenance && formData.maintenance_type === "text" ? formData.maintenance : null,
                maintenance_type: formData.hasMaintenance ? formData.maintenance_type : null,
                maintenance_percentage: formData.hasMaintenance && formData.maintenance_type === "percentage" ? formData.maintenance_percentage : null,
                has_pool: formData.has_pool,
                date_of_completion: formData.hasDateOfCompletion ? formData.date_of_completion : null,
                object_number: formData.hasObjectNumber ? formData.object_number : null,
                load_factor: formData.hasLoadFactor ? formData.load_factor : null,
                cash_discount: formData.hasCashDiscount ? formData.cash_discount : null,
                down_payments: formData.hasDownPayments && downPayments.length > 0 ? downPayments : null,
                status: formData.status,
                sold: formData.sold,
            };

            // Create or update property
            if (propertyId) {
                const { error } = await supabase
                    .from("properties")
                    .update(dataToSave)
                    .eq("id", propertyId);
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from("properties")
                    .insert(dataToSave)
                    .select()
                    .single();
                if (error) throw error;
                propertyIdToUse = data.id;
            }

            // After saving the property and getting propertyIdToUse
            if (newImages.length > 0 && propertyIdToUse) {
                await handleImageUpload(propertyIdToUse, newImages);
                setNewImages([]); // Clear local state
            }


            // Notify success
            if (onSuccess && propertyIdToUse) onSuccess(propertyIdToUse);
        } catch (err) {
            console.error("Error saving property:", err);
            alert("Failed to save property. Check console for details.");
        } finally {
            setLoading(false);
            setUploading(false);
        }

        if (images.length > 0) {
            await saveImageOrder(images);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Basic Info Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === "en" ? "Basic Information" : "Grundinformationen"}
                </h3>

                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                    {["en", "de"].map((lang) => (
                        <div key={lang}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {language === "en" ? `Title (${lang.toUpperCase()})` : `Titel (${lang.toUpperCase()})`}
                            </label>
                            <input
                                type="text"
                                value={formData[`title_${lang}` as keyof FormData] as string}
                                onChange={(e) => handleChange(e, `title_${lang}` as keyof FormData)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={`Title in ${lang.toUpperCase()}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Locations - Arabic commented out */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                    {["en", "de"].map((lang) => (
                        <div key={lang}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {language === "en" ? `Location (${lang.toUpperCase()})` : `Standort (${lang.toUpperCase()})`}
                            </label>
                            <input
                                type="text"
                                value={formData[`location_${lang}` as keyof FormData] as string}
                                onChange={(e) => handleChange(e, `location_${lang}` as keyof FormData)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={`Location in ${lang.toUpperCase()}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Descriptions - Arabic commented out */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                    {["en", "de"].map((lang) => (
                        <div key={lang}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {language === "en" ? `Description (${lang.toUpperCase()})` : `Beschreibung (${lang.toUpperCase()})`}
                            </label>
                            <textarea
                                value={formData[`description_${lang}` as keyof FormData] as string}
                                onChange={(e) => handleChange(e, `description_${lang}` as keyof FormData)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                placeholder={`Description in ${lang.toUpperCase()}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Property Details Section */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === "en" ? "Property Details" : "Grundstücksdetails"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === "en" ? "Price (EUR)" : "Preis (EUR)"}
                        </label>
                        <input
                            type="number"
                            value={formData.price || ""}
                            onChange={(e) => handleChange(e, "price")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === "en" ? "Area (m²)" : "Bereich (m²)"}
                        </label>
                        <input
                            type="number"
                            value={formData.area || ""}
                            onChange={(e) => handleChange(e, "area")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === "en" ? "Land Area (m²)" : "Grundstück (m²)"}
                        </label>
                        <input
                            type="number"
                            value={formData.land_area || ""}
                            onChange={(e) => handleChange(e, "land_area")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === "en" ? "Bedrooms" : "Schlafzimmer"}
                        </label>
                        <input
                            type="number"
                            value={formData.bedrooms || ""}
                            onChange={(e) => handleChange(e, "bedrooms")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Status and Sold */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === "en" ? "Status" : "Status"}
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "shown" | "hidden" }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="shown">
                                {language === "en" ? "Shown" : "Angezeigt"}
                            </option>
                            <option value="hidden">
                                {language === "en" ? "Hidden" : "Verborgen"}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.sold}
                                onChange={(e) => setFormData(prev => ({ ...prev, sold: e.target.checked }))}
                                className="w-4 h-4 rounded"
                            />
                            <span className="font-medium text-gray-700">
                                {language === "en" ? "Sold" : "Verkauft"}
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Optional Fields Section */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === "en" ? "Optional Fields" : "Optionale Felder"}
                </h3>

                {/* Floor */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasFloor}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasFloor: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Floor" : "Etage"}
                        </span>
                    </label>
                    {formData.hasFloor && (
                        <input
                            type="number"
                            value={formData.floor || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value ? parseInt(e.target.value) : null }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Floor number"
                        />
                    )}
                </div>

                {/* View */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasView}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasView: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "View" : "Ausblick"}
                        </span>
                    </label>
                    {formData.hasView && (
                        <input
                            type="text"
                            value={formData.view || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, view: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Sea View, City View"
                        />
                    )}
                </div>

                {/* Maintenance */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasMaintenance}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasMaintenance: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Maintenance" : "Wartungspauschale (einmalig):"}
                        </span>
                    </label>
                    {formData.hasMaintenance && (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {language === "en" ? "Maintenance Type" : "Wartungstyp"}
                                </label>
                                <select
                                    value={formData.maintenance_type}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        maintenance_type: e.target.value as "text" | "percentage",
                                        maintenance: e.target.value === "percentage" ? "" : prev.maintenance,
                                        maintenance_percentage: e.target.value === "text" ? null : prev.maintenance_percentage
                                    }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="text">
                                        {language === "en" ? "Text" : "Text"}
                                    </option>
                                    <option value="percentage">
                                        {language === "en" ? "Percentage of Total Price" : "Prozentsatz des Kaufpreises"}
                                    </option>
                                </select>
                            </div>
                            {formData.maintenance_type === "text" ? (
                                <input
                                    type="text"
                                    value={formData.maintenance || ""}
                                    onChange={(e) => setFormData(prev => ({ ...prev, maintenance: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={language === "en" ? "Maintenance details" : "Wartungsdetails"}
                                />
                            ) : (
                                <input
                                    type="number"
                                    value={formData.maintenance_percentage || ""}
                                    onChange={(e) => setFormData(prev => ({ ...prev, maintenance_percentage: e.target.value ? parseFloat(e.target.value) : null }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={language === "en" ? "Enter percentage (e.g., 5)" : "Prozentsatz eingeben (z.B. 5)"}
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Pool */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.has_pool}
                            onChange={(e) => setFormData(prev => ({ ...prev, has_pool: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Pool" : "Pool"}
                        </span>
                    </label>
                </div>

                {/* Cash Discount */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasCashDiscount}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasCashDiscount: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Cash Discount" : "Bargeld Rabatt"}
                        </span>
                    </label>
                    {formData.hasCashDiscount && (
                        <div className="space-y-2">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={formData.cash_discount || ""}
                                onChange={(e) => setFormData(prev => ({ ...prev, cash_discount: e.target.value ? parseFloat(e.target.value) : null }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter percentage (e.g., 5 for 5%)"
                            />
                            {formData.cash_discount && formData.price && (
                                <p className="text-sm text-gray-600">
                                    {language === "en" ? "Discount amount: " : "Rabattbetrag: "}
                                    €{Math.round((formData.price * formData.cash_discount) / 100).toLocaleString()}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Date of Completion */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasDateOfCompletion}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasDateOfCompletion: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Date of Completion" : "Enddatum"}
                        </span>
                    </label>
                    {formData.hasDateOfCompletion && (
                        <input
                            type="text"
                            value={formData.date_of_completion || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, date_of_completion: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter as Text (e.g., Q4 2025, Mid 2024)"
                        />
                    )}
                </div>

                {/* Object Number */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasObjectNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasObjectNumber: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Object Number" : "Objektnummer"}
                        </span>
                    </label>
                    {formData.hasObjectNumber && (
                        <input
                            type="text"
                            value={formData.object_number || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, object_number: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Object number"
                        />
                    )}
                </div>

                {/* Load Factor */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasLoadFactor}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasLoadFactor: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Load Factor" : "Lastfaktor"}
                        </span>
                    </label>
                    {formData.hasLoadFactor && (
                        <input
                            type="text"
                            value={formData.load_factor || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, load_factor: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Load factor"
                        />
                    )}
                </div>

                {/* Facilities */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasFacilities}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasFacilities: e.target.checked }))}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Facilities" : "Ausstattung"}
                        </span>
                    </label>
                    {formData.hasFacilities && (
                        <div className="space-y-3">
                            {/* Facilities List */}
                            {formData.facilities.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.facilities.map((facility, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                                            <span>{facility}</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        facilities: prev.facilities.filter((_, i) => i !== idx),
                                                    }))
                                                }
                                                className="text-blue-600 hover:text-blue-800 font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Add Facility Input */}
                            <FacilityInput
                                onAdd={(facility) => {
                                    if (facility.trim() && !formData.facilities.includes(facility.trim())) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            facilities: [...prev.facilities, facility.trim()],
                                        }));
                                    }
                                }}
                                language={language}
                            />
                        </div>
                    )}
                </div>

                {/* Down Payment Configuration */}
                <div className="mb-6 p-4 border rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                        <input
                            type="checkbox"
                            checked={formData.hasDownPayments}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, hasDownPayments: e.target.checked }));
                                if (e.target.checked && downPayments.length === 0) {
                                    setDownPayments([
                                        { percentage: 10, years: 2 },
                                        { percentage: 20, years: 3 },
                                        { percentage: 30, years: 4 },
                                    ]);
                                }
                            }}
                            className="w-4 h-4 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            {language === "en" ? "Installment plan" : "Ratenzahlung"}
                        </span>
                    </label>
                    {formData.hasDownPayments && (
                        <div className="space-y-4 mt-3">
                            {downPayments.map((dp, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <label className="text-xs font-medium text-gray-600">Percentage</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={dp.percentage}
                                            onChange={(e) => {
                                                const newDPs = [...downPayments];
                                                newDPs[idx].percentage = parseInt(e.target.value);
                                                setDownPayments(newDPs);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="%"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs font-medium text-gray-600">Years</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={dp.years}
                                            onChange={(e) => {
                                                const newDPs = [...downPayments];
                                                newDPs[idx].years = parseInt(e.target.value);
                                                setDownPayments(newDPs);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="years"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setDownPayments(downPayments.filter((_, i) => i !== idx))}
                                        className="w-full sm:w-auto px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                                    >
                                        {language === "en" ? "Remove" : "Entfernen"}
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setDownPayments([...downPayments, { percentage: 0, years: 1 }])}
                                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition font-medium text-sm sm:text-base"
                            >
                                + {language === "en" ? "Add Down Payment Option" : "Anzahlungsoption hinzufügen"}
                            </button>
                        </div>
                    )}
                </div>
            </div >

            {/* Images Section */}
            < div className="border-t pt-6" >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === "en" ? "Property Images" : "Grundstücksbilder"}
                </h3>

                {/* Existing Images */}
                {
                    images.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                {language === "en" ? "Current Images" : "Aktuelle Bilder"}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <div
                                        key={img.id || idx}
                                        className="relative group cursor-move"
                                        draggable
                                        onDragStart={() => onDragStart(idx)}
                                        onDragOver={(e) => onDragOver(idx, e)}
                                        onDragEnd={onDragEnd}
                                    >
                                        <img src={img.image_url} alt="Property" className="w-full h-32 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => deleteExistingImage(img.id || "")}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-1 rounded text-xs">
                                            #{idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )
                }

                {/* Upload Area */}
                <div className="mb-6">
                    <label
                        htmlFor="images"
                        className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            {language === "en" ? "Click to upload images or drag and drop" : "Klicken Sie zum Hochladen von Bildern oder Drag & Drop"}
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                    </label>
                    <input
                        id="images"
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*"
                        disabled={uploading}
                    />
                </div>

                {/* New Images Preview */}
                {
                    newImages.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                {language === "en" ? "New Images to Upload" : "Neue Bilder zum Hochladen"}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {newImages.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="relative group cursor-move"
                                        draggable
                                        onDragStart={() => handleNewDragStart(idx)}
                                        onDragOver={(e) => handleNewDragOver(e, idx)}
                                        onDragEnd={handleNewDrop}
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(idx)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-1 rounded text-xs">
                                            #{idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )
                }
            </div >

            {/* Submit Button */}
            <div className="fixed top-0 right-0 h-screen flex flex-col justify-center gap-3 p-4 z-50 bg-white dark:bg-neutral-900 shadow-lg border-l border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full px-6 py-2 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                    {language === "en" ? "Cancel" : "Abbrechen"}
                </button>

                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium cursor-pointer flex items-center justify-center gap-2"
                >
                    {loading || uploading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            {uploading ? "Uploading..." : "Saving..."}
                        </>
                    ) : (
                        propertyId ? "Update Property" : "Create Property"
                    )}
                </button>
            </div>
        </form >
    );
}

interface FacilityInputProps {
    onAdd: (facility: string) => void;
    language: string;
}

function FacilityInput({ onAdd, language }: FacilityInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        if (value.trim()) {
            onAdd(value);
            setValue("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === "en" ? "Add a facility (e.g., WiFi, Pool, Gym)" : language === "ar" ? "أضف مرفقاً (مثال: WiFi، حوض السباحة)" : "Einrichtung hinzufügen (z.B. WiFi, Pool, Fitnessstudio)"}
            />
            <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
                {language === "en" ? "Add" : language === "ar" ? "إضافة" : "Hinzufügen"}
            </button>
        </div>
    );
}
