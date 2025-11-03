"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  position: string;
  avatar: string;
  rating: number;
}


export default function PremiumHomePageDE() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const testimonials: Testimonial[] = [
    

    
    {
      id: 1,
      name: "Anna Müller",
      comment: "Ein hervorragender Service! Ich habe mein Traumhaus gefunden.",
      position: "Kundin",
      avatar: "/Anna.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Max Schmidt",
      comment: "Sehr professionell und zuverlässig. Immer wieder gerne!",
      position: "Investor",
      avatar: "/Anna.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Laura Becker",
      comment: "Tolle Beratung und schnelle Abwicklung. Vielen Dank!",
      position: "Hauskäuferin",
      avatar: "/Anna.jpg",
      rating: 5,
    },
  ];

    useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
      setWidth(scrollWidth);
    }
  }, [testimonials]);
  
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

    {/* 🌟 Modern & Swipeable Testimonials Section */}
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
        >
          Was unsere Kunden sagen
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Wir sind stolz darauf, Vertrauen und Zufriedenheit zu schaffen – hören Sie selbst von unseren glücklichen Kunden.
        </p>

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex gap-6 sm:gap-8 px-2"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] mx-auto"
              >
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-4 border-white shadow-md mb-5"
                />

                {/* Stars */}
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i2) => (
                    <span
                      key={i2}
                      className={`text-yellow-400 text-lg ${
                        i2 < t.rating ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="italic text-gray-700 text-[15px] leading-relaxed mb-5">
                  “{t.comment}”
                </p>

                {/* Name & Position */}
                <p className="font-semibold text-gray-900 text-base">{t.name}</p>
                <p className="text-sm text-gray-500">{t.position}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
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
