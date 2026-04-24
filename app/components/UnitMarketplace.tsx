"use client";

import React, { useState } from "react";
import { Building2, ArrowUpRight, CheckCircle, Clock, XCircle } from "lucide-react";

interface Unit {
    id: string;
    unit_number: string;
    unit_type: "apartment" | "office" | "retail";
    floor: number | null;
    area_sqm: number;
    price: number;
    status: "available" | "reserved" | "sold";
}

interface Project {
    id: string;
    title: string;
    completion_level: string;
    investment_model: string;
    gov_verifications: { nla: string; clb: string; kubaka: string };
    evaluator_summary: { pass: number; fail: number; total: number };
    units: Unit[];
}

const DEMO_PROJECTS: Project[] = [
    {
        id: "p1",
        title: "Kigali Heights Residences",
        completion_level: "structure",
        investment_model: "raise_to_complete",
        gov_verifications: { nla: "passed", clb: "passed", kubaka: "verified" },
        evaluator_summary: { pass: 2, fail: 0, total: 2 },
        units: [
            { id: "u1", unit_number: "A-101", unit_type: "apartment", floor: 1, area_sqm: 65, price: 45000000, status: "available" },
            { id: "u2", unit_number: "A-102", unit_type: "apartment", floor: 1, area_sqm: 72, price: 52000000, status: "reserved" },
            { id: "u3", unit_number: "B-201", unit_type: "office", floor: 2, area_sqm: 120, price: 95000000, status: "available" },
            { id: "u4", unit_number: "A-103", unit_type: "apartment", floor: 1, area_sqm: 58, price: 40000000, status: "sold" },
        ]
    }
];

const statusIcon = (s: string) => {
    if (s === "passed" || s === "verified") return <CheckCircle size={14} className="text-emerald-500" />;
    if (s === "pending") return <Clock size={14} className="text-amber-500" />;
    return <XCircle size={14} className="text-red-500" />;
};

const unitStatusColor = (s: string) => {
    if (s === "available") return "bg-emerald-50 text-emerald-700";
    if (s === "reserved") return "bg-amber-50 text-amber-700";
    return "bg-slate-100 text-slate-500";
};

export default function UnitMarketplace() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white min-h-0">
            <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
                <header className="border-b border-slate-200/90 pb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Marketplace</p>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Available Units</h1>
                    <p className="text-[13px] text-slate-500 mt-2">
                        Browse verified projects and purchase physical units — apartments, offices, and retail spaces.
                    </p>
                </header>

                {DEMO_PROJECTS.map(project => (
                    <div key={project.id} className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
                        {/* Project header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-black text-slate-900">{project.title}</h2>
                                <div className="flex items-center gap-3 mt-2 flex-wrap">
                                    <span className="text-[11px] font-bold bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded-lg capitalize">
                                        {project.completion_level}
                                    </span>
                                    <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg capitalize">
                                        {project.investment_model.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            </div>
                            {/* Gov verification badges */}
                            <div className="flex gap-3 shrink-0">
                                {Object.entries(project.gov_verifications).map(([key, val]) => (
                                    <div key={key} className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                                        {statusIcon(val)}
                                        <span className="uppercase">{key}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                                    <CheckCircle size={14} className="text-emerald-500" />
                                    <span>{project.evaluator_summary.pass}/{project.evaluator_summary.total} evaluators</span>
                                </div>
                            </div>
                        </div>

                        {/* Units grid */}
                        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {project.units.map(unit => (
                                <div key={unit.id}
                                    onClick={() => unit.status === 'available' && setSelectedUnit(unit)}
                                    className={`rounded-xl border p-4 transition-all ${unit.status === 'available' ? 'cursor-pointer hover:border-[#1E3A5F]/40 hover:shadow-md' : 'opacity-60 cursor-default'} border-slate-200`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[12px] font-black text-slate-900">{unit.unit_number}</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md capitalize ${unitStatusColor(unit.status)}`}>
                                            {unit.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-500 mb-1">
                                        <Building2 size={12} />
                                        <span className="text-[11px] capitalize">{unit.unit_type}</span>
                                        {unit.floor && <span className="text-[11px]">· Floor {unit.floor}</span>}
                                    </div>
                                    <div className="text-[11px] text-slate-400">{unit.area_sqm} m²</div>
                                    <div className="text-[13px] font-black text-slate-900 mt-2">
                                        {(unit.price / 1_000_000).toFixed(1)}M RWF
                                    </div>
                                    {unit.status === 'available' && (
                                        <button className="mt-3 w-full text-[11px] font-bold bg-[#1E3A5F] text-white py-1.5 rounded-lg flex items-center justify-center gap-1">
                                            Reserve <ArrowUpRight size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
