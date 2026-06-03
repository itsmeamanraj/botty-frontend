"use client";

import { useState } from "react";
import { Plus, Globe } from "lucide-react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function WhiteLabelManagement({ onAlert }: ActionProps) {
  const [partners, setPartners] = useState([
    { id: 1, name: "Zenith SaaS Corp", domain: "support.zenithsaas.com", businesses: 24, status: "Active", revenue: "$4,240" },
    { id: 2, name: "Apex Support Agency", domain: "chat.apexagency.in", businesses: 12, status: "Active", revenue: "$2,100" },
    { id: 3, name: "Delta Automation Group", domain: "ai.delta-auto.com", businesses: 8, status: "Pending", revenue: "$1,499" }
  ]);

  const addPartner = () => {
    const newPartner = {
      id: Date.now(),
      name: "Global AI Partner Ltd",
      domain: "chat.global-ai.com",
      businesses: 0,
      status: "Active",
      revenue: "$0"
    };
    setPartners(prev => [...prev, newPartner]);
    onAlert("Created White Label Partner successfully.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-white">White Label Partners</h2>
          <p className="text-xs text-admin-text-muted mt-1">Configure custom branding domain routing, SSL statuses, and API integrations.</p>
        </div>
        <button onClick={addPartner} className="inline-flex items-center gap-1.5 px-4 py-2 bg-admin-primary hover:bg-admin-primary/95 rounded-xl text-xs font-bold shadow-lg shadow-admin-primary/20 text-white cursor-pointer">
          <Plus className="w-4 h-4" /> Create Partner
        </button>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Partner Name</th>
              <th className="pb-4">Branded Domain</th>
              <th className="pb-4">Managed Businesses</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Monthly Revenue</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white">{partner.name}</td>
                <td className="py-4 text-admin-secondary font-mono">{partner.domain}</td>
                <td className="py-4 text-admin-text-muted font-bold">{partner.businesses}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                    partner.status === "Active" ? "bg-admin-success/15 text-admin-success" : "bg-admin-warning/15 text-admin-warning"
                  }`}>
                    {partner.status}
                  </span>
                </td>
                <td className="py-4 font-bold text-admin-success">{partner.revenue}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <button onClick={() => onAlert(`Managing domain settings for ${partner.name}`)} className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 cursor-pointer text-white">
                    Domain
                  </button>
                  <button onClick={() => onAlert(`Managing custom branding configurations for ${partner.name}`)} className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 cursor-pointer text-white">
                    Branding
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
