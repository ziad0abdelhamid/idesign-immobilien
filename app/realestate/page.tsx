"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XMarkIcon, FilmIcon } from "@heroicons/react/24/solid";
import { Bed, Ruler, Home, MapPin, Tag } from "lucide-react";

interface Property {
  id: number; // ✅ ID is a number now
  title: string;
  description: string;
  price: number;
  location_city: string;
  location_address: string;
  property_type: string;
  rooms: number;
  ground_area: number;
  house_area: number;
  status: string;
  images: string[];
}

export default function RealEstatePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [groundFilter, setGroundFilter] = useState<[number, number] | null>(null);
  const [houseFilter, setHouseFilter] = useState<[number, number] | null>(null);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data: Property[]) => {
        // ✅ Sort properties by numeric ID ascending
        const sorted = [...data].sort((a, b) => a.id - b.id);

        setProperties(sorted);
        setFiltered(sorted);
        setLoading(false);

        const types = Array.from(new Set(sorted.map((p) => p.property_type)));
        setTypeOptions(types);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let temp = [...properties];

    if (typeFilter.length > 0) {
      temp = temp.filter((p) => typeFilter.includes(p.property_type));
    }
    if (groundFilter) {
      const [min, max] = groundFilter;
      temp = temp.filter((p) => p.ground_area >= min && p.ground_area <= max);
    }
    if (houseFilter) {
      const [min, max] = houseFilter;
      temp = temp.filter((p) => p.house_area >= min && p.house_area <= max);
    }

    // ✅ Keep results sorted by ID as well
    temp.sort((a, b) => a.id - b.id);

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

  const FilterContent = () => (
    <div className="p-6 w-80 max-w-full overflow-y-auto lg:h-auto">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="text-2xl font-semibold text-gray-700">Filters</h2>
        <button onClick={() => setShowMobileFilters(false)}>
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Property Type */}
      <div className="mb-6 bg-white shadow-2xl rounded-3xl p-6 border border-gray-200">
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
      <div className="mb-6 bg-white shadow-2xl rounded-3xl p-6 border border-gray-200">
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
      <div className="mb-6 bg-white shadow-2xl rounded-3xl p-6 border border-gray-200">
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

      <button
        onClick={clearFilters}
        className="mt-4 w-full px-4 py-2 rounded-xl border bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Available Properties</h1>

      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2"
        >
          <FilmIcon className="w-5 h-5" /> Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <FilterContent />
        </div>

        {/* Mobile Sliding Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => setShowMobileFilters(false)}
            ></div>
            <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl rounded-l-3xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
              <FilterContent />
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full mt-16">No properties found.</div>
          ) : (
            filtered.map((p) => (
              <Link key={p.id} href={`/realestate/${p.id}`}>
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={p.images?.[0] || "/placeholder.jpg"}
                      alt={p.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1">
                      <Tag size={16} />
                      €{p.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">
                      {p.title}
                    </h2>
                    <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <MapPin size={16} className="text-blue-600" />
                      {p.location_city}, {p.location_address}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Home size={16} className="text-blue-600" />
                        <span>{p.property_type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler size={16} className="text-blue-600" />
                        <span>{p.ground_area} m²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Home size={16} className="text-blue-600" />
                        <span>{p.house_area} m²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed size={16} className="text-blue-600" />
                        <span>{p.rooms} Rooms</span>
                      </div>
                    </div>
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
