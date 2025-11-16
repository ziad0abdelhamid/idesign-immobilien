"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
}

export default function PremiumServicesDE() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const serviceData: Service[] = [
      {
        id: "photography",
        title: "Professionelle Fotografie",
        description:
          "Hochwertige Fotos rücken Ihre Immobilie ins beste Licht. Mit optimaler Perspektive, Lichtführung und Detailgenauigkeit zeigen wir jedes Objekt von seiner stärksten Seite und steigern so das Interesse potenzieller Käufer.",
        details: [
          "Innen- & Außenaufnahmen in hoher Auflösung",
          "HDR, Panorama & Detailaufnahmen",
          "Optimierung und Retusche",
        ],
        image: "/services/1.jpg",
      },
      {
        id: "home-staging",
        title: "Home Staging",
        description:
          "Laut einer US-amerikanischen Studie wurden Staged Homes 73% schneller verkauft und erzielten in 85% der Fälle höhere Verkaufspreise. Durch gezieltes Einrichten und Dekorieren schaffen wir eine einladende Atmosphäre, die das volle Potenzial Ihrer Immobilie hervorhebt.",
        details: [
          "Professionelle Möblierung & Accessoires",
          "Optimale Raumaufteilung & Farbgebung",
          "Dekoration passend zur Zielgruppe",
        ],
        image: "/services/2.png",
      },
      {
        id: "3d-visualization",
        title: "3D Visualisierung",
        description:
          "Mit unseren 3D-Visualisierungen erleben Interessenten Ihre Immobilie virtuell wie in echt. Räume wirken greifbar, Einrichtungsideen werden sichtbar und Käufer können sich ihr zukünftiges Zuhause bereits digital vorstellen – ein starker Vorteil.",
        details: [
          "Exakte Architektur- und Innenraumdarstellungen",
          "Möblierungsvarianten & Materialwahl",
          "Begehbare 3D-Rundgänge",
        ],
        image: "/services/3.jpeg",
      },
      {
        id: "drone-photography",
        title: "Drohnenaufnahmen",
        description:
          "Mit professionellen Drohnenaufnahmen präsentieren wir Ihre Immobilie und das gesamte Grundstück aus beeindruckenden Perspektiven. Luftaufnahmen zeigen die Umgebung, Nachbarschaft und Besonderheiten Ihres Objekts auf einen Blick.",
        details: [
          "Luftaufnahmen & Videos",
          "Umgebungs- & Grundstücksperspektiven",
          "Highlight spezieller Merkmale aus der Luft",
        ],
        image: "/services/4.jpg",
      },
      {
        id: "market-analysis",
        title: "Marktwertanalyse",
        description:
          "Wir nutzen keine Software, die automatisch den Verkaufspreis berechnet. Stattdessen setzen wir auf Erfahrung und Expertise, um gemeinsam mit Ihnen einen fundierten, marktkonformen Preis zu bestimmen.",
        details: [
          "Analyse vergleichbarer Objekte",
          "Berücksichtigung individueller Merkmale",
          "Beratung zur Preispositionierung",
        ],
        image: "/services/5.jpg",
      },
      {
        id: "virtual-staging",
        title: "Virtuelles Staging",
        description:
          "Mit modernster Software inszenieren wir Ihre Immobilie digital auf höchstem Niveau. Besonders geeignet für Objekte, bei denen herkömmliches Home Staging nicht möglich ist.",
        details: [
          "Digitale Möblierung & Dekoration",
          "Mehrere Stilvarianten & Szenarien",
          "Realistische Licht- & Schatteneffekte",
        ],
        image: "/services/6.jpg",
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
      <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden snap-start px-4 sm:px-6">
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
            Unsere Dienstleistungen
          </h1>

          <blockquote className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed drop-shadow-md text-center mb-6 px-2">
            „Marketing ist zu wichtig, um es nur der Marketingabteilung zu
            überlassen.“
            <footer className="mt-4 text-base sm:text-lg md:text-xl not-italic font-semibold">
              – David Packard
            </footer>
          </blockquote>

          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md text-center px-4">
            Unsere Leistungen für einen starken Auftritt Ihrer Immobilie:
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="min-h-[100dvh] snap-start flex flex-col items-center justify-start bg-white overflow-y-auto pt-12 sm:pt-20 pb-16">
        <div className="max-w-7xl mx-auto w-full px-6 grid gap-16">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative w-full md:w-1/2 h-64 md:h-96">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-10 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 justify-start text-gray-600"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
