"use client";

import { useState, useEffect } from "react";
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
      icon: <Home className="w-7 h-7 text-blue-600" />,
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
      icon: <BarChart3 className="w-7 h-7 text-green-600" />,
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
      icon: <Briefcase className="w-7 h-7 text-purple-600" />,
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
      icon: <Building2 className="w-7 h-7 text-pink-600" />,
      image: "/images/property-management.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Anna Müller",
      position: "Privatkunden",
      comment: "Dank des Services konnte ich meine Immobilie schnell und zum besten Preis verkaufen.",
      avatar: "/images/testimonial1.jpg",
    },
    {
      name: "Peter Schmidt",
      position: "Investor",
      comment: "Professionelle Marktanalyse half mir, profitable Investitionen zu tätigen.",
      avatar: "/images/testimonial2.jpg",
    },
    {
      name: "Laura Fischer",
      position: "Eigentümerin",
      comment: "Die Verwaltung meiner Mietobjekte läuft jetzt völlig stressfrei.",
      avatar: "/images/testimonial3.jpg",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Automatic carousel swipe for testimonials every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleServiceDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50 && selectedIndex < services.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (info.offset.x > 50 && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleTestimonialDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) {
      setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
    }
    if (info.offset.x > 50) {
      setTestimonialIndex(
        (testimonialIndex - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[35vh] md:h-[50vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center max-w-2xl px-4">
          <h1 className="text-2xl md:text-5xl font-extrabold drop-shadow-lg">
            Unsere Dienstleistungen
          </h1>
          <p className="mt-3 text-base md:text-xl drop-shadow-md">
            Wählen Sie eine Dienstleistung aus
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto my-10 md:my-16 px-4 sm:px-6 md:px-12">
        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-6 mb-8 flex-wrap">
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => setSelectedIndex(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedIndex === index
                  ? "bg-blue-100 border border-blue-400 shadow"
                  : "bg-white hover:bg-gray-100 border"
              }`}
            >
              {service.icon}
              <span className="font-medium">{service.title}</span>
            </button>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden flex justify-center mb-4">
          {services.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                i === selectedIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Service Card */}
        <div className="relative bg-white rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleServiceDragEnd}
              className="flex flex-col md:flex-row gap-6 p-6 sm:p-8"
            >
              <div className="w-full md:w-1/2 relative h-60 md:h-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={services[selectedIndex].image}
                  alt={services[selectedIndex].title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {services[selectedIndex].icon}
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                    {services[selectedIndex].title}
                  </h2>
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {services[selectedIndex].description}
                </p>
                <ul className="mt-2 space-y-2">
                  {services[selectedIndex].details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600"
                    >
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

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto my-16 px-4 sm:px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
          Kundenstimmen
        </h2>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleTestimonialDragEnd}
              className="flex flex-col md:flex-row gap-6 justify-center items-stretch"
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 md:w-1/3 flex flex-col items-center text-center hover:shadow-xl transition"
                >
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full mb-4 object-cover"
                  />
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <span className="text-gray-500 text-sm">{testimonial.position}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center mt-4 gap-2 md:hidden">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === testimonialIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
