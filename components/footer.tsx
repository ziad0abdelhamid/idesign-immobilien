"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-4 gap-8">
        {/* Logo + Contact */}
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <Image
              src="/logo.png" // your logo here
              alt="IDesign Immobilien"
              width={160}
              height={50}
              className="object-contain"
            />
          </Link>
          <p className="text-gray-600">
            IDesign Immobilien – Ihr Partner für Gewerbe- und Wohnbauprojekte.
          </p>
          <div className="flex flex-col space-y-1 text-gray-600 text-sm">
            <span>Adresse: Hauptstraße 1, 8051 Graz</span>
            <span>Telefon: +43 123 456 789</span>
            <span>Email: info@idesign-immobilien.at</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-800 mb-2">Navigation</h3>
          <Link href="/realestate" className="hover:text-blue-400 transition-colors">
            Immobilien
          </Link>
          <Link href="/partnerships" className="hover:text-blue-400 transition-colors">
            Partnerschaften
          </Link>
          <Link href="/services" className="hover:text-blue-400 transition-colors">
            Unsere Leistungen
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            Unternehmen
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Kontakt
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold text-gray-800 mb-2">Folgen Sie uns</h3>
          <div className="flex space-x-4">
             <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.67-1.27 2.3-2.6 4.75-2.6 5.08 0 6 3.34 6 7.68V24h-5v-7.68c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 2-2.94 4.05V24h-5V8z"/>
              </svg>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600">
              <span className="sr-only">Instagram</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm8 1a1 1 0 11-2 0 1 1 0 012 0zm-5 2a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              {/* You can replace these with actual icons */}
              <span className="sr-only">Facebook</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-200 text-gray-600 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} IDesign Immobilien. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
