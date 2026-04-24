"use client";

import React from "react";
import { PieChart, TrendingUp, Wallet, Building2, ArrowUpRight } from "lucide-react";

interface Investment {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  project: { title: string };
}

const DEMO_INVESTMENTS: Investment[] = [
  { id: "inv1", amount: 15000, status: "completed", created_at: "2026-02-15T10:00:00Z", project: { title: "Kigali Heights Residences" } },
  { id: "inv2", amount: 8500, status: "completed", created_at: "2026-03-01T14:30:00Z", project: { title: "Nyarutarama Green Villas" } },
  { id: "inv3", amount: 5000, status: "pending", created_at: "2026-03-28T09:15:00Z", project: { title: "Musanze Lakeside Resort" } },
];

const Portfolio = () => {
  const investments = DEMO_INVESTMENTS;
  const totalInvested = investments.filter(i => i.status === "completed").reduce((s, i) => s + Number(i.amount), 0);
  const activeCount = investments.filter(i => i.status === "completed").length;

  const kpis = [
    { label: "Total invested", value: `$${totalInvested.toLocaleString()}`, sub: `Across ${activeCount} properties`, icon: Wallet },
    { label: "Active holdings", value: String(activeCount), sub: "Tokenized positions", icon: PieChart },
    { label: "YTD distributions", value: "$1,250", sub: "2 payouts received", icon: Building2 },
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white min-h-0">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200/90 pb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">My portfolio</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Holdings overview</h1>
            <p className="text-[13px] text-slate-500 mt-2 max-w-xl font-medium">
              Track tokenized property positions, funding progress, and cash movements.
            </p>
          </div>
          <button type="button"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-[12px] font-black shadow-md shadow-[#1E3A5F]/20 hover:brightness-110 transition-all">
            Marketplace <ArrowUpRight size={16} />
          </button>
        </header>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-4">Summary</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm hover:border-[#1E3A5F]/25 transition-colors">
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
            <span className="text-[11px] font-bold text-slate-400">{investments.length} positions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-5 sm:px-6 py-3 font-black">Asset</th>
                  <th className="px-3 py-3 font-black text-right">Amount</th>
                  <th className="px-3 py-3 font-black text-right">Status</th>
                  <th className="px-3 py-3 font-black text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] shrink-0">
                          <Building2 size={18} />
                        </div>
                        <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">
                          {inv.project?.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-right text-[13px] font-black text-slate-900 tabular-nums">
                      ${Number(inv.amount).toLocaleString()}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                        inv.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>{inv.status}</span>
                    </td>
                    <td className="px-3 py-4 text-right text-[12px] text-slate-400">
                      {new Date(inv.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
