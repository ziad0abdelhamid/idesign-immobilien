"use client";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";

interface Partner {
    id: string;
    name: string;
    title: string;
    description: string;
    logo: string;
    website?: string;
}

export default function OurPartners() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguageStore();
    const t = translations[language];

    useEffect(() => {
        const data: Partner[] = language === 'de' ?
            [
                {
                    id: "1",
                    name: "DI Maria Matthäus",
                    title: "Expertin für technische Zeichnungen",
                    description:
                        "Maria ist frischgebackene Architektin und unsere Spezialistin für technische Zeichnungen.Sie unterstützt unsere Kunden bei der Erstellung präziser, professioneller Pläne – sei es für Energieausweise oder die optimale Verkaufspräsentation Ihrer Immobilie.Mit ihrem Fachwissen über die aktuellsten Neuerungen im Bauwesen ist sie Ihre verlässliche Begleiterin für alle rechtlichen und technischen Fragen rund um Ihr Projekt.",
                    logo: "/Maria.jpeg",
                },
                {
                    id: "2",
                    name: "Dr. Konstantin Prabitz",
                    title: "Hochwertige Drohnenaufnahmen",
                    description:
                        "Dominik hebt mit seinen sehr anspruchsvollen Aufnahmen Ihre Immobilie auf ein ganz neues Level. Er schafft beeindruckende Luftbilder und sogar Indoor-Drohnenaufnahmen.",
                    logo: "/Konstantin.jpg",
                    website: "https://oesterreich.wtf",
                },
                {
                    id: "3",
                    name: "Thomas Lippitz",
                    title: "Ihr Ansprechpartner für Finanzierung & Immobilieninvestitionen",
                    description:
                        "Wenn es um Immobilienfinanzierung geht, sorgt Thomas für Klarheit, Struktur und maßgeschneiderte Lösungen.",
                    logo: "/Thomas.jpeg",
                    website: "https://www.clever-finanziert.at/lippitz-thomas/",
                },
                {
                    id: "4",
                    name: "Anna Starhemberg",
                    title: "Professionelle Immobilienfotografie mit Immo Capture",
                    description:
                        "Ob Altbau, Neubau oder Gewerbeobjekt – Anna sorgt für aussagekräftige Aufnahmen, die Eindruck hinterlassen.",
                    logo: "/Anna.jpg",
                    website: "https://immocapture.at/kontakt/",
                },
                {
                    id: "5",
                    name: "DI Mark Ekladious",
                    title: "Experte für 3D-Renderings",
                    description:
                        "Mark ist unser Spezialist für 3D-Renderings und erstellt für unsere Kunden professionelle 3D-Visualisierungen.",
                    logo: "/Mark.jpg",
                    website: "https://h-ev.net/",
                },
            ] : [
                {
                    id: "1",
                    name: "DI Maria Matthäus",
                    title: "Architecture & Technical Design",
                    description:
                        "Maria combines architectural vision with technical precision. As our specialist for technical drawings, she provides our clients with the professional documentation necessary for a successful sale - fromdetailed floor plans to energy performance certificates. With an expert eye on the latest building regulations and technical standards, Maria ensures your project is both legally sound and perfectly presented.",
                    logo: "/Maria.jpeg",
                },
                {
                    id: "2",
                    name: "Dr. Konstantin Prabitz",
                    title: "Premium Drone Imagery ",
                    description:
                        "Konstantin elevates property marketing to new heights. His sophisticated aerial photography and specialized indoor drone tours provide breathtaking perspectives, capturing the full scale and unique character of every home from angles that were once impossible to reach. ",
                    logo: "/Konstantin.jpg",
                    website: "https://oesterreich.wtf",
                },
                {
                    id: "3",
                    name: "Thomas Lippitz",
                    title: "Finance & Investment Strategy ",
                    description:
                        "Thomas is your expert for navigating the complexities of real estate financing. He brings clarity and structure to every transaction, delivering bespoke financial solutions designed to secure your investment and maximize your long- term success. ",
                    logo: "/Thomas.jpeg",
                    website: "https://www.clever-finanziert.at/lippitz-thomas/",
                },
                {
                    id: "4",
                    name: "Anna Starhemberg",
                    title: "Professional Photography | Immo Capture ",
                    description:
                        "From historic architecture to modern commercial spaces, Anna’s photography is about more than just pictures—it’s about impact. She captures the essence of a property, creating compelling visual stories that leave a lasting impression on potential buyers.",
                    logo: "/Anna.jpg",
                    website: "https://immocapture.at/kontakt/",
                },
                {
                    id: "5",
                    name: "DI Mark Ekladious",
                    title: "3D Visualization Specialist",
                    description:
                        "Mark transforms blueprints into reality. As our 3D rendering expert, he creates hyperrealistic visualizations that allow clients to experience a property before it is even built,making him an essential asset for modern property marketing.",
                    logo: "/Mark.jpg",
                    website: "https://h-ev.net/",
                },
            ];

        setPartners(data);
        setLoading(false);
    }, [language]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );

    const cardVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        },
    };

    return (
        <main className="w-full snap-y snap-mandatory overflow-y-auto">

            {/* Section 1 */}
            <section
                className="
      relative w-full min-h-dvh
      flex items-center justify-center text-center overflow-hidden snap-start
      px-4 sm:px-6
    "
            >
                <video
                    className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105"
                    src="/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-3xl sm:max-w-4xl text-white py-16 sm:py-20 md:py-0">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 drop-shadow-lg leading-tight">
                        {t.partnershipPage.title}
                    </h1>

                    <blockquote className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed drop-shadow-md text-center mb-6 px-2">
                        {t.partnershipPage.heroQuote}
                        <footer className="mt-4 text-base sm:text-lg md:text-xl not-italic font-semibold">
                            – {t.partnershipPage.heroQuoteAuthor}
                        </footer>
                    </blockquote>

                    <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

                    <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md text-center px-4">
                        {t.partnershipPage.heroDesc}
                    </p>
                </div>
            </section>

            {/* Section 2 */}
            <section
                className="
      min-h-dvh snap-start flex flex-col items-center justify-start
      bg-white overflow-y-auto pt-12 sm:pt-20 pb-16
    "
            >
                <div className="max-w-7xl mx-auto w-full px-6 grid gap-12">
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.id}
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden shadow-lg"
                        >
                            {/* Logo */}
                            <div className="relative w-full md:w-1/3 flex items-center justify-center bg-white p-6">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={400}
                                    height={400}
                                    className="object-contain rounded-xl"
                                />
                            </div>

                            {/* Info */}
                            <div className="w-full md:w-2/3 p-8 text-center md:text-left">
                                <h2 className="text-3xl font-bold mb-2 text-gray-900">{partner.name}</h2>
                                <p className="text-lg text-gray-500 mb-4">{partner.title}</p>
                                <p className="text-gray-700 text-lg mb-6">{partner.description}</p>
                                {partner.website && (
                                    <a
                                        href={partner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                    >
                                        <FaGlobe /> {language === "en" ? "Visit Website" : "Webseite besuchen"}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>

    );
}