"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Logo + Company */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="IDesign Immobilien"
              width={140}
              height={40}
              className="object-contain opacity-90"
            />
          </Link>
          <p className="text-sm text-gray-400">
            Ihr Partner für Gewerbe- und Wohnbauprojekte
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 text-sm font-medium">
          <Link href="/realestate" className="hover:text-white transition">
            Immobilien
          </Link>
          <Link href="/partnerships" className="hover:text-white transition">
            Partnerschaften
          </Link>
          <Link href="/about" className="hover:text-white transition">
            Über Uns
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Kontakt
          </Link>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-xs text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} IDesign Immobilien. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
