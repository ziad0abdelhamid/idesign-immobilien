"use client";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/i18n/translations";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useContactStore } from "@/lib/store/contactStore";
import { submitContactForm } from "@/lib/actions/contactActions";


export default function ContactPage() {
    const { language } = useLanguageStore();
    const t = translations[language] || translations.en;
    const searchParams = useSearchParams();
    const formRef = useRef<HTMLFormElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const { prefill } = useContactStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    useEffect(() => {
        // Merge prefill from Zustand + query params
        const subject = prefill.subject || searchParams.get("subject") || "";
        const message = prefill.message || searchParams.get("message") || "";

        setFormData((prev) => ({
            ...prev,
            ...prefill, // Zustand prefill
            subject,
            message,
        }));

        // Scroll & focus
        if ((subject || message) && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            nameInputRef.current?.focus();
        }
    }, [prefill, searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await submitContactForm({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                language: language,
            });

            if (!result.success) {
                throw new Error(result.error || "Failed to submit form");
            }

            setSubmitStatus("success");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (err) {
            console.error("Error inserting message:", err);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus("idle"), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div className="w-full relative">
            {/* Header with Video Background */}
            <section
                className="
      relative w-full min-h-dvh
      flex items-center justify-center text-center overflow-hidden snap-start
      px-4 sm:px-6
    "
            >
                <video
                    className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105"
                    src="/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <motion.div
                    className="relative z-10 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        {t.contact.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                        {t.contact.subtitle}
                    </p>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.15 }}
                        viewport={{ once: true }}
                    >
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
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="card p-8 shadow-2xl border border-neutral-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {submitStatus === "success" && (
                                        <motion.div
                                            className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {t.contact.success}
                                        </motion.div>
                                    )}

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                            {t.contact.name}
                                        </label>
                                        <input
                                            ref={nameInputRef}
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                                            aria-label={t.contact.name}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                            {t.contact.email}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                                            aria-label={t.contact.email}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                            {t.contact.phone}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                                            aria-label={t.contact.phone}
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                            {t.contact.subject}
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                                            aria-label={t.contact.subject}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                            {t.contact.message}
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full resize-none rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                                            aria-label={t.contact.message}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="
                                            relative inline-block px-6 py-3 font-bold text-white text-lg
                                            rounded-xl
                                            bg-linear-to-r from-blue-600 via-blue-500 to-blue-900
                                            transition-all duration-300
                                            transform hover:-translate-y-1 hover:scale-105
                                            active:scale-95
                                            ring-1 ring-blue-400/30
                                            focus:outline-none focus:ring-2 focus:ring-blue-400/60
                                            select-none
                                            uppercase tracking-wider cursor-pointer
"
                                    >
                                        {isSubmitting ? t.contact.sending : t.contact.send}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
