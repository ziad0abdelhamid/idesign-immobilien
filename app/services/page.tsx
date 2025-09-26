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

interface Testimonial {
  id: string;
  name: string;
  position: string;
  comment: string;
  avatar: string;
}

export default function PremiumServicesDE() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serviceData: Service[] = [
      {
        id: "1",
        title: "Immobilienverkauf & Vermietung",
        description:
          "Wir unterstützen Sie beim Kauf, Verkauf und der Vermietung von Wohn- und Gewerbeimmobilien. Unser Service umfasst umfassende Beratung, Vertragsabwicklung und Marketingstrategien, um den besten Preis und reibungslose Abläufe zu garantieren.",
        details: [
          "Individuelle Beratung und Betreuung bei Kauf & Verkauf.",
          "Professionelle Marketingstrategien für Ihre Immobilie.",
          "Reibungslose Vertragsabwicklung und Übergabe.",
        ],
        image: "/images/sale.jpg",
      },
      {
        id: "2",
        title: "Marktanalyse",
        description:
          "Wir liefern detaillierte Marktanalysen, um aktuelle Trends, Preisschwankungen und Investmentpotenziale zu erkennen. So treffen unsere Kunden fundierte Entscheidungen bei jedem Immobiliengeschäft.",
        details: [
          "Detaillierte Preisanalyse von Wohn- und Gewerbeimmobilien.",
          "Trendanalyse und Prognosen für Investitionsentscheidungen.",
          "Individuelle Beratung für Ihre Investitionsstrategie.",
        ],
        image: "/images/market-analysis.jpg",
      },
      {
        id: "3",
        title: "Investitionsberatung",
        description:
          "Unsere Experten bieten strategische Beratung für Immobilieninvestitionen, einschließlich Renditeberechnung, Standortbewertung und Portfoliooptimierung, um langfristig profitable Entscheidungen zu treffen.",
        details: [
          "Analyse von Renditepotenzialen und Risiken.",
          "Standortbewertung und Marktchancen.",
          "Strategische Optimierung Ihres Immobilien-Portfolios.",
        ],
        image: "/images/investment.jpg",
      },
      {
        id: "4",
        title: "Immobilienverwaltung",
        description:
          "Wir kümmern uns um die komplette Verwaltung Ihrer Immobilien – von Mieteinnahmen über Instandhaltung bis hin zu rechtlichen Aspekten – um maximale Rendite und minimale Belastung für Eigentümer zu gewährleisten.",
        details: [
          "Vollständige Verwaltung Ihrer Immobilien.",
          "Mietmanagement, Instandhaltung und Reporting.",
          "Rechtliche Betreuung und Sicherheit für Eigentümer.",
        ],
        image: "/images/property-management.jpg",
      },
    ];

    const testimonialData: Testimonial[] = [
      {
        id: "1",
        name: "Anna Müller",
        position: "Privatkunden",
        comment:
          "Dank des Services konnte ich meine Immobilie schnell und zum besten Preis verkaufen.",
        avatar: "/images/testimonial1.jpg",
      },
      {
        id: "2",
        name: "Peter Schmidt",
        position: "Investor",
        comment:
          "Professionelle Marktanalyse half mir, profitable Investitionen zu tätigen.",
        avatar: "/images/testimonial2.jpg",
      },
      {
        id: "3",
        name: "Laura Fischer",
        position: "Eigentümerin",
        comment: "Die Verwaltung meiner Mietobjekte läuft jetzt völlig stressfrei.",
        avatar: "/images/testimonial3.jpg",
      },
    ];

    setServices(serviceData);
    setTestimonials(testimonialData);
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
    <div className="w-full flex flex-col">
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
            Unsere Dienstleistungen
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md">
            Professionelle Lösungen für Verkauf, Analyse, Investition und
            Verwaltung.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 grid gap-16">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] ${
              i % 2 === 0 ? "" : "md:flex-row-reverse"
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

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-14">
            Kundenstimmen
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={90}
                  height={90}
                  className="rounded-full mb-6 object-cover ring-4 ring-blue-100"
                />
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <h3 className="font-semibold text-xl text-gray-900">
                  {testimonial.name}
                </h3>
                <span className="text-gray-500 text-sm">
                  {testimonial.position}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
