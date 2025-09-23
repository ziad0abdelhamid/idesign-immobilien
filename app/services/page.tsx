"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, BarChart3, Briefcase, Home, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function PremiumServicesDE() {
  const services = [
    {
      title: "Immobilienverkauf & Vermietung",
      description:
        "Wir unterstützen Sie beim Kauf, Verkauf und der Vermietung von Wohn- und Gewerbeimmobilien. Unser Service umfasst umfassende Beratung, Vertragsabwicklung und Marketingstrategien, um den besten Preis und reibungslose Abläufe zu garantieren.",
      details: [
        "Individuelle Beratung und Betreuung bei Kauf & Verkauf.",
        "Professionelle Marketingstrategien für Ihre Immobilie.",
        "Reibungslose Vertragsabwicklung und Übergabe.",
      ],
      icon: <Home className="w-8 h-8 text-blue-600" />,
      image: "/images/sale.jpg",
    },
    {
      title: "Marktanalyse",
      description:
        "Wir liefern detaillierte Marktanalysen, um aktuelle Trends, Preisschwankungen und Investmentpotenziale zu erkennen. So treffen unsere Kunden fundierte Entscheidungen bei jedem Immobiliengeschäft.",
      details: [
        "Detaillierte Preisanalyse von Wohn- und Gewerbeimmobilien.",
        "Trendanalyse und Prognosen für Investitionsentscheidungen.",
        "Individuelle Beratung für Ihre Investitionsstrategie.",
      ],
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      image: "/images/market-analysis.jpg",
    },
    {
      title: "Investitionsberatung",
      description:
        "Unsere Experten bieten strategische Beratung für Immobilieninvestitionen, einschließlich Renditeberechnung, Standortbewertung und Portfoliooptimierung, um langfristig profitable Entscheidungen zu treffen.",
      details: [
        "Analyse von Renditepotenzialen und Risiken.",
        "Standortbewertung und Marktchancen.",
        "Strategische Optimierung Ihres Immobilien-Portfolios.",
      ],
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      image: "/images/investment.jpg",
    },
    {
      title: "Immobilienverwaltung",
      description:
        "Wir kümmern uns um die komplette Verwaltung Ihrer Immobilien – von Mieteinnahmen über Instandhaltung bis hin zu rechtlichen Aspekten – um maximale Rendite und minimale Belastung für Eigentümer zu gewährleisten.",
      details: [
        "Vollständige Verwaltung Ihrer Immobilien.",
        "Mietmanagement, Instandhaltung und Reporting.",
        "Rechtliche Betreuung und Sicherheit für Eigentümer.",
      ],
      icon: <Building2 className="w-8 h-8 text-pink-600" />,
      image: "/images/property-management.jpg",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle swipe on mobile
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50 && selectedIndex < services.length - 1) {
      setSelectedIndex(selectedIndex + 1); // swipe left → next
    }
    if (info.offset.x > 50 && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1); // swipe right → previous
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center max-w-3xl px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            Unsere Dienstleistungen
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-md">
            Wählen Sie eine Dienstleistung aus, um Details zu sehen
          </p>
        </div>
      </section>

      {/* Services List + Details */}
      <section className="max-w-7xl mx-auto my-12 md:my-20 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Left: Service List */}
        <div className="md:w-1/3 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {services.map((service, index) => {
            const isActive = selectedIndex === index;
            return (
              <button
                key={service.title}
                onClick={() => setSelectedIndex(index)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                  isActive
                    ? "bg-white shadow-lg scale-105 border-l-4 border-blue-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {service.icon}
                <span className="font-medium text-gray-800">{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Service Details */}
        <div className="md:w-2/3 bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row gap-6"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative h-56 md:h-auto rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src={services[selectedIndex].image}
                  alt={services[selectedIndex].title}
                  fill
                  className="object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {services[selectedIndex].icon}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {services[selectedIndex].title}
                  </h2>
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {services[selectedIndex].description}
                </p>
                <ul className="mt-2 space-y-2">
                  {services[selectedIndex].details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
