"use client";

import PropertyForm from "@/components/admin/PropertyForm";
import { useRouter, useParams } from "next/navigation";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;

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
                        {language === "en" ? "Create New Property" : "Neues Grundstück erstellen"}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        {language === "en" ? "Add a new property to your portfolio" : "Fügen Sie ein neues Grundstück zu Ihrem Portfolio hinzu"}
                    </p>
                </div>
            </div>

            {/* Form */}
            <PropertyForm
                onSuccess={() => {
                    router.push(`/${locale}/admin/properties`);
                }}
            />
        </div>
    );
}
