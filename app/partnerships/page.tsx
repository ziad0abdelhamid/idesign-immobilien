"use client";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

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

  useEffect(() => {
    const data: Partner[] = [
      {
        id: "1",
        name: "Maria Matthäus",
        title: "Expertin für technische Zeichnungen",
        description:
          "Maria ist angehende Architektin und unsere Spezialistin für technische Zeichnungen. Sie unterstützt unsere Kunden bei der Erstellung präziser, professioneller Pläne – sei es für Energieausweise oder die optimale Verkaufspräsentation Ihrer Immobilie. Ihre technische Kompetenz und ihr Gespür für architektonische Details haben schon manches Immobilienprojekt zum Erfolg geführt.",
        logo: "/Maria.jpeg",
      },
      {
        id: "2",
        name: "Dr. Konstantin Prabitz",
        title: "Hochwertige Drohnenaufnahmen",
        description:
          "Dominik hebt mit seinen sehr anspruchsvollen Aufnahmen Ihre Immobilie auf ein ganz neues Level. Er schafft beeindruckende Luftbilder und sogar Indoor-Drohnenaufnahmen, die Ihre Immobilie aus einzigartigen Perspektiven zeigen. Für Immobilien, die mehr als Standard verlangen.",
        logo: "/Konstantin.jpg",
        website: "https://oesterreich.wtf",
      },
      {
        id: "3",
        name: "Thomas Lippitz",
        title: "Ihr Ansprechpartner für Finanzierung & Immobilieninvestitionen",
        description:
          "Wenn es um Immobilienfinanzierung geht, sorgt Thomas für Klarheit, Struktur und maßgeschneiderte Lösungen. Er denkt mit, rechnet vor und begleitet zuverlässig bis zur idealen Finanzierungslösung.",
        logo: "/Thomas.jpeg",
        website: "https://www.clever-finanziert.at/lippitz-thomas/",
      },
      {
        id: "4",
        name: "Anna Starhemberg",
        title: "Professionelle Immobilienfotografie mit Immo Capture",
        description:
          "Ob Altbau, Neubau oder Gewerbeobjekt – Anna sorgt mit ihrem geschulten Blick und modernster Technik für aussagekräftige Aufnahmen, die Eindruck hinterlassen. Mit Immo Capture fotografieren sie Immobilien so, wie sie wirklich wirken sollen: ansprechend, hochwertig und authentisch.",
        logo: "/Anna.jpg",
        website: "https://immocapture.at/kontakt/",
      },
      {
        id: "5",
        name: "DI Mark Ekladious",
        title: "Experte für 3D-Renderings",
        description:
          "Mark ist unser Spezialist für 3D-Renderings und erstellt für unsere Kunden professionelle 3D-Visualisierungen, die Ihre Immobilien perfekt in Szene setzen. Seine Arbeit hilft dabei, Ihr Projekt eindrucksvoll und realistisch darzustellen. Gerade im Neubausektor ist seine Arbeit unverzichtbar.",
        logo: "/Mark.jpg",
        website: "https://h-ev.net/",
      },
    ];

    setPartners(data);
    setLoading(false);
  }, []);

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
    <div className="w-full flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero-meow.jpg"
          alt="Immobilien Dienstleistungen"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Unsere Partner
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md">
            Wir arbeiten stolz mit führenden Unternehmen zusammen, die unsere
            Werte für Innovation, Qualität und Kundenerfolg teilen.
          </p>
        </div>
      </section>

      {/* Partner Cards */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 grid gap-12">
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden duration-300"
          >
            {/* Logo */}
            <div className="relative w-full md:w-1/3 flex items-center justify-center bg-white p-6">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={1080}
                height={920}
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="w-full md:w-2/3 p-8 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">
                {partner.name}
              </h2>
              <p className="text-lg text-gray-500 mb-4">{partner.title}</p>
              <p className="text-gray-700 text-lg mb-6">
                {partner.description}
              </p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  <FaGlobe /> Website besuchen
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
