"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const serviceData: Service[] = [
      {
        id: "photography",
        title: "Professionelle Fotografie",
        description:
          "Hochwertige Fotos rücken Ihre Immobilie ins beste Licht. Mit optimaler Perspektive, Lichtführung und Detailgenauigkeit zeigen wir jedes Objekt von seiner stärksten Seite und steigern so das Interesse potenzieller Käufer",
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
          "Laut einer US Amerikanischen Studie wurden Staged Homes 73% schneller verkauft als ungestaltete Immobilien und erzielten in  85% der Fälle höhere Verkaufspreise, Durch gezieltes Einrichten und Dekorieren scha en wir eine einladende Atmosphäre, die das volle Potenzial Ihrer Immobilie hervorhebt und Kaufinteresse weckt ",
        details: [
          "Professionelle Möblierung & Accessoires",
          "Optimale Raumaufteilung & Farbgebung",
          "Dekoration passend zur Zielgruppe",
        ],
        image: "/services/2.png",      },
      {
        id: "3d-visualization",
        title: "3D Visualisierung",
        description:
          "Mit unseren 3D-Visualisierungen erleben Interessenten Ihre Immobilie virtuell wie in echt. Räume wirken greifbar, Einrichtungsideen werden sichtbar und Käufer können sich ihr zukünftiges Zuhause bereits digital vorstellen – ein starker Vorteil. ",
        details: [
          "Exakte Architektur- und Innenraumdarstellungen",
          "Möblierungsvarianten & Materialwahl",
          "Begehbare 3D-Rundgänge",
        ],
        image: "/services/3.jpeg",      },
      {
        id: "drone-photography",
        title: "Drohnenaufnahmen",
        description:
          "Mit professionellen Drohnenaufnahmen präsentieren wir Ihre Immobilie und das gesamte Grundstück aus beeindruckenden Perspektiven. Luftaufnahmen zeigen die Umgebung, Nachbarschaft und Besonderheiten Ihres Objekts auf einen Blick und sorgen für einen bleibenden ersten Eindruck. ",
        details: [
          "Luftaufnahmen & Videos",
          "Umgebungs- & Grundstücksperspektiven",
          "Highlight spezieller Merkmale aus der Luft",
        ],
        image: "/services/4.jpg",      },
      {
        id: "market-analysis",
        title: "Marktwertanalyse",
        description:
          "Eine Software, die den Verkaufspreis berechnet, nutzen wir nicht. Stattdessen setzen wir auf Erfahrung: Wir haben ein Auge für alle großen und kleinen Merkmale Ihrer Immobilie – auch die, die sich nicht in Zahlen fassen lassen – und ermitteln gemeinsam mit Ihnen einen optimalen, marktkonformen und fundierten Verkaufspreis. ",
        details: [
          "Analyse vergleichbarer Objekte",
          "Berücksichtigung individueller Merkmale",
          "Beratung zur Preispositionierung",
        ],
        image: "/services/5.jpg",      },
      {
        id: "virtual-staging",
        title: "Virtuelles Staging",
        description:
          "Mit modernster Software inszenieren wir Ihre Immobilie digital auf höchstem Niveau. Besonders bei Objekten, bei denen ein herkömmliches Home Staging aus Platzmangel, laufendem Betrieb oder anderen Gründen nicht möglich ist, zeigt virtuelles Staging Räume optimal eingerichtet, vermittelt potenziellen Käufern ein realistisches Wohngefühl und Lust, Ihre Immobilie gleich näher kennenlernen zu wollen. ",
        details: [
          "Digitale Möblierung & Dekoration",
          "Mehrere Stilvarianten & Szenarien",
          "Realistische Licht- & Schatteneffekte",
        ],
        image: "/services/6.jpg",      },
    ];

    setServices(serviceData);
    setLoading(false);
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
    <div className="w-full flex flex-col">
      {/* Hero / Header */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center overflow-hidden mb-16">
        <Image
          src="/headers-bg.jpg"
          alt="Unsere Dienstleistungen"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Unsere Dienstleistungen
          </h1>
          {/* Quote Block */}
          <blockquote className="text-2xl md:text-3xl italic font-light leading-relaxed drop-shadow-md text-center mb-6">
            „Marketing ist zu wichtig, um es nur der Marketingabteilung zu überlassen.“ 
            <footer className="mt-4 text-lg md:text-xl not-italic font-semibold">
              – David Packard 
            </footer>
          </blockquote>

          {/* Separator */}
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

          {/* Follow-up Text */}
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-md text-center">
          Unsere Leistungen für einen starken Auftritt ihrer Immobilie:   
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-16">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-96">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 p-10 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {service.title}
              </h2>
              <p className="text-gray-700 text-lg mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 justify-center md:justify-start text-gray-600"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
