"use client";

import { useState } from "react";
import { ShieldCheck, Info, Check, Lock } from "lucide-react";
import { Card, Button } from "@heroui/react";
import { rolePermissions, TenantRole, ROLE_LABELS } from "@/hooks/useRBAC";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Roles({ onAlert }: ActionProps) {
  const rolesList: TenantRole[] = [
    "WHITE_LABEL_OWNER",
    "BUSINESS_OWNER",
    "MANAGER",
    "SALES_AGENT",
    "SUPPORT_AGENT",
    "VIEWER"
  ];

  // Map permissions to clean readable descriptors
  const permissionsList = [
    { key: "conversation.view", label: "View Conversations", category: "Conversations" },
    { key: "conversation.edit", label: "Reply / Edit Conversations", category: "Conversations" },
    { key: "lead.view", label: "View Leads CRM", category: "Leads" },
    { key: "lead.edit", label: "Edit Leads & Pipeline", category: "Leads" },
    { key: "kb.view", label: "View Knowledge Docs", category: "AI Knowledge" },
    { key: "kb.edit", label: "Upload & Add Docs", category: "AI Knowledge" },
    { key: "kb.retrain", label: "Trigger Model Retraining", category: "AI Knowledge" },
    { key: "prompt.view", label: "View Chatbot Prompts", category: "AI Prompts" },
    { key: "prompt.edit", label: "Modify Chatbot Prompts", category: "AI Prompts" },
    { key: "whatsapp.view", label: "View WhatsApp Node", category: "Channels" },
    { key: "whatsapp.manage", label: "Pair & Edit WhatsApp API", category: "Channels" },
    { key: "team.view", label: "View Team Roster", category: "Administration" },
    { key: "team.manage", label: "Invite & Delete Members", category: "Administration" },
    { key: "settings.manage", label: "Modify General API Credentials", category: "Administration" },
    { key: "whitelabel.manage", label: "Configure Reseller Branding", category: "White Label" },
  ];

  const [matrix, setMatrix] = useState<Record<TenantRole, string[]>>(rolePermissions);

  const togglePermission = (role: TenantRole, permissionKey: string) => {
    // Prevent editing BUSINESS_OWNER or WHITE_LABEL_OWNER core configuration for demo safety
    if (role === "WHITE_LABEL_OWNER" || role === "BUSINESS_OWNER") {
      onAlert(`Core permissions for ${ROLE_LABELS[role]} are locked and cannot be disabled.`);
      return;
    }

    setMatrix(prev => {
      const currentList = prev[role] || [];
      let updatedList: string[];
      if (currentList.includes(permissionKey)) {
        updatedList = currentList.filter(k => k !== permissionKey);
        onAlert(`Disabled permission: "${permissionKey}" for ${ROLE_LABELS[role]}.`);
      } else {
        updatedList = [...currentList, permissionKey];
        onAlert(`Granted permission: "${permissionKey}" to ${ROLE_LABELS[role]}.`);
      }
      return {
        ...prev,
        [role]: updatedList
      };
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Roles & Permissions Matrix</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Map application permissions to default organization templates. Changes apply instantly to active nodes.</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="flex items-center gap-3 bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-4 text-[#4338CA] text-xs leading-relaxed shrink-0">
        <Info className="w-5 h-5 shrink-0" />
        <span>
          <strong>Interactive Demo Notice:</strong> Owner level roles (White Label Owner, Business Owner) are locked with static credentials to preserve master system connectivity. Custom role configuration allows granular toggling of Manager and Agent access keys.
        </span>
      </div>

      {/* RBAC Matrix Grid */}
      <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                <th className="pb-4 min-w-[200px]">Granular Permissions</th>
                {rolesList.map(role => (
                  <th key={role} className="pb-4 text-center px-3 min-w-[120px]">
                    <span className="block">{ROLE_LABELS[role]}</span>
                    {role === "WHITE_LABEL_OWNER" || role === "BUSINESS_OWNER" ? (
                      <span className="text-[8px] text-[#9CA3AF] lowercase font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        <Lock className="w-2.5 h-2.5" /> locked
                      </span>
                    ) : (
                      <span className="text-[8px] text-[#4F46E5] lowercase font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        editable
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionsList.map((perm, pIdx) => (
                <tr key={perm.key} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                  <td className="py-4">
                    <span className="font-bold text-[#111827] block">{perm.label}</span>
                    <span className="text-[9px] text-[#6B7280] font-mono mt-0.5 block">{perm.category} / key: {perm.key}</span>
                  </td>
                  {rolesList.map(role => {
                    const isGranted = (matrix[role] || []).includes(perm.key);
                    const isLocked = role === "WHITE_LABEL_OWNER" || role === "BUSINESS_OWNER";
                    return (
                      <td key={role} className="py-4 text-center px-3">
                        <label className="inline-flex items-center justify-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isGranted}
                            disabled={isLocked}
                            onChange={() => togglePermission(role, perm.key)}
                            className="w-4 h-4 rounded border-[#D1D5DB] text-[#4F46E5] focus:ring-[#EEF2FF] accent-[#4F46E5] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
