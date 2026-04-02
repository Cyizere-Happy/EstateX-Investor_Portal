"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2, Inbox } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { api } from "../../lib/api";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-3xl">Loading Map...</div>
});

interface Property {
  id: string;
  title: string;
  slug: string;
  summary: string;
  expected_roi: number;
  funding_goal: number;
  current_funding: number;
  property?: { address?: { district?: string; sector?: string }; latitude?: number; longitude?: number };
}

const Marketplace = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api("/public/projects?limit=50")
      .then((res) => setProperties(res.data || []))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const mapped = properties.map((p) => ({
    id: p.id,
    name: p.title,
    location: p.property?.address ? `${p.property.address.sector || ""}, ${p.property.address.district || ""}`.replace(/^, |, $/g, "") : "Rwanda",
    price: p.funding_goal ? `$${Math.round(p.funding_goal / 1000)}k` : "—",
    roi: p.expected_roi ? `${p.expected_roi}%` : "—",
    funding: p.funding_goal > 0 ? `${Math.min(100, Math.round((p.current_funding / p.funding_goal) * 100))}%` : "0%",
    rating: 4.8,
    reviews: 0,
    type: "PROPERTY",
    image: "/villa.png",
    lat: p.property?.latitude ?? -1.9441,
    lng: p.property?.longitude ?? 30.0891,
  }));

  const filtered = search
    ? mapped.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
    : mapped;

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Top Filter Bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Search size={16} /></span>
            <input
              type="text" placeholder="Search by location, project, or property type..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 focus:border-[#1E3A5F] focus:bg-white rounded-xl py-2 pl-12 pr-6 outline-none transition-all text-[13px] font-medium"
            />
          </div>
          <button className="p-2 bg-gray-50 hover:bg-[#1E3A5F] hover:text-white rounded-xl transition-all text-gray-600 shadow-sm border border-gray-100">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="flex items-center gap-6 ml-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Show Maps</span>
            <button onClick={() => setShowMap(!showMap)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${showMap ? 'bg-[#1E3A5F]' : 'bg-gray-200'}`}>
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 transform ${showMap ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="h-8 w-px bg-gray-100 mx-2" />
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest min-w-[100px]">
            {filtered.length} Results
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-[#1E3A5F]" size={28} /></div>
      ) : filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
          <Inbox size={48} strokeWidth={1} />
          <p className="mt-4 font-semibold text-[15px]">No properties listed yet</p>
          <p className="text-[12px] mt-1">Properties will appear here once projects are approved and open for funding.</p>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <div className={`flex-1 overflow-y-auto custom-scrollbar p-8 transition-all duration-500 ${showMap ? 'lg:max-w-[40%] xl:max-w-[35%]' : 'max-w-7xl mx-auto w-full'}`}>
            <div className={`grid gap-6 ${showMap ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
              {filtered.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {showMap && (
            <div className="flex-1 bg-gray-100 border-l border-gray-100 relative shadow-[inset_10px_0_30px_-15px_rgba(0,0,0,0.05)]">
              <Map properties={filtered} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
