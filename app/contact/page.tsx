"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Kontaktformular Nachricht von ${formData.firstName} ${formData.lastName}`
    );
    const body = encodeURIComponent(
      `Vorname: ${formData.firstName}\nNachname: ${formData.lastName}\nTelefon: ${formData.phone}\nE-Mail: ${formData.email}\n\nIhre Anfrage:\n${formData.message}`
    );
    const mailto = `mailto:office@immo-design.at?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
      consent: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative w-full h-[45vh] flex items-center justify-center text-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105"
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Kontaktieren Sie uns
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow">
            Wir freuen uns, von Ihnen zu hören – schreiben oder rufen Sie uns an.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact & Location */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                Kontakt & Standort
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Haben Sie Fragen oder benötigen Sie Unterstützung? Kontaktieren Sie uns
                gerne über das Formular oder direkt über unsere Kontaktdaten.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-gray-700">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <a href="tel:+436764183782" className="hover:text-blue-600 transition">
                    +43 676 418 3782‬
                  </a>
                </div>

                <div className="flex items-center gap-4 text-gray-700">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <a href="mailto:office@immo-design.at" className="hover:text-blue-600 transition">
                    office@immo-design.at
                  </a>
                </div>

                <div className="flex items-center gap-4 text-gray-700">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <a
                    href="https://www.google.com/maps/place/Laaweg+30,+8401+Kalsdorf+bei+Graz,+Österreich"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition"
                  >
                    Laaweg 30, 8401 Kalsdorf bei Graz, Österreich
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-64 sm:h-72 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Google Maps - Laaweg 30, Kalsdorf bei Graz"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.486605979025!2d15.505218215724204!3d46.97071377914809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476e5cf4b5f0c91b%3A0xa39e5ef3b33e45a6!2sLaaweg+30,+8401+Kalsdorf+bei+Graz!5e0!3m2!1sen!2sat!4v1697100000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
              Senden Sie uns eine Nachricht
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* First & Last Name */}
              <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Vorname"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nachname"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Phone & Email */}
              <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E‑Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Ihre Anfrage"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none overflow-hidden max-h-72"
              ></textarea>

              {/* Consent Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-gray-700">
                  Ich erkläre mich damit einverstanden, dass meine Daten zur Bearbeitung gespeichert und verarbeitet werden.
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Anfrage jetzt absenden
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
