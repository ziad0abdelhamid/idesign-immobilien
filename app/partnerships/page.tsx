"use client";

import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
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
        name: "Krate Tactical",
        description:
          "A trusted supplier of tactical equipment and gear, providing innovative solutions for professionals worldwide.",
        logo: "/partners/krate-logo.png",
        website: "https://kratetactical.com",
      },
      {
        id: "2",
        name: "Evike",
        description:
          "Global leader in airsoft and tactical equipment, delivering reliable products and strong distribution networks.",
        logo: "/partners/evike-logo.png",
        website: "https://www.evike.com",
      },
      {
        id: "3",
        name: "Specna Arms",
        description:
          "Renowned manufacturer of airsoft replicas, offering cutting-edge designs and high-performance solutions.",
        logo: "/partners/specna-logo.png",
        website: "https://specnaarms.com",
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
            Our Partners
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md">
            We proudly collaborate with industry-leading companies who share our
            commitment to innovation, quality, and customer success.
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
            className="flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden"
          >
            {/* Logo */}
            <div className="relative w-full md:w-1/3 h-64 flex items-center justify-center bg-gray-50 p-6">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={250}
                height={150}
                className="object-contain max-h-40"
              />
            </div>

            {/* Info */}
            <div className="w-full md:w-2/3 p-8 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {partner.name}
              </h2>
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
                  <FaGlobe /> Visit Website
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
