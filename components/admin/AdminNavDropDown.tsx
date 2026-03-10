"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown, Building2, Mail } from "lucide-react";

export function AdminNavDropdown() {
    const { locale } = useParams<{ locale: string }>();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface transition font-bold text-black cursor-pointer"
            >
                Admin Menu
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute left-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                    <Link
                        href={`/${locale}/admin/properties`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition text-sm font-medium"
                    >
                        <Building2 className="w-4 h-4" />
                        Properties
                    </Link>

                    <Link
                        href={`/${locale}/admin/contact`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition text-sm font-medium"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Messages
                    </Link>
                </div>
            )}
        </div>
    );
}
