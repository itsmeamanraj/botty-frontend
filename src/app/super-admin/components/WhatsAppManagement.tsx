"use client";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function WhatsAppManagement({ onAlert }: ActionProps) {
  const numbers = [
    { business: "Apex Coaching Hub", phone: "+91 98765 43210", provider: "Meta Cloud API", status: "Connected", msgCount: "12,482" },
    { business: "Hospitals Group LLC", phone: "+1 (555) 243-9800", provider: "Twilio API", status: "Connected", msgCount: "4,212" },
    { business: "Zenith SaaS Corp", phone: "+1 (555) 902-1244", provider: "Meta Cloud API", status: "Disconnected", msgCount: "1,840" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">WhatsApp API Management</h2>
        <p className="text-xs text-admin-text-muted mt-1">Monitor WhatsApp Business Phone Line connections and system message logs.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Tenant Business</th>
              <th className="pb-4">Phone Number</th>
              <th className="pb-4">Gateway Provider</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Messages Sent</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((num, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white">{num.business}</td>
                <td className="py-4 text-admin-secondary font-mono">{num.phone}</td>
                <td className="py-4 text-admin-text-muted">{num.provider}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${num.status === "Connected" ? "bg-admin-success/15 text-admin-success" : "bg-admin-danger/15 text-admin-danger"}`}>
                    {num.status}
                  </span>
                </td>
                <td className="py-4 text-white font-bold font-mono">{num.msgCount}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <button onClick={() => onAlert(`Syncing phone status for ${num.phone}`)} className="p-1 px-2 bg-white/5 hover:bg-white/10 rounded border border-white/15 text-[10px] text-white font-semibold cursor-pointer">
                    Sync Status
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
