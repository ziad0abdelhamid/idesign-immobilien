"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface RouteSkeletonProps {
    duration?: number;
}

export default function RouteSkeleton({ duration = 600 }: RouteSkeletonProps) {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    // Lock body scroll when skeleton is visible
    useEffect(() => {
        const shouldShow = /^\/(en|ar|de)\/(properties|contact)(\/)?$/.test(pathname);
        if (!shouldShow) return;

        setVisible(true);
        // Lock scrolling
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = ""; // restore scroll
        }, duration);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, [pathname, duration]);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-999999 bg-white"
            onTouchMove={(e) => e.preventDefault()}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 pointer-events-none">

                {/* Hero Skeleton */}
                <div className="h-90 w-full rounded-3xl skeleton-shimmer" />

                {/* Filters Skeleton */}
                <div className="space-y-3">
                    <div className="h-4 w-40 rounded skeleton-shimmer" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-12 rounded-xl skeleton-shimmer" />
                        ))}
                    </div>
                </div>

                {/* Cards Skeleton */}
                <div className="space-y-4">
                    <div className="h-5 w-48 rounded skeleton-shimmer" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-neutral-200 bg-white p-4 space-y-4 shadow-sm"
                            >
                                <div className="h-48 rounded-xl skeleton-shimmer" />
                                <div className="space-y-2">
                                    <div className="h-5 w-5/6 rounded skeleton-shimmer" />
                                    <div className="h-4 w-2/3 rounded skeleton-shimmer opacity-60" />
                                </div>
                                <div className="h-6 w-1/3 rounded skeleton-shimmer" />
                                <div className="grid grid-cols-2 gap-3">
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <div key={j} className="h-10 rounded-lg skeleton-shimmer opacity-70" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}