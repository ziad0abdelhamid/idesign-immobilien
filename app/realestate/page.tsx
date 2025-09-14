"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location_city: string;
  location_address: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  ground_area: number;
  house_area: number;
  status: string;
  images: string[];
}

export default function RealEstatePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [typeFilter, setTypeFilter] = useState("");
  const [groundFilter, setGroundFilter] = useState<[number, number] | null>(null);
  const [houseFilter, setHouseFilter] = useState<[number, number] | null>(null);
  const [typeOptions, setTypeOptions] = useState<string[]>([]); // dynamic options

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data: Property[]) => {
        setProperties(data);
        setFiltered(data);
        setLoading(false);

        // Extract unique property types from database
        const types = Array.from(new Set(data.map((p) => p.property_type)));
        setTypeOptions(types);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let temp = [...properties];
    if (typeFilter) temp = temp.filter((p) => p.property_type === typeFilter);
    if (groundFilter) {
      const [min, max] = groundFilter;
      temp = temp.filter((p) => p.ground_area >= min && p.ground_area <= max);
    }
    if (houseFilter) {
      const [min, max] = houseFilter;
      temp = temp.filter((p) => p.house_area >= min && p.house_area <= max);
    }
    setFiltered(temp);
  }, [typeFilter, groundFilter, houseFilter, properties]);

  const clearFilters = () => {
    setTypeFilter("");
    setGroundFilter(null);
    setHouseFilter(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  const groundOptions: [string, [number, number]][] = [
    ["0 - 200m²", [0, 200]],
    ["200 - 500m²", [200, 500]],
    ["500 - 1000m²", [500, 1000]],
    ["über 1000m²", [1000, 999999]],
  ];
  const houseOptions: [string, [number, number]][] = [
    ["20 - 45m²", [20, 45]],
    ["45 - 65m²", [45, 65]],
    ["65 - 85m²", [65, 85]],
    ["über 85m²", [85, 9999]],
  ];

  return (
    <div className="pt-32 max-w-7xl mx-auto px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">Available Properties</h1>

      {/* Filters Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Property Type */}
          <div>
            <p className="font-semibold mb-2">Property Type</p>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border rounded px-4 py-2 cursor-pointer w-full"
            >
              <option value="">All Types</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Ground Area */}
          <div>
            <p className="font-semibold mb-2">Ground Area</p>
            <select
              value={groundFilter ? groundFilter.join("-") : ""}
              onChange={(e) => {
                const val = e.target.value;
                setGroundFilter(val ? (val.split("-").map(Number) as [number, number]) : null);
              }}
              className="border rounded px-4 py-2 cursor-pointer w-full"
            >
              <option value="">All Ground Areas</option>
              {groundOptions.map(([label, range]) => (
                <option key={label} value={range.join("-")}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* House Area */}
          <div>
            <p className="font-semibold mb-2">House Area</p>
            <select
              value={houseFilter ? houseFilter.join("-") : ""}
              onChange={(e) => {
                const val = e.target.value;
                setHouseFilter(val ? (val.split("-").map(Number) as [number, number]) : null);
              }}
              className="border rounded px-4 py-2 cursor-pointer w-full"
            >
              <option value="">All House Areas</option>
              {houseOptions.map(([label, range]) => (
                <option key={label} value={range.join("-")}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-6 text-right">
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">No properties found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
          {filtered.map((p) => (
            <Link key={p.id} href={`/realestate/${p.id}`}>
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
                <img
                  src={p.images?.[0] || "/placeholder.jpg"}
                  alt={p.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                  <p className="text-gray-600">{p.location_city}, {p.location_address}</p>
                  <p className="text-blue-600 font-semibold mt-1">${p.price}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Type: {p.property_type} | Status: {p.status}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Ground: {p.ground_area} m² | House: {p.house_area} m²
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Bedrooms: {p.bedrooms} | Bathrooms: {p.bathrooms}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
