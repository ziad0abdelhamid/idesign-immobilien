"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl hover:scale-110 transform transition-all duration-300 cursor-pointer"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
