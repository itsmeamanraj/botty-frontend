"use client";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function BillingPayments({ onAlert }: ActionProps) {
  const invoices = [
    { id: "INV-4820", client: "Delta Automation", amount: "$1,499.00", status: "Paid", date: "Jun 02, 2026" },
    { id: "INV-4819", client: "Dr. Sarah Jenkins", amount: "$499.00", status: "Paid", date: "May 28, 2026" },
    { id: "INV-4818", client: "Zenith SaaS Corp", amount: "$4,240.00", status: "Paid", date: "May 25, 2026" },
    { id: "INV-4817", client: "Marcus Chen", amount: "$79.00", status: "Failed", date: "May 12, 2026" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Billing & Payments</h2>
        <p className="text-xs text-admin-text-muted mt-1">Review financial transactions, invoice statuses, and automatic payouts.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <div className="p-5 rounded-2xl border border-white/5 bg-admin-card">
          <span className="text-[10px] font-bold text-admin-text-muted block mb-2">MRR (Monthly Recurring)</span>
          <span className="text-xl font-extrabold text-white">$48,240</span>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-admin-card">
          <span className="text-[10px] font-bold text-admin-text-muted block mb-2">ARR (Annual Run Rate)</span>
          <span className="text-xl font-extrabold text-white">$578,880</span>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-admin-card">
          <span className="text-[10px] font-bold text-admin-text-muted block mb-2">Pending Invoices</span>
          <span className="text-xl font-extrabold text-admin-warning">$2,840</span>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-admin-card">
          <span className="text-[10px] font-bold text-admin-text-muted block mb-2">Failed Payments</span>
          <span className="text-xl font-extrabold text-admin-danger">$79</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Recent Payments</h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Invoice ID</th>
              <th className="pb-4">Client Name</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Transaction Date</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white font-mono">{inv.id}</td>
                <td className="py-4 text-admin-text-muted">{inv.client}</td>
                <td className="py-4 text-white font-bold">{inv.amount}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.status === "Paid" ? "bg-admin-success/15 text-admin-success" : "bg-admin-danger/15 text-admin-danger"}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 text-admin-text-muted font-mono">{inv.date}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <button onClick={() => onAlert(`Downloading PDF for invoice ${inv.id}`)} className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded border border-white/15 text-[10px] text-white font-semibold cursor-pointer">
                    Download
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
