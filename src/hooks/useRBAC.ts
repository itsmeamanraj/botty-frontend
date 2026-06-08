export type TenantRole = 
  | "WHITE_LABEL_OWNER"
  | "WHITE_LABEL_STAFF"
  | "BUSINESS_OWNER"
  | "MANAGER"
  | "SALES_AGENT"
  | "SUPPORT_AGENT"
  | "VIEWER";

export const ROLE_LABELS: Record<TenantRole, string> = {
  WHITE_LABEL_OWNER: "White Label Owner",
  WHITE_LABEL_STAFF: "White Label Staff",
  BUSINESS_OWNER: "Business Owner",
  MANAGER: "Manager",
  SALES_AGENT: "Sales Agent",
  SUPPORT_AGENT: "Support Agent",
  VIEWER: "Viewer",
};

// Permission matrix
export const rolePermissions: Record<TenantRole, string[]> = {
  WHITE_LABEL_OWNER: [
    "conversation.view", "conversation.edit",
    "lead.view", "lead.edit",
    "contact.view", "contact.edit",
    "kb.view", "kb.edit", "kb.retrain",
    "prompt.view", "prompt.edit",
    "whatsapp.view", "whatsapp.manage",
    "widget.view", "widget.manage",
    "analytics.view",
    "team.view", "team.manage",
    "subscription.view", "subscription.manage",
    "billing.view", "billing.manage",
    "settings.view", "settings.manage",
    "whitelabel.view", "whitelabel.manage"
  ],
  WHITE_LABEL_STAFF: [
    "conversation.view", "conversation.edit",
    "lead.view", "lead.edit",
    "contact.view", "contact.edit",
    "kb.view", "kb.edit", "kb.retrain",
    "prompt.view", "prompt.edit",
    "whatsapp.view", "whatsapp.manage",
    "widget.view", "widget.manage",
    "analytics.view",
    "team.view", "team.manage",
    "subscription.view",
    "billing.view",
    "settings.view", "settings.manage",
    "whitelabel.view"
  ],
  BUSINESS_OWNER: [
    "conversation.view", "conversation.edit",
    "lead.view", "lead.edit",
    "contact.view", "contact.edit",
    "kb.view", "kb.edit", "kb.retrain",
    "prompt.view", "prompt.edit",
    "whatsapp.view", "whatsapp.manage",
    "widget.view", "widget.manage",
    "analytics.view",
    "team.view", "team.manage",
    "subscription.view", "subscription.manage",
    "billing.view", "billing.manage",
    "settings.view", "settings.manage"
  ],
  MANAGER: [
    "conversation.view", "conversation.edit",
    "lead.view", "lead.edit",
    "contact.view", "contact.edit",
    "kb.view", "kb.edit", "kb.retrain",
    "prompt.view", "prompt.edit",
    "whatsapp.view",
    "widget.view",
    "analytics.view",
    "team.view", "team.manage",
    "subscription.view",
    "billing.view",
    "settings.view"
  ],
  SALES_AGENT: [
    "conversation.view", "conversation.edit",
    "lead.view", "lead.edit",
    "contact.view", "contact.edit",
    "kb.view",
    "analytics.view"
  ],
  SUPPORT_AGENT: [
    "conversation.view", "conversation.edit",
    "contact.view", "contact.edit",
    "kb.view",
    "analytics.view"
  ],
  VIEWER: [
    "conversation.view",
    "lead.view",
    "contact.view",
    "kb.view",
    "analytics.view"
  ]
};

export function useRBAC() {
  const hasPermission = (role: TenantRole, permission: string): boolean => {
    const permissions = rolePermissions[role] || [];
    return permissions.includes(permission);
  };

  return {
    hasPermission,
    roles: Object.keys(rolePermissions) as TenantRole[],
  };
}
