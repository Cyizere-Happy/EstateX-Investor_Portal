"use client";

import React, { useState, useEffect } from "react";
import { Hexagon, Search, BarChart3, Clock, DollarSign, Inbox, Loader2, ListPlus, ArrowRight } from "lucide-react";
import { api } from "../../lib/api";
import Modal from "./ui/Modal";

interface Listing {
  id: string;
  project_id: string;
  amount: number;
  price_per_share: string;
  seller: { id: string; first_name: string; last_name: string };
  project: { id: string; title: string; slug: string; expected_roi: number };
}

const NftSecondaryMarket = () => {
  const [tab, setTab] = useState<"listings" | "trades">("listings");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showListModal, setShowListModal] = useState(false);
  const [listData, setListData] = useState({ projectId: "", amount: "", price: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchListings = async () => {
    try {
      const res = await api("/nfts/listings");
      setListings(res.data || []);
    } catch (err) {
      console.error("Failed to load listings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleListShares = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api(`/nfts/${listData.projectId}/list`, {
        method: "POST",
        body: JSON.stringify({
          amount: parseInt(listData.amount, 10),
          price_per_share: parseFloat(listData.price)
        })
      });
      setShowListModal(false);
      setListData({ projectId: "", amount: "", price: "" });
      fetchListings();
    } catch (err: any) {
      alert(err.message || "Failed to list shares");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBuy = async (listingId: string, amountToBuy: number) => {
    if (!window.confirm(`Buy ${amountToBuy} shares?`)) return;
    try {
      await api(`/nfts/listings/${listingId}/buy`, {
        method: "POST",
        body: JSON.stringify({ amount: amountToBuy })
      });
      fetchListings();
    } catch (err: any) {
      alert(err.message || "Failed to buy shares");
    }
  };

  const activeCount = listings.length;
  const floorPrice = activeCount > 0 ? Math.min(...listings.map(l => parseFloat(l.price_per_share))) : 0;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Hexagon size={20} className="text-[#1E3A5F]" /> NFT Secondary Market
          </h2>
          <p className="text-[12px] text-slate-500 font-medium mt-1">Trade fractional property ownership tokens peer-to-peer</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowListModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
            <ListPlus size={16} /> List Shares
          </button>
        </div>
      </div>

      <div className="px-8 py-5 border-b border-slate-200 bg-white grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "24h Volume", value: "$0", icon: <BarChart3 size={16} /> },
          { label: "Floor Price", value: `$${floorPrice.toFixed(2)}`, icon: <DollarSign size={16} /> },
          { label: "Active Listings", value: activeCount.toString(), icon: <Hexagon size={16} /> },
          { label: "Last Trade", value: "—", icon: <Clock size={16} /> },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-50 rounded-xl text-[#1E3A5F] border border-slate-100">{s.icon}</div>
            <div>
              <p className="text-[15px] font-black text-slate-900">{s.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-8 py-3 bg-white border-b border-slate-200 flex gap-2">
        {(["listings", "trades"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${tab === t ? "bg-[#1E3A5F] text-white shadow-md" : "text-slate-500 hover:bg-slate-50 border border-slate-100"}`}>
            {t === "listings" ? "Active Listings" : "Recent Trades"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center"><Loader2 className="animate-spin text-[#1E3A5F]" size={36} /></div>
        ) : listings.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <Inbox size={56} strokeWidth={1} />
            <p className="mt-4 font-bold text-lg text-slate-600">No NFTs listed for sale</p>
            <p className="text-sm mt-1 text-slate-500">Property ownership tokens listed by investors will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map(l => (
              <div key={l.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-xl"><Hexagon size={20} /></div>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md uppercase">For Sale</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 line-clamp-1">{l.project?.title || 'Property Token'}</h3>
                <p className="text-xs font-bold text-slate-500 mt-1 mb-4">Seller: {l.seller?.first_name} {l.seller?.last_name?.[0]}.</p>
                
                <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500">Shares Available</span>
                    <span className="text-sm font-black text-slate-900">{l.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Price per Share</span>
                    <span className="text-sm font-black text-[#1E3A5F]">${parseFloat(l.price_per_share).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest">Total: ${(l.amount * parseFloat(l.price_per_share)).toFixed(2)}</span>
                  <button onClick={() => handleBuy(l.id, l.amount)}
                    className="flex items-center justify-center w-10 h-10 bg-[#1E3A5F] text-white rounded-xl hover:bg-slate-800 transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showListModal} onClose={() => setShowListModal(false)} title="List Shares for Sale">
        <form onSubmit={handleListShares} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project ID</label>
            <input type="text" required value={listData.projectId} onChange={(e) => setListData({ ...listData, projectId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1E3A5F]" placeholder="UUID of project you hold shares in" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount of Shares</label>
              <input type="number" required min="1" value={listData.amount} onChange={(e) => setListData({ ...listData, amount: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1E3A5F]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Price per Share ($)</label>
              <input type="number" step="0.01" required min="0.01" value={listData.price} onChange={(e) => setListData({ ...listData, price: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1E3A5F]" />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="w-full mt-4 py-3 bg-[#1E3A5F] text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50">
            {submitting ? 'Listing...' : 'List Shares'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NftSecondaryMarket;
