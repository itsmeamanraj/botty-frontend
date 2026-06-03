"use client";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function KBManagement({ onAlert }: ActionProps) {
  const files = [
    { business: "Apex Coaching Hub", docName: "admissions_2026.pdf", status: "Trained", lastTraining: "12m ago", size: "2.4 MB" },
    { business: "Hospitals Group LLC", docName: "faq_support.docx", status: "Trained", lastTraining: "2 hours ago", size: "1.2 MB" },
    { business: "Alpha Real Estate", docName: "property_list.csv", status: "Processing", lastTraining: "Just now", size: "8.4 MB" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Knowledge Base & Vector Indexes</h2>
        <p className="text-xs text-admin-text-muted mt-1">Review active document parser queues, database vectors, and sync state logs.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-admin-card overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-admin-text-muted font-bold uppercase tracking-wider">
              <th className="pb-4">Tenant Business</th>
              <th className="pb-4">Document File</th>
              <th className="pb-4">Vector Status</th>
              <th className="pb-4">File Size</th>
              <th className="pb-4">Last Training Sync</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-white">{f.business}</td>
                <td className="py-4 text-admin-secondary font-mono">{f.docName}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.status === "Trained" ? "bg-admin-success/15 text-admin-success" : "bg-admin-warning/15 text-admin-warning animate-pulse"}`}>
                    {f.status}
                  </span>
                </td>
                <td className="py-4 text-admin-text-muted font-mono">{f.size}</td>
                <td className="py-4 text-admin-text-muted font-mono">{f.lastTraining}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <button onClick={() => onAlert(`Retraining vector db for ${f.docName}`)} className="p-1 px-2 bg-white/5 hover:bg-white/10 rounded border border-white/15 text-[10px] text-white font-semibold cursor-pointer">
                    Retrain
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
