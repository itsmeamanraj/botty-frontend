import type { ApiUserRole } from "./auth-types";
import type { TenantRole } from "@/hooks/useRBAC";

export function apiRoleToTenantRole(role: ApiUserRole | null): TenantRole {
  switch (role) {
    case "tenant_admin":
      return "BUSINESS_OWNER";
    case "agent":
      return "SALES_AGENT";
    default:
      return "BUSINESS_OWNER";
  }
}

export function getPanelPathForRole(role: ApiUserRole | null): string {
  if (role === "super_admin") return "/super-admin";
  return "/tenant-panel";
}
