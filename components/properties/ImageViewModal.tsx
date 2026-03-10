"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageViewModalProps {
    images: string[];
    initialIndex?: number;
    onClose: () => void;
    isOpen: boolean;
    isRTL?: boolean;
}

export function ImageViewModal({
    images,
    initialIndex = 0,
    onClose,
    isOpen,
    isRTL = false,
}: ImageViewModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Lock scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [images.length, onClose]);

    // Preload next and previous images
    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = document.createElement("img");
            img.src = src;
        };

        const nextIndex = (currentIndex + 1) % images.length;
        const prevIndex = (currentIndex - 1 + images.length) % images.length;

        preloadImage(images[nextIndex]);
        preloadImage(images[prevIndex]);
    }, [currentIndex, images]);

    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Main Image */}
                        <div className="relative w-full h-[calc(100%-120px)] flex items-center justify-center overflow-hidden rounded-lg bg-black/20">
                            <Image
                                src={images[currentIndex] || "/placeholder.jpg"}
                                alt={`Image ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    className={cn(
                                        "absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-yellow-600/60 text-white hover:bg-white/30 transition z-10 cursor-pointer",
                                        isRTL ? "right-4" : "left-4"
                                    )}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className={cn(
                                        "absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-yellow-600/60 text-white hover:bg-white/30 transition z-10 cursor-pointer",
                                        isRTL ? "left-4" : "right-4"
                                    )}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm ">
                                {currentIndex + 1} / {images.length}
                            </div>
                        )}

                        {/* Thumbnail Navigation */}
                        {images.length > 1 && (
                            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto ">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={cn(
                                            "relative w-12 h-12 rounded-lg overflow-hidden shrink-0 transition border-2 cursor-pointer",
                                            currentIndex === idx
                                                ? "border-white"
                                                : "border-white/30 opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}