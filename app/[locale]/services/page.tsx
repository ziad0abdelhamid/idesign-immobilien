"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";

interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    image2: string;
}

export default function PremiumServicesDE() {
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const serviceData: Service[] = [
            {
                id: "photography",
                title: t.servicesPage.photography,
                description: t.servicesPage.photographyDesc,
                image: "/services/1.jpg",
                image2: "/services/2.png",
            },
            {
                id: "drone-photography",
                title: t.servicesPage.drones,
                description: t.servicesPage.dronesDesc,
                image: "/services/2.png",
                image2: "/services/3.jpeg",
            },
            {
                id: "home-staging",
                title: t.servicesPage.staging,
                description: t.servicesPage.stagingDesc,
                image: "/services/3.jpg",
                image2: "/services/4.jpg",
            },
            {
                id: "market-analysis",
                title: t.servicesPage.marketAnalysis,
                description: t.servicesPage.marketAnalysisDesc,
                image: "/services/4.jpg",
                image2: "/services/4.jpg",
            },
            {
                id: "virtual-staging",
                title: t.servicesPage.virtualStaging,
                description: t.servicesPage.virtualStagingDesc,
                image: "/services/5.jpg",
                image2: "/services/5.jpg",
            },
            {
                id: "3d-visualization",
                title: t.servicesPage.visualization3D,
                description: t.servicesPage.visualization3DDesc,
                image: "/services/6.jpg",
                image2: "/services/6.jpg",
            },
        ];

        setServices(serviceData);
        setLoading(false);
    }, [t]);
    "Die Ermittlung des richtigen Verkaufspreises ist eines der wichtigsten Entscheidung rund um den Verkauf. Wir verlassen uns nicht nur auf die Kaufvertragsinformationen der letzten Verkäufe - stattdessen setzen wir ebenfalls auf unsere Erfahrung und das Gespräch mit dem Eigentümer um den perfekten Preis zu ermitteln.",
        image: "/services/4.jpg",
            image2: "/services/4.jpg",
            },
{
    id: "virtual-staging",
        title: "Virtuelles Staging",
            description:
    "Mit modernster Software inszenieren wir Ihre Immobilie digital auf höchstem Niveau. Besonders geeignet für Objekte, bei denen herkömmliches Home Staging nicht möglich ist.",
        image: "/services/5.jpg",
            image2: "/services/5.jpg",
            },
{
    id: "3d-visualization",
        title: "3D Visualisierung",
            description:
    "Mit unseren 3D-Visualisierungen erleben Interessenten Ihre Immobilie virtuell wie in echt. Räume wirken greifbar, Einrichtungsideen werden sichtbar und Käufer können sich ihr zukünftiges Zuhause bereits digital vorstellen – ein starker Vorteil.",
        image: "/services/6.jpg",
            image2: "/services/6.jpg",
            },
        ];

setServices(serviceData);
setLoading(false);
    }, []);

// ✅ Mobile autoplay fix + fade-in trigger
useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
        try {
            await video.play();
            setVideoLoaded(true);
        } catch {
            console.warn("Autoplay blocked, using fallback poster.");
        }
    };

    // Fade in once video can play
    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", handleCanPlay);

    playVideo();

    return () => {
        video.removeEventListener("canplay", handleCanPlay);
    };
}, []);

if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
}

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
};

return (
    <main className="w-full overflow-x-hidden snap-y snap-mandatory scroll-smooth text-gray-800 font-sans">
        {/* Hero Section */}
        <section className="relative w-full min-h-dvh flex flex-col items-center justify-center text-center overflow-hidden snap-start px-4 sm:px-6">
            {/* ✅ Smooth fade-in video */}
            <video
                className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105"
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 text-white max-w-3xl sm:max-w-4xl px-4 py-16 sm:py-20 md:py-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
                    {t.servicesPage.title}
                </h1>

                <blockquote className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed drop-shadow-md text-center mb-6 px-2">
                    „{t.servicesPage.quote}"
                    <footer className="mt-4 text-base sm:text-lg md:text-xl not-italic font-semibold">
                        – {t.servicesPage.quoteAuthor}
                    </footer>
                </blockquote>

                <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md text-center px-4">
                    {t.servicesPage.subtitle}
                </p>
            </div>
        </section>

        {/* Services Grid Section */}
        <section className="min-h-dvh snap-start flex flex-col items-center justify-start bg-white overflow-y-auto pt-12 sm:pt-20 pb-16">
            <div className="max-w-7xl mx-auto w-full px-6 grid gap-16">
                {services.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} cardVariant={cardVariant} />
                ))}
            </div>
        </section>
    </main>
);
}

function ServiceCard({ service, index, cardVariant }: { service: Service; index: number; cardVariant: Variants }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
        >
            <div
                className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src={isHovered ? service.image2 : service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-300"
                />
            </div>

            <div className="w-full md:w-1/2 p-10 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    {service.title}
                </h2>
                <p className="text-gray-700 text-lg">
                    {service.description}
                </p>
            </div>
        </motion.div>
    );
}