"use client";

import { useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function SettingsPage({ onAlert }: ActionProps) {
  const [smtp, setSmtp] = useState("smtp.replydesk.com");
  const [maintenance, setMaintenance] = useState(false);
  const [backup, setBackup] = useState(true);

  // Scoped features permission states (as requested in prompt for "Permissions & Feature Flags")
  const [features, setFeatures] = useState({
    whatsapp: true,
    crm: true,
    analytics: true,
    kb: true,
    whitelabel: false,
    billing: true,
    ai: true
  });

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => {
      const nextVal = !prev[key];
      onAlert(`${key.toUpperCase()} module permission changed to ${nextVal ? "ENABLED" : "DISABLED"}`);
      return { ...prev, [key]: nextVal };
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white">System Settings</h2>
        <p className="text-xs text-admin-text-muted mt-1">Configure global server setups, SMTP configurations, database backups, and feature flags.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column: Server configs & switches */}
        <div className="flex flex-col gap-8">
          {/* Server SMTP */}
          <div className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Mail & Provider Credentials</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-admin-text-muted">SMTP Server Address</label>
              <input
                type="text"
                value={smtp}
                onChange={(e) => setSmtp(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 outline-none text-white focus:border-admin-primary"
              />
            </div>
            <button onClick={() => onAlert("Saved server credentials successfully.")} className="px-4 py-2.5 bg-admin-primary hover:bg-admin-primary/90 text-white font-bold text-xs rounded-xl self-end cursor-pointer">
              Save Settings
            </button>
          </div>

          {/* System Toggles */}
          <div className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">System Status Toggles</h3>
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Maintenance Mode</span>
                  <span className="text-[10px] text-admin-text-muted mt-0.5">Toggle maintenance overlay across all tenant portals</span>
                </div>
                <button onClick={() => setMaintenance(!maintenance)} className="cursor-pointer text-white">
                  {maintenance ? <ToggleRight className="w-9 h-9 text-admin-primary" /> : <ToggleLeft className="w-9 h-9 text-admin-text-muted" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Auto Database Backup</span>
                  <span className="text-[10px] text-admin-text-muted mt-0.5">Automate hourly database sync tasks</span>
                </div>
                <button onClick={() => setBackup(!backup)} className="cursor-pointer text-white">
                  {backup ? <ToggleRight className="w-9 h-9 text-admin-primary" /> : <ToggleLeft className="w-9 h-9 text-admin-text-muted" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Permissions & Feature Flags */}
        <div className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Permissions & Feature Flags</h3>
          <p className="text-[11px] text-admin-text-muted mb-2">Enable or disable specific features dynamically across all tenant applications.</p>
          <div className="flex flex-col gap-4 text-xs">
            {(Object.keys(features) as Array<keyof typeof features>).map((key) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <span className="font-bold text-white uppercase tracking-wider block">{key} Module</span>
                  <span className="text-[10px] text-admin-text-muted mt-0.5">Allow tenants to access the {key} workspace</span>
                </div>
                <button onClick={() => toggleFeature(key)} className="cursor-pointer text-white">
                  {features[key] ? <ToggleRight className="w-9 h-9 text-admin-primary" /> : <ToggleLeft className="w-9 h-9 text-admin-text-muted" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
