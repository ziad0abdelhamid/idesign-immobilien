"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  avatar: string;
}

export default function ChatTestimonials() {
  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        id: 1,
        name: "Anna Müller",
        comment:
          "Ein hervorragender Service! Ich habe mein Traumhaus gefunden — professionell, schnell und sehr freundlich.",
        avatar: "/anna.jpg",
      },
      {
        id: 2,
        name: "Max Schmidt",
        comment:
          "Sehr professionell und zuverlässig. Die Präsentation meiner Immobilie hat überzeugt.",
        avatar: "/anna.jpg",
      },
      {
        id: 3,
        name: "Laura Becker",
        comment:
          "Tolle Beratung und persönliche Betreuung — empfehlenswert!",
        avatar: "/anna.jpg",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setIndex((s) => (s + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [autoPlay, testimonials.length]);

  const goPrev = () =>
    setIndex((s) => (s - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((s) => (s + 1) % testimonials.length);

  const enter = { opacity: 0, y: 30 };
  const center = { opacity: 1, y: 0 };
  const exit = { opacity: 0, y: -30 };

  return (
    <>
      {isVisible ? (
        <div
          className="fixed z-50 bottom-20 right-6 sm:right-6 sm:bottom-20 w-[90vw] max-w-[340px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 
              backdrop-blur-lg overflow-hidden flex flex-col justify-between max-h-[45vh] sm:max-h-[35vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-white/15 to-white/10 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs shadow">
                  💬
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/90">
                    Kundenstimmen
                  </p>
                  <p className="text-[10px] text-gray-400 leading-none">
                    Unsere Kundenerfahrungen
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-black/80 hover:text-gray-300 transition text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 px-4 py-3 overflow-y-auto scrollbar-none">
              <AnimatePresence mode="wait">
                {testimonials.map(
                  (t, i) =>
                    i === index && (
                      <motion.div
                        key={t.id}
                        initial={enter}
                        animate={center}
                        exit={exit}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="rounded-full border border-white/30 shadow"
                        />
                        <div className="bg-white text-gray-800 rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm max-w-[75%]">
                          <p className="italic text-[12px] sm-text-[4px]">{t.comment}</p>
                          <p className="mt-1 text-[14px] sm-text-[6px] font-semibold text-gray-600">
                            — {t.name}
                          </p>
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      ) : (
        // Collapsed Floating Button
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-20 right-20 sm:right-20 sm:bottom-60 z-50 bg-gradient-to-br from-blue-600 to-cyan-400 
            text-white p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          💬
        </button>
      )}
    </>
  );
}
