"use client";

import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";


const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function UnternehmenFullSplit() {
  return (
    <div className="w-full overflow-x-hidden"> {/* 🔹 prevents x-overflow */}
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden p-5">
        <Image
          src="/headers-bg.jpg"
          alt="Über Uns"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Über Uns
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md">
            Mit Leidenschaft und Fachkompetenz begleiten wir unsere Kunden durch
            jeden Schritt des Immobilienprozesses – von der ersten Beratung bis
            zum erfolgreichen Abschluss.
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24 md:h-32 bg-transparent"></div>

      {/* Section Per Person */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
          className="relative h-1/2 md:h-full"
        >
          <Image
            src="/hero-bg-wp.jpg"
            alt="Gerald Lehner"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right: Bio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
          className="flex items-center justify-center p-12 bg-white"
        >
          <div className="max-w-lg space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Gerald Lehner</h2>
            <p className="text-sm text-gray-500">Geschäftsführer</p>
            <p className="text-gray-700 leading-relaxed">
              „Mit vollem Einsatz und Leidenschaft dabei!“  
              Als Geschäftsführer kümmere ich mich persönlich um unsere Kunden
              und begleite sie durch den gesamten Verkaufs- oder Kaufprozess –
              von der ersten Beratung bis zum erfolgreichen Abschluss.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section Per Person */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
          className="relative h-1/2 md:h-full"
        >
          <Image
            src="/hero-bg.jpg"
            alt="Gerald Lehner"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right: Bio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
          className="flex items-center justify-center p-12 bg-white"
        >
          <div className="max-w-lg space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Gerald Lehner</h2>
            <p className="text-sm text-gray-500">Geschäftsführer</p>
            <p className="text-gray-700 leading-relaxed">
              „Mit vollem Einsatz und Leidenschaft dabei!“  
              Als Geschäftsführer kümmere ich mich persönlich um unsere Kunden
              und begleite sie durch den gesamten Verkaufs- oder Kaufprozess –
              von der ersten Beratung bis zum erfolgreichen Abschluss.
            </p>
          </div>
        </motion.div>
      </section>
  <div>      {/* Kontakt */}
      <motion.section
        className="bg-gray-900 py-20 text-white"
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
      </motion.section></div>
    </div>
    
  );
}
