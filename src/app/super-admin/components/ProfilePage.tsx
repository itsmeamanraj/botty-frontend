"use client";

import { useState } from "react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function ProfilePage({ onAlert }: ActionProps) {
  const [profileName, setProfileName] = useState("Aman Raj");
  const [email, setEmail] = useState("aman@replydesk.com");

  return (
    <div className="flex flex-col gap-8 max-w-xl">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Admin Profile Settings</h2>
        <p className="text-xs text-admin-text-muted mt-1">Adjust credentials, edit name tags, and rotate security recovery keys.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-admin-text-muted">Display Name</label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 outline-none text-white focus:border-admin-primary"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-admin-text-muted">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 outline-none text-white focus:border-admin-primary"
          />
        </div>
        <button onClick={() => onAlert("Updated admin credentials successfully.")} className="px-4 py-2.5 bg-admin-primary hover:bg-admin-primary/90 text-white font-bold text-xs rounded-xl self-end cursor-pointer">
          Update Profile
        </button>
      </div>
    </div>
  );
}
