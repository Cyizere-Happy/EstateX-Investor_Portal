"use client";

import React from "react";
import {
  PieChart,
  TrendingUp,
  Wallet,
  MapPin,
  Building2,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const kpis = [
  {
    label: "Total invested",
    value: "$128,400",
    sub: "Across 5 properties",
    icon: Wallet,
  },
  {
    label: "Est. portfolio ROI",
    value: "13.2%",
    sub: "Weighted average",
    icon: TrendingUp,
  },
  {
    label: "Active holdings",
    value: "5",
    sub: "Tokenized positions",
    icon: PieChart,
  },
  {
    label: "YTD distributions",
    value: "$4,180",
    sub: "Paid to wallet",
    icon: Building2,
  },
];

const holdings = [
  {
    name: "Kigali Heights Plaza",
    location: "Kacyiru, Kigali",
    shares: 120,
    value: "$54,000",
    roi: "14.2%",
    fundingPct: 85,
  },
  {
    name: "Vision City II",
    location: "Gacuriro, Kigali",
    shares: 45,
    value: "$94,500",
    roi: "12.8%",
    fundingPct: 62,
  },
  {
    name: "Nyagatare Trade Center",
    location: "Nyagatare, Eastern",
    shares: 200,
    value: "$30,000",
    roi: "15.5%",
    fundingPct: 34,
  },
  {
    name: "Rubavu Waterfront",
    location: "Rubavu, Western",
    shares: 60,
    value: "$51,000",
    roi: "11.2%",
    fundingPct: 91,
  },
];

const activity = [
  {
    title: "Distribution posted",
    detail: "Vision City II — Q2 yield",
    when: "Jul 24, 2026",
    meta: "+$312",
  },
  {
    title: "Share purchase settled",
    detail: "Nyagatare Trade Center",
    when: "Jul 18, 2026",
    meta: "$850",
  },
  {
    title: "KYC renewal approved",
    detail: "Account · Compliance",
    when: "Jul 2, 2026",
    meta: "Done",
  },
];

const Portfolio = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white min-h-0">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200/90 pb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">My portfolio</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Holdings overview</h1>
            <p className="text-[13px] text-slate-500 mt-2 max-w-xl font-medium">
              Track tokenized property positions, funding progress, and cash movements — without CRM noise.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-[12px] font-black shadow-md shadow-[#1E3A5F]/20 hover:brightness-110 transition-all"
          >
            Marketplace
            <ArrowUpRight size={16} />
          </button>
        </header>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-4">Summary</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm hover:border-[#1E3A5F]/25 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] mb-3">
                  <k.icon size={20} strokeWidth={2.25} />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{k.label}</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums mt-1">{k.value}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">{k.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Your properties</h2>
            <span className="text-[11px] font-bold text-slate-400">{holdings.length} positions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-5 sm:px-6 py-3 font-black">Asset</th>
                  <th className="px-3 py-3 font-black">Location</th>
                  <th className="px-3 py-3 font-black text-right">Shares</th>
                  <th className="px-3 py-3 font-black text-right">Value</th>
                  <th className="px-3 py-3 font-black text-right">Est. ROI</th>
                  <th className="px-5 sm:px-6 py-3 font-black w-[140px]">Funding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {holdings.map((h) => (
                  <tr key={h.name} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] shrink-0">
                          <Building2 size={18} />
                        </div>
                        <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">
                          {h.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-[12px] font-semibold text-slate-500 flex items-center gap-1">
                        <MapPin size={12} className="shrink-0 opacity-60" />
                        {h.location}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right text-[13px] font-black text-slate-800 tabular-nums">{h.shares}</td>
                    <td className="px-3 py-4 text-right text-[13px] font-black text-slate-900 tabular-nums">{h.value}</td>
                    <td className="px-3 py-4 text-right">
                      <span className="text-[12px] font-black text-[#1E3A5F] bg-[#1E3A5F]/8 px-2 py-1 rounded-lg tabular-nums">
                        {h.roi}
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-0">
                          <div
                            className="h-full rounded-full bg-[#1E3A5F]"
                            style={{ width: `${h.fundingPct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-black text-slate-500 tabular-nums w-9 shrink-0">{h.fundingPct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-[#1E3A5F]" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Recent activity</h2>
          </div>
          <ul className="rounded-2xl border border-slate-200/90 divide-y divide-slate-100 bg-white shadow-sm">
            {activity.map((a, i) => (
              <li key={i} className="px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div className="min-w-0">
                  <p className="text-[13px] font-black text-slate-900">{a.title}</p>
                  <p className="text-[12px] font-semibold text-slate-500 mt-0.5">{a.detail}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">{a.when}</p>
                </div>
                <span className="text-[12px] font-black text-[#1E3A5F] tabular-nums shrink-0">{a.meta}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
