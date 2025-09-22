"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location_city: string;
  location_address: string;
  property_type: string;
  rooms: number;
  ground_area: number;
  house_area: number;
  images: string[];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function PropertyDetails({ params }: Props) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { id } = await params;
        const res = await fetch(`/api/properties/${id}`);
        const data: Property = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [params]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (property && property.images.length > 0) {
        setCurrentImage((prev) => (prev + 1) % property.images.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [property]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!property) return <div className="text-center py-20">Property not found.</div>;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 pb-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Sticky Info */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-600 mb-4">
              {property.location_city}, {property.location_address}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-blue-600">€{property.price.toLocaleString()}</span>
            </p>
            <p>
              <span className="font-semibold">Type:</span> {property.property_type}
            </p>
            <p>
              <span className="font-semibold">Rooms:</span> {property.rooms}
            </p>
            <p>
              <span className="font-semibold">Ground Area:</span> {property.ground_area} m²
            </p>
            <p>
              <span className="font-semibold">House Area:</span> {property.house_area} m²
            </p>
          </div>
        </div>

        {/* Right Column - Slider + Description */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {/* Image Slider */}
          <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={property.images[currentImage]}
                alt={`${property.title} ${currentImage + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Arrows */}
            <button
              onClick={() =>
                setCurrentImage(
                  (prev) => (prev - 1 + property.images.length) % property.images.length
                )
              }
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-3 rounded-full hover:bg-opacity-60 transition cursor-pointer"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % property.images.length)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-3 rounded-full hover:bg-opacity-60 transition cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  idx === currentImage ? "border-blue-500" : "border-transparent"
                } hover:border-blue-400 transition`}
                onClick={() => setCurrentImage(idx)}
              />
            ))}
          </div>

          {/* Description */}
          <div className="prose max-w-full">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p>{property.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
