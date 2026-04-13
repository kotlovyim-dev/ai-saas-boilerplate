"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AuthShell } from "@/components/auth/auth-shell";
import {
  useBootstrapSessionQuery,
  useLoginMutation,
} from "@/hooks/queries/auth";
import { ApiError } from "@/lib/api/api-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const sessionStatus = useAuthStore((state) => state.sessionStatus);
  const loginMutation = useLoginMutation();

  useBootstrapSessionQuery();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, sessionStatus]);

  const onSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    try {
      await loginMutation.mutateAsync(values);
      toast.success("Welcome back");
      router.replace("/dashboard");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to sign in right now";

      form.setError("root", {
        message,
      });
      toast.error(message);
    }
  });

  const isBusy = loginMutation.isPending || sessionStatus === "unknown";

  return (
    <AuthShell
      mode="login"
      title="Welcome back to your AI chat workspace"
      description="Sign in to continue your conversations, upload files, and get RAG-grounded answers."
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-(--token-color-brand) hover:underline"
          >
            Create one now
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        {sessionStatus === "unknown" ? (
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-(--token-color-border) bg-muted/35 px-3 py-2 text-sm text-(--token-color-text-muted)">
            <Loader2 className="size-4 animate-spin" />
            Checking active session...
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label
            htmlFor="login-email"
            className="text-xs font-semibold tracking-[0.12em] text-(--token-color-text-muted) uppercase"
          >
            Work Email
          </Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            aria-invalid={Boolean(form.formState.errors.email)}
            disabled={isBusy}
            {...form.register("email")}
          />
          {form.formState.errors.email?.message ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <Label
              htmlFor="login-password"
              className="text-xs font-semibold tracking-[0.12em] text-(--token-color-text-muted) uppercase"
            >
              Password
            </Label>
            <span className="text-xs text-(--token-color-text-muted)">
              Reset flow coming soon
            </span>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            aria-invalid={Boolean(form.formState.errors.password)}
            disabled={isBusy}
            {...form.register("password")}
          />
          {form.formState.errors.password?.message ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>

        {form.formState.errors.root?.message ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isBusy}
          className="h-11 w-full rounded-xl bg-(--token-color-brand) text-white hover:bg-(--token-color-brand)/90"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
