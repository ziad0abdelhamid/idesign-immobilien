"use client";

import { motion} from "framer-motion";

export default function PremiumHomePageDE() {
  
  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('/house-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            Traumimmobilien warten auf Sie
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Entdecken Sie unsere exklusive Auswahl an Häusern, Wohnungen und
            Investitionsmöglichkeiten.
          </p>
          <a
            href="/realestate"
            className="inline-block px-10 py-4 bg-white text-blue-500 font-bold rounded-lg shadow-md hover:bg-blue-300 hover:text-white active:bg-blue-500 transition"
          >
            Immobilien entdecken
          </a>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="bg-gray-900 py-20 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Kontaktieren Sie Uns</h2>
          <p className="mb-8 text-lg opacity-90">
            Bereit, Ihre Immobilienreise zu starten? Kontaktieren Sie uns noch
            heute!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 font-medium">
            <p>📞 +43 676 418 3782‬</p>
            <p>📍 Laaweg 30, 8401 Kalsdorf bei Graz, Österreich</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
