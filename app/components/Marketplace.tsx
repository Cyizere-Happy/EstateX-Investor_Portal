"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal } from "lucide-react";
import PropertyCard from "./PropertyCard";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-3xl">Loading Map...</div>
});

const DEMO_PROPERTIES = [
  { id: "1", name: "Kigali Heights Residences", location: "Kimironko, Gasabo", price: "$2.4M", roi: "14.5%", funding: "72%", rating: 4.9, reviews: 24, type: "RESIDENTIAL", image: "/villa.png", lat: -1.9441, lng: 30.0619 },
  { id: "2", name: "Nyarutarama Green Villas", location: "Remera, Gasabo", price: "$3.1M", roi: "12.8%", funding: "45%", rating: 4.8, reviews: 18, type: "ECO-LIVING", image: "/villa.png", lat: -1.9335, lng: 30.1127 },
  { id: "3", name: "Musanze Lakeside Resort", location: "Muhoza, Musanze", price: "$1.85M", roi: "18.2%", funding: "28%", rating: 4.7, reviews: 11, type: "HOSPITALITY", image: "/villa.png", lat: -1.4998, lng: 29.6345 },
  { id: "4", name: "Rubavu Waterfront Apartments", location: "Gisenyi, Rubavu", price: "$1.6M", roi: "15.0%", funding: "61%", rating: 4.6, reviews: 15, type: "RESIDENTIAL", image: "/villa.png", lat: -1.6821, lng: 29.2563 },
  { id: "5", name: "Huye University Park", location: "Tumba, Huye", price: "$950K", roi: "11.5%", funding: "89%", rating: 4.5, reviews: 8, type: "MIXED-USE", image: "/villa.png", lat: -2.6087, lng: 29.7394 },
  { id: "6", name: "Kicukiro Innovation Hub", location: "Niboye, Kicukiro", price: "$1.2M", roi: "16.0%", funding: "55%", rating: 4.8, reviews: 21, type: "COMMERCIAL", image: "/villa.png", lat: -1.9787, lng: 30.1025 },
];

const Marketplace = () => {
  const [showMap, setShowMap] = useState(true);
  const [search, setSearch] = useState("");

  const filtered = search
    ? DEMO_PROPERTIES.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
    : DEMO_PROPERTIES;

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
    </div>
  );
};

export default Marketplace;
