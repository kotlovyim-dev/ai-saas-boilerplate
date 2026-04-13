"use client";

import { Loader2, LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@/hooks/queries/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectAuthUser, useAuthStore } from "@/stores/auth-store";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore(selectAuthUser);
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Session cleanup still happens in the logout mutation.
    }

    router.replace("/login");
  };

  return (
    <main className="min-h-dvh bg-background px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
              Auth Session
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-(--token-color-border) bg-card"
            >
              <ShieldCheck className="size-3.5" />
              Authenticated
            </Badge>

            <Button
              variant="outline"
              className="h-9 rounded-lg"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}
              {logoutMutation.isPending ? "Signing out..." : "Log out"}
            </Button>
          </div>
        </header>

        <Card className="rounded-2xl border border-(--token-color-border) py-0 ring-0">
          <CardHeader className="border-b border-(--token-color-border) px-5 py-4">
            <CardTitle>Current User</CardTitle>
            <CardDescription>
              This page only shows data available from the current auth flow.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-3 px-5 py-4 sm:grid-cols-2">
            <div className="rounded-xl border border-(--token-color-border) bg-card px-3 py-2.5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Email
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {user?.email ?? "Not available"}
              </p>
            </div>

            <div className="rounded-xl border border-(--token-color-border) bg-card px-3 py-2.5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Role
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {user?.role ?? "Not available"}
              </p>
            </div>

            <div className="rounded-xl border border-(--token-color-border) bg-card px-3 py-2.5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Tenant ID
              </p>
              <p className="mt-1 break-all text-sm font-medium text-foreground">
                {user?.tenantId ?? "Not available"}
              </p>
            </div>

            <div className="rounded-xl border border-(--token-color-border) bg-card px-3 py-2.5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                User ID
              </p>
              <p className="mt-1 break-all text-sm font-medium text-foreground">
                {user?.id ?? "Not available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
