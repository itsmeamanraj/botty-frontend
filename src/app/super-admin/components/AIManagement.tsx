"use client";

import { useState } from "react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function AIManagement({ onAlert }: ActionProps) {
  const [activeProvider, setActiveProvider] = useState("openai");
  const [providers, setProviders] = useState([
    { id: "openai", name: "OpenAI API", model: "gpt-4o / gpt-3.5", requests: "2.4M", cost: "$4,248.00", status: "Active", time: "115ms" },
    { id: "gemini", name: "Google Gemini API", model: "gemini-1.5-pro", requests: "1.2M", cost: "$984.00", status: "Active", time: "180ms" },
    { id: "claude", name: "Anthropic Claude API", model: "claude-3-5-sonnet", requests: "600K", cost: "$1,890.00", status: "Backup", time: "240ms" }
  ]);

  const switchProvider = (id: string) => {
    setActiveProvider(id);
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: "Active" } : p.status === "Active" ? { ...p, status: "Backup" } : p));
    onAlert(`Switched primary AI provider to ${id.toUpperCase()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">AI Engine Control Center</h2>
        <p className="text-xs text-admin-text-muted mt-1">Configure primary LLM APIs, fallback models, usage metrics, and token costs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((p) => (
          <div key={p.id} className={`p-6 rounded-2xl border flex flex-col justify-between ${activeProvider === p.id ? "border-admin-primary bg-[#121832]" : "border-white/5 bg-admin-card"}`}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-white">{p.name}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${p.status === "Active" ? "bg-admin-success/15 text-admin-success" : "bg-white/5 text-admin-text-muted"}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-admin-text-muted mb-4 font-mono">Models: {p.model}</p>
              <div className="grid grid-cols-2 gap-2 text-xs py-4 border-y border-white/5 mb-6">
                <div>
                  <span className="text-[10px] text-admin-text-muted block">API Requests</span>
                  <span className="font-bold text-white font-mono">{p.requests}</span>
                </div>
                <div>
                  <span className="text-[10px] text-admin-text-muted block">Token Cost</span>
                  <span className="font-bold text-admin-danger font-mono">{p.cost}</span>
                </div>
              </div>
            </div>
            {activeProvider !== p.id && (
              <button onClick={() => switchProvider(p.id)} className="w-full py-2 bg-admin-primary hover:bg-admin-primary/95 text-white font-bold text-xs rounded-xl cursor-pointer">
                Set Active primary
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
