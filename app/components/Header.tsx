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
    <header className="flex items-center justify-between px-8 py-3.5 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
      <div className="flex-1 max-w-2xl relative group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E3A5F] transition-colors">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search Properties, NFTs, or Documents..."
          className="w-full bg-gray-100 border-2 border-transparent focus:border-[#1E3A5F] focus:bg-white rounded-2xl py-2 pl-12 pr-6 outline-none transition-all text-[14px] placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-6 ml-8">
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-[#1E3A5F] p-2.5 hover:bg-[#1E3A5F]/5 rounded-xl transition-all relative group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
          </button>
          <button className="text-gray-500 hover:text-[#1E3A5F] p-2.5 hover:bg-[#1E3A5F]/5 rounded-xl transition-all">
            <HelpCircle size={20} />
          </button>
          <button className="text-gray-500 hover:text-[#1E3A5F] p-2.5 hover:bg-[#1E3A5F]/5 rounded-xl transition-all">
            <Settings size={20} />
          </button>
        </div>
        
        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3 bg-gray-50 hover:bg-white px-3 py-1.5 rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-gray-700 text-[14px] leading-none mb-0.5">Jessica</p>
            <p className="text-[10px] text-gray-400 font-medium">Premium User</p>
          </div>
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white ring-2 ring-[#1E3A5F]/10 group-hover:ring-[#1E3A5F]/30 transition-all shrink-0">
            <img
              src="/jessica.png"
              alt="Jessica Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button className="p-3 bg-gray-100 hover:bg-[#1E3A5F] hover:text-white text-gray-600 rounded-xl transition-all">
          <SlidersHorizontal size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
