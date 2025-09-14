"use client";

import Image from "next/image";

interface Property {
  id: string;
  title: string;
  price: number;
  location_city: string;
  property_type: string;
  images: string[];
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {property.images?.[0] && (
        <div className="h-64 w-full relative">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-1">{property.property_type} – {property.location_city}</p>
        <p className="text-blue-600 font-semibold">{property.price}€</p>
      </div>
    </div>
  );
}
