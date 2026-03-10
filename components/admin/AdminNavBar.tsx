"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Home, Menu, X } from "lucide-react";
import { clearAdminToken } from "@/lib/admin/auth";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { AdminNavDropdown } from "@/components/admin/AdminNavDropDown";

export function AdminNavBar() {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        clearAdminToken();
        router.push(`/${locale}/admin/login`);
    };

    // Prevent background scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-card border-b border-border shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center shadow shrink-0">
                            <Link
                                href={`/${locale}/admin/properties`}
                                className="text-primary-foreground font-bold text-lg sm:text-xl"
                            >
                                A
                            </Link>
                        </div>
                        <div className="leading-tight">
                            <h1 className="font-bold text-lg sm:text-2xl md:text-3xl">Admin Portal</h1>
                            <p className="hidden sm:block text-muted-foreground text-xs sm:text-sm md:text-base">
                                Manage Your Properties
                            </p>
                        </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <AdminNavDropdown />

                        <Link
                            href={`/${locale}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition font-medium"
                        >
                            <Home size={20} />
                            <span className="hidden lg:inline">Redirect to website</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition font-semibold"
                        >
                            <LogOut size={20} />
                            <span className="hidden lg:inline">Logout</span>
                        </button>
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition"
                        aria-label="Open admin menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-60 md:hidden">
                    {/* Solid overlay */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm bg-background text-foreground shadow-2xl p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-xl">Admin Menu</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 rounded-lg hover:bg-muted transition"
                                aria-label="Close admin menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <AdminNavDropdown />

                        <Link
                            href={`/${locale}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-muted transition font-medium"
                        >
                            <Home size={18} />
                            Redirect to website
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="mt-auto flex items-center gap-2 px-3 py-3 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition font-semibold"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>

                        <div className="pt-4 border-t border-border">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
