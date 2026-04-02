"use client";

import React, { useEffect, useState } from "react";
import { PieChart, TrendingUp, Wallet, MapPin, Building2, ArrowUpRight, Clock, Loader2, Inbox } from "lucide-react";
import { api } from "../../lib/api";

interface Investment {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  project?: { id: string; title: string; slug: string; project_status: string };
}

const Portfolio = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/investments/my?limit=50")
      .then((res) => setInvestments(res.data || []))
      .catch(() => setInvestments([]))
      .finally(() => setLoading(false));
  }, []);

  const totalInvested = investments.filter(i => i.status === "completed").reduce((s, i) => s + Number(i.amount), 0);
  const activeCount = investments.filter(i => i.status === "completed").length;

  const kpis = [
    { label: "Total invested", value: totalInvested > 0 ? `$${totalInvested.toLocaleString()}` : "$0", sub: `Across ${activeCount} properties`, icon: Wallet },
    { label: "Active holdings", value: String(activeCount), sub: "Tokenized positions", icon: PieChart },
    { label: "YTD distributions", value: "$0", sub: "No payouts yet", icon: Building2 },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-[#1E3A5F]" size={28} /></div>
    );
  }

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

          {investments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Inbox size={48} strokeWidth={1} />
              <p className="mt-4 font-semibold text-[15px]">No investments yet</p>
              <p className="text-[12px] mt-1">Your tokenized property positions will appear here once you invest.</p>
            </div>
          ) : (
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
                            {inv.project?.title || "Unknown project"}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-right text-[13px] font-black text-slate-900 tabular-nums">
                        ${Number(inv.amount).toLocaleString()}
                      </td>
                      <td className="px-3 py-4 text-right">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                          inv.status === "completed" ? "bg-emerald-50 text-emerald-700" : inv.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-neutral-50 text-neutral-500"
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
          )}
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
