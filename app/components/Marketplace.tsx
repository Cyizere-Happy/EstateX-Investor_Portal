"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { 
  Search, 
  SlidersHorizontal, 
  Map as MapIcon, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import PropertyCard from "./PropertyCard";

// Dynamic import for Leaflet map to avoid SSR issues
const Map = dynamic(() => import("./Map"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-3xl">Loading Map...</div>
});

const properties = [
  { id: "1", name: "Kigali Heights Plaza", location: "Kacyiru, Kigali", price: "$450", roi: "14.2%", funding: "85%", rating: 4.8, reviews: 124, type: "RETAIL", image: "/retail.png", lat: -1.9441, lng: 30.0891 },
  { id: "2", name: "Vision City II", location: "Gacuriro, Kigali", price: "$2,100", roi: "12.8%", funding: "62%", rating: 4.9, reviews: 342, type: "RESIDENTIAL", image: "/villa.png", lat: -1.9312, lng: 30.1256 },
  { id: "3", name: "Nyagatare Trade Center", location: "Nyagatare, Eastern", price: "$150", roi: "15.5%", funding: "34%", rating: 4.7, reviews: 89, type: "COMMERCIAL", image: "/office.png", lat: -1.3000, lng: 30.4000 },
  { id: "4", name: "Rubavu Waterfront", location: "Rubavu, Western", price: "$850", roi: "11.2%", funding: "91%", rating: 4.6, reviews: 215, type: "RESORT", image: "/resort.png", lat: -1.6917, lng: 29.4147 },
  { id: "5", name: "Gahanga Housing", location: "Kicukiro, Kigali", price: "$550", roi: "13.5%", funding: "100%", rating: 4.5, reviews: 156, type: "RESIDENTIAL", image: "/villa.png", lat: -2.0305, lng: 30.1012 },
  { id: "6", name: "Downtown Office Hub", location: "Nyarugenge, Kigali", price: "$1,200", roi: "11.8%", funding: "45%", rating: 4.8, reviews: 198, type: "OFFICE", image: "/office.png", lat: -1.9501, lng: 30.0581 },
];

const Marketplace = () => {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Top Filter Bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search by location, project, or property type..." 
              className="w-full bg-gray-50 border border-gray-100 focus:border-[#1E3A5F] focus:bg-white rounded-xl py-2 pl-12 pr-6 outline-none transition-all text-[13px] font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            {["Price Range", "Property Type", "Funding status"].map((filter) => (
              <button key={filter} className="px-4 py-2 border border-gray-100 rounded-xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all whitespace-nowrap">
                {filter}
              </button>
            ))}
            <button className="p-2 bg-gray-50 hover:bg-[#1E3A5F] hover:text-white rounded-xl transition-all text-gray-600 shadow-sm border border-gray-100">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-8">
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Show Maps</span>
             <button 
               onClick={() => setShowMap(!showMap)}
               className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${showMap ? 'bg-[#1E3A5F]' : 'bg-gray-200'}`}
             >
               <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 transform ${showMap ? 'translate-x-5' : 'translate-x-0'}`} />
             </button>
           </div>
           <div className="h-8 w-px bg-gray-100 mx-2" />
           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest min-w-[100px]">
             {properties.length} Active Results
           </p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Properties Grid */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar p-8 transition-all duration-500 ${showMap ? 'lg:max-w-[40%] xl:max-w-[35%]' : 'max-w-7xl mx-auto w-full'}`}>
          <div className={`grid gap-6 ${showMap ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-[#1E3A5F] hover:border-[#1E3A5F] transition-all">
              <ChevronLeft size={20} />
            </button>
            {[1, 2, 3, 4, 5].map(page => (
              <button 
                key={page} 
                className={`w-10 h-10 rounded-xl text-[13px] font-black transition-all ${page === 1 ? 'bg-[#1E3A5F] text-white' : 'text-gray-400 hover:text-[#1E3A5F] hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-[#1E3A5F] hover:border-[#1E3A5F] transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="flex-1 bg-gray-100 border-l border-gray-100 relative shadow-[inset_10px_0_30px_-15px_rgba(0,0,0,0.05)]">
            <Map properties={properties} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
