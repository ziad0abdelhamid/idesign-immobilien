"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  position: string;
  avatar: string;
}

export default function PremiumHomePageDE() {
  const [showBubble, setShowBubble] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Anna Müller",
      comment: "Ein hervorragender Service! Ich habe mein Traumhaus gefunden.",
      position: "Kundin",
      avatar: "/avatars/anna.jpg",
    },
    {
      id: 2,
      name: "Max Schmidt",
      comment: "Sehr professionell und zuverlässig. Immer wieder gerne!",
      position: "Investor",
      avatar: "/avatars/max.jpg",
    },
    {
      id: 3,
      name: "Laura Becker",
      comment: "Tolle Beratung und schnelle Abwicklung. Vielen Dank!",
      position: "Hauskäuferin",
      avatar: "/avatars/laura.jpg",
    },
  ];

  const bubbleVariants: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <div className="relative w-full bg-gray-50">
      {/* CTA */}
      <motion.section
        className="relative py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/house-bg.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
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
            className="inline-block px-10 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Immobilien entdecken
          </a>
        </div>
      </motion.section>

      {/* Testimonials — desktop */}
      <section className="hidden md:block bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-14">
            Kundenstimmen
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — mobile chat bubble */}
      <div className="md:hidden">
        {/* Small floating button */}
        <button
          onClick={() => setShowBubble(true)}
          className="fixed right-5 bottom-24 z-40 bg-gradient-to-br from-blue-600 to-cyan-400 text-white p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          💬
        </button>

        <AnimatePresence>
          {showBubble && (
            <motion.div
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-4 bottom-28 w-[85vw] max-w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2">
                <span className="font-semibold text-sm">Kundenstimmen</span>
                <button
                  onClick={() => setShowBubble(false)}
                  className="text-white text-base leading-none hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Chat messages */}
              <div className="p-3 space-y-3 max-h-[40vh] overflow-y-auto">
                {testimonials.map((t, i) => (
                  <div
                    key={t.id}
                    className={`flex items-start gap-2 ${
                      i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover border border-gray-200"
                    />
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm max-w-[75%] ${
                        i % 2 === 0
                          ? "bg-gray-100 text-gray-800"
                          : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      }`}
                    >
                      <p className="italic leading-snug text-[13px]">{t.comment}</p>
                      <p className="mt-1 text-[11px] font-medium">
                        — {t.name}, {t.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      {/* Kontakt */}
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
            <p>📞 +20 123 456 789</p>
            <p>📧 info@yourcompany.com</p>
            <p>📍 Alexandria, Ägypten</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
