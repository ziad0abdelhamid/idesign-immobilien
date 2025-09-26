"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "components/SplitText";
import LiquidChrome from "./LiquidChrome";

export default function NavbarHero() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          scrolled || !isHomePage
            ? "bg-white/95 shadow-md"
            : "bg-white/30"
        }`}
      >
<nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
    scrolled || !isHomePage ? "bg-white/95 shadow-md" : ""
  }`}
>
  {/* Gradient only on homepage, reversed direction */}
  {isHomePage && (
    <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/70 to-white/95 pointer-events-none"></div>
  )}

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
    {/* Logo */}
    <Link href="/">
      <Image
        src="/logo.png"
        alt="iDesign Immobilien"
        width={198}
        height={50}
        className="transition-transform duration-300 hover:scale-105"
      />
    </Link>

    {/* Desktop Nav */}
    <ul className="hidden md:flex space-x-6 lg:space-x-10 text-base lg:text-lg font-semibold">
      {navLinks.map((link) => (
        <li key={link.name} className="relative group">
          <Link
            href={link.href}
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
        </li>
      ))}
    </ul>

    {/* Mobile Toggle */}
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="focus:outline-none text-gray-800"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>
</nav>


        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-md w-full absolute top-16 left-0 shadow-lg"
            >
              <ul className="flex flex-col items-center py-6 space-y-4 text-base font-semibold text-gray-800">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="hover:text-blue-500 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      {isHomePage && (
        <section className="relative h-[85vh] sm:h-[90vh] md:h-[95vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg-wp.jpg')" }} />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

          {/* White angled slash overlay */}
          <div
            className="
              absolute inset-0 bg-white
              [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] 
              sm:[clip-path:polygon(0_0,70%_0,40%_100%,0_100%)]
            "
          ></div>

          {/* Hero Content */}
          <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-2xl sm:max-w-3xl lg:max-w-4xl text-left">
            {/* Hero Title */}
            <SplitText
              text="IDesign Immobilien eu"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight pt-4"
              delay={100}
              duration={0}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />

            {/* Subheading */}
            <SplitText
              text="Innovatives Immobilienmarketing"
              className="text-2xl sm:text-md md:text-xl lg:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight pt-4"
              delay={100}
              duration={0.2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
            />
             <SplitText
              text="Maßgeschneiderte Immobilienpräsentationen für maximale Wirkung:"
              className="text-m sm:text-m md:text-xl lg:text-2xl font-semibold text-blue-600 mb-4 sm:mb-6"
              delay={1200}
              duration={0.3}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
            />

            <ul className="list-none space-y-3 mb-6 sm:mb-8">
              {[
                "Home Staging",
                "Drohnenaufnahmen",
                "3D Visualisierung",
                "Fotografie",
                "Virtuelle Gestaltung",
                "Social Media Marketing",
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="mt-1 text-blue-600">
                    {/* Small check icon */}
                    ✓
                  </span>
                  <SplitText
                    text={item}
                    className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-800"
                    delay={100+ i* 200}
                    duration={1.2}
                    ease="power3.out"
                    splitType="lines"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </li>
              ))}
            </ul>



            {/* CTA Button */}
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-4 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:bg-blue-700 transition duration-300 text-base sm:text-lg md:text-xl"
            >
              Jetzt anfragen
            </a>
          </div>
        </section>
      )}
    </header>
  );
}
