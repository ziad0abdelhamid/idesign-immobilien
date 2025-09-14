"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  property_type: string;
  ground_area: number;
  house_area: number;
  images: string[]; // Array of image URLs
}

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
          setProperty(null);
        } else {
          setProperty(data);
        }
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading property...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p className="text-gray-600 mb-6">{property.location}</p>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {property.images?.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`Property image ${i + 1}`}
            width={600}
            height={400}
            className="object-cover rounded-md"
          />
        ))}
      </div>

      {/* Property Details */}
      <div className="space-y-2 mb-6">
        <p><strong>Price:</strong> €{property.price.toLocaleString()}</p>
        <p><strong>Property Type:</strong> {property.property_type}</p>
        <p><strong>Ground Area:</strong> {property.ground_area} m²</p>
        <p><strong>House Area:</strong> {property.house_area} m²</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>
    </div>
  );
}
