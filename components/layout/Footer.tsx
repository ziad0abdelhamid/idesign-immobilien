"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { motion } from "framer-motion";

export function Footer() {
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;

    return (
        <footer className="relative py-12 sm:py-16">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center -z-10"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-white">
                {/* Navigation Links */}
                <div className="flex justify-center items-center gap-6 sm:gap-8 flex-wrap py-8">
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/properties`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.properties}
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/services`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.services}
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/about`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.about}
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/partnership`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.partnership}
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/contact`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.contact}
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/imprint`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.imprint}
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Link href={`/${language}/dataProtection`} className="text-white hover:text-(--primary-gold) transition font-semibold text-sm sm:text-base">
                            {t.nav.dataProtection}
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/20 pt-6 text-center text-xs text-white/70">
                    <p dir="ltr">
                        {language === "en"
                            ? "© 2026 DB ImmoDesign by DB ImmoDesign e.U. All rights reserved."
                            : "© 2026 DB ImmoDesign by DB ImmoDesign e.U. Alle Rechte vorbehalten."}
                    </p>
                </div>
            </div>
        </footer>
    );
}