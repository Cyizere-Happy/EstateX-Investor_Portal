"use client";

import React, { useState } from "react";
import { 
  CheckCircle, 
  Lock, 
  Phone, 
  Plus, 
  Folder, 
  FileText, 
  Archive, 
  File, 
  Filter, 
  ArrowUpDown, 
  Search, 
  MoreHorizontal,
  ChevronRight,
  Files,
  Send
} from "lucide-react";

const suggestedActions = [
  {
    icon: <CheckCircle className="text-[#1E3A5F]" size={18} />,
    title: "Complete Registration",
    desc: "Complete your profile and make the most of EstateX",
    date: "23 Jan, 2026",
    status: null
  },
  {
    icon: <Lock className="text-[#1E3A5F]" size={18} />,
    title: "Enable 2-FA Authentication",
    desc: "Add more security to your account by enabling two-step auth",
    date: "23 Jan, 2026",
    status: "Enabled"
  },
  {
    icon: <Phone className="text-[#1E3A5F]" size={18} />,
    title: "Update Contact Information",
    desc: "Keep your details up to date to avoid subscription issues",
    date: "23 Jan, 2026",
    status: "Updated"
  }
];

const documents = [
  { id: 1, name: "Scann_158.folder", type: "folder", recipient: "Olivia Bennett", date: "02 Jan 2026", status: "Draft", color: "orange" },
  { id: 2, name: "settlement.from.client.45.folder", type: "folder", recipient: "Graziele Lopes", date: "07 Jan 2026", status: "Trash", color: "orange" },
  { id: 3, name: "doument_1.zip", type: "zip", recipient: "Sophia Carter", date: "07 Jan 2026", status: "Completed", color: "orange" },
  { id: 4, name: "ATTACHEMENT 836128956.pdf", type: "pdf", recipient: "James Hayes", date: "12 Jan 2026", status: "Draft", color: "red" },
  { id: 5, name: "doument_1.zip", type: "zip", recipient: "Ethan Cooper", date: "15 Jan 2026", status: "Completed", color: "gray" },
  { id: 6, name: "DF_ASKD_UED_ch...", type: "doc", recipient: "Rafayel Diaz", date: "21 Jan 2026", status: "Expired", color: "gray" },
  { id: 7, name: "ATTACHEMENT 836128956.pdf", type: "pdf", recipient: "Mia Davis", date: "21 Jan 2026", status: "Wait", color: "red" },
  { id: 8, name: "legal-tenure.doc", type: "doc", recipient: "Cyrus Frank", date: "21 Jan 2026", status: "Expired", color: "gray" },
  { id: 9, name: "legal-tenure.doc", type: "doc", recipient: "Yohan Samel", date: "21 Jan 2026", status: "Wait", color: "gray" },
];

const LegalDocuments = () => {
  const [activeTab, setActiveTab] = useState("Todos");

  const getIcon = (type: string) => {
    switch(type) {
      case 'folder': return <Folder size={16} className="text-[#1E3A5F] fill-[#1E3A5F]/25" />;
      case 'zip': return <Archive size={16} className="text-[#1E3A5F] fill-[#1E3A5F]/20" style={{ opacity: 0.9 }} />;
      case 'pdf': return <FileText size={16} className="text-[#1E3A5F]" />;
      case 'doc': return <File size={16} className="text-gray-400" />;
      default: return <File size={16} />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-[#1E3A5F]/10 text-[#1E3A5F]';
      case 'Draft': return 'bg-gray-100 text-gray-600';
      case 'Trash': return 'bg-slate-100 text-slate-500';
      case 'Expired': return 'bg-slate-50 text-slate-500';
      case 'Wait': return 'bg-[#1E3A5F]/5 text-[#1E3A5F]';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden pt-6 px-6 pb-6 custom-scrollbar overflow-y-auto transition-all duration-300">
      
      {/* Suggested for you */}
      <div className="mb-8">
        <h3 className="text-[15px] font-black text-gray-900 mb-4 tracking-tight">Suggested for you</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {suggestedActions.map((action, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-[#1E3A5F]/8 rounded-xl flex items-center justify-center">
                  {action.icon}
                </div>
                {action.status && (
                  <span className="text-[9px] font-black text-[#1E3A5F] bg-[#1E3A5F]/8 px-2 py-0.5 rounded-full border border-[#1E3A5F]/15">
                    {action.status}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Juridico &gt; Freelancers</p>
              <h4 className="text-[13px] font-black text-gray-900 mb-1 leading-tight">{action.title}</h4>
              <p className="text-[10px] font-bold text-gray-400 leading-snug mb-4">{action.desc}</p>
              <p className="text-[9px] font-bold text-gray-300">Modified on {action.date}</p>
            </div>
          ))}
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-[20px] flex flex-col items-center justify-center p-4 group cursor-pointer hover:bg-white hover:border-[#1E3A5F]/30 transition-all">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-gray-400 group-hover:text-[#1E3A5F] transition-colors">
                <Plus size={20} />
             </div>
             <p className="text-[11px] font-black text-gray-400 group-hover:text-[#1E3A5F] transition-colors">Add Suggestion</p>
          </div>
        </div>
      </div>

      {/* My Files Section */}
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[24px] border border-gray-100 shadow-sm p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">My Files</h2>
          <button className="bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-xl text-[12px] font-black shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            <Plus size={14} /> Create Doc
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="flex gap-6 border-b border-gray-50 mb-5 overflow-x-auto no-scrollbar">
          {["Todos", "Drafts", "Sent", "Signed", "Expired", "Canceled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[12px] font-black transition-all relative flex items-center gap-2 ${
                activeTab === tab ? "text-[#1E3A5F]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1E3A5F] rounded-t-full" />
              )}
              {tab === "Todos" && <Files size={14} />}
              {tab === "Sent" && <Send size={14} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-lg text-[11px] font-black text-gray-500 hover:bg-gray-50">
              <Filter size={12} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-lg text-[11px] font-black text-gray-500 hover:bg-gray-50">
              <ArrowUpDown size={12} /> Ordenar
            </button>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-gray-400">Show signatories</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-[11px] font-black">Bulk Actions</button>
             <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search files..."
                  className="bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-9 pr-4 text-[11px] font-bold focus:outline-none w-48"
                />
             </div>
          </div>
        </div>

        {/* File Table */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-300 uppercase tracking-widest border-b border-gray-50">
                <th className="px-4 py-3"><input type="checkbox" className="rounded" /></th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Recipients</th>
                <th className="px-4 py-3">Last Modified</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {documents.map((doc) => (
                <tr key={doc.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                        {getIcon(doc.type)}
                      </div>
                      <span className="text-[11px] font-black text-gray-900 truncate max-w-[180px]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center text-[9px] font-black text-[#1E3A5F]">
                          {doc.recipient[0]}
                       </div>
                       <span className="text-[11px] font-bold text-gray-600">{doc.recipient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[11px] font-bold text-gray-400">{doc.date}</td>
                  <td className="px-4 py-3">
                    <div className={`mx-auto w-fit px-2.5 py-0.5 rounded-full text-[9px] font-black flex items-center gap-1.5 ${getStatusStyle(doc.status)}`}>
                       <div className="w-1 h-1 rounded-full bg-current" />
                       {doc.status}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-300 hover:text-gray-900">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;
