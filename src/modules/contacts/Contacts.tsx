"use client";

import { useState } from "react";
import { Search, FileDown, FileUp, UserCheck, Plus, Trash2, Mail } from "lucide-react";
import { Card, Button, Tooltip } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Contacts({ onAlert }: ActionProps) {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Aman Raj", phone: "+91 98765 43210", email: "aman@zenith-mfg.com", tags: ["VIP", "Enterprise"], segment: "Active", joined: "Jun 04, 2026" },
    { id: 2, name: "Deepak Sharma", phone: "+91 88888 77777", email: "deepak@apex.com", tags: ["Education", "Lead"], segment: "New", joined: "Jun 03, 2026" },
    { id: 3, name: "Sarah Jenkins", phone: "+1 415-555-0211", email: "sarah@hosp-group.com", tags: ["Medical", "VIP"], segment: "Active", joined: "May 28, 2026" },
    { id: 4, name: "Marcus Chen", phone: "+1 555-0199", email: "marcus@real-prop.com", tags: ["Real Estate"], segment: "Inactive", joined: "May 20, 2026" },
    { id: 5, name: "Jessica Taylor", phone: "+1 202-555-0143", email: "jessica@t-agency.com", tags: ["SaaS", "Lead"], segment: "New", joined: "May 10, 2026" }
  ]);

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    onAlert("Contact deleted successfully.");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title & Import/Export */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Contacts Directory</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Manage customer segments, labels, and contact synchronization.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            onPress={() => onAlert("Contacts exported successfully to CSV!")}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold cursor-pointer text-[#4B5563] h-auto"
          >
            <FileDown className="w-3.5 h-3.5" /> Export CSV
          </Button>
          <Button 
            onPress={() => onAlert("Import trigger launched.")}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-semibold cursor-pointer text-white h-auto"
          >
            <FileUp className="w-3.5 h-3.5" /> Import
          </Button>
        </div>
      </div>

      {/* Main Database Table */}
      <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
        <Card.Header className="flex justify-between items-center mb-6 p-0 bg-transparent">
          {/* Search bar */}
          <div className="relative w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by name, tags, phone..."
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 pl-10 pr-4 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            />
          </div>
        </Card.Header>

        <Card.Content className="overflow-x-auto p-0 bg-transparent">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                <th className="pb-4">Name</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Segment</th>
                <th className="pb-4">Tags</th>
                <th className="pb-4">Joined Date</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                  <td className="py-4 font-bold text-[#111827]">{c.name}</td>
                  <td className="py-4 text-[#6B7280] font-mono">{c.phone}</td>
                  <td className="py-4 text-[#6B7280] font-mono">{c.email}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                      c.segment === "Active" ? "bg-[#ECFDF5] text-[#10B981]" :
                      c.segment === "New" ? "bg-[#EEF2FF] text-[#4F46E5]" :
                      "bg-[#F1F5F9] text-[#6B7280]"
                    }`}>
                      {c.segment}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {c.tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#EEF2FF]/80 text-[#4F46E5] border border-[#EEF2FF] rounded-full text-[9px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-[#6B7280] font-mono">{c.joined}</td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <Tooltip>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => onAlert(`Email editor launched for ${c.email}`)}
                          className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] rounded-lg min-w-8 w-8 h-8 cursor-pointer text-[#4B5563]"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content showArrow className="px-2 py-1 bg-[#111827] text-white rounded-lg text-[9px]">
                        Send Email
                      </Tooltip.Content>
                    </Tooltip>
                    <Button
                      isIconOnly
                      size="sm"
                      onPress={() => deleteContact(c.id)}
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
    </div>
  );
}
