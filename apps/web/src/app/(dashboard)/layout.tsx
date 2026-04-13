"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useBootstrapSessionQuery } from "@/hooks/queries/auth";
import { selectSessionStatus, useAuthStore } from "@/stores/auth-store";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const sessionStatus = useAuthStore(selectSessionStatus);
  const bootstrapQuery = useBootstrapSessionQuery();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, sessionStatus]);

  if (sessionStatus === "unknown" || bootstrapQuery.isPending) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background px-6 py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Restoring your workspace session...
        </div>
      </main>
    );
  }

  if (sessionStatus !== "authenticated") {
    return null;
  }

  return <>{children}</>;
}
