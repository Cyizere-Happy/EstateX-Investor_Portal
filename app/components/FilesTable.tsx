"use client";

import React from "react";
import { 
  FileText, 
  PieChart, 
  BarChart, 
  Image as LucideImage,
  LayoutGrid,
  Info,
  Link,
  MoreHorizontal,
  Users,
  Building
} from "lucide-react";

const FilesTable = () => {
  const projects = [
    { 
      name: "Kigali Heights Expansion", 
      location: "Kacyiru, Kigali", 
      roi: "14.2%", 
      funding: "85%", 
      icon: <Building size={20} className="text-blue-600" /> 
    },
    { 
      name: "Vision City Phase II", 
      location: "Gacuriro, Kigali", 
      roi: "12.8%", 
      funding: "62%", 
      icon: <Building size={20} className="text-green-600" /> 
    },
    { 
      name: "Nyagatare Trade Center", 
      location: "Nyagatare, Eastern", 
      roi: "15.5%", 
      funding: "34%", 
      icon: <Building size={20} className="text-orange-600" /> 
    },
    { 
      name: "Rubavu Waterfront Resort", 
      location: "Rubavu, Western", 
      roi: "11.2%", 
      funding: "91%", 
      icon: <Building size={20} className="text-cyan-600" /> 
    },
    { 
      name: "Gahanga Housing Estate", 
      location: "Kicukiro, Kigali", 
      roi: "13.5%", 
      funding: "100%", 
      icon: <Building size={20} className="text-indigo-600" /> 
    },
  ];

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
            <span key={header} className={`text-[11px] font-black text-gray-400 uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}>
              {header}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_1fr] items-center px-6 py-2 rounded-2xl transition-all duration-300 group cursor-pointer border border-transparent ${
                i % 2 === 1 ? "bg-gray-50/50 hover:bg-white hover:border-gray-100 hover:shadow-md" : "hover:bg-white hover:border-gray-100 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-50 group-hover:shadow-md transition-all">
                  {project.icon}
                </div>
                <span className="font-bold text-gray-800 text-[14px] group-hover:text-[#1E3A5F] transition-colors">
                  {project.name}
                </span>
              </div>
              
              <span className="text-[13px] font-bold text-gray-600">{project.location}</span>

              <span className="text-[13px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg w-fit">{project.roi}</span>
              
              <div className="flex flex-col gap-1 pr-8">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>{project.funding}</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#1E3A5F] h-full transition-all duration-1000" 
                    style={{ width: project.funding }} 
                  />
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
