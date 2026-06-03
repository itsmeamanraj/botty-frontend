"use client";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Platform Analytics</h2>
        <p className="text-xs text-admin-text-muted mt-1">Multi-tenant conversion rates, response accuracy heatmaps, and system KPIs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* KPI metrics */}
        <div className="p-6 rounded-2xl border border-white/5 bg-admin-card">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">AI Accuracy & Resolution Rates</h3>
          <div className="flex flex-col gap-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span>AI Intent Accuracy</span>
                <span className="font-bold font-mono">99.2%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5"><div className="h-full bg-admin-primary rounded-full" style={{ width: "99.2%" }} /></div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span>Autopilot Resolution Rate</span>
                <span className="font-bold font-mono">88.4%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5"><div className="h-full bg-admin-secondary rounded-full" style={{ width: "88.4%" }} /></div>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Daily Conversation Volume</h3>
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
              <span key={d} className="text-[10px] text-admin-text-muted font-bold">{d}</span>
            ))}
            {Array.from({ length: 28 }).map((_, idx) => {
              const bgClass = idx % 5 === 0 ? "bg-admin-primary" : idx % 3 === 0 ? "bg-admin-secondary" : "bg-white/5";
              return (
                <div key={idx} className={`aspect-square rounded-md ${bgClass} hover:scale-105 transition-transform cursor-pointer`} title={`Day ${idx+1}`} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
