"use client";

import { useState } from "react";
import { Terminal, Save, RotateCcw, AlertTriangle, ArrowUpRight, History, Check } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Prompts({ onAlert }: ActionProps) {
  const [activeTab, setActiveTab] = useState<"system" | "business" | "fallback" | "escalation">("system");
  const [prompts, setPrompts] = useState({
    system: "You are Botty, a helpful AI customer service assistant for our business. Answer questions concisely, professionally, and politely. Always redirect billing inquiries to the accounts department.",
    business: "Business: Zenith Manufacturing Inc.\nFounded: 2012\nOffered Products: CNC Precision Machining, Sheet Metal Fabrication, 3D Prototyping.\nStandard Response SLA: 24 Hours.",
    fallback: "I'm sorry, I couldn't find the exact answer for that. Let me connect you with one of our support representatives who can help you further.",
    escalation: "Escalate to Human Agent if:\n1. User asks specifically to talk to a human.\n2. User expresses frustration (e.g. angry sentiments).\n3. Bot has failed to answer twice in a row."
  });

  const [versions, setVersions] = useState([
    { id: "v1.4", author: "Aman Raj", date: "Jun 04, 2026 14:20", note: "Optimised CNC pricing instructions", active: true },
    { id: "v1.3", author: "Sarah Jenkins", date: "May 30, 2026 09:12", note: "Added standard SLA parameters", active: false },
    { id: "v1.2", author: "AI Optimizer", date: "May 25, 2026 17:35", note: "Auto-trimmed greeting redundancy", active: false },
    { id: "v1.1", author: "Deepak Sharma", date: "May 20, 2026 11:00", note: "Initial system configuration", active: false }
  ]);

  const handleSave = () => {
    onAlert(`Prompt updates for "${activeTab}" saved as a new version draft.`);
    
    // Add new draft version
    const nextVer = `v1.${(versions.length + 1) * 0.1 + 1}`.slice(0, 4);
    setVersions(prev => [
      {
        id: nextVer,
        author: "John Doe (Demo)",
        date: "Just now",
        note: `Updated ${activeTab} prompt parameters`,
        active: true
      },
      ...prev.map(v => ({ ...v, active: false }))
    ]);
  };

  const handleRollback = (id: string) => {
    setVersions(prev => prev.map(v => ({ ...v, active: v.id === id })));
    onAlert(`System prompts rolled back to version ${id} successfully.`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Page Title & Save */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Prompts Engineering Console</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Edit system behaviors, business domain data injection, and escalation parameters.</p>
        </div>
        <Button 
          onPress={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Controls */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            {/* Tab selector */}
            <div className="flex gap-2 border-b border-[#E5E7EB] pb-4 mb-5 overflow-x-auto shrink-0">
              {([
                { id: "system", label: "System Instruction" },
                { id: "business", label: "Business Knowledge Context" },
                { id: "fallback", label: "Fallback Response" },
                { id: "escalation", label: "Human Escalation Rules" }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer shrink-0 ${
                    activeTab === tab.id
                      ? "bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]"
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Prompt Content TextArea */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                <span>Prompt Editor Canvas</span>
                <span className="font-mono text-[#9CA3AF]">{prompts[activeTab].length} characters</span>
              </div>
              <textarea
                value={prompts[activeTab]}
                onChange={(e) => setPrompts(prev => ({ ...prev, [activeTab]: e.target.value }))}
                rows={10}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-2xl p-4 text-xs font-mono text-[#111827] leading-relaxed outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-inner"
              />
              <div className="flex items-center gap-2 mt-2 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 text-[#B45309] text-[11px] leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Modifying this will affect active chatbot responses immediately. Ensure you test response outputs in the Preview widget.</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Versions Hub */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-[#6B7280]" />
              Version History
            </h3>
            <div className="flex flex-col gap-3.5">
              {versions.map((ver) => (
                <div 
                  key={ver.id} 
                  className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 transition-colors ${
                    ver.active 
                      ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]" 
                      : "bg-[#F8FAFC] border-[#E5E7EB] text-[#4B5563]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold font-mono">{ver.id}</span>
                    {ver.active ? (
                      <span className="flex items-center gap-0.5 text-[9px] font-extrabold bg-[#D1FAE5] text-[#10B981] px-2 py-0.5 rounded-full uppercase">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRollback(ver.id)}
                        className="text-[9px] font-bold text-[#4F46E5] hover:text-[#4338CA] uppercase tracking-wider cursor-pointer"
                      >
                        Rollback
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] leading-snug font-medium line-clamp-2">{ver.note}</p>
                    <div className="flex justify-between items-center mt-2.5 text-[9px] text-[#6B7280] font-bold">
                      <span>By {ver.author}</span>
                      <span>{ver.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
