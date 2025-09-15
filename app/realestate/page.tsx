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
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
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

        const types = Array.from(new Set(data.map((p) => p.property_type)));
        setTypeOptions(types);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let temp = [...properties];

    if (typeFilter.length > 0) temp = temp.filter((p) => typeFilter.includes(p.property_type));
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
    setTypeFilter([]);
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
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Available Properties</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 p-5">
          <div className="bg-white shadow-2xl rounded-3xl p-6 sticky top-32 z-1 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Filters</h2>

            {/* Property Type (checkboxes) */}
            <div className="mb-6">
              <p className="font-semibold mb-2 text-gray-600">Property Type</p>
              <div className="flex flex-col gap-2">
                {typeOptions.map((t) => (
                  <label key={t} className="inline-flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      value={t}
                      checked={typeFilter.includes(t)}
                      onChange={(e) => {
                        if (e.target.checked) setTypeFilter([...typeFilter, t]);
                        else setTypeFilter(typeFilter.filter((x) => x !== t));
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* Ground Area */}
            <div className="mb-6">
              <p className="font-semibold mb-2 text-gray-600">Ground Area</p>
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
            <div className="mb-6">
              <p className="font-semibold mb-2 text-gray-600">House Area</p>
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

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="mt-4 w-full px-4 py-2 rounded-xl border bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="lg:w-3/4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full mt-16">No properties found.</div>
          ) : (
            filtered.map((p) => (
              <Link key={p.id} href={`/realestate/${p.id}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer bg-white border border-gray-200">
                  <img
                    src={p.images?.[0] || "/placeholder.jpg"}
                    alt={p.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">{p.title}</h2>
                    <p className="text-gray-600 text-sm">{p.location_city}, {p.location_address}</p>
                    <p className="text-blue-600 font-semibold mt-1 text-lg">€{p.price.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Type: {p.property_type} | Status: {p.status}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Ground: {p.ground_area} m² | House: {p.house_area} m²
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Bedrooms: {p.bedrooms} | Bathrooms: {p.bathrooms}
                    </p>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
