"use client";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function SubscriptionManagement({ onAlert }: ActionProps) {
  const plans = [
    { name: "Starter", price: "$29/mo", subscribers: 482, revenue: "$13,978/mo", usage: "1 Connected Phone | 500 Msg/mo" },
    { name: "Growth", price: "$79/mo", subscribers: 512, revenue: "$40,448/mo", usage: "3 Connected Phones | 5,000 Msg/mo" },
    { name: "Enterprise", price: "$499/mo+", subscribers: 48, revenue: "$23,952/mo", usage: "Custom Phones | Custom Msg/mo" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Subscription Management</h2>
        <p className="text-xs text-admin-text-muted mt-1">Configure subscription pricing plans, set monthly usage limits, and monitor plan conversion.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col justify-between hover:border-admin-primary/25 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-white">{p.name}</span>
                <span className="text-sm font-extrabold text-admin-secondary">{p.price}</span>
              </div>
              <p className="text-xs text-admin-text-muted mb-4 font-mono">{p.usage}</p>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6 text-xs">
                <div>
                  <span className="text-[10px] text-admin-text-muted block mb-0.5">Subscribers</span>
                  <span className="font-bold text-white">{p.subscribers}</span>
                </div>
                <div>
                  <span className="text-[10px] text-admin-text-muted block mb-0.5">Monthly Revenue</span>
                  <span className="font-bold text-admin-success">{p.revenue}</span>
                </div>
              </div>
            </div>
            <button onClick={() => onAlert(`Editing tier settings for ${p.name}`)} className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold text-white cursor-pointer">
              Edit Plan Limits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
