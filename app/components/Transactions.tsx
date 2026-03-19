"use client";

import React from "react";
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Circle,
  Building
} from "lucide-react";

const transactions = [
  { id: 1, name: "Kigali Heights Plaza", type: "Buy Shares", amount: "$2,500", status: "Completed", date: "Jul 25, 2026", color: "purple" },
  { id: 2, name: "Vision City II", type: "NFT Purchase", amount: "$3,000", status: "Processing", date: "Jul 24, 2026", color: "gray" },
  { id: 3, name: "Downtown Office Hub", type: "Monthly Yield", amount: "$1,500", status: "Pending", date: "Jul 22, 2026", color: "green" },
  { id: 4, name: "Nyagatare Trade", type: "Buy Shares", amount: "$850", status: "Completed", date: "Jul 20, 2026", color: "purple" },
];

const Transactions = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#FDFDFD] overflow-hidden pt-8 px-5 pb-5 custom-scrollbar overflow-y-auto transition-all duration-300">
      
      {/* Top Row: Summary Stats */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex gap-1.5 shrink-0">
           <div className="bg-black text-white px-3.5 py-2 rounded-[16px] min-w-[120px] shadow-lg relative overflow-hidden group">
              <p className="text-[7.5px] font-black opacity-40 uppercase tracking-widest mb-0.5">Total Volume</p>
              <p className="text-base font-black italic">70%</p>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 group-hover:bg-white/10 transition-all" />
           </div>
           <div className="bg-yellow-400 text-black px-3.5 py-2 rounded-[16px] min-w-[80px] shadow-md border border-yellow-500/20">
              <p className="text-[7.5px] font-black opacity-40 uppercase tracking-widest mb-0.5">Hired</p>
              <p className="text-base font-black italic">10%</p>
           </div>
           <div className="bg-white/40 border border-white/60 backdrop-blur-md text-black px-3.5 py-2 rounded-[16px] min-w-[80px] shadow-sm relative overflow-hidden">
              <p className="text-[7.5px] font-black opacity-40 uppercase tracking-widest mb-0.5">Project Time</p>
              <p className="text-base font-black italic">15%</p>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10px)' }} />
           </div>
           <div className="bg-white border border-gray-100 text-black px-3.5 py-2 rounded-[16px] min-w-[80px] shadow-sm">
              <p className="text-[7.5px] font-black opacity-40 uppercase tracking-widest mb-0.5">Output</p>
              <p className="text-base font-black italic">5%</p>
           </div>
        </div>

        <div className="flex gap-4">
           {/* ... existing stats ... */}
           <div className="text-center">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-6 h-6 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <Circle size={9} className="fill-gray-400" />
                </div>
                <span className="text-lg font-black text-gray-900 leading-none">91</span>
              </div>
              <p className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest">Active Orders</p>
           </div>
           <div className="text-center">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-6 h-6 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <TrendingUp size={9} />
                </div>
                <span className="text-lg font-black text-gray-900 leading-none">104</span>
              </div>
              <p className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest">Buy Requests</p>
           </div>
           <div className="text-center">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-6 h-6 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <Building size={9} />
                </div>
                <span className="text-lg font-black text-gray-900 leading-none">185</span>
              </div>
              <p className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest">Listed Props</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        
        {/* Left: Schedule/Activity Timeline */}
        <div className="lg:col-span-3 bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex flex-col min-h-[350px]">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-black text-gray-900 tracking-[0.1em] uppercase">Schedule</h3>
              <button className="bg-gray-50 p-1.5 rounded-full text-gray-400 hover:text-gray-900 transition-all">
                <ArrowUpRight size={12} />
              </button>
           </div>
           {/* ... rest of schedule ... */}

           <div className="flex justify-between mb-8 px-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                <div key={i} className={`text-center transition-all ${i === 3 ? 'text-gray-900' : 'text-gray-300'}`}>
                   <p className="text-[10px] font-black uppercase mb-1">{d}</p>
                   <p className={`text-[15px] font-black ${i === 3 ? 'scale-125' : ''}`}>{22 + i}</p>
                </div>
              ))}
           </div>

           <div className="relative flex-1">
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-dotted border-l border-dashed border-gray-200" />
              
              <div className="space-y-10">
                {[
                  { time: "09:00", title: "Monthly Yield Sync", desc: "09:30am - 10:00am", active: true, color: "bg-gray-800 text-white" },
                  { time: "11:00", title: "Kigali Heights Audit", desc: "10:30am - 11:30am", active: false, color: "bg-white text-gray-900 border border-gray-100" },
                  { time: "12:00", title: "Dividend distribution", desc: "12:00pm - 01:00pm", active: false, color: "bg-white text-gray-900 border border-gray-100" },
                  { time: "01:00", title: "Liquidity Check", desc: "01:30pm - 02:00pm", active: false, color: "bg-white text-gray-900 border border-gray-100" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-[8px] font-black tracking-tighter ${item.active ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-white border-gray-100 text-gray-400'}`}>
                       {item.time}
                    </div>
                    <div className={`${item.color} p-3 rounded-[18px] shadow-sm flex-1 group transition-all hover:shadow-md cursor-pointer`}>
                       <h4 className="text-[11px] font-black mb-0.5">{item.title}</h4>
                       <p className="text-[9px] font-bold opacity-60 tracking-tight">{item.desc}</p>
                       {item.active && (
                         <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 absolute top-4 right-4 animate-pulse" />
                       )}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Center: Transaction Table & History Chart */}
        <div className="lg:col-span-6 flex flex-col gap-5">
           {/* Transaction Table */}
           <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[12px] font-black text-gray-900 tracking-[0.1em] leading-none uppercase">Summary</h3>
                 <div className="flex items-center gap-4">
                    <div className="relative">
                       <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                         type="text" 
                         placeholder="Search records..." 
                         className="bg-gray-50 border border-gray-100 rounded-full py-1.5 pl-9 pr-6 text-[10px] font-bold focus:outline-none focus:border-black/10 w-40 transition-all"
                       />
                    </div>
                    <button className="bg-gray-100 p-2 rounded-full text-gray-900 hover:bg-gray-200 transition-all">
                      <ArrowUpRight size={14} />
                    </button>
                 </div>
              </div>
              {/* ... table ... */}

              <div className="overflow-x-auto flex-1 custom-scrollbar">
                 <table className="w-full text-left">
                    <thead className="border-b border-gray-50">
                       <tr className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                          <th className="px-4 py-4"><input type="checkbox" className="rounded" /></th>
                          <th className="px-4 py-4">Asset Name</th>
                          <th className="px-4 py-4">Type</th>
                          <th className="px-4 py-4">Amount</th>
                          <th className="px-4 py-4 text-center">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50/50">
                       {transactions.map(tx => (
                         <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                           <td className="px-4 py-4"><input type="checkbox" className="rounded" defaultChecked={tx.id === 2} /></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-gray-900 overflow-hidden flex items-center justify-center text-white text-[10px]">
                                    {tx.name[0]}
                                 </div>
                                 <span className="text-[11px] font-black text-gray-900">{tx.name}</span>
                              </div>
                           </td>
                           <td className="px-4 py-3 text-[10px] font-bold text-gray-500">{tx.type}</td>
                           <td className="px-4 py-3 text-[11px] font-black text-gray-900">{tx.amount}</td>
                           <td className="px-4 py-3">
                              <div className={`mx-auto w-fit px-2 py-0.5 rounded-full text-[9px] font-black capitalize ${
                                tx.color === 'purple' ? 'bg-purple-100 text-purple-600' : 
                                tx.color === 'green' ? 'bg-green-100 text-green-600' : 
                                'bg-gray-100 text-gray-400'
                              }`}>
                                {tx.status}
                              </div>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* History Chart */}
           <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 h-64 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[12px] font-black text-gray-900 tracking-[0.1em] uppercase">Historical</h3>
                 <div className="flex gap-3 text-[8px] font-black uppercase tracking-widest">
                    <span className="text-yellow-400 flex items-center gap-1.5"><Circle size={6} className="fill-yellow-400" /> Capital</span>
                    <span className="text-gray-900 flex items-center gap-1.5"><Circle size={6} className="fill-gray-900" /> Yield</span>
                    <select className="bg-transparent border-none outline-none cursor-pointer">
                      <option>2024</option>
                    </select>
                 </div>
              </div>
              {/* ... chart svg ... */}

              {/* Dotted Line Chart SVG */}
              <div className="absolute inset-0 top-16 px-8 flex items-end">
                <svg className="w-full h-full opacity-60" preserveAspectRatio="none">
                  <path 
                    d="M0 60 Q 50 20, 100 80 T 200 40 T 300 90 T 400 30 T 500 70" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth="2" 
                    strokeDasharray="4 6"
                  />
                  <path 
                    d="M0 80 Q 50 50, 100 110 T 200 70 T 300 120 T 400 60 T 500 100" 
                    fill="none" 
                    stroke="#FACC15" 
                    strokeWidth="2" 
                    strokeDasharray="4 6"
                  />
                </svg>
              </div>

              <div className="flex justify-between mt-auto z-10 relative text-[10px] font-black text-gray-300 uppercase tracking-widest">
                 {['Jan', 'Feb', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map(m => (
                   <span key={m}>{m}</span>
                 ))}
              </div>

              <div className="absolute left-[40%] top-[40%] bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-2xl scale-0 group-hover:scale-100 transition-transform origin-bottom">
                 Growth: +12.4%
              </div>
           </div>
        </div>

        {/* Right: Dot Report & Composition */}
        <div className="lg:col-span-3 flex flex-col gap-5">
           {/* Dot Grid Report */}
           <div className="bg-[#1C1C1E] rounded-[32px] p-6 text-white shadow-xl flex-1 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-[13px] font-black tracking-tight">Market Activity</h3>
                 <button className="bg-white/10 p-2 rounded-full text-white/50 hover:text-white transition-all">
                    <ArrowUpRight size={14} />
                 </button>
              </div>
              
              <div className="flex gap-3 mb-3">
                 <div>
                   <p className="text-2xl font-black flex items-center gap-1.5">63 <ArrowUpRight size={18} className="text-yellow-400" /></p>
                   <p className="text-[8px] font-bold opacity-40 uppercase">Buys</p>
                 </div>
                 <div>
                   <p className="text-2xl font-black flex items-center gap-1.5">12 <ArrowDownRight size={18} className="opacity-40" /></p>
                   <p className="text-[8px] font-bold opacity-40 uppercase">Sells</p>
                 </div>
              </div>

              {/* Dot Matrix Grid */}
              <div className="grid grid-cols-12 gap-1.5 mt-8 opacity-40 group-hover:opacity-100 transition-opacity">
                 {Array.from({ length: 60 }).map((_, i) => (
                   <div key={i} className={`w-1.5 h-1.5 rounded-full ${i % 7 === 0 ? 'bg-yellow-400' : 'bg-white/20'}`} />
                 ))}
              </div>
           </div>

           {/* Composition Donut */}
           <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-56">
              <h3 className="text-[12px] font-black text-gray-900 tracking-[0.1em] uppercase">Composition</h3>
              
              <div className="relative w-24 h-24 mx-auto">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="transparent" stroke="#F5F5F5" strokeWidth="8" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      fill="transparent" 
                      stroke="#000" 
                      strokeWidth="8" 
                      strokeDasharray="251" 
                      strokeDashoffset="80" 
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pb-0.5">
                    <p className="text-lg font-black text-gray-900">345</p>
                    <p className="text-[8px] font-black text-gray-400 uppercase">Total</p>
                 </div>
              </div>

              <div className="flex justify-center gap-4 text-[9px] font-black tracking-tight">
                 <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-black" /> 70% Crypto</span>
                 <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-gray-200" /> 30% FIAT</span>
              </div>
           </div>
        </div>

      </div>

      <style jsx global>{`
        .bg-dotted {
          mask-image: linear-gradient(to bottom, black 50%, transparent 50%);
          mask-size: 1px 12px;
        }
      `}</style>
    </div>
  );
};

export default Transactions;
