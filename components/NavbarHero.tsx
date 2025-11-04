"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function NavbarHero() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);

  interface Testimonial {
  id: number;
  name: string;
  comment: string;
  position: string;
  avatar: string;
  rating: number;
}
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
  <section className="relative h-auto min-h-[100vh] flex flex-col items-center justify-end pt-10 pb-10 overflow-hidden">
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
    <div className="relative z-10 max-w-5xl w-[90%] sm:w-[85%] md:w-[75%] text-center">
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
          className="list-none text-left mx-auto max-w-md mb-12 space-y-3"
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
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shadow-[0_0_8px_rgba(59,130,246,0.8)] flex-shrink-0" />
              <span className="text-base sm:text-lg text-white/95">{item}</span>
            </motion.li>
          ))}
        </motion.ul>

{/* 🌟 Testimonials INSIDE Glass Container */}
<div className="mt-12 w-full">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-2xl sm:text-3xl font-bold text-white mb-3"
  >
    Was unsere Kunden sagen
  </motion.h2>
  <p className="text-white/80 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
    Wir sind stolz darauf, Vertrauen und Zufriedenheit zu schaffen – hören Sie selbst von unseren glücklichen Kunden.
  </p>

  {/* Carousel */}
  <motion.div
    ref={carouselRef}
    className="overflow-hidden cursor-grab active:cursor-grabbing w-full"
  >
    <motion.div
      drag={width > 0 ? "x" : false} // ✅ Enable drag only when needed
      dragConstraints={{ right: 0, left: -width }}
      whileTap={{ cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8"
    >
      {testimonials.map((t) => (
        <motion.div
          key={t.id}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="min-w-full sm:min-w-[45%] lg:min-w-[30%] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-6 flex flex-col items-center text-center"
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

          <p className="italic text-white/90 text-sm leading-relaxed mb-4">
            “{t.comment}”
          </p>

          <p className="font-semibold text-white text-base">{t.name}</p>
          <p className="text-sm text-white/70">{t.position}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</div>


      </motion.div>
    </div>
  </section>
)}



    </header>
  );
}
