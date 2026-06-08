"use client";

import { useState } from "react";
import { Users, UserPlus, Trash2, Mail, Check, Shield } from "lucide-react";
import { Card, Button } from "@heroui/react";
import { TenantRole, ROLE_LABELS } from "@/hooks/useRBAC";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Team({ onAlert }: ActionProps) {
  const [members, setMembers] = useState([
    { id: 1, name: "Aman Raj", email: "aman@zenith-mfg.com", role: "BUSINESS_OWNER" as TenantRole, status: "Active", joined: "May 10, 2026" },
    { id: 2, name: "Sarah Jenkins", email: "sarah@hosp-group.com", role: "MANAGER" as TenantRole, status: "Active", joined: "May 12, 2026" },
    { id: 3, name: "Deepak Sharma", email: "deepak@apex.com", role: "SALES_AGENT" as TenantRole, status: "Active", joined: "May 15, 2026" },
    { id: 4, name: "Marcus Chen", email: "marcus@real-prop.com", role: "SUPPORT_AGENT" as TenantRole, status: "Pending Invite", joined: "Jun 02, 2026" },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TenantRole>("SUPPORT_AGENT");

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setMembers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole,
        status: "Pending Invite",
        joined: "Just now"
      }
    ]);
    setInviteEmail("");
    onAlert(`Invite sent to ${inviteEmail} as ${ROLE_LABELS[inviteRole]}`);
  };

  const deleteMember = (id: number, email: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    onAlert(`Removed team member: ${email}`);
  };

  const updateRole = (id: number, newRole: TenantRole) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m));
    onAlert(`Updated team member role to ${ROLE_LABELS[newRole]}`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Team Management</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Invite sales agents, support executives, and managers. Assign platform permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Team roster */}
        <div className="lg:col-span-8">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-6">Active Roster</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                    <th className="pb-4">Name / Email</th>
                    <th className="pb-4">Role</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Joined Date</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                      <td className="py-4">
                        <span className="font-bold text-[#111827] block">{m.name || "Invite Sent"}</span>
                        <span className="text-[10px] text-[#6B7280] font-mono mt-0.5 block">{m.email}</span>
                      </td>
                      <td className="py-4">
                        <select
                          value={m.role}
                          onChange={(e) => updateRole(m.id, e.target.value as TenantRole)}
                          className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg py-1 px-2 text-[11px] font-semibold text-[#111827] outline-none focus:border-[#4F46E5]"
                        >
                          {Object.keys(ROLE_LABELS).map((role) => (
                            <option key={role} value={role}>{ROLE_LABELS[role as TenantRole]}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                          m.status === "Active" ? "bg-[#ECFDF5] text-[#10B981]" : "bg-[#EEF2FF] text-[#4F46E5] animate-pulse"
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#6B7280] font-mono">{m.joined}</td>
                      <td className="py-4 text-right flex justify-end gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => deleteMember(m.id, m.email)}
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

        {/* Invite portal */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#4F46E5]" />
              Invite Member
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="agent@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Access Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TenantRole)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                >
                  {Object.keys(ROLE_LABELS).map((role) => (
                    <option key={role} value={role}>{ROLE_LABELS[role as TenantRole]}</option>
                  ))}
                </select>
              </div>

              <Button
                onPress={handleInvite}
                className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-colors cursor-pointer mt-2"
              >
                Send Invitation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
