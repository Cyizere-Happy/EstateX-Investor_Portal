"use client";

import React from "react";
import Image from "next/image";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  SlidersHorizontal 
} from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-2.5 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
      <div className="flex-1 max-w-xl relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E3A5F] transition-colors">
          <Search size={14} />
        </span>
        <input
          type="text"
          placeholder="Search Properties..."
          className="w-full bg-gray-100 border-2 border-transparent focus:border-[#1E3A5F] focus:bg-white rounded-xl py-1.5 pl-10 pr-4 outline-none transition-all text-[12px] placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-4 ml-6">
        <div className="flex items-center gap-1.5">
          <button className="text-gray-500 hover:text-[#1E3A5F] p-2 hover:bg-[#1E3A5F]/5 rounded-lg transition-all relative group">
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
          </button>
          <button className="text-gray-500 hover:text-[#1E3A5F] p-2 hover:bg-[#1E3A5F]/5 rounded-lg transition-all">
            <HelpCircle size={16} />
          </button>
          <button className="text-gray-500 hover:text-[#1E3A5F] p-2 hover:bg-[#1E3A5F]/5 rounded-lg transition-all">
            <Settings size={16} />
          </button>
        </div>
        
        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center gap-2.5 bg-gray-50 hover:bg-white px-2.5 py-1 rounded-xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-gray-700 text-[12px] leading-none mb-0.5">Jessica</p>
            <p className="text-[9px] text-gray-400 font-medium tracking-tight">Premium User</p>
          </div>
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white shrink-0">
            <img
              src="/jessica.png"
              alt="Jessica Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button className="p-2 bg-gray-100 hover:bg-[#1E3A5F] hover:text-white text-gray-600 rounded-lg transition-all">
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;
