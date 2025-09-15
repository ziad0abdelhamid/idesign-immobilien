"use client";
import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PremiumHomePageDE() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleExpand = (index: number) =>
    setExpandedIndex(expandedIndex === index ? null : index);

  const sectionVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const services = [
    {
      title: "Immobilienverkauf & Vermietung",
      description: "Kauf, Verkauf und Vermietung von Immobilien.",
      fullDescription:
        "Wir unterstützen Sie beim Kauf, Verkauf und der Vermietung von Wohn- und Gewerbeimmobilien. Unser Service umfasst umfassende Beratung, Vertragsabwicklung und Marketingstrategien, um den besten Preis und reibungslose Abläufe zu garantieren.",
    },
    {
      title: "Marktanalyse",
      description: "Einblicke in Markttrends und Immobilienwerte.",
      fullDescription:
        "Wir liefern detaillierte Marktanalysen, um aktuelle Trends, Preisschwankungen und Investmentpotenziale zu erkennen. So treffen unsere Kunden fundierte Entscheidungen bei jedem Immobiliengeschäft.",
    },
    {
      title: "Investitionsberatung",
      description: "Beratung zu profitablen Investitionsmöglichkeiten.",
      fullDescription:
        "Unsere Experten bieten strategische Beratung für Immobilieninvestitionen, einschließlich Renditeberechnung, Standortbewertung und Portfoliooptimierung, um langfristig profitable Entscheidungen zu treffen.",
    },
    {
      title: "Immobilienverwaltung",
      description: "Verwaltung von Immobilien für optimale Leistung.",
      fullDescription:
        "Wir kümmern uns um die komplette Verwaltung Ihrer Immobilien – von Mieteinnahmen über Instandhaltung bis hin zu rechtlichen Aspekten – um maximale Rendite und minimale Belastung für Eigentümer zu gewährleisten.",
    },
  ];


  return (
    <div className="relative w-full">
      {/* Hero + Dienstleistungen Wrapper */}
      <div className="relative w-full">
        {/* Hero Background Image */}
        <div className="absolute inset-0 -z-10">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-600 to-white opacity-40"></div>
        </div>
        {/* Hero Section */}
        <section className="relative h-[30vh] w-full flex items-center justify-center text-center">
          <div className="relative z-10 px-4 text-white">
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
              Über Unser Immobilienunternehmen
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md">
              Premium-Immobilien und Dienstleistungen für Käufer, Verkäufer und Investoren
            </p>
          </div>
        </section>

        {/* Dienstleistungen Section (transparent, on hero-bg) */}
        <motion.section
          className="py-20"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-12">Unsere Dienstleistungen</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  variants={cardVariant}
                  onClick={() => toggleExpand(index)}
                >
                  <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>

                  <AnimatePresence initial={false}>
                    {expandedIndex === index ? (
                      <motion.p
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-black"
                      >
                        {service.fullDescription}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="collapsed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "3rem" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-black overflow-hidden"
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    className="mt-2 text-blue-900 font-bold select-none"
                  >
                    {expandedIndex === index ? "Weniger anzeigen ▲" : "Mehr anzeigen ▼"}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Über Uns Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-lg"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-4 text-black">Wer Wir Sind</h2>
          <p className="text-black mb-4">
            Wir sind auf hochwertige Wohn- und Gewerbeimmobilien in Alexandria spezialisiert. Unser Team bietet personalisierte Beratung und professionelle Unterstützung für jeden Kunden.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2 text-black">Unsere Mission</h3>
          <ul className="list-disc list-inside text-black space-y-2">
            <li>Maßgeschneiderte Immobilienlösungen</li>
            <li>Fachkundige Beratung</li>
            <li>Engagement für Exzellenz</li>
          </ul>
        </div>
        <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg">
          <Image src="/office.jpeg" alt="Büro" fill className="object-cover" />
        </div>
      </motion.section>


      {/* Call to Action */}
      <motion.section
        className="flex justify-center py-20"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <a
          href="/realestate"
          className="px-8 py-4 bg-blue-400 text-white font-semibold rounded-3xl shadow-xl hover:bg-blue-600 hover:scale-105 transition transform"
        >
          Unsere Immobilien Entdecken
        </a>
      </motion.section>

    </div>
  );
}
