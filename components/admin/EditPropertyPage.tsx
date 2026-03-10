"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/db/supabase";
import PropertyForm from "@/components/admin/PropertyForm";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
    propertyId: string;
    locale: string;
}

export default function EditPropertyPage({ propertyId, locale }: Props) {
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            const { data } = await supabase
                .from("properties")
                .select("*")
                .eq("id", propertyId)
                .single();

            setProperty(data);
            setLoading(false);
        };

        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">
                        {language === "en" ? "Loading..." : "Wird geladen..."}
                    </p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-600 mb-4">
                    {language === "en" ? "Property not found" : "Grundstück nicht gefunden"}
                </p>
                <Link
                    href={`/${locale}/admin/properties`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <ArrowLeft size={18} />
                    {language === "en" ? "Back to Properties" : "Zurück zu den Grundstücken"}
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Link
                    href={`/${locale}/admin/properties`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {language === "en" ? "Edit Property" : "Grundstück bearbeiten"}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">{property.title_en || "Untitled Property"}</p>
                </div>
            </div>

            {/* Form */}
            <PropertyForm
                propertyId={property.id}
                onSuccess={() => {
                    router.push(`/${locale}/admin/properties`);
                }}
            />
        </div>
    );
}
