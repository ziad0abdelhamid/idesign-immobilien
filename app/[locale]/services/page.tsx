"use client";
import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { translations } from "@/lib/i18n/translations";
import { useLanguageStore } from "@/lib/store";

interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    image2: string;

}

export default function PremiumServicesDE() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { language } = useLanguageStore();
    const t = translations[language]

    useEffect(() => {
        const serviceData: Service[] =
            language === "de" ? [
                {
                    id: "photography",
                    title: "Professionelle Fotografie",
                    description:
                        "Hochwertige Fotos rücken Ihre Immobilie ins beste Licht. Mit optimaler Perspektive, Lichtführung und Detailgenauigkeit zeigen wir jedes Objekt von seiner stärksten Seite und steigern so das Interesse potenzieller Käufer.",
                    image: "/services/Professionelle Fotografie/1.jpg",
                    image2: "/services/Professionelle Fotografie/2.jpg",
                },
                {
                    id: "drone-photography",
                    title: "Drohnenaufnahmen",
                    description:
                        "Mit professionellen Drohnenaufnahmen präsentieren wir Ihre Immobilie und das gesamte Grundstück aus beeindruckenden Perspektiven. Luftaufnahmen zeigen die Umgebung, Nachbarschaft und Besonderheiten Ihres Objekts auf einen Blick. Diesen Service bieten wir kostenlos im Zuge unserer Vermarktung an.",
                    image: "/services/Drohnenaufnahmen/1.jpg",
                    image2: "/services/Drohnenaufnahmen/2.jpg",
                },
                {
                    id: "home-staging",
                    title: "Home Staging",
                    description:
                        "Wir setzen Ihre Immobilie gekonnt in Szene. Durch den gezielten Einsatz von Möbeln, Licht und Dekoration schaffen wir eine Wohlfühlatmosphäre, die die Vorzüge Ihrer Räume hervorhebt. Die Statistik zeigt, Home Staging verkürzt die Verkaufszeit um bis zu 73 % und sorgt in 85 % der Verkäufe für einen deutlich höheren Preis.",
                    image: "/services/Home Staging/1.jpg",
                    image2: "/services/Home Staging/2.jpg",
                },
                {
                    id: "market-analysis",
                    title: "Marktwertanalyse",
                    description:
                        "Die Ermittlung des richtigen Verkaufspreises ist eines der wichtigsten Entscheidung rund um den Verkauf. Wir verlassen uns nicht nur auf die Kaufvertragsinformationen der letzten Verkäufe - stattdessen setzen wir ebenfalls auf unsere Erfahrung und das Gespräch mit dem Eigentümer um den perfekten Preis zu ermitteln.",
                    image: "/services/Marktwertanalyse/2.jpg",
                    image2: "/services/Marktwertanalyse/2.png",
                },
                {
                    id: "virtual-staging",
                    title: "Virtuelles Staging",
                    description:
                        "Mit modernster Software inszenieren wir Ihre Immobilie digital auf höchstem Niveau. Besonders geeignet für Objekte, bei denen herkömmliches Home Staging nicht möglich ist.",
                    image: "/services/Virtuelles Staging/1.jpg",
                    image2: "/services/Virtuelles Staging/2.jpg",
                },
                {
                    id: "3d-visualization",
                    title: "3D Visualisierung",
                    description:
                        "Mit unseren 3D-Visualisierungen erleben Interessenten Ihre Immobilie virtuell wie in echt. Räume wirken greifbar, Einrichtungsideen werden sichtbar und Käufer können sich ihr zukünftiges Zuhause bereits digital vorstellen – ein starker Vorteil.",
                    image: "/services/3D Visualisierung/1.jpg",
                    image2: "/services/3D Visualisierung/2.jpg",
                }] : [
                {
                    id: "photography",
                    title: "Professional Photography",
                    description:
                        "High-quality photography presents your property in the best possible light. Using optimal perspectives, lighting, and attention to detail, we showcase every property’s strongest features to maximize interest from potential buyers. ",
                    image: "/services/Professionelle Fotografie/1.jpg",
                    image2: "/services/Professionelle Fotografie/2.jpg",
                },
                {
                    id: "drone-photography",
                    title: "Drone Photography",
                    description:
                        "With professional drone shots, we present your property and the entire grounds from impressive perspectives.Aerial photography provides an immediate overview of the surroundings, the neighborhood, and the unique features of your object.We oAer this service free of charge as part of our marketing package.",
                    image: "/services/Drohnenaufnahmen/1.jpg",
                    image2: "/services/Drohnenaufnahmen/2.jpg",
                },
                {
                    id: "home-staging",
                    title: "Home Staging",
                    description:
                        "We expertly set the stage for your property. Through the targeted use of furniture, lighting, and decor, we create an inviting atmosphere that highlights the strengths ofyour rooms.Statistics show that Home Staging reduces selling time by up to 73% and achieves a significantly higher price in 85% of sales. ",
                    image: "/services/Home Staging/1.jpg",
                    image2: "/services/Home Staging/2.jpg",
                },
                {
                    id: "market-analysis",
                    title: "Market Value Analysis",
                    description:
                        "Determining the right listing price is one of the most critical steps in the selling process.We look beyond raw transaction data from past sales; we leverage our deep market experience and personal consultations with the owner to pinpoint the perfect price. ",
                    image: "/services/Marktwertanalyse/2.jpg",
                    image2: "/services/Marktwertanalyse/2.png",
                },
                {
                    id: "virtual-staging",
                    title: "Virtual Staging",
                    description:
                        `Virtual Staging Transform empty rooms into inviting living spaces with our high-end digital staging. Ideal for properties where traditional staging isn't an option, our virtual approach helps buyers see the full potential of every room — making the "invisible" visible. `,
                    image: "/services/Virtuelles Staging/1.jpg",
                    image2: "/services/Virtuelles Staging/2.jpg",
                },
                {
                    id: "3d-visualization",
                    title: "3D Visualization",
                    description:
                        "Our 3D visualizations allow prospective buyers to experience your property virtually as if they were there in person.Rooms become tangible, interior design ideas come to life, and buyers can digitally envision their future home—a powerful competitive advantage. ",
                    image: "/services/3D Visualisierung/1.jpg",
                    image2: "/services/3D Visualisierung/2.jpg",
                }
            ];


        setServices(serviceData);
        setLoading(false);
    }, [language]);

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
    }, [language]);

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
                        {t.servicesPage?.title || "Our Premium Services"}
                    </h1>

                    <blockquote className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed drop-shadow-md text-center mb-6 px-2">
                        „{t.servicesPage?.heroQuote || "Marketing is too important to be left to the marketing department."}"
                        <footer className="mt-4 text-base sm:text-lg md:text-xl not-italic font-semibold">
                            – {t.servicesPage?.heroQuoteAuthor || "David Packard"}
                        </footer>
                    </blockquote>

                    <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

                    <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md text-center px-4">
                        {t.servicesPage?.heroDesc || "Our services for a strong presentation of your property:"}
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