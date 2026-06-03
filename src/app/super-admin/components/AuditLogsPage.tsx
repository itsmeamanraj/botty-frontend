"use client";

export default function AuditLogsPage() {
  const logs = [
    { user: "Aman Raj (Super Admin)", action: "Approved Business Account Apex Coaching", module: "Tenants", ip: "192.168.1.48", date: "Jun 03, 2026 10:14 AM" },
    { user: "System Automator", action: "Triggered Auto Backup Node Provider Switch", module: "Integrations", ip: "localhost", date: "Jun 02, 2026 11:22 PM" },
    { user: "Stripe Webhook", action: "Processed Subscription Payment Invoice INV-4820", module: "Billing", ip: "stripe-webhook-node", date: "Jun 02, 2026 10:00 AM" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">System Audit Logs</h2>
        <p className="text-xs text-admin-text-muted mt-1">Enterprise-grade transaction ledger tracking admin actions and API endpoints.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Operator User</th>
              <th className="pb-4">Operation Action</th>
              <th className="pb-4">Module Target</th>
              <th className="pb-4">IP Address</th>
              <th className="pb-4">Timestamp Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white">{log.user}</td>
                <td className="py-4 text-admin-text-muted">{log.action}</td>
                <td className="py-4 text-admin-secondary font-semibold font-mono">{log.module}</td>
                <td className="py-4 text-admin-text-muted font-mono">{log.ip}</td>
                <td className="py-4 text-admin-text-muted font-mono">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
