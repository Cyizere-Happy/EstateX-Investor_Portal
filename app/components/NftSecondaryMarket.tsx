"use client";

import React, { useState } from "react";
import {
  Hexagon,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  BarChart3,
  Clock,
  DollarSign,
} from "lucide-react";

const listedNfts = [
  { id: "1", project: "Kigali Heights Plaza", tokenId: "#KHP-0042", shares: 5, listPrice: "$2,250", change: "+8.4%", volume24h: "$12,400", floor: "$420", holders: 124, type: "RETAIL", image: "/retail.png" },
  { id: "2", project: "Vision City II", tokenId: "#VC2-0018", shares: 2, listPrice: "$4,200", change: "+3.1%", volume24h: "$8,900", floor: "$2,050", holders: 342, type: "RESIDENTIAL", image: "/villa.png" },
  { id: "3", project: "Nyagatare Trade Center", tokenId: "#NTC-0091", shares: 10, listPrice: "$1,500", change: "-2.3%", volume24h: "$3,200", floor: "$145", holders: 89, type: "COMMERCIAL", image: "/office.png" },
  { id: "4", project: "Rubavu Waterfront", tokenId: "#RWF-0007", shares: 3, listPrice: "$2,550", change: "+12.1%", volume24h: "$18,600", floor: "$830", holders: 215, type: "RESORT", image: "/resort.png" },
  { id: "5", project: "Gahanga Housing", tokenId: "#GHE-0155", shares: 8, listPrice: "$4,400", change: "+1.8%", volume24h: "$5,700", floor: "$540", holders: 156, type: "RESIDENTIAL", image: "/villa.png" },
  { id: "6", project: "Downtown Office Hub", tokenId: "#DOH-0033", shares: 1, listPrice: "$1,200", change: "-0.5%", volume24h: "$2,100", floor: "$1,180", holders: 198, type: "OFFICE", image: "/office.png" },
];

const recentTrades = [
  { token: "#KHP-0039", price: "$450", time: "2 min ago", type: "buy" },
  { token: "#VC2-0012", price: "$2,100", time: "5 min ago", type: "sell" },
  { token: "#RWF-0003", price: "$850", time: "12 min ago", type: "buy" },
  { token: "#GHE-0148", price: "$550", time: "18 min ago", type: "buy" },
  { token: "#DOH-0028", price: "$1,190", time: "25 min ago", type: "sell" },
];

const NftSecondaryMarket = () => {
  const [tab, setTab] = useState<"listings" | "trades">("listings");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h2 className="text-[18px] font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Hexagon size={18} className="text-[#1E3A5F]" /> NFT secondary market
          </h2>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">Trade fractional property ownership tokens</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project or token..."
              className="bg-gray-50 border border-gray-100 focus:border-[#1E3A5F] rounded-xl py-2 pl-9 pr-4 outline-none text-[12px] font-medium w-56"
            />
          </div>
          <button className="p-2 bg-gray-50 hover:bg-[#1E3A5F] hover:text-white rounded-xl transition-all text-gray-600 border border-gray-100">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-8 py-4 border-b border-gray-50 grid grid-cols-4 gap-4">
        {[
          { label: "24h Volume", value: "$50,900", icon: <BarChart3 size={14} />, change: "+14.2%" },
          { label: "Floor (avg)", value: "$694", icon: <DollarSign size={14} />, change: "+2.8%" },
          { label: "Active Listings", value: "156", icon: <Hexagon size={14} />, change: "+6" },
          { label: "Last Trade", value: "2 min ago", icon: <Clock size={14} />, change: "" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-xl text-[#1E3A5F]">{s.icon}</div>
            <div>
              <p className="text-[14px] font-black text-gray-900">{s.value}</p>
              <div className="flex items-center gap-1.5">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                {s.change && (
                  <span className={`text-[9px] font-bold ${s.change.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{s.change}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-8 py-3 border-b border-gray-50 flex gap-1">
        {(["listings", "trades"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${
              tab === t ? "bg-[#1E3A5F] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {t === "listings" ? "Active Listings" : "Recent Trades"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {tab === "listings" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {listedNfts.map((nft) => {
              const isPositive = nft.change.startsWith("+");
              return (
                <div key={nft.id} className="bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                  <div className="relative h-32 overflow-hidden bg-gray-100">
                    <img src={nft.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[8px] font-black text-[#1E3A5F] uppercase tracking-wider shadow-sm">
                        <Hexagon size={8} /> {nft.tokenId}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="bg-black/70 text-white px-2 py-0.5 rounded-md text-[8px] font-bold uppercase">{nft.type}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-black text-gray-900 group-hover:text-[#1E3A5F] transition-colors">{nft.project}</h3>
                    <p className="text-[11px] text-gray-500 mt-1">{nft.shares} shares available</p>

                    <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">List price</p>
                        <p className="text-[18px] font-black text-gray-900">{nft.listPrice}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {nft.change}
                        </div>
                        <p className="text-[9px] text-gray-400 mt-0.5">Vol: {nft.volume24h}</p>
                      </div>
                    </div>

                    <button className="w-full mt-3 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-[11px] font-bold hover:bg-[#2a5080] transition-colors flex items-center justify-center gap-1.5">
                      Trade <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] px-5 py-3 bg-gray-50 border-b border-gray-100">
                {["Token", "Price", "Time", "Type"].map((h) => (
                  <span key={h} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</span>
                ))}
              </div>
              {recentTrades.map((t, i) => (
                <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] px-5 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/40 items-center">
                  <span className="text-[12px] font-bold text-gray-900 font-mono">{t.token}</span>
                  <span className="text-[12px] font-bold text-gray-900">{t.price}</span>
                  <span className="text-[11px] text-gray-500">{t.time}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg w-fit ${
                    t.type === "buy" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                  }`}>{t.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NftSecondaryMarket;
