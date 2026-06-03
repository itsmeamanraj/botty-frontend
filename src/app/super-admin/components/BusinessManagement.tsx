"use client";

import { useState } from "react";
import { Check, Ban, Trash2 } from "lucide-react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function BusinessManagement({ onAlert }: ActionProps) {
  const [businesses, setBusinesses] = useState([
    { id: 1, name: "Apex Coaching Hub", owner: "Deepak Sharma", email: "deepak@apex.com", plan: "Growth", status: "Active", date: "Jun 01, 2026" },
    { id: 2, name: "Hospitals Group LLC", owner: "Dr. Sarah Jenkins", email: "contact@sarah-hosp.com", plan: "Enterprise", status: "Active", date: "May 28, 2026" },
    { id: 3, name: "Alpha Real Estate", owner: "Marcus Chen", email: "marcus@alpha-properties.com", plan: "Growth", status: "Pending", date: "Jun 03, 2026" },
    { id: 4, name: "Zenith Manufacturers", owner: "Aman Raj", email: "aman@zenith-mfg.com", plan: "Starter", status: "Suspended", date: "Apr 12, 2026" }
  ]);

  const updateStatus = (id: number, newStatus: string) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    onAlert(`Business status updated to ${newStatus}`);
  };

  const deleteBiz = (id: number) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
    onAlert("Business account deleted successfully.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Business Management</h2>
        <p className="text-xs text-admin-text-muted mt-1">Approve new tenant sign-ups, adjust subscription status, or suspend accounts.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Business Name</th>
              <th className="pb-4">Owner</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Plan</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Created Date</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white">{biz.name}</td>
                <td className="py-4 text-admin-text-muted">{biz.owner}</td>
                <td className="py-4 text-admin-text-muted font-mono">{biz.email}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${biz.plan === "Enterprise" ? "bg-admin-secondary/15 text-admin-secondary border border-admin-secondary/20" : "bg-admin-primary/15 text-admin-primary border border-admin-primary/20"}`}>
                    {biz.plan}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                    biz.status === "Active" ? "bg-admin-success/15 text-admin-success" : 
                    biz.status === "Pending" ? "bg-admin-warning/15 text-admin-warning" : 
                    "bg-admin-danger/15 text-admin-danger"
                  }`}>
                    {biz.status}
                  </span>
                </td>
                <td className="py-4 text-admin-text-muted font-mono">{biz.date}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  {biz.status === "Pending" && (
                    <button onClick={() => updateStatus(biz.id, "Active")} className="p-1.5 bg-admin-success/15 hover:bg-admin-success/30 rounded text-admin-success cursor-pointer" title="Approve">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {biz.status === "Active" && (
                    <button onClick={() => updateStatus(biz.id, "Suspended")} className="p-1.5 bg-admin-warning/15 hover:bg-admin-warning/30 rounded text-admin-warning cursor-pointer" title="Suspend">
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {biz.status === "Suspended" && (
                    <button onClick={() => updateStatus(biz.id, "Active")} className="p-1.5 bg-admin-success/15 hover:bg-admin-success/30 rounded text-admin-success cursor-pointer" title="Reactivate">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button onClick={() => deleteBiz(biz.id)} className="p-1.5 bg-admin-danger/15 hover:bg-admin-danger/30 rounded text-admin-danger cursor-pointer" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
