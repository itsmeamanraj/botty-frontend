"use client";

import { useState } from "react";
import { Plus, Check, Trash2, ArrowRight, UserPlus, Kanban, List } from "lucide-react";
import { Card, Button, Tooltip } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Leads({ onAlert }: ActionProps) {
  const [viewType, setViewType] = useState<"board" | "list">("board");

  const [leads, setLeads] = useState([
    { id: 1, name: "Aman Raj", phone: "+91 98765 43210", email: "aman@zenith-mfg.com", source: "Website Chat", stage: "New", date: "Jun 04, 2026", assigned: "AI Bot" },
    { id: 2, name: "Deepak Sharma", phone: "+91 88888 77777", email: "deepak@apex.com", source: "WhatsApp", stage: "Interested", date: "Jun 03, 2026", assigned: "AI Bot" },
    { id: 3, name: "Marcus Chen", phone: "+1 555-0199", email: "marcus@real-prop.com", source: "WhatsApp", stage: "Follow Up", date: "Jun 02, 2026", assigned: "Sarah J." },
    { id: 4, name: "Sarah Jenkins", phone: "+1 415-555-0211", email: "contact@sarah-hosp.com", stage: "Won", date: "May 28, 2026", assigned: "Sarah J." },
    { id: 5, name: "Beta Systems LLC", phone: "office@beta-sys.com", email: "sales@beta-sys.com", source: "Website Chat", stage: "Lost", date: "May 15, 2026", assigned: "AI Bot" }
  ]);

  const stages = ["New", "Interested", "Follow Up", "Qualified", "Won", "Lost"];

  const moveStage = (id: number, currentStage: string) => {
    const currentIdx = stages.indexOf(currentStage);
    if (currentIdx === -1 || currentIdx === stages.length - 1) return;
    const nextStage = stages[currentIdx + 1];

    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage: nextStage } : l));
    onAlert(`Lead moved to stage ${nextStage}`);
  };

  const deleteLead = (id: number) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    onAlert("Lead deleted successfully.");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title & View Switcher */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Leads CRM</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Manage sales pipeline stages and agent allocations.</p>
        </div>
        <div className="flex items-center gap-2 border border-[#E5E7EB] bg-[#F8FAFC] rounded-xl p-1 shrink-0">
          <button
            onClick={() => setViewType("board")}
            className={`p-1.5 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold transition-all ${
              viewType === "board" ? "bg-white text-[#4F46E5] shadow-xs" : "text-[#6B7280]"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" /> Board
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`p-1.5 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold transition-all ${
              viewType === "list" ? "bg-white text-[#4F46E5] shadow-xs" : "text-[#6B7280]"
            }`}
          >
            <List className="w-3.5 h-3.5" /> List Table
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      {viewType === "board" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto items-start pb-4">
          {stages.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage);
            return (
              <div key={stage} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4 min-w-[200px] flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-2 mb-1 shrink-0">
                  <span className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">{stage}</span>
                  <span className="text-[10px] font-extrabold bg-[#E2E8F0] text-[#475569] px-2 py-0.5 rounded-full">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                  {stageLeads.map((lead) => (
                    <Card key={lead.id} className="p-4 border border-[#E5E7EB] bg-white flex flex-col justify-between hover:border-[#4F46E5]/40 transition-colors shadow-xs group">
                      <div>
                        <h4 className="text-xs font-bold text-[#111827]">{lead.name}</h4>
                        <p className="text-[10px] text-[#6B7280] mt-1 leading-normal truncate">{lead.email}</p>
                        <p className="text-[9px] text-[#9CA3AF] font-bold font-mono mt-0.5">{lead.phone}</p>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#F3F4F6] shrink-0">
                        <span className="text-[8px] font-bold bg-[#EEF2FF] text-[#4F46E5] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                          {lead.assigned}
                        </span>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {stage !== "Lost" && stage !== "Won" && (
                            <Tooltip>
                              <Tooltip.Trigger>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  onPress={() => moveStage(lead.id, stage)}
                                  className="w-6 h-6 min-w-6 rounded-lg bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] p-0 cursor-pointer"
                                >
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                              </Tooltip.Trigger>
                              <Tooltip.Content showArrow className="px-2 py-1 bg-[#111827] text-white rounded-lg text-[9px]">
                                Move Next Stage
                              </Tooltip.Content>
                            </Tooltip>
                          )}
                          <Button
                            isIconOnly
                            size="sm"
                            onPress={() => deleteLead(lead.id)}
                            className="w-6 h-6 min-w-6 rounded-lg bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] p-0 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-[10px] text-[#9CA3AF] border border-dashed border-[#E5E7EB] rounded-xl bg-white select-none">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List Table View */}
      {viewType === "list" && (
        <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
          <Card.Content className="overflow-x-auto p-0 bg-transparent">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                  <th className="pb-4">Lead Name</th>
                  <th className="pb-4">Phone</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Source</th>
                  <th className="pb-4">Stage</th>
                  <th className="pb-4">Assigned To</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                    <td className="py-4 font-bold text-[#111827]">{lead.name}</td>
                    <td className="py-4 text-[#6B7280] font-mono">{lead.phone}</td>
                    <td className="py-4 text-[#6B7280] font-mono">{lead.email}</td>
                    <td className="py-4 text-[#6B7280]">{lead.source || "WhatsApp Direct"}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        lead.stage === "Won" ? "bg-[#ECFDF5] text-[#10B981]" :
                        lead.stage === "Lost" ? "bg-[#FEF2F2] text-[#EF4444]" :
                        "bg-[#EEF2FF] text-[#4F46E5]"
                      }`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-4 text-[#6B7280]">{lead.assigned}</td>
                    <td className="py-4 text-right flex justify-end gap-2">
                      {lead.stage !== "Won" && lead.stage !== "Lost" && (
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => moveStage(lead.id, lead.stage)}
                          className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] rounded-lg min-w-8 w-8 h-8 cursor-pointer"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button
                        isIconOnly
                        size="sm"
                        onPress={() => deleteLead(lead.id)}
                        className="bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] rounded-lg min-w-8 w-8 h-8 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}
