"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavbarHero() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // current route

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Immobilien", href: "/realestate" },
    { name: "Partnerschaften", href: "/partnerships" },
    { name: "Unternehmen", href: "/enterprise" },
    { name: "Kontakt", href: "/contact" },
  ];

  // Determine if we are on the homepage
  const isHomePage = pathname === "/";

  return (
    <header className="relative">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || !isHomePage ? "bg-white/90 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="IDesign Immobilien"
              width={203}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-12 text-xl font-bold transition-colors duration-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-300 ${
                    scrolled || !isHomePage
                      ? "text-black hover:text-blue-400"
                      : "text-white hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className={`focus:outline-none ${
                scrolled || !isHomePage ? "text-black" : "text-white"
              }`}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white/95 backdrop-blur-md w-full absolute top-20 left-0 shadow-md">
            <ul className="flex flex-col items-center py-6 space-y-4 text-lg font-semibold text-gray-800">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {isHomePage && (
        <section
          className="relative h-[100vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: 'url("./hero-bg.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-8xl font-bold text-gray-300 mb-6 animate-fade-in-up">
               DB Immodesign e.U.
            </h1>
             <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                innovatives <br></br>Immobilienmarketing
            </h2>
            <p className="text-lg md:text-2xl text-white mb-8 animate-fade-in-up delay-200">
                Home Staging,
                Drohnenaufnahmen, 3D 
                Visualisierung, professionelle 
                Fotografie, Virtuelle 
                Innenraumgestalltung, Social 
                Media Marketing
            </p>
            <a
              href="#contact"
              className="inline-block bg-blue-400 text-white px-8 py-4 font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-100 animate-fade-in-up delay-100"
            >
              Jetzt anfragen
            </a>
          </div>
        </section>
      )}
    </header>
  );
}
