"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Kontaktformular Nachricht von ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailto = `mailto:office@immo-design.at?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    setFormData({ name: "", email: "", message: "" });
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
        <div className="absolute inset-0 bg-black/50" /> {/* Transparent Overlay */}
        <div className="relative z-10 text-white max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Kontaktieren Sie uns
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow">
            Wir freuen uns, von Ihnen zu hören – schreiben oder rufen Sie uns
            an.
          </p>
        </div>
      </div>

      {/* Main Content */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">

  {/* Contact Info */}
  <div className="space-y-8">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
      Kontakt
    </h2>

    <p className="text-gray-600 leading-relaxed">
      Haben Sie Fragen oder benötigen Sie Unterstützung? Kontaktieren Sie uns
      gerne über das Formular oder direkt über unsere Kontaktdaten.
    </p>

    <div className="space-y-5">
      <div className="flex items-center gap-4 text-gray-700">
        <Phone className="w-6 h-6 text-blue-600" />
        <a
          href="tel:+436764183782"
          className="hover:text-blue-600 transition"
        >
          +43 676 418 3782‬
        </a>
      </div>

      <div className="flex items-center gap-4 text-gray-700">
        <Mail className="w-6 h-6 text-blue-600" />
        <a
          href="mailto:office@immo-design.at"
          className="hover:text-blue-600 transition"
        >
          office@immo-design.at
        </a>
      </div>
    </div>
  </div>

  {/* Location Info */}
  <div className="space-y-8">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
      Standort
    </h2>

    <a
      href="https://www.google.com/maps/place/Laaweg+30,+8401+Kalsdorf+bei+Graz,+Österreich"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition"
    >
      <MapPin className="w-6 h-6 text-blue-600" />
      <span>Laaweg 30, 8401 Kalsdorf bei Graz, Österreich</span>
    </a>

    {/* Responsive Google Map */}
    <div className="w-full h-56 sm:h-72 rounded-lg overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.486605979025!2d15.505218215724204!3d46.97071377914809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476e5cf4b5f0c91b%3A0xa39e5ef3b33e45a6!2sLaaweg%2030%2C%208401%20Kalsdorf%20bei%20Graz!5e0!3m2!1sen!2sat!4v000000000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  </div>

</div>


        {/* Contact Form */}
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Ihr Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Ihre E-Mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            ></textarea>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Nachricht senden
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
