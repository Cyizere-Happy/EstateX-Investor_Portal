"use client";

import React from "react";
import { 
  RotateCw, 
  FileText, 
  MoreVertical, 
  Users,
  Building,
  PieChart,
  TrendingUp,
  Wallet
} from "lucide-react";

const QuickAccess = () => {
  const portfolioItems = [
    { 
      name: "Residential Projects", 
      label: "MARKETPLACE", 
      count: "12 New", 
      color: "bg-[#1E3A5F]", 
      textColor: "text-white",
      icon: <Building size={18} />
    },
    { 
      name: "NFT Ownership", 
      label: "MY ASSETS", 
      count: "8 Shares", 
      color: "bg-white", 
      textColor: "text-gray-900",
      icon: <PieChart size={18} />
    },
    { 
      name: "Dividend Payouts", 
      label: "EARNINGS", 
      count: "+$1,240", 
      color: "bg-white", 
      textColor: "text-gray-900",
      icon: <TrendingUp size={18} />
    },
  ];

  return (
    <section className="px-8 py-4">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Investor Portal</h2>
        <button className="bg-[#1E3A5F]/10 p-2.5 rounded-xl shadow-sm border border-[#1E3A5F]/20 hover:bg-[#1E3A5F]/20 transition-all group text-[#1E3A5F]">
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
              <div className="flex -space-x-3">
                {[1, 2, 3].map((_, j) => (
                  <div key={j} className="w-7 h-7 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
                    <img src={`/jessica.png`} alt="Owner" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button className={`${item.textColor} opacity-40 hover:opacity-100 transition-opacity`}>
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="mt-3.5 z-10">
              <div className="flex items-center gap-2 mb-2">
                <Users size={10} className={`${item.textColor} opacity-60`} />
                <p className={`text-[9px] font-bold ${item.textColor} opacity-60 tracking-widest uppercase`}>{item.count}</p>
              </div>
              <div className="flex flex-col">
                <p className={`text-[9px] font-black ${item.textColor} opacity-40 tracking-wider mb-0.5 uppercase`}>{item.label}</p>
                <p className={`text-lg font-bold ${item.textColor} truncate leading-tight`}>{item.name}</p>
              </div>
            </div>

            <div className={`absolute -right-2 -bottom-2 opacity-10 ${item.textColor}`}>
               {React.cloneElement(item.icon as React.ReactElement, { size: 100 })}
            </div>
          </div>
        ))}

        <div className="bg-white p-4.5 rounded-[28px] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border border-gray-100 flex flex-col h-[156px] relative overflow-hidden">
          <div className="flex items-start justify-between z-10">
            <div className="p-2.5 bg-[#1E3A5F]/5 rounded-xl text-[#1E3A5F]">
              <FileText size={18} />
            </div>
            <div className="relative w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden ring-4 ring-gray-50 bg-gray-200 shrink-0">
               <img src="/jessica.png" alt="Owner" className="w-full h-full object-cover" />
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
