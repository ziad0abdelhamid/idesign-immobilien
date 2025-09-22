"use client";
import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PremiumHomePageDE() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleExpand = (index: number) =>
    setExpandedIndex(expandedIndex === index ? null : index);

  const sectionVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  return (
    <div className="relative w-full bg-gray-50">


      {/* CTA */}
      <motion.section
        className="relative py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/house-bg.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            Traumimmobilien warten auf Sie
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Entdecken Sie unsere exklusive Auswahl an Häusern, Wohnungen und Investitionsmöglichkeiten.
          </p>
          <a
            href="/realestate"
            className="inline-block px-10 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Immobilien entdecken
          </a>
        </div>
      </motion.section>

      {/* Kontakt */}
      <motion.section
        className="bg-gray-900 py-20 text-white"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Kontaktieren Sie Uns</h2>
          <p className="mb-8 text-lg opacity-90">
            Bereit, Ihre Immobilienreise zu starten? Kontaktieren Sie uns noch heute!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 font-medium">
            <p>📞 +20 123 456 789</p>
            <p>📧 info@yourcompany.com</p>
            <p>📍 Alexandria, Ägypten</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
