export type ApiUserRole = "super_admin" | "tenant_admin" | "agent";

export type NextStep =
  | "verify_email"
  | "bootstrap"
  | "onboarding"
  | "dashboard"
  | "admin";

export interface AuthUser {
  id: string | null;
  email: string;
  name: string | null;
  role: ApiUserRole | null;
  tenantId: string | null;
}

export interface AuthTenant {
  id: string;
  name: string;
  slug: string;
  status: "pending" | "active" | "suspended";
  industry: string | null;
  onboardingCompletedAt: string | null;
}

export interface AuthBot {
  id: string;
  name: string;
}

export interface AuthMeResponse {
  user: AuthUser;
  tenant: AuthTenant | null;
  bot: AuthBot | null;
  nextStep: NextStep;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: { field: string; message: string }[];
}
