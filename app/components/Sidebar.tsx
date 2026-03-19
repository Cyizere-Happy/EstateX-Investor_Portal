"use client";

import React from "react";
import { 
  Building,
  Users, 
  TrendingUp,
  Plus,
  Layout,
  PieChart,
  Wallet,
  FileText
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-60 bg-white flex flex-col h-screen sticky top-0 z-20">
      {/* White Logo Header */}
      <div className="px-6 py-8 shrink-0">
        <div className="flex items-center gap-2.5">
          <Building size={24} className="text-[#1E3A5F] fill-[#1E3A5F]" />
          <h1 className="text-xl font-black tracking-tight text-[#1E3A5F]">EstateX</h1>
        </div>
      </div>

      {/* Blue Main Nav Area */}
      <div className="flex-1 bg-[#1E3A5F] m-0 rounded-tr-[40px] flex flex-col p-4 overflow-hidden">
        <button className="bg-white text-[#1E3A5F] py-3 px-6 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 mb-6 text-[13px] flex items-center justify-center gap-2 group shrink-0 transform hover:-translate-y-1">
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Invest Now
        </button>

        <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1.5 custom-scrollbar -mr-1.5">
          {[
            { icon: <Layout size={18} />, label: "Dashboard", id: "dashboard" },
            { icon: <Building size={18} />, label: "Marketplace", id: "marketplace" },
            { icon: <PieChart size={18} />, label: "My Portfolio", id: "portfolio" },
            { icon: <Wallet size={18} />, label: "Transactions", id: "transactions" },
            { icon: <FileText size={18} />, label: "Legal Documents", id: "documents" },
            { icon: <Users size={18} />, label: "Governance", id: "governance" },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                activeView === item.id 
                  ? "bg-white/10 text-white backdrop-blur-sm border border-white/10" 
                  : "hover:bg-white/5 opacity-80 hover:opacity-100 text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-semibold text-[13.5px]">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-white/10 shrink-0">
          <p className="text-[9px] uppercase tracking-widest font-black mb-5 opacity-40 text-white">PORTFOLIO SUMMARY</p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-white/10 rounded-lg shrink-0">
                <Wallet size={16} className="text-white/80" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1.5">
                  <p className="text-[12px] font-bold text-white">Investment Limit</p>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div className="bg-white h-full w-[85%] shadow-[0_0_8px_white]" />
                </div>
                <p className="text-[9px] font-medium opacity-40 leading-none text-white">$8,500 / $10,000</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-white/10 rounded-lg shrink-0">
                <TrendingUp size={16} className="text-white/80" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1.5">
                  <p className="text-[12px] font-bold text-white">Est. ROI</p>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div className="bg-green-400 h-full w-[12%] shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                </div>
                <p className="text-[9px] font-medium opacity-40 leading-none text-white">+12.4% Annual</p>
              </div>
            </div>
          </div>

          <a href="#" className="flex items-center gap-2 mt-6 text-[11px] font-bold hover:underline opacity-60 hover:opacity-100 group transition-all text-white">
            <TrendingUp size={12} />
            View Full Report 
            <span className="group-hover:translate-x-1 transition-transform inline-block">↗</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
