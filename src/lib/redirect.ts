import type { NextStep } from "./auth-types";

export function resolveRedirectPath(nextStep: NextStep): string {
  const paths: Record<NextStep, string> = {
    verify_email: "/verify-email",
    bootstrap: "/setup-business",
    onboarding: "/onboarding",
    dashboard: "/tenant-panel",
    admin: "/super-admin",
  };
  return paths[nextStep];
}

const PROTECTED_PREFIXES = [
  "/tenant-panel",
  "/super-admin",
  "/setup-business",
  "/onboarding",
] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** Returns a redirect target when the user is on the wrong route for their nextStep. */
export function getAuthRedirect(
  pathname: string,
  nextStep: NextStep,
): string | null {
  if (nextStep === "verify_email") {
    if (
      pathname.startsWith("/verify-email") ||
      pathname === "/login" ||
      pathname === "/"
    ) {
      return null;
    }
    return "/verify-email";
  }

  if (nextStep === "bootstrap") {
    return pathname.startsWith("/setup-business") ? null : "/setup-business";
  }

  if (nextStep === "onboarding") {
    return pathname.startsWith("/onboarding") ? null : "/onboarding";
  }

  if (nextStep === "admin") {
    if (
      pathname.startsWith("/tenant-panel") ||
      pathname.startsWith("/setup-business") ||
      pathname.startsWith("/onboarding")
    ) {
      return "/super-admin";
    }
    return null;
  }

  // dashboard
  if (
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/setup-business") ||
    pathname.startsWith("/onboarding")
  ) {
    return "/tenant-panel";
  }

  return null;
}
