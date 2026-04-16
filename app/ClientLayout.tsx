"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import RouteSkeleton from "@/components/ui/RouteSkeleton";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const { language, setLanguage } = useLanguageStore();
    const pathname = usePathname();

    useEffect(() => {
        // Rehydrate store on mount
        if (typeof window !== "undefined") {
            useLanguageStore.persist.rehydrate();
        }

        // Extract locale from URL path and sync with store
        const localeMatch = pathname?.match(/^\/(en|de)/);
        const urlLocale = (localeMatch?.[1] as "en" | "de") || "de";

        // If URL locale differs from store, update store
        if (urlLocale !== language) {
            setLanguage(urlLocale);
        }

        const root = document.documentElement;
        root.lang = urlLocale;
        root.dir = "ltr";

        setMounted(true);
    }, [pathname, language, setLanguage]);

    const isAdmin = pathname?.includes("/admin");
    const isHome =
        pathname === `/${language}` ||
        pathname === `/${language}/`;

    // Skip navbar/footer for admin pages
    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Show skeleton on specific pages only (doesn't block content) */}
            <RouteSkeleton
                duration={500}
            />

            {/* Always render content */}
            <>
                <Navbar isTransparent={isHome} />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </>
        </>
    );
}
