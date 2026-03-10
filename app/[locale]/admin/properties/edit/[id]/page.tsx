import EditPropertyPage from "@/components/admin/EditPropertyPage";

interface PageProps {
    params: Promise<{ locale: string; id: string }>;
}

// THIS IS SERVER COMPONENT — do NOT add "use client"
export default async function Page({ params }: PageProps) {
    // In Next.js 16, params is a Promise that must be awaited
    const { locale, id } = await params;

    return <EditPropertyPage propertyId={id} locale={locale} />;
}
