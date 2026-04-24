"use client";

import React, { useState } from "react";
import { Building2, ArrowUpRight, MapPin, Layers, CheckCircle, X, Image, ChevronLeft, ChevronRight } from "lucide-react";

interface Unit {
    id: string;
    unit_number: string;
    unit_type: "apartment" | "office" | "retail";
    floor: number | null;
    area_sqm: number;
    price: number;
    status: "available" | "reserved" | "sold";
    images?: string[];
}

interface Project {
    id: string;
    title: string;
    location: string;
    completion_level: string;
    completion_pct: number;
    investment_model: string;
    description: string;
    land_size_sqm: number;
    total_units: number;
    verified: boolean;
    cover_image?: string;
    units: Unit[];
}

const DEMO_PROJECTS: Project[] = [
    {
        id: "p1",
        title: "Kigali Heights Residences",
        location: "Gasabo, Kimironko — Kigali",
        completion_level: "Structure Complete",
        completion_pct: 65,
        investment_model: "Raise to Complete",
        description: "A premium 48-unit mixed-use tower in the heart of Kimironko. Features underground parking, rooftop terrace, smart-home integration, and panoramic city views. Ideal for investors seeking long-term capital appreciation in Kigali's fastest-growing district.",
        land_size_sqm: 3200,
        total_units: 48,
        verified: true,
        units: [
            { id: "u1", unit_number: "A-101", unit_type: "apartment", floor: 1, area_sqm: 65, price: 45000000, status: "available" },
            { id: "u2", unit_number: "A-102", unit_type: "apartment", floor: 1, area_sqm: 72, price: 52000000, status: "reserved" },
            { id: "u3", unit_number: "B-201", unit_type: "office", floor: 2, area_sqm: 120, price: 95000000, status: "available" },
            { id: "u4", unit_number: "A-103", unit_type: "apartment", floor: 1, area_sqm: 58, price: 40000000, status: "sold" },
            { id: "u5", unit_number: "C-301", unit_type: "apartment", floor: 3, area_sqm: 80, price: 60000000, status: "available" },
            { id: "u6", unit_number: "R-001", unit_type: "retail", floor: 0, area_sqm: 150, price: 120000000, status: "available" },
        ]
    }
];

const unitStatusColor = (s: string) => {
    if (s === "available") return "bg-emerald-50 text-emerald-700";
    if (s === "reserved") return "bg-amber-50 text-amber-700";
    return "bg-slate-100 text-slate-400 line-through";
};

const unitTypeIcon = (t: string) => {
    if (t === "office") return "🏢";
    if (t === "retail") return "🏪";
    return "🏠";
};

const completionColor = (pct: number) => {
    if (pct >= 80) return "bg-emerald-500";
    if (pct >= 50) return "bg-amber-500";
    return "bg-blue-500";
};

export default function UnitMarketplace() {
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white min-h-0">
            <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
                <header className="border-b border-slate-200/90 pb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Marketplace</p>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Available Properties</h1>
                    <p className="text-[13px] text-slate-500 mt-2">
                        Browse verified projects and purchase physical units — apartments, offices, and retail spaces.
                    </p>
                </header>

                {DEMO_PROJECTS.map(project => (
                    <div key={project.id} className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
                        {/* Cover image placeholder */}
                        <div className="h-48 bg-gradient-to-br from-[#1E3A5F]/10 to-[#1E3A5F]/5 flex items-center justify-center relative">
                            <div className="text-center">
                                <Building2 size={48} className="text-[#1E3A5F]/30 mx-auto mb-2" />
                                <p className="text-[11px] text-slate-400">Property images uploaded by owner</p>
                            </div>
                            {project.verified && (
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                                    <CheckCircle size={13} className="text-emerald-500" />
                                    <span className="text-[11px] font-bold text-slate-700">Verified</span>
                                </div>
                            )}
                        </div>

                        {/* Project info */}
                        <div className="px-6 py-5 border-b border-slate-100">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-black text-slate-900">{project.title}</h2>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <MapPin size={13} className="text-slate-400" />
                                        <span className="text-[13px] text-slate-500">{project.location}</span>
                                    </div>
                                    <p className="text-[13px] text-slate-600 leading-relaxed mt-3">{project.description}</p>
                                </div>
                            </div>

                            {/* Key stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                                {[
                                    { label: "Land size", value: `${project.land_size_sqm.toLocaleString()} m²` },
                                    { label: "Total units", value: String(project.total_units) },
                                    { label: "Type", value: project.investment_model },
                                    { label: "Available", value: String(project.units.filter(u => u.status === 'available').length) },
                                ].map(k => (
                                    <div key={k.label} className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.label}</p>
                                        <p className="text-[13px] font-black text-slate-900 mt-0.5">{k.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Construction progress */}
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <Layers size={13} className="text-slate-400" />
                                        <span className="text-[12px] font-bold text-slate-600">{project.completion_level}</span>
                                    </div>
                                    <span className="text-[12px] font-black text-slate-700">{project.completion_pct}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all ${completionColor(project.completion_pct)}`}
                                        style={{ width: `${project.completion_pct}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Units grid */}
                        <div className="p-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                Units ({project.units.filter(u => u.status === 'available').length} available)
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {project.units.map(unit => (
                                    <div key={unit.id}
                                        onClick={() => unit.status === 'available' && setSelectedUnit(unit)}
                                        className={`rounded-xl border p-4 transition-all ${
                                            unit.status === 'available'
                                                ? 'cursor-pointer hover:border-[#1E3A5F]/40 hover:shadow-md border-slate-200'
                                                : 'opacity-50 cursor-default border-slate-100'
                                        }`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[13px]">{unitTypeIcon(unit.unit_type)}</span>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md capitalize ${unitStatusColor(unit.status)}`}>
                                                {unit.status}
                                            </span>
                                        </div>
                                        <p className="text-[12px] font-black text-slate-900">{unit.unit_number}</p>
                                        <p className="text-[11px] text-slate-400 capitalize mt-0.5">
                                            {unit.unit_type}{unit.floor !== null ? ` · Floor ${unit.floor}` : ''}
                                        </p>
                                        <p className="text-[11px] text-slate-400">{unit.area_sqm} m²</p>
                                        <p className="text-[13px] font-black text-slate-900 mt-2">
                                            {(unit.price / 1_000_000).toFixed(1)}M RWF
                                        </p>
                                        {unit.status === 'available' && (
                                            <button className="mt-3 w-full text-[11px] font-bold bg-[#1E3A5F] text-white py-1.5 rounded-lg flex items-center justify-center gap-1 hover:brightness-110 transition-all">
                                                Reserve <ArrowUpRight size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Unit detail modal */}
            {selectedUnit && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit {selectedUnit.unit_number}</p>
                                <h3 className="text-xl font-black text-slate-900 mt-0.5 capitalize">{selectedUnit.unit_type}</h3>
                            </div>
                            <button onClick={() => setSelectedUnit(null)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Image placeholder */}
                            <div className="h-40 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                                <div className="text-center">
                                    <Image size={32} className="text-slate-300 mx-auto mb-1" />
                                    <p className="text-[11px] text-slate-300">Unit images</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Floor", value: selectedUnit.floor !== null ? `Floor ${selectedUnit.floor}` : "Ground" },
                                    { label: "Area", value: `${selectedUnit.area_sqm} m²` },
                                    { label: "Type", value: selectedUnit.unit_type },
                                    { label: "Status", value: selectedUnit.status },
                                ].map(k => (
                                    <div key={k.label} className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{k.label}</p>
                                        <p className="text-[13px] font-black text-slate-900 capitalize mt-0.5">{k.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-[#1E3A5F]/5 rounded-2xl p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Price</p>
                                    <p className="text-2xl font-black text-slate-900">{(selectedUnit.price / 1_000_000).toFixed(1)}M RWF</p>
                                </div>
                                <button className="px-6 py-3 bg-[#1E3A5F] text-white font-black text-[13px] rounded-xl hover:brightness-110 transition-all">
                                    Reserve Unit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
