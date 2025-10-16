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
          "Maria ist angehende Architektin und unsere Spezialistin für technische Zeichnungen. Sie unterstützt unsere Kunden bei der Erstellung präziser, professioneller Pläne – sei es für Energieausweise oder die optimale Verkaufspräsentation Ihrer Immobilie.",
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
<main className="w-full h-screen snap-y snap-proximity overflow-y-scroll">
  {/* Section 1 */}
  <section
    className="
      relative w-full min-h-[100dvh]
      flex items-center justify-center text-center overflow-hidden snap-start
      px-4 sm:px-6
    "
  >
    <Image
      src="/headers-bg.jpg"
      alt="Immobilien Dienstleistungen"
      fill
      priority
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/60"></div>

    <div className="relative z-10 max-w-3xl sm:max-w-4xl text-white py-16 sm:py-20 md:py-0">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 drop-shadow-lg leading-tight">
        Unsere Partner
      </h1>

      <blockquote className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed drop-shadow-md text-center mb-6 px-2">
        „Große Dinge werden nie von einer Person allein erreicht,
        sie sind das Ergebnis eines Teams.“
        <footer className="mt-4 text-base sm:text-lg md:text-xl not-italic font-semibold">
          – Steve Jobs
        </footer>
      </blockquote>

      <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

      <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md text-center px-4">
        Wir sind stolz darauf, mit einem Netzwerk engagierter Partner
        zusammenzuarbeiten, die mit ihrem Fachwissen jedes Projekt bereichern.
      </p>
    </div>
  </section>

  {/* Section 2 */}
  <section
    className="
      min-h-[100dvh] snap-start flex flex-col items-center justify-start
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
                <FaGlobe /> Website besuchen
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
