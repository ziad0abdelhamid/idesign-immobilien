"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarHero() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHomePage = pathname === "/";

  interface Testimonial {
    id: number;
    name: string;
    comment: string;
    position: string;
    avatar: string;
    rating: number;
  }

  const testimonials: Testimonial[] = [
    { id: 1, name: "Anna Müller", comment: "Ein hervorragender Service! Ich habe mein Traumhaus gefunden.", position: "Kundin", avatar: "/Anna.jpg", rating: 5 },
    { id: 2, name: "Max Schmidt", comment: "Sehr professionell und zuverlässig. Immer wieder gerne!", position: "Investor", avatar: "/Anna.jpg", rating: 4 },
    { id: 3, name: "Laura Becker", comment: "Tolle Beratung und schnelle Abwicklung. Vielen Dank!", position: "Hauskäuferin", avatar: "/Anna.jpg", rating: 5 },
  ];

  // Video autoplay fix
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay prevented:", err);
      }
    };
    playVideo();
  }, []);

  // Auto + manual swipe for testimonials
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  const startAutoSwipe = () => {
    stopAutoSwipe();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const stopAutoSwipe = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSwipe();
    return () => stopAutoSwipe();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoSwipe();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) setIndex((prev) => (prev + 1) % testimonials.length);
      else setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
    touchStartX.current = null;
    startAutoSwipe();
  };

  const navLinks = [
    { name: "Immobilien", href: "/realestate" },
    { name: "Partnerschaften", href: "/partnerships" },
    { name: "Über Uns", href: "/about" },
    { name: "Leistungen", href: "/services" },
    { name: "Kontakt", href: "/contact" },
  ];

  return (
    <header className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/95 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="relative w-28 sm:w-80 md:w-80 h-42 sm:h-33.5 md:h-42">
              <Image src="/logo.png" alt="iDesign Immobilien" fill className="object-contain object-left" priority />
            </div>
          </Link>

          <ul className="hidden md:flex space-x-6 lg:space-x-10 text-base lg:text-lg font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`transition-colors duration-300 ${isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"}`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="focus:outline-none text-gray-800 cursor-pointer" aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-10 text-white">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer">
            <X size={32} />
          </button>

          <ul className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-3xl font-semibold tracking-wide transition-all duration-300 ${isActive ? "text-blue-400 scale-105" : "hover:text-blue-400 hover:scale-105 text-gray-100"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Homepage Hero */}
      {isHomePage && (
<section className="relative w-full min-h-screen overflow-hidden pt-16 md:pt-20">
          {/* Video Background */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover grayscale"
            src="/hero-video.mp4"
            playsInline
            autoPlay
            loop
            muted
            preload="auto"
            poster="/hero-poster.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="relative z-20 flex flex-col w-full justify-start items-center">
            {/* Glass Content */}
            <div className="flex flex-col items-center text-center justify-center flex-grow bg-white/10 backdrop-lg border border-white/20 shadow-2xl max-w-4xl w-[90%] mx-auto p-8 sm:p-10 rounded-none">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3">DB ImmoDesign</h1>
              <h2 className="text-lg sm:text-2xl font-semibold text-blue-200 mb-4">Innovatives Immobilienmarketing</h2>
              <p className="text-sm sm:text-lg text-white/90 mb-5">
                Wir machen Ihre Immobilie erlebbar– mit Home Staging, professioneller Fotografie, Drohnenaufnahmen und viele anderen Tools zum Verkaufserfolg.
              </p>

              <Link
              href="/services"
              className="mt-2 px-8 py-3 border border-white text-white rounded-full tracking-widest text-sm sm:text-base hover:bg-white hover:text-black transition"
              >
              Mehr erfahren
            </Link>


            </div>
            {/* Testimonials */}
              <div
                className="w-full bg-white flex flex-col justify-center pb-3 pt-3 min-h-[50vh]"
                onMouseEnter={stopAutoSwipe}
                onMouseLeave={startAutoSwipe}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
              <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-2">Was unsere Kunden sagen</p>
                {/* Mobile Carousel */}
                <div className="relative md:hidden min-h-[30vh] flex items-center justify-top pb-20 z-500">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonials[index].id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.6 }}
                      className="flex items-center justify-center w-full px-2"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg w-full max-w-[90%] p-4 sm:p-6 text-left">
                        <div className="flex items-center gap-4 mb-3">
                          <Image src={testimonials[index].avatar} alt={testimonials[index].name} width={56} height={56} className="rounded-full object-cover border border-gray-200" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 text-base sm:text-lg">{testimonials[index].name}</span>
                            <span className="text-xs text-gray-500">{testimonials[index].position}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i2) => (
                                <span key={i2} className={`text-yellow-400 text-sm ${i2 < testimonials[index].rating ? "opacity-100" : "opacity-30"}`}>★</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">“{testimonials[index].comment}”</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-6 pt-6">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8 text-left">
                      <div className="flex items-center gap-4 mb-3">
                        <Image src={t.avatar} alt={t.name} width={56} height={56} className="rounded-full object-cover border border-gray-200" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-base sm:text-lg">{t.name}</span>
                          <span className="text-xs text-gray-500">{t.position}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i2) => (
                              <span key={i2} className={`text-yellow-400 text-sm ${i2 < t.rating ? "opacity-100" : "opacity-30"}`}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">“{t.comment}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </header>
  );
}
