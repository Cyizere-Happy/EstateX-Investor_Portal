"use client";

import React from "react";
import { TrendingUp, ArrowUpRight, ShieldCheck, MoreHorizontal } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  location: string;
  shares: string;
  value: string;
  yield: string;
  growth: string;
  image: string;
  status: "Verified" | "Pending";
}

const AssetCell = ({ asset }: { asset: Asset }) => {
  return (
    <div className="bg-white p-3.5 rounded-[22px] border border-gray-100 hover:border-[#1E3A5F]/20 hover:shadow-lg transition-all duration-300 group flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-gray-50 group-hover:scale-105 transition-transform">
        <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-[14px] font-black text-gray-900 truncate">{asset.name}</h4>
          {asset.status === "Verified" && (
            <ShieldCheck size={14} className="text-blue-500 shrink-0" />
          )}
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide truncate">{asset.location}</p>
      </div>

      <div className="hidden md:flex flex-col items-end px-6 border-l border-gray-100">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">SHARES</p>
        <p className="text-[13px] font-bold text-gray-800">{asset.shares}</p>
      </div>

      <div className="flex flex-col items-end px-6 border-l border-gray-100">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">CURRENT VALUE</p>
        <p className="text-[15px] font-black text-[#1E3A5F]">{asset.value}</p>
      </div>

      <div className="flex flex-col items-end min-w-[80px]">
        <div className="flex items-center gap-1 text-[#1E3A5F] mb-0.5">
          <ArrowUpRight size={14} />
          <span className="text-[13px] font-black">{asset.growth}</span>
        </div>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Yield: {asset.yield}</p>
      </div>

      <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors ml-2">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
};

export default AssetCell;
