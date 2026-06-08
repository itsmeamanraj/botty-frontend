"use client";

import { useState } from "react";
import { Cpu, Database, HardDrive, RefreshCw, Layers, CheckCircle2, Play, Activity } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function AITraining({ onAlert }: ActionProps) {
  const [isRetraining, setIsRetraining] = useState(false);
  const [progress, setProgress] = useState(100);
  const [vectorDb, setVectorDb] = useState({
    provider: "Pinecone (US-East)",
    dimension: 1536,
    metric: "Cosine Similarity",
    totalVectors: "24,850",
    totalChunks: "8,402",
    avgChunkSize: "820 tokens",
    indexSpeed: "420 docs/min"
  });

  const [logs, setLogs] = useState([
    { timestamp: "22:51:02", event: "Query Embedding Gen", detail: "Latency: 28ms | Model: text-embedding-3-small", status: "Success" },
    { timestamp: "22:49:15", event: "Vector Index Upsert", detail: "Uploaded 142 vectors to partition default", status: "Success" },
    { timestamp: "22:49:14", event: "Document Chunking", detail: "whatsapp_policy.docx split into 32 chunks", status: "Success" },
    { timestamp: "22:42:30", event: "Namespace Sync", detail: "Cleaned orphaned vectors for tenant 829", status: "Success" },
    { timestamp: "22:15:00", event: "Index Optimisation", detail: "Re-built KD-Tree indices for search acceleration", status: "Success" },
  ]);

  const handleRetrain = () => {
    setIsRetraining(true);
    setProgress(0);
    onAlert("Vector retraining pipeline started. Vectorizing FAQ databases...");
    
    // Simulate retraining progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRetraining(false);
          setVectorDb(prevDb => ({
            ...prevDb,
            totalVectors: (parseInt(prevDb.totalVectors.replace(/,/g, "")) + 54).toLocaleString(),
            totalChunks: (parseInt(prevDb.totalChunks.replace(/,/g, "")) + 18).toLocaleString()
          }));
          setLogs(prevLogs => [
            {
              timestamp: new Date().toTimeString().split(" ")[0],
              event: "Pipeline Retrain Success",
              detail: "Vectorized 54 text blocks from URLs",
              status: "Success"
            },
            ...prevLogs
          ]);
          onAlert("Vector database training completed successfully.");
          return 100;
        }
        return prev + 25;
      });
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Page Title & Controls */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">AI Training Console</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Configure embeddings, partition boundaries, and initiate vector space retraining.</p>
        </div>
        <Button 
          onPress={handleRetrain}
          isDisabled={isRetraining}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors ${
            isRetraining ? "bg-[#9CA3AF]" : "bg-[#4F46E5] hover:bg-[#4338CA]"
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRetraining ? "animate-spin" : ""}`} />
          {isRetraining ? `Retraining (${progress}%)` : "Start Pipeline Sync"}
        </Button>
      </div>

      {/* Embedding Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Vector Storage</span>
              <span className="text-sm font-bold text-[#111827]">{vectorDb.provider}</span>
            </div>
          </div>
          <div className="border-t border-[#F3F4F6] pt-3 flex justify-between text-xs">
            <span className="text-[#6B7280]">Dimensions</span>
            <span className="font-mono font-bold text-[#111827]">{vectorDb.dimension}d</span>
          </div>
        </Card>

        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Index Capacity</span>
              <span className="text-sm font-bold text-[#111827]">{vectorDb.totalVectors} Vectors</span>
            </div>
          </div>
          <div className="border-t border-[#F3F4F6] pt-3 flex justify-between text-xs">
            <span className="text-[#6B7280]">Total Chunks</span>
            <span className="font-mono font-bold text-[#111827]">{vectorDb.totalChunks}</span>
          </div>
        </Card>

        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#ECFEFF] flex items-center justify-center text-[#06B6D4]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Avg Chunk Density</span>
              <span className="text-sm font-bold text-[#111827]">{vectorDb.avgChunkSize}</span>
            </div>
          </div>
          <div className="border-t border-[#F3F4F6] pt-3 flex justify-between text-xs">
            <span className="text-[#6B7280]">Matching Metric</span>
            <span className="font-bold text-[#111827]">{vectorDb.metric}</span>
          </div>
        </Card>
      </div>

      {/* Training Status and Real-time Logs Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Canvas */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">Chunking Strategies</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Max Chunk Tokens</label>
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Overlap Tokens</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Chunking Model</label>
                <select className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5] focus:bg-white transition-all">
                  <option>Recursive Character Splitting</option>
                  <option>Semantic Paragraph Splitting</option>
                  <option>Token-based Splitting</option>
                </select>
              </div>
              <Button
                onPress={() => onAlert("Chunking parameters updated. A retrain is recommended.")}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#4F46E5] text-xs font-bold transition-colors cursor-pointer"
              >
                Save Strategy
              </Button>
            </div>
          </Card>
        </div>

        {/* Console Logs */}
        <div className="lg:col-span-8">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Embeddings Sync Pipeline Logs</h3>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Real-time vectorization streams & LLM embedding queries.</p>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                Live Node connected
              </span>
            </div>

            <div className="bg-[#111827] rounded-xl p-4 font-mono text-[10px] text-[#E2E8F0] flex flex-col gap-2.5 max-h-[300px] overflow-y-auto leading-relaxed">
              {isRetraining && (
                <div className="text-[#38BDF8] animate-pulse">
                  &gt; [{new Date().toTimeString().split(" ")[0]}] Crawling URLs and updating HNSW graphs... ({progress}%)
                </div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2.5 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-[#6B7280] shrink-0">[{log.timestamp}]</span>
                  <span className="text-[#34D399] shrink-0">{log.event}:</span>
                  <span className="text-[#D1D5DB] flex-1 break-all">{log.detail}</span>
                  <span className="text-[#A7F3D0] shrink-0 uppercase text-[8px] font-bold tracking-wider">{log.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
