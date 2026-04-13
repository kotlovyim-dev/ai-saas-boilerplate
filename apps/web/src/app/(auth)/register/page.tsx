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
  useRegisterMutation,
} from "@/hooks/queries/auth";
import { ApiError } from "@/lib/api/api-error";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";

const registerSchema = z
  .object({
    organizationName: z
      .string()
      .trim()
      .min(2, "Workspace name must be at least 2 characters"),
    email: z.string().trim().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be shorter than 65 characters"),
    terms: z.boolean(),
  })
  .refine((values) => values.terms, {
    path: ["terms"],
    message: "You need to accept the terms to continue",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const sessionStatus = useAuthStore((state) => state.sessionStatus);
  const registerMutation = useRegisterMutation();

  useBootstrapSessionQuery();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      organizationName: "",
      email: "",
      password: "",
      terms: false,
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
      await registerMutation.mutateAsync({
        organizationName: values.organizationName,
        email: values.email,
        password: values.password,
      });

      toast.success("Workspace created");
      router.replace("/dashboard");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to create your workspace right now";

      form.setError("root", {
        message,
      });
      toast.error(message);
    }
  });

  const isBusy = registerMutation.isPending || sessionStatus === "unknown";

  return (
    <AuthShell
      mode="register"
      title="Create your AI chat workspace"
      description="Set up your tenant, upload files, and start asking questions with retrieval-augmented responses."
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-(--token-color-brand) hover:underline"
          >
            Sign in
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
            htmlFor="register-company"
            className="text-xs font-semibold tracking-[0.12em] text-(--token-color-text-muted) uppercase"
          >
            Company / Workspace
          </Label>
          <Input
            id="register-company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Labs"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            aria-invalid={Boolean(form.formState.errors.organizationName)}
            disabled={isBusy}
            {...form.register("organizationName")}
          />
          {form.formState.errors.organizationName?.message ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.organizationName.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="register-email"
            className="text-xs font-semibold tracking-[0.12em] text-(--token-color-text-muted) uppercase"
          >
            Work Email
          </Label>
          <Input
            id="register-email"
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
          <Label
            htmlFor="register-password"
            className="text-xs font-semibold tracking-[0.12em] text-(--token-color-text-muted) uppercase"
          >
            Password
          </Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
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

        <div className="flex items-center gap-2 rounded-lg border border-(--token-color-border) bg-muted/35 px-3 py-2 text-sm text-(--token-color-text-muted)">
          <Checkbox
            id="register-terms"
            checked={form.watch("terms")}
            onCheckedChange={(checked) => {
              form.setValue("terms", checked === true, {
                shouldValidate: true,
              });
            }}
            disabled={isBusy}
          />
          <Label
            htmlFor="register-terms"
            className="text-sm font-normal text-(--token-color-text-muted)"
          >
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
        {form.formState.errors.terms?.message ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.terms.message}
          </p>
        ) : null}

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
          {registerMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating workspace...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
