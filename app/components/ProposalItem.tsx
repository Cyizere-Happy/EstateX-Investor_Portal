"use client";

import React from "react";
import { Check, MoreHorizontal } from "lucide-react";

interface ProposalProps {
  title: string;
  status: string;
  sessions: number;
  total: number;
  icon: React.ReactNode;
}

const SegmentedProgress = ({ completed, total }: { completed: number; total: number }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div 
          key={i} 
          className={`w-1.5 h-4 rounded-full transition-all duration-500 ${
            i < completed ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  );
};

const ProposalItem = ({ title, status, sessions, total, icon }: ProposalProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-gray-50 hover:shadow-lg transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#1E3A5F]/5 group-hover:text-[#1E3A5F] transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-[14px] font-black text-gray-900 leading-tight mb-0.5">{title}</h4>
          <p className="text-[11px] font-bold text-gray-400">{status}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Votes cast: {sessions}/{total}</p>
          <SegmentedProgress completed={sessions} total={total} />
        </div>
        <button className="p-2 text-gray-200 hover:text-gray-900 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProposalItem;
