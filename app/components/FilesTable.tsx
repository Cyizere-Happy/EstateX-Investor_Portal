"use client";

import React from "react";
import { Building, LayoutGrid, Info } from "lucide-react";

interface Project {
  id: string;
  title: string;
  location: string;
  expected_roi: number;
  fundingPct: number;
}

const DEMO_PROJECTS: Project[] = [
  { id: "1", title: "Kigali Heights Residences", location: "Kimironko, Gasabo", expected_roi: 14.5, fundingPct: 72 },
  { id: "2", title: "Nyarutarama Green Villas", location: "Remera, Gasabo", expected_roi: 12.8, fundingPct: 45 },
  { id: "3", title: "Musanze Lakeside Resort", location: "Muhoza, Musanze", expected_roi: 18.2, fundingPct: 28 },
  { id: "4", title: "Rubavu Waterfront Apartments", location: "Gisenyi, Rubavu", expected_roi: 15.0, fundingPct: 61 },
  { id: "5", title: "Huye University Park", location: "Tumba, Huye", expected_roi: 11.5, fundingPct: 89 },
];

const FilesTable = () => {
  return (
    <section className="px-8 py-4">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">ACTIVE PROPERTY PROJECTS</h3>
        <div className="flex gap-2">
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-[#1E3A5F]">
            <LayoutGrid size={20} />
          </button>
          <button className="p-2.5 bg-gray-100 rounded-xl transition-all text-[#1E3A5F]">
            <Info size={20} />
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-4 border-b border-gray-100 mb-2">
          {["PROJECT NAME", "LOCATION", "EST. ROI", "FUNDING", ""].map((header, i) => (
            <span key={header || i} className={`text-[11px] font-black text-gray-400 uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}>
              {header}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {DEMO_PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_1fr] items-center px-6 py-2 rounded-2xl transition-all duration-300 group cursor-pointer border border-transparent ${
                i % 2 === 1 ? "bg-gray-50/50 hover:bg-white hover:border-gray-100 hover:shadow-md" : "hover:bg-white hover:border-gray-100 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-50 group-hover:shadow-md transition-all">
                  <Building size={20} className="text-[#1E3A5F]" />
                </div>
                <span className="font-bold text-gray-800 text-[14px] group-hover:text-[#1E3A5F] transition-colors">
                  {project.title}
                </span>
              </div>
              <span className="text-[13px] font-bold text-gray-600">{project.location}</span>
              <span className="text-[13px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 px-2 py-1 rounded-lg w-fit">
                {project.expected_roi}%
              </span>
              <div className="flex flex-col gap-1 pr-8">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>{project.fundingPct}%</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-[#1E3A5F] h-full transition-all duration-1000" style={{ width: `${project.fundingPct}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <button className="px-4 py-1.5 bg-[#1E3A5F] text-white text-[11px] font-bold rounded-lg hover:shadow-lg transition-all">
                  INVEST
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilesTable;
