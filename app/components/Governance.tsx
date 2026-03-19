"use client";

import React from "react";
import { 
  Building, 
  ChevronDown, 
  Plus, 
  Circle,
  Vote,
  History,
  Info,
  ArrowUpRight,
  Gavel,
  TrendingUp
} from "lucide-react";
import ProposalItem from "./ProposalItem";

const Governance = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#FDFDFD] overflow-hidden p-8 custom-scrollbar overflow-y-auto">
      {/* Top Section: Results & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Voting Power Blob Chart (Reference inspired) */}
        <div className="lg:col-span-2 bg-[#E2DED0] rounded-[48px] p-8 relative overflow-hidden h-[340px] group shadow-inner">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-[16px] font-black text-gray-900 mb-1">Your Voting</h3>
              <p className="text-[16px] font-black text-gray-900">Results for Today</p>
            </div>

            <div className="flex gap-6 mt-auto">
              {[
                { label: "Voting activity", color: "bg-yellow-400" },
                { label: "Proposals engagement", color: "bg-red-500" },
                { label: "Delegation time", color: "bg-gray-800" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3.5 h-1 ${item.color} rounded-full`} />
                  <span className="text-[11px] font-bold text-gray-600 tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Blobs Layout */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="relative w-full h-full">
                {/* Yellow Big Blob */}
                <div className="absolute top-[10%] right-[15%] w-56 h-56 bg-yellow-400 rounded-full blur-[60px] opacity-60 animate-pulse" />
                <div className="absolute top-[25%] right-[25%] bg-white/10 backdrop-blur-md rounded-full p-6 text-center shadow-2xl border border-white/20 transform hover:scale-110 transition-transform pointer-events-auto cursor-help">
                   <p className="text-[18px] font-black text-gray-900">1.875</p>
                   <p className="text-[9px] font-bold text-gray-500 uppercase">Weight</p>
                </div>

                {/* Red Small Blob */}
                <div className="absolute bottom-[20%] left-[35%] w-32 h-32 bg-red-500 rounded-full blur-[40px] opacity-70" />
                <div className="absolute bottom-[30%] left-[40%] bg-white/10 backdrop-blur-md rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-xl border border-white/20 pointer-events-auto cursor-help">
                   <p className="text-[12px] font-black text-gray-900">850</p>
                   <p className="text-[7px] font-bold text-gray-500 uppercase">Power</p>
                </div>

                {/* Dark Circle */}
                <div className="absolute top-[20%] left-[30%] bg-gray-900 rounded-full w-20 h-20 flex flex-col items-center justify-center text-white shadow-2xl pointer-events-auto cursor-help transform -translate-x-10 translate-y-5">
                   <p className="text-[13px] font-black">2.30</p>
                   <p className="text-[7px] font-bold opacity-60 uppercase">Hours</p>
                </div>
             </div>
          </div>

          <button className="absolute top-8 right-8 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-xl hover:scale-110 transition-all z-20">
             <Info size={18} />
          </button>
        </div>

        {/* Training Days Calendar (Reference inspired) */}
        <div className="bg-[#1C1C1E] rounded-[48px] p-8 text-white relative overflow-hidden flex flex-col h-[340px] shadow-2xl">
           <div className="flex items-center justify-between mb-8 z-10">
              <h3 className="text-[15px] font-black tracking-tight">Governance Calendar</h3>
              <div className="flex items-center gap-1 text-[11px] font-bold opacity-40 cursor-pointer hover:opacity-100 transition-all">
                June <ChevronDown size={14} />
              </div>
           </div>

           <div className="grid grid-cols-7 gap-y-6 text-center text-[10px] font-black opacity-30 mb-4 z-10 uppercase tracking-[0.2em]">
              {['m', 't', 'w', 't', 'f', 's', 's'].map((d, i) => <div key={i}>{d}</div>)}
           </div>

           <div className="grid grid-cols-7 gap-y-4 text-[13px] font-bold z-10 relative">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 1 || day === 5;
                const isPast = day < 12 && !isSelected;
                const isToday = day === 12;
                
                return (
                  <div key={i} className="flex justify-center items-center h-8">
                     <div className={`w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                       isSelected ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 
                       isPast ? 'text-white opacity-40' : 
                       isToday ? 'border border-white/20' : 
                       'opacity-80 hover:bg-white/5'
                     }`}>
                       {day}
                     </div>
                  </div>
                );
              })}
           </div>

           <div className="mt-auto flex items-center gap-4 text-[9px] font-bold opacity-40 z-10 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><Circle size={8} /> Current</div>
              <div className="flex items-center gap-1.5"><Circle size={8} className="fill-yellow-400 text-yellow-400" /> Voted</div>
              <div className="flex items-center gap-1.5"><Circle size={8} strokeWidth={3} /> Scheduled</div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Proposals & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-6">
           {/* Steps Gauge (Reference inspired) */}
           <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-1">
                 <div>
                   <h3 className="text-[17px] font-black text-gray-900 mb-0.5 tracking-tight">Active Quorum</h3>
                   <p className="text-[11px] font-bold text-gray-400">Vote on Kigali Heights Proposal</p>
                 </div>
              </div>

              <div className="relative w-36 h-36 mx-auto mt-4">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="64" fill="transparent" stroke="#F5F5F5" strokeWidth="12" />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      fill="transparent" 
                      stroke="url(#gradient-red)" 
                      strokeWidth="12" 
                      strokeDasharray="402" 
                      strokeDashoffset="140" 
                      strokeLinecap="round"
                    />
                    <defs>
                       <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FB7185" />
                          <stop offset="100%" stopColor="#F43F5E" />
                       </linearGradient>
                    </defs>
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pb-2">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">reached</p>
                    <p className="text-[22px] font-black text-gray-900">68%</p>
                 </div>
                 <div className="absolute top-[10%] right-[10%] bg-white shadow-xl rounded-full w-8 h-8 flex items-center justify-center text-[9px] font-black border border-gray-50">
                    5.2k
                 </div>
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 text-[12px] font-black text-gray-900 hover:text-red-500 transition-colors">
                View Voting Statistics <Plus size={16} className="bg-black text-white rounded-full p-1" />
              </button>
           </div>

           {/* Weight Loss Progress (Reference inspired) */}
           <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm">
              <div className="flex justify-between items-end mb-6">
                 <div>
                   <h3 className="text-[17px] font-black text-gray-900 tracking-tight">Milestone Funding</h3>
                 </div>
                 <p className="text-[14px] font-black text-[#1E3A5F]">68% <span className="text-[10px] text-gray-400 uppercase">Released</span></p>
              </div>
              <div className="relative h-10 flex items-center px-2">
                 <div className="w-full h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100 flex items-center px-1">
                    <div className="h-2.5 bg-black rounded-full transition-all duration-1000 shadow-[0_0_10px_black]" style={{ width: '68%' }} />
                 </div>
                 <div className="absolute left-[68%] -translate-x-1/2 -top-1">
                    <div className="bg-black text-white px-2 py-0.5 rounded-full text-[9px] font-black shadow-lg">
                       $53.2k
                    </div>
                 </div>
              </div>
              <div className="flex justify-between mt-3 px-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <span>$0</span>
                 <span>Target: $100k</span>
              </div>
           </div>
        </div>

        {/* Proposals List (Reference inspired) */}
        <div className="lg:col-span-2 bg-white rounded-[48px] p-8 border border-gray-50 shadow-sm flex flex-col overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-black text-gray-900 tracking-tight">Active Proposals</h3>
              <button className="flex items-center gap-2 text-[12px] font-black text-gray-600 hover:text-black transition-colors">
                New Proposal <Plus size={20} className="bg-black text-white rounded-xl p-1" />
              </button>
           </div>

           <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
              <ProposalItem 
                title="Property Redesign" 
                status="Author: Alice McCain" 
                sessions={9} 
                total={12} 
                icon={<Building size={20} />} 
              />
              <ProposalItem 
                title="Yield Optimization" 
                status="Author: Jennifer Lubin" 
                sessions={6} 
                total={10} 
                icon={<TrendingUp size={20} />} 
              />
              <ProposalItem 
                title="Governance Update" 
                status="Author: Johnson Cooper" 
                sessions={4} 
                total={8} 
                icon={<Gavel size={20} />} 
              />
              <ProposalItem 
                title="Community Grant" 
                status="Author: DAO Core" 
                sessions={8} 
                total={10} 
                icon={<History size={20} />} 
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
