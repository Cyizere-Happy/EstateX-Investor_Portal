"use client";

import React, { useEffect, useState } from "react";
import { RotateCw, FileText, Building, PieChart, TrendingUp, Loader2 } from "lucide-react";
import { api } from "../../lib/api";

const QuickAccess = () => {
  const [stats, setStats] = useState({ projects: 0, investments: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api("/public/projects?status=funding_open&limit=1").then((r) => r.meta?.total ?? r.data?.length ?? 0),
      api("/investments/my").then((r) => r.data?.length ?? 0).catch(() => 0),
    ]).then(([projRes, invRes]) => {
      setStats({
        projects: projRes.status === "fulfilled" ? (projRes.value as number) : 0,
        investments: invRes.status === "fulfilled" ? (invRes.value as number) : 0,
        earnings: 0,
      });
      setLoading(false);
    });
  }, []);

  const portfolioItems = [
    {
      name: "Available Projects",
      label: "MARKETPLACE",
      count: loading ? "..." : `${stats.projects} Listed`,
      color: "bg-[#1E3A5F]",
      textColor: "text-white",
      icon: <Building size={18} />,
    },
    {
      name: "My Investments",
      label: "MY ASSETS",
      count: loading ? "..." : `${stats.investments} Active`,
      color: "bg-white",
      textColor: "text-gray-900",
      icon: <PieChart size={18} />,
    },
    {
      name: "Earnings",
      label: "DIVIDENDS",
      count: loading ? "..." : stats.earnings > 0 ? `+$${stats.earnings.toLocaleString()}` : "No payouts yet",
      color: "bg-white",
      textColor: "text-gray-900",
      icon: <TrendingUp size={18} />,
    },
  ];

  return (
    <section className="px-8 py-4">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Investor Portal</h2>
        <button onClick={() => window.location.reload()} className="bg-[#1E3A5F]/10 p-2.5 rounded-xl shadow-sm border border-[#1E3A5F]/20 hover:bg-[#1E3A5F]/20 transition-all group text-[#1E3A5F]">
          <RotateCw size={20} className="group-active:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">PORTFOLIO OVERVIEW</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {portfolioItems.map((item, i) => (
          <div
            key={i}
            className={`${item.color} p-4.5 rounded-[28px] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100 flex flex-col h-[156px] relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-auto z-10">
              <div className={`p-2.5 rounded-xl ${item.color === "bg-[#1E3A5F]" ? "bg-white/10" : "bg-[#1E3A5F]/5"}`}>
                {item.icon}
              </div>
            </div>
            <div className="mt-3.5 z-10">
              <p className={`text-[9px] font-bold ${item.textColor} opacity-60 tracking-widest uppercase mb-1`}>{item.count}</p>
              <div className="flex flex-col">
                <p className={`text-[9px] font-black ${item.textColor} opacity-40 tracking-wider mb-0.5 uppercase`}>{item.label}</p>
                <p className={`text-lg font-bold ${item.textColor} truncate leading-tight`}>{item.name}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white p-4.5 rounded-[28px] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100 flex flex-col h-[156px] relative overflow-hidden">
          <div className="flex items-start justify-between z-10">
            <div className="p-2.5 bg-[#1E3A5F]/5 rounded-xl text-[#1E3A5F]">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-auto z-10">
            <h4 className="text-[15px] font-bold text-gray-800 mb-1">EstateX Whitepaper</h4>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Docs</span>
              <span className="text-[10px] font-bold text-[#1E3A5F]">VIEW</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-black">
            <FileText size={120} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
