"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { AuthMeResponse } from "@/lib/auth-types";

interface AuthContextValue {
  user: AuthMeResponse["user"] | null;
  tenant: AuthMeResponse["tenant"];
  bot: AuthMeResponse["bot"];
  nextStep: AuthMeResponse["nextStep"] | null;
  isLoading: boolean;
  refreshMe: () => Promise<AuthMeResponse | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthMeResponse["user"] | null>(null);
  const [tenant, setTenant] = useState<AuthMeResponse["tenant"]>(null);
  const [bot, setBot] = useState<AuthMeResponse["bot"]>(null);
  const [nextStep, setNextStep] = useState<AuthMeResponse["nextStep"] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const applyMe = useCallback((me: AuthMeResponse | null) => {
    if (!me) {
      setUser(null);
      setTenant(null);
      setBot(null);
      setNextStep(null);
      return null;
    }
    setUser(me.user);
    setTenant(me.tenant);
    setBot(me.bot);
    setNextStep(me.nextStep);
    return me;
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const me = await apiFetch<AuthMeResponse>("/api/v1/auth/me");
      return applyMe(me);
    } catch {
      return applyMe(null);
    }
  }, [applyMe]);

  useEffect(() => {
    refreshMe().finally(() => setIsLoading(false));
  }, [refreshMe]);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await authClient.signIn.email({ email, password });
    if (result.error) {
      throw new Error(result.error.message ?? "Sign in failed");
    }
    await refreshMe();
  }, [refreshMe]);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await authClient.signUp.email({ name, email, password });
      if (result.error) {
        throw new Error(result.error.message ?? "Sign up failed");
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    await authClient.signOut();
    applyMe(null);
  }, [applyMe]);

  const value = useMemo(
    () => ({
      user,
      tenant,
      bot,
      nextStep,
      isLoading,
      refreshMe,
      signIn,
      signUp,
      signOut,
    }),
    [
      user,
      tenant,
      bot,
      nextStep,
      isLoading,
      refreshMe,
      signIn,
      signUp,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
