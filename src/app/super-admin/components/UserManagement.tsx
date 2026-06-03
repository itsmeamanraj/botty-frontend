"use client";

import { useState } from "react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function UserManagement({ onAlert }: ActionProps) {
  const [users, setUsers] = useState([
    { id: 1, name: "Aman Raj", email: "aman@replydesk.com", role: "Super Admin", status: "Active", login: "5m ago" },
    { id: 2, name: "Deepak Sharma", email: "deepak@apex.com", role: "Tenant Operator", status: "Active", login: "1 hour ago" },
    { id: 3, name: "Dr. Sarah Jenkins", email: "contact@sarah-hosp.com", role: "Tenant Admin", status: "Active", login: "2 days ago" },
    { id: 4, name: "Mark Wilson", email: "mark@zenithsaas.com", role: "Partner Admin", status: "Suspended", login: "1 month ago" }
  ]);

  const resetPwd = (email: string) => {
    onAlert(`Password recovery link triggered for ${email}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">User Management</h2>
        <p className="text-xs text-admin-text-muted mt-1">Invite operations team members, assign admin permission roles, or reset recovery keys.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Last Login</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white">{u.name}</td>
                <td className="py-4 text-admin-text-muted font-mono">{u.email}</td>
                <td className="py-4 text-admin-text-muted font-bold">{u.role}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.status === "Active" ? "bg-admin-success/15 text-admin-success" : "bg-admin-danger/15 text-admin-danger"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-4 text-admin-text-muted font-mono">{u.login}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <button onClick={() => resetPwd(u.email)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/15 text-xs font-semibold cursor-pointer text-white">
                    Reset Pwd
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
