export type TenantFeature = 
  | "crm"
  | "analytics"
  | "knowledge_base"
  | "whatsapp"
  | "widget"
  | "billing"
  | "white_label";

export const FEATURE_LABELS: Record<TenantFeature, string> = {
  crm: "Leads CRM",
  analytics: "Advanced Analytics",
  knowledge_base: "Knowledge Base AI",
  whatsapp: "WhatsApp Integration",
  widget: "Website Chat Widget",
  billing: "Subscription & Billing",
  white_label: "White Label Controls",
};

export function useFeatures() {
  const hasFeature = (enabledFeatures: Record<TenantFeature, boolean>, feature: TenantFeature): boolean => {
    return !!enabledFeatures[feature];
  };

  return {
    hasFeature,
  };
}
