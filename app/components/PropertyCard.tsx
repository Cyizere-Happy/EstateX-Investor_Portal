"use client";

import React from "react";
import { Star, MapPin, TrendingUp, Users, Heart, ArrowRight } from "lucide-react";

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  roi: string;
  funding: string;
  rating: number;
  reviews: number;
  image: string;
  type: string;
}

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-[#1E3A5F] shadow-sm uppercase tracking-wider">
            {property.type}
          </span>
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#1E3A5F] rounded-full transition-all shadow-sm">
          <Heart size={14} fill="currentColor" className="opacity-80" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-1.5 text-white">
            <Star size={12} className="text-[#1E3A5F] fill-[#1E3A5F]/20" />
            <span className="text-[11px] font-bold">{property.rating}</span>
            <span className="text-[10px] opacity-60">({property.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <h4 className="text-[15px] font-black text-gray-900 leading-tight mb-1 group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
            {property.name}
          </h4>
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin size={10} />
            <span className="text-[10px] font-bold uppercase tracking-wide">{property.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 p-2 rounded-xl">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5">EST. ROI</p>
            <p className="text-[13px] font-black text-[#1E3A5F]">{property.roi}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-xl">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5">FUNDING</p>
            <p className="text-[13px] font-black text-[#1E3A5F]">{property.funding}</p>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">PRICE/SHARE</p>
            <p className="text-[16px] font-black text-gray-900">{property.price}</p>
          </div>
          <button className="bg-[#1E3A5F] text-white px-4 py-2 rounded-xl text-[11px] font-black hover:shadow-[0_4px_12px_rgba(30,58,95,0.3)] transition-all flex items-center gap-2 group/btn active:scale-95">
            INVEST
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
