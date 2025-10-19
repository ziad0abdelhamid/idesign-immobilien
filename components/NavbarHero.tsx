"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SplitText from "components/SplitText";

export default function NavbarHero() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ Mobile autoplay fix for hero video
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

  // Navbar scroll animation
  const bgColor = useTransform(scrollY, [0, 50], [
    "rgba(255,255,255,0.92)",
    "rgba(255,255,255,1)",
  ]);
  const boxShadow = useTransform(scrollY, [0, 50], [
    "0 10px 6px rgba(0,0,0,0.04)",
    "0 10px 30px rgba(0,0,0,0.12)",
  ]);

  const navLinks = [
    { name: "Immobilien", href: "/realestate" },
    { name: "Partnerschaften", href: "/partnerships" },
    { name: "Über Uns", href: "/about" },
    { name: "Leistungen", href: "/services" },
    { name: "Kontakt", href: "/contact" },
  ];

  const isHomePage = pathname === "/";

  return (
    <header className="relative">
      {/* Navbar */}
      <motion.nav
        style={{ background: bgColor, boxShadow }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center overflow-hidden">
            <div className="relative w-28 sm:w-48 md:w-56 h-12 sm:h-16">
              <Image
                src="/logo.png"
                alt="iDesign Immobilien"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 lg:space-x-10 text-base lg:text-lg font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none text-gray-800 cursor-pointer"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-10 text-white"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {/* Nav Links */}
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-3xl font-semibold tracking-wide transition-all duration-300 ${
                        isActive
                          ? "text-blue-400 scale-105"
                          : "hover:text-blue-400 hover:scale-105 text-gray-100"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section (Home only) */}
      {isHomePage && (
        <section className="relative h-[85vh] sm:h-[90vh] md:h-[95vh] flex items-center justify-start overflow-hidden">
          {/* Background Video (mobile-safe) */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero-video.mp4"
            playsInline
            autoPlay
            loop
            muted
            preload="auto"
            poster="/hero-poster.jpg"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24 max-w-3xl">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl">

              {/* --- MAIN TITLE --- */}
              <SplitText
                text="IDesign Immobilien eu"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] mb-4 leading-tight"
                delay={150}
                duration={0.8}
                ease="easeOut"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />

              {/* --- SUBTITLE --- */}
              <SplitText
                text="Innovatives Immobilienmarketing"
                className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-200 mb-4"
                delay={1500}
                duration={0.6}
                ease="easeOut"
                splitType="words"
                from={{ opacity: 0, y: 25 }}
                to={{ opacity: 1, y: 0 }}
              />

              {/* --- SUPPORTING LINE --- */}
              <SplitText
                text="Maßgeschneiderte Immobilienpräsentationen für maximale Wirkung:"
                className="text-sm sm:text-lg md:text-xl text-white/90 mb-6"
                delay={2300}
                duration={0.7}
                ease="easeOut"
                splitType="lines"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
              />

              {/* --- LIST --- */}
              <ul className="list-none space-y-2 mb-8">
                {[
                  "Home Staging",
                  "Drohnenaufnahmen",
                  "3D Visualisierung",
                  "Fotografie",
                  "Virtuelle Gestaltung",
                  "Social Media Marketing",
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="mt-1 text-blue-400">✓</span>
                    <SplitText
                      text={item}
                      className="text-base sm:text-lg text-white/95"
                      delay={3000 + i * 200}
                      duration={0.5}
                      ease="easeOut"
                      splitType="lines"
                      from={{ opacity: 0, x: -15 }}
                      to={{ opacity: 1, x: 0 }}
                    />
                  </li>
                ))}
              </ul>

              {/* --- BUTTON --- */}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4400, duration: 0.7, ease: "easeOut" }}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Jetzt anfragen
              </motion.a>
            </div>
          </div>
        </section>
      )}
    </header>
  );
}
