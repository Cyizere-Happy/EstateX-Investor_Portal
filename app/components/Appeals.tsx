"use client";

import React, { useState, useRef } from "react";
import { MessageSquare, Plus, CheckCircle, Send, Upload, FileText, X, Clock } from "lucide-react";

const APPEAL_TYPES = [
    { value: "kyc_rejection", label: "KYC Rejection" },
    { value: "unit_ownership_dispute", label: "Unit Ownership Dispute" },
    { value: "transaction_dispute", label: "Transaction Dispute" },
    { value: "escrow_release_dispute", label: "Escrow Release Dispute" },
    { value: "milestone_rejection", label: "Milestone Rejection" },
    { value: "fraud_flag_dispute", label: "Fraud Flag Dispute" },
    { value: "other", label: "Other" },
];

const statusBadge = (s: string) => {
    if (s === "approved") return "bg-emerald-50 text-emerald-700";
    if (s === "rejected") return "bg-red-50 text-red-700";
    if (s === "under_review") return "bg-blue-50 text-blue-700";
    return "bg-amber-50 text-amber-700";
};

const statusLabel = (s: string) => {
    if (s === "approved") return "Approved";
    if (s === "rejected") return "Rejected";
    if (s === "under_review") return "Under Review";
    return "Pending";
};

export default function Appeals() {
    const [showForm, setShowForm] = useState(false);
    const [appealType, setAppealType] = useState("");
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
        if (fileRef.current) fileRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!appealType || !message.trim()) return;
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 1000));
        setSubmitted(true);
        setSubmitting(false);
    };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white min-h-0">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
                <header className="border-b border-slate-200/90 pb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Appeals</p>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Appeals</h1>
                        <p className="text-[13px] text-slate-500 mt-2">
                            Raise a formal appeal if you disagree with any decision on your account or investments.
                        </p>
                    </div>
                    {!showForm && (
                        <button onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all shrink-0">
                            <Plus size={14} /> New Appeal
                        </button>
                    )}
                </header>

                {showForm && !submitted && (
                    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-black text-slate-900">Submit an Appeal</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Appeal type *</label>
                                <select value={appealType} onChange={e => setAppealType(e.target.value)} required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F]">
                                    <option value="">— Select the type of appeal —</option>
                                    {APPEAL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Your message *</label>
                                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} required
                                    placeholder="Explain your appeal clearly — what decision you are disputing and why…"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#1E3A5F] resize-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Supporting documents (optional)</label>
                                <div onClick={() => fileRef.current?.click()}
                                    className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#1E3A5F]/40 transition-colors">
                                    <Upload size={18} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-[12px] text-slate-500">Upload supporting evidence</p>
                                    <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFiles} />
                                </div>
                                {files.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 mt-1 text-[12px] text-slate-600">
                                        <FileText size={13} className="text-[#1E3A5F]" />
                                        <span className="flex-1 truncate">{f.name}</span>
                                        <button type="button" onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))}
                                            className="text-slate-300 hover:text-red-500"><X size={13} /></button>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" disabled={!appealType || !message.trim() || submitting}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1E3A5F] text-white font-black text-[13px] rounded-xl disabled:opacity-50 hover:brightness-110">
                                <Send size={14} /> {submitting ? "Submitting…" : "Submit Appeal"}
                            </button>
                        </form>
                    </div>
                )}

                {submitted && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-3">
                        <CheckCircle size={24} className="text-emerald-500 shrink-0" />
                        <div>
                            <p className="font-bold text-emerald-800">Appeal submitted successfully</p>
                            <p className="text-[12px] text-emerald-600 mt-0.5">Our team will review and respond within 5 business days.</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <MessageSquare size={48} strokeWidth={1} className="mb-3" />
                    <p className="font-semibold text-[15px]">No appeals yet</p>
                    <p className="text-[13px] mt-1">Appeals you submit will appear here.</p>
                </div>
            </div>
        </div>
    );
}
