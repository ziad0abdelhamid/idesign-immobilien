"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  images: string[];
  property_type: string;
  ground_area: number;
  house_area: number;
}

export default function RealEstatePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [typeFilter, setTypeFilter] = useState("");
  const [minGround, setMinGround] = useState<number | "">("");
  const [maxGround, setMaxGround] = useState<number | "">("");
  const [minHouse, setMinHouse] = useState<number | "">("");
  const [maxHouse, setMaxHouse] = useState<number | "">("");

  useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let temp = [...properties];
    if (typeFilter) temp = temp.filter(p => p.property_type === typeFilter);
    if (minGround !== "") temp = temp.filter(p => p.ground_area >= minGround);
    if (maxGround !== "") temp = temp.filter(p => p.ground_area <= maxGround);
    if (minHouse !== "") temp = temp.filter(p => p.house_area >= minHouse);
    if (maxHouse !== "") temp = temp.filter(p => p.house_area <= maxHouse);
    setFiltered(temp);
  }, [typeFilter, minGround, maxGround, minHouse, maxHouse, properties]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
     <div className="pt-20 max-w-7xl mx-auto px-4 py-12">
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded px-4 py-2 text-gray-700"
        >
          <option value="">Alle Typen</option>
          <option value="Wohnung">Wohnung</option>
          <option value="Haus">Haus</option>
          <option value="Gewerbe">Gewerbe</option>
        </select>

        <input
          type="number"
          placeholder="Min Grundstück (m²)"
          value={minGround}
          onChange={(e) => setMinGround(Number(e.target.value) || "")}
          className="border rounded px-4 py-2 text-gray-700"
        />
        <input
          type="number"
          placeholder="Max Grundstück (m²)"
          value={maxGround}
          onChange={(e) => setMaxGround(Number(e.target.value) || "")}
          className="border rounded px-4 py-2 text-gray-700"
        />

        <input
          type="number"
          placeholder="Min Wohnfläche (m²)"
          value={minHouse}
          onChange={(e) => setMinHouse(Number(e.target.value) || "")}
          className="border rounded px-4 py-2 text-gray-700"
        />
        <input
          type="number"
          placeholder="Max Wohnfläche (m²)"
          value={maxHouse}
          onChange={(e) => setMaxHouse(Number(e.target.value) || "")}
          className="border rounded px-4 py-2 text-gray-700"
        />
      </div>

      {/* Properties Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">Keine Immobilien gefunden.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <Link key={property.id} href={`/realestate/${property.id}`}>
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
                <img
                  src={property.images?.[0] || "/placeholder.jpg"}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-blue-600 font-semibold mt-1">${property.price}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Grundstück: {property.ground_area} m² | Wohnfläche: {property.house_area} m²
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Typ: {property.property_type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
