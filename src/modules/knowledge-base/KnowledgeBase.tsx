"use client";

import { useState } from "react";
import { Database, FileText, Globe, Plus, Trash2, RefreshCw, AlertCircle, LinkIcon } from "lucide-react";
import { Card, Button, Tooltip } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function KnowledgeBase({ onAlert }: ActionProps) {
  const [sources, setSources] = useState([
    { id: 1, name: "company_faq_v3.pdf", type: "PDF", size: "142 KB", status: "Synced", chunks: 54, updated: "2h ago" },
    { id: 2, name: "whatsapp_policy.docx", type: "Docx", size: "84 KB", status: "Synced", chunks: 32, updated: "5h ago" },
    { id: 3, name: "https://docs.botty.ai/quickstart", type: "URL", size: "N/A", status: "Indexing", chunks: 18, updated: "Just now" },
    { id: 4, name: "pricing_structure_2026.pdf", type: "PDF", size: "1.2 MB", status: "Pending Sync", chunks: 0, updated: "Jun 02, 2026" }
  ]);

  const [urlInput, setUrlInput] = useState("");

  const addUrl = () => {
    if (!urlInput.trim()) return;
    setSources(prev => [
      ...prev,
      {
        id: Date.now(),
        name: urlInput,
        type: "URL",
        size: "N/A",
        status: "Indexing",
        chunks: 0,
        updated: "Just now"
      }
    ]);
    setUrlInput("");
    onAlert("URL submitted for crawling and indexing.");
  };

  const deleteSource = (id: number) => {
    setSources(prev => prev.filter(s => s.id !== id));
    onAlert("Knowledge document removed.");
  };

  const retrainAll = () => {
    setSources(prev => prev.map(s => ({ ...s, status: s.status === "Pending Sync" ? "Indexing" : s.status })));
    onAlert("System-wide vector retraining trigger sent successfully!");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Page Title & Sync */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Knowledge Base AI</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Train the AI model on your business documents, PDFs, and website FAQs.</p>
        </div>
        <Button 
          onPress={retrainAll}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retrain Model
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Document list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-6">Trained Documents</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                    <th className="pb-4">Source Name</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Chunks</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Last Sync</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((s) => (
                    <tr key={s.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                      <td className="py-4 font-bold text-[#111827] max-w-xs truncate flex items-center gap-2">
                        {s.type === "PDF" || s.type === "Docx" ? <FileText className="w-4 h-4 text-[#6B7280]" /> : <LinkIcon className="w-4 h-4 text-[#4F46E5]" />}
                        {s.name}
                      </td>
                      <td className="py-4 text-[#6B7280]">{s.type}</td>
                      <td className="py-4 font-mono font-bold text-[#111827]">{s.chunks}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                          s.status === "Synced" ? "bg-[#ECFDF5] text-[#10B981]" :
                          s.status === "Indexing" ? "bg-[#EEF2FF] text-[#4F46E5] animate-pulse" :
                          "bg-[#FFFBEB] text-[#F59E0B]"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#6B7280] font-mono">{s.updated}</td>
                      <td className="py-4 text-right flex justify-end gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => deleteSource(s.id)}
                          className="bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] rounded-lg min-w-8 w-8 h-8 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Upload tools */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">Add Documents</h3>
            <div className="border-2 border-dashed border-[#E5E7EB] hover:border-[#4F46E5] rounded-xl p-8 text-center cursor-pointer bg-[#F8FAFC] transition-colors">
              <Database className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3" />
              <span className="text-xs font-semibold text-[#111827] block">Drag & Drop Documents</span>
              <span className="text-[10px] text-[#6B7280] mt-1 block">Supports PDF, DOCX, TXT up to 10MB</span>
            </div>
          </Card>

          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">Crawl Website URLs</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="https://example.com/faq"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
              />
              <Button
                onPress={addUrl}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#4F46E5] text-xs font-bold transition-colors cursor-pointer"
              >
                Submit URL
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
