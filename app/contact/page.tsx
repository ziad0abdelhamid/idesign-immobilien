"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Kontaktformular Nachricht von ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailto = `mailto:target_email@example.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-blue-600 text-white py-20 text-center shadow-md">
        <h1 className="text-4xl font-bold">Kontaktieren Sie uns</h1>
        <p className="mt-4 text-lg text-blue-100">
          Wir freuen uns, von Ihnen zu hören
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Unsere Kontaktdaten</h2>
          <p className="text-gray-600">
            Haben Sie Fragen oder benötigen Sie Unterstützung? 
            Kontaktieren Sie uns gerne über das Formular oder direkt.
          </p>
          <div className="space-y-4">
            <p className="text-gray-700">
              📍 Musterstraße 123, 10115 Berlin
            </p>
            <p className="text-gray-700">
              📞 +49 30 123 456 78
            </p>
            <p className="text-gray-700">
              ✉️ info@beispiel.de
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Ihr Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Ihre E-Mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nachricht senden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
