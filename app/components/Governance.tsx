"use client";

import React, { useState, useEffect } from "react";
import { Plus, Vote, History, Info, Gavel, TrendingUp, Inbox, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import Modal from "./ui/Modal";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: string;
  end_date: string;
  project: { id: string; title: string };
  votes: { support: boolean; weight: number }[];
}

const Governance = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ project_id: "", title: "", description: "" });
  const [voting, setVoting] = useState<string | null>(null); // proposal id being voted on

  const fetchProposals = async () => {
    try {
      const res = await api("/governance/proposals");
      setProposals(res.data || []);
    } catch (err) {
      console.error("Failed to load proposals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api("/governance/proposals", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      setShowModal(false);
      setFormData({ project_id: "", title: "", description: "" });
      fetchProposals();
    } catch (err: any) {
      alert(err.message || "Failed to create proposal");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (proposalId: string, support: boolean) => {
    setVoting(proposalId);
    try {
      await api(`/governance/proposals/${proposalId}/vote`, {
        method: "POST",
        body: JSON.stringify({ support })
      });
      fetchProposals();
    } catch (err: any) {
      alert(err.message || "Failed to submit vote");
    } finally {
      setVoting(null);
    }
  };

  // Calculate generic stats
  const totalVotes = proposals.reduce((acc, p) => acc + p.votes.length, 0);
  const activeCount = proposals.filter((p) => p.status === "active").length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#EEF2F9] overflow-hidden p-8 custom-scrollbar overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 relative overflow-hidden h-[300px] shadow-sm">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Your Voting Power</h3>
              <p className="text-sm font-medium text-slate-500">Based on your fractional property holdings</p>
            </div>
            <div className="flex gap-6 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#1E3A5F] rounded-full" />
                <span className="text-xs font-bold text-slate-600">Active Proposals: {activeCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-xs font-bold text-slate-600">Total Votes Cast: {totalVotes}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[20%] right-[10%] bg-slate-50 rounded-full w-48 h-48 flex flex-col items-center justify-center text-[#1E3A5F] border-8 border-slate-100 shadow-inner">
            <Gavel size={40} className="mb-2 opacity-50" />
            <p className="text-3xl font-black">DAO</p>
          </div>
        </div>

        <div className="bg-[#1E3A5F] rounded-3xl p-8 text-white relative overflow-hidden flex flex-col h-[300px] shadow-xl">
          <h3 className="text-md font-black tracking-tight mb-6">Upcoming Deadlines</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {proposals.filter(p => p.status === "active").length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/50">
                <Vote size={32} strokeWidth={1} />
                <p className="mt-3 text-sm font-semibold">No active deadlines</p>
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.filter(p => p.status === "active").map(p => (
                  <div key={p.id} className="bg-white/10 rounded-xl p-4">
                    <p className="text-xs font-bold truncate">{p.title}</p>
                    <p className="text-[10px] text-white/60 mt-1">Ends: {new Date(p.end_date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Governance Proposals</h3>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
            <Plus size={16} /> New Proposal
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-[#1E3A5F]" size={32} /></div>
        ) : proposals.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12">
            <Inbox size={48} strokeWidth={1} />
            <p className="mt-4 font-semibold text-[15px]">No proposals yet</p>
            <p className="text-[12px] mt-1">Create a governance proposal or wait for one to be submitted by the community.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-6">
            {proposals.map(p => {
              const yesVotes = p.votes.filter(v => v.support).reduce((acc, v) => acc + v.weight, 0);
              const noVotes = p.votes.filter(v => !v.support).reduce((acc, v) => acc + v.weight, 0);
              const total = yesVotes + noVotes;
              const yesPct = total > 0 ? Math.round((yesVotes / total) * 100) : 0;

              return (
                <div key={p.id} className="border border-slate-200 rounded-2xl p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${p.status === 'active' ? 'bg-amber-100 text-amber-800' : p.status === 'passed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {p.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{new Date(p.end_date).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-1">{p.title}</h4>
                  <p className="text-xs font-bold text-[#1E3A5F] mb-3">{p.project?.title || 'Unknown Project'}</p>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-6 flex-1">{p.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-emerald-700">Yes ({yesPct}%)</span>
                      <span className="text-red-700">No ({100 - yesPct}%)</span>
                    </div>
                    <div className="h-2 bg-red-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${yesPct}%` }} />
                    </div>
                  </div>

                  {p.status === 'active' && (
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button onClick={() => handleVote(p.id, true)} disabled={voting === p.id}
                        className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors disabled:opacity-50">
                        Vote Yes
                      </button>
                      <button onClick={() => handleVote(p.id, false)} disabled={voting === p.id}
                        className="py-2 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold rounded-xl transition-colors disabled:opacity-50">
                        Vote No
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Proposal">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project ID</label>
            <input type="text" required value={formData.project_id} onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1E3A5F]" placeholder="UUID of project you hold shares in" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Proposal Title</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1E3A5F]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1E3A5F]" />
          </div>
          <button type="submit" disabled={submitting} className="w-full py-3 bg-[#1E3A5F] text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Governance;
