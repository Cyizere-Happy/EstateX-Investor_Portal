"use client";

import React, { useState } from "react";
import { CheckCircle, Lock, Phone, Plus, Folder, FileText, File, Filter, ArrowUpDown, Search, MoreHorizontal, Files, Send, Inbox } from "lucide-react";

const LegalDocuments = () => {
  const [activeTab, setActiveTab] = useState("Todos");

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden pt-6 px-6 pb-6 custom-scrollbar overflow-y-auto transition-all duration-300">

      {/* Suggested for you */}
      <div className="mb-8">
        <h3 className="text-[15px] font-black text-gray-900 mb-4 tracking-tight">Suggested for you</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <CheckCircle className="text-[#1E3A5F]" size={18} />, title: "Complete KYC Verification", desc: "Complete your identity verification to unlock investment features" },
            { icon: <Lock className="text-[#1E3A5F]" size={18} />, title: "Enable 2-FA Authentication", desc: "Add more security to your account by enabling two-step auth" },
            { icon: <Phone className="text-[#1E3A5F]" size={18} />, title: "Update Contact Information", desc: "Keep your details up to date to avoid subscription issues" },
          ].map((action, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-[#1E3A5F]/8 rounded-xl flex items-center justify-center">{action.icon}</div>
              </div>
              <h4 className="text-[13px] font-black text-gray-900 mb-1 leading-tight">{action.title}</h4>
              <p className="text-[10px] font-bold text-gray-400 leading-snug">{action.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Files Section */}
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[24px] border border-gray-100 shadow-sm p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">My Files</h2>
          <button className="bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-xl text-[12px] font-black shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            <Plus size={14} /> Upload Doc
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-50 mb-5 overflow-x-auto no-scrollbar">
          {["Todos", "Contracts", "Certificates", "Legal"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[12px] font-black transition-all relative flex items-center gap-2 ${activeTab === tab ? "text-[#1E3A5F]" : "text-gray-400 hover:text-gray-600"}`}>
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1E3A5F] rounded-t-full" />}
              {tab === "Todos" && <Files size={14} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 py-12">
          <Inbox size={48} strokeWidth={1} />
          <p className="mt-4 font-semibold text-[15px]">No documents yet</p>
          <p className="text-[12px] mt-1">Legal documents, contracts, and certificates related to your investments will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;
