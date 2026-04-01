"use client";

import React from "react";
import {
  Globe,
  DollarSign,
  BadgePercent,
  Smartphone,
  CreditCard,
  Building,
  ArrowUpRight,
  Users,
  Award,
  Banknote,
} from "lucide-react";

const currencies = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "CAD", symbol: "C$", flag: "🇨🇦" },
  { code: "RWF", symbol: "FRW", flag: "🇷🇼" },
];

const incentives = [
  { label: "Tax Holiday", value: "7 Years", description: "Corporate income tax exemption for strategic investments" },
  { label: "Preferential Rate", value: "15%", description: "Reduced tax rate for registered investments above $250K" },
  { label: "Capital Gains", value: "0%", description: "No capital gains tax for qualifying real estate NFT holdings" },
  { label: "Free Zone Benefits", value: "Active", description: "Kigali Special Economic Zone incentives for property investments" },
];

const paymentGateways = [
  { name: "MTN MoMo", icon: <Smartphone size={18} />, description: "Send RWF directly from your mobile wallet", status: "Live", accent: "bg-yellow-400" },
  { name: "Airtel Money", icon: <Smartphone size={18} />, description: "Airtel mobile money for local transfers", status: "Coming soon", accent: "bg-red-500" },
  { name: "Visa / Mastercard", icon: <CreditCard size={18} />, description: "International card payments via Stripe", status: "Live", accent: "bg-[#1E3A5F]" },
  { name: "Bank Transfer", icon: <Banknote size={18} />, description: "Wire transfer via BK, Equity, or I&M Bank", status: "Live", accent: "bg-emerald-600" },
];

const DiasporaHub = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-white">
      <div className="max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#1E3A5F] rounded-xl text-white">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Diaspora Investment Hub</h2>
              <p className="text-[12px] font-medium text-gray-500">
                Invest in Rwanda&apos;s real estate from anywhere in the world
              </p>
            </div>
          </div>
        </div>

        {/* Multi-currency support */}
        <div className="bg-white rounded-[28px] border border-gray-100 p-6 mb-6 shadow-sm">
          <h3 className="text-[15px] font-black text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-[#1E3A5F]" /> Supported currencies
          </h3>
          <div className="flex flex-wrap gap-3">
            {currencies.map((c) => (
              <div key={c.code} className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1E3A5F] hover:shadow-sm transition-all cursor-pointer">
                <span className="text-xl">{c.flag}</span>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">{c.code}</p>
                  <p className="text-[10px] text-gray-500">{c.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RDB Incentives */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2a5080] rounded-[28px] p-6 mb-6 text-white shadow-xl">
          <h3 className="text-[15px] font-black mb-1 flex items-center gap-2">
            <Award size={16} /> Rwanda Development Board incentives
          </h3>
          <p className="text-[11px] font-medium text-white/60 mb-5">
            Eligible diaspora investors benefit from special RDB-approved programs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {incentives.map((inc) => (
              <div key={inc.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all">
                <p className="text-[22px] font-black">{inc.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/80 mt-1">{inc.label}</p>
                <p className="text-[10px] text-white/50 mt-2 leading-relaxed">{inc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment gateways */}
        <div className="bg-white rounded-[28px] border border-gray-100 p-6 mb-6 shadow-sm">
          <h3 className="text-[15px] font-black text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-[#1E3A5F]" /> Payment gateways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentGateways.map((gw) => (
              <div key={gw.name} className="flex items-center gap-4 px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-sm transition-all">
                <div className={`${gw.accent} text-white p-2.5 rounded-xl`}>{gw.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-900">{gw.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{gw.description}</p>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                  gw.status === "Live" ? "bg-emerald-50 text-emerald-800" : "bg-gray-100 text-gray-500"
                }`}>{gw.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investment clubs + Rwanda Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-[28px] border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} className="text-[#1E3A5F]" />
              <h3 className="text-[15px] font-black text-gray-900">Investment clubs</h3>
            </div>
            <p className="text-[12px] text-gray-500 mb-4">
              Pool resources with other diaspora investors. Create or join a group to co-invest in larger projects.
            </p>
            <button className="w-full py-3 bg-[#1E3A5F] text-white rounded-2xl text-[12px] font-bold hover:bg-[#2a5080] transition-colors shadow-md">
              Browse investment clubs
            </button>
          </div>
          <div className="bg-white rounded-[28px] border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Building size={18} className="text-[#1E3A5F]" />
              <h3 className="text-[15px] font-black text-gray-900">Rwanda Day integration</h3>
            </div>
            <p className="text-[12px] text-gray-500 mb-4">
              Connect with EstateX at annual Rwanda Day events worldwide. Exclusive project previews for attendees.
            </p>
            <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-2xl text-[12px] font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Learn more <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiasporaHub;
