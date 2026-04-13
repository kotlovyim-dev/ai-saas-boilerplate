import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <AuthShell
      mode="register"
      title="Launch your SaaS workspace today"
      description="Create your account and start with a multi-tenant-ready product operations cockpit."
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
      <form className="space-y-4" action="#" method="post">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="register-first-name"
              className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
            >
              First Name
            </Label>
            <Input
              id="register-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Alex"
              className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="register-last-name"
              className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
            >
              Last Name
            </Label>
            <Input
              id="register-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Morgan"
              className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="register-email"
            className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
          >
            Work Email
          </Label>
          <Input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="register-password"
            className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
          >
            Password
          </Label>
          <Input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="register-company"
            className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
          >
            Company / Workspace
          </Label>
          <Input
            id="register-company"
            name="tenantName"
            type="text"
            autoComplete="organization"
            placeholder="Acme Labs"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            required
          />
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-(--token-color-border) bg-(--token-color-surface-muted)/70 px-3 py-2 text-sm text-slate-600">
          <Checkbox id="register-terms" name="terms" required />
          <Label
            htmlFor="register-terms"
            className="text-sm font-normal text-slate-600"
          >
          I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>

        <Button className="h-11 w-full rounded-xl bg-(--token-color-brand) text-white hover:bg-(--token-color-brand)/90">
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
