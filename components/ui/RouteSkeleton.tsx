"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RouteSkeletonProps {
    duration?: number;
}

export default function RouteSkeleton({ duration = 500 }: RouteSkeletonProps) {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const cards = Array.from({ length: 6 });

    // Lock body scroll when skeleton is visible
    useEffect(() => {
        const shouldShow = /^\/(en|ar|de)\/(properties|contact)(\/)?$/.test(pathname);
        if (!shouldShow) {
            // Ensure scroll is unlocked when leaving these pages
            document.body.style.overflow = "";
            setVisible(false);
            return;
        }

        setVisible(true);

        // Lock scrolling by setting overflow to hidden
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setVisible(false);
            // Unlock scrolling
            document.body.style.overflow = "";
        }, duration);

        return () => {
            clearTimeout(timer);
            // Always unlock on cleanup
            document.body.style.overflow = "";
        };
    }, [pathname, duration]);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 w-full h-full z-99999999 bg-white flex flex-col animate-pulse overflow-hidden"
            style={{ backdropFilter: "blur(4px)" }} // optional: slight blur behind skeleton
        >
            {/* Header Skeleton */}
            <section className="relative py-16 shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-gray-300/70 -z-10 rounded-md"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center space-y-4">
                    <div className="h-10 md:h-12 bg-gray-300 rounded w-1/3 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
            </section>

            {/* Filters + Main Skeleton */}
            <section className="bg-white py-12 flex-1 overflow-hidden">
                <div className="max-w-400 mx-auto flex flex-col lg:flex-row gap-8 p-8">
                    {/* Filters Skeleton */}
                    <div className="hidden lg:block w-1/4 space-y-4">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>

                    {/* Mobile Filters Button Skeleton */}
                    <div className="lg:hidden mb-6 overflow-hidden">
                        <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
                    </div>

                    {/* Property Cards Skeleton */}
                    <main className="w-full lg:w-3/4 xl:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 overflow-hidden">
                        {cards.map((_, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-xl shadow p-4 space-y-4"
                            >
                                <div className="h-40 bg-gray-200 rounded-md w-full"></div>
                                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="flex gap-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </motion.div>
                        ))}
                    </main>
                </div>
            </section>
        </div>
    );
}