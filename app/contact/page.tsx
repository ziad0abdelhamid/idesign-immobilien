"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 -z-10"></div>

      {/* Form Container */}
      <div className="pt-24 flex items-center justify-center min-h-screen px-4 ">
        <div
          className={`w-full max-w-5xl md:max-w-4xl lg:max-w-3xl mx-auto py-16 md:py-20 px-8 md:px-12 bg-white bg-opacity-95 shadow-xl rounded-xl backdrop-blur-md transition-transform transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          } duration-700`}
        >
          <h1
            className={`text-4xl font-bold mb-8 text-center text-gray-800 transition-all duration-700 delay-100 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
          >
            Kontaktieren Sie uns
          </h1>
          <p
            className={`text-center text-gray-600 mb-10 transition-all duration-700 delay-200 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
          >
            Haben Sie Fragen oder möchten Sie mehr Informationen? Schreiben Sie uns eine Nachricht!
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 transition-all duration-700 delay-300"
          >
            <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Ihr Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg transition-all duration-700 delay-400 ${
                  animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                }`}
              />
              <input
                type="email"
                name="email"
                placeholder="Ihre E-Mail"
                value={formData.email}
                onChange={handleChange}
                required
                className={`flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg transition-all duration-700 delay-500 ${
                  animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                }`}
              />
            </div>

            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              className={`w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg transition-all duration-700 delay-600 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
              }`}
            ></textarea>

            <div className="text-center">
              <button
                type="submit"
                className={`bg-blue-400 text-white font-semibold px-10 py-4 rounded-lg hover:bg-blue-500 transition-colors duration-200 cursor-pointer transition-all duration-700 delay-700 ${
                  animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                }`}
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
