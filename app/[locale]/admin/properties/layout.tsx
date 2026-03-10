"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { clearAdminToken } from "@/lib/admin/auth";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminNavBar } from "@/components/admin/AdminNavBar";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();

    const handleLogout = () => {
        clearAdminToken();
        router.push(`/${locale}/admin/login`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <AdminNavBar />


            {/* Body */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                {/* Sidebar */}
                <aside className="md:col-span-1 p-6">
                </aside>

                {/* Main Content */}
                <main className="md:col-span-3">
                    <div className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
    return <AdminAuthGuard><AdminLayoutContent>{children}</AdminLayoutContent></AdminAuthGuard>;
}
