"use client";

import React from "react";
import { Building, Circle, TrendingUp } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
  project: { title: string };
}

const DEMO_TRANSACTIONS: Transaction[] = [
  { id: "tx1", amount: 15000, status: "completed", method: "stripe", created_at: "2026-02-15T10:00:00Z", project: { title: "Kigali Heights Residences" } },
  { id: "tx2", amount: 8500, status: "completed", method: "momo", created_at: "2026-03-01T14:30:00Z", project: { title: "Nyarutarama Green Villas" } },
  { id: "tx3", amount: 5000, status: "pending", method: "stripe", created_at: "2026-03-28T09:15:00Z", project: { title: "Musanze Lakeside Resort" } },
  { id: "tx4", amount: 2000, status: "completed", method: "momo", created_at: "2026-03-20T16:45:00Z", project: { title: "Rubavu Waterfront Apartments" } },
  { id: "tx5", amount: 12000, status: "completed", method: "stripe", created_at: "2026-01-10T08:30:00Z", project: { title: "Kigali Heights Residences" } },
];

const Transactions = () => {
  const transactions = DEMO_TRANSACTIONS;
  const completed = transactions.filter((t) => t.status === "completed");
  const pending = transactions.filter((t) => t.status === "pending");
  const totalVolume = completed.reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden pt-8 px-5 pb-5 custom-scrollbar overflow-y-auto transition-all duration-300">
      {/* Top Row: Summary Stats */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex gap-1.5 shrink-0">
          <div className="bg-[#1E3A5F] text-white px-3.5 py-2 rounded-[16px] min-w-[120px] shadow-lg relative overflow-hidden group">
            <p className="text-[7.5px] font-black opacity-60 uppercase tracking-widest mb-0.5">Total Volume</p>
            <p className="text-base font-black italic">${totalVolume.toLocaleString()}</p>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 skew-x-12 group-hover:bg-white/15 transition-all" />
          </div>
          <div className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-3.5 py-2 rounded-[16px] min-w-[80px] shadow-sm border border-[#1E3A5F]/15">
            <p className="text-[7.5px] font-black opacity-50 uppercase tracking-widest mb-0.5">Completed</p>
            <p className="text-base font-black italic">{completed.length}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 text-gray-900 px-3.5 py-2 rounded-[16px] min-w-[80px] shadow-sm">
            <p className="text-[7.5px] font-black opacity-40 uppercase tracking-widest mb-0.5">Pending</p>
            <p className="text-base font-black italic">{pending.length}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-6 h-6 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <Circle size={9} className="fill-gray-400" />
              </div>
              <span className="text-lg font-black text-gray-900 leading-none">{transactions.length}</span>
            </div>
            <p className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest">Total Txns</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="lg:col-span-12 flex flex-col gap-5">
          <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-black text-gray-900 tracking-[0.1em] leading-none uppercase">Transaction History</h3>
            </div>
            <div className="overflow-x-auto flex-1 custom-scrollbar">
              <table className="w-full text-left">
                <thead className="border-b border-gray-50">
                  <tr className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    <th className="px-4 py-4">Asset Name</th>
                    <th className="px-4 py-4">Method</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4 text-center">Status</th>
                    <th className="px-4 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1E3A5F] overflow-hidden flex items-center justify-center text-white text-[10px]">
                            {tx.project.title[0]}
                          </div>
                          <span className="text-[11px] font-black text-gray-900">{tx.project.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">{tx.method}</td>
                      <td className="px-4 py-3 text-[11px] font-black text-gray-900">${Number(tx.amount).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className={`mx-auto w-fit px-2 py-0.5 rounded-full text-[9px] font-black capitalize ${
                          tx.status === 'completed' ? 'bg-[#1E3A5F]/10 text-[#1E3A5F]' :
                          tx.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {tx.status}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] text-gray-400">
                        {new Date(tx.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
