"use client";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function NotificationsPage({ onAlert }: ActionProps) {
  const alerts = [
    { title: "System Outage Backup Switch", desc: "WhatsApp Node 4 disconnected. Fallback Node 5 active.", date: "10m ago", category: "System" },
    { title: "Invoice Paid", desc: "Partner Zenith SaaS Corp paid monthly invoice ($4,240).", date: "2 hours ago", category: "Payments" },
    { title: "Billing Failure", desc: "Tenant Marcus Chen subscription charge declined by Stripe.", date: "1 day ago", category: "Payments" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Notification Logs</h2>
          <p className="text-xs text-admin-text-muted mt-1">Platform alerts, payment flags, billing issues, and system warnings.</p>
        </div>
        <button onClick={() => onAlert("Cleared all notifications.")} className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-bold text-white cursor-pointer">
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((al, idx) => (
          <div key={idx} className="p-5 rounded-xl border border-white/5 bg-admin-card flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-admin-primary/15 text-admin-primary border border-admin-primary/10 mb-2.5 inline-block">
                {al.category}
              </span>
              <h4 className="text-xs font-bold text-white mt-1">{al.title}</h4>
              <p className="text-[11px] text-admin-text-muted mt-1 leading-relaxed">{al.desc}</p>
            </div>
            <span className="text-[9px] text-admin-text-muted font-mono">{al.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
