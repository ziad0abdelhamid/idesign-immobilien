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
              <div className="relative w-28 sm:w-80 md:w-80 h-42 sm:h-33.5 md:h-42">
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
<section className="relative h-[90vh] flex items-end justify-center pt-10 pb-3 overflow-hidden">
    {/* Background Video */}
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
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

    {/* Centered Glass Container */}
    <div className="relative z-10 max-w-3xl w-[90%] sm:w-[80%] md:w-[70%] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl"
      >
        {/* --- MAIN TITLE --- */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        >
          IDesign Immobilien EU
        </motion.h1>

        {/* --- SUBTITLE --- */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-200 mb-6"
        >
          Innovatives Immobilienmarketing
        </motion.h2>

        {/* --- SUPPORTING LINE --- */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl text-white/90 mb-8"
        >
          Maßgeschneiderte Immobilienpräsentationen für maximale Wirkung
        </motion.p>

        {/* --- Service List --- */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 2.2 },
            },
          }}
          className="list-none text-left mx-auto max-w-md mb-10 space-y-3"
        >
          {[
            "Home Staging",
            "Drohnenaufnahmen",
            "3D Visualisierung",
            "Fotografie",
            "Virtuelle Gestaltung",
            "Social Media Marketing",
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center space-x-3"
            >
              {/* Gradient Bullet Icon */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shadow-[0_0_8px_rgba(59,130,246,0.8)] flex-shrink-0" />
              <span className="text-base sm:text-lg text-white/95">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* --- BUTTON --- */}
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Jetzt anfragen
        </motion.a>
      </motion.div>
    </div>
  </section>
)}


    </header>
  );
}
