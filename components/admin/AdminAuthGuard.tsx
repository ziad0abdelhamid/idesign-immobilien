"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useParams } from "next/navigation";
import { isAdminLoggedIn, clearAdminToken } from "@/lib/admin/auth";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useParams<{ locale: string }>();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Don't check auth on login page
    const isLoginPage = pathname?.includes("/admin/login");

    useEffect(() => {
        if (isLoginPage) {
            setIsChecking(false);
            return;
        }

        // Check auth status after hydration
        const checkAuth = () => {
            try {
                const authenticated = isAdminLoggedIn();
                if (authenticated) {
                    setIsAuthenticated(true);
                } else {
                    clearAdminToken();
                    router.replace(`/${locale}/admin/login`);
                }
            } catch (error) {
                console.error("Auth check error:", error);
                clearAdminToken();
                router.replace(`/${locale}/admin/login`);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [router, locale, isLoginPage, pathname]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isChecking || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-neutral-200 dark:border-neutral-700 border-t-blue-600 dark:border-t-blue-400 mb-4"></div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                        {isChecking ? "Checking access..." : "Redirecting..."}
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
