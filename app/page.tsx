"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import QuickAccess from "./components/QuickAccess";
import FilesTable from "./components/FilesTable";
import Marketplace from "./components/Marketplace";
import Portfolio from "./components/Portfolio";
import Governance from "./components/Governance";
import Transactions from "./components/Transactions";
import LegalDocuments from "./components/LegalDocuments";

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "marketplace":
        return <Marketplace />;
      case "portfolio":
        return <Portfolio />;
      case "governance":
        return <Governance />;
      case "transactions":
        return <Transactions />;
      case "documents":
        return <LegalDocuments />;
      case "dashboard":
      default:
        return (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
            <QuickAccess />
            <FilesTable />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white font-jost overflow-hidden">
      <Sidebar activeView={currentView} onNavigate={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {renderContent()}
        </main>
      </div>

      <style jsx global>{`
        ::selection {
          background-color: #1E3A5F;
          color: white;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
