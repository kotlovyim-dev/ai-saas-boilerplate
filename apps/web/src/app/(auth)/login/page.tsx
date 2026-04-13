import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      title="Return to your command center"
      description="Sign in to continue managing your product, operations, and growth dashboards."
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
      <form className="space-y-4" action="#" method="post">
        <div className="space-y-1.5">
          <Label
            htmlFor="login-email"
            className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
          >
            Work Email
          </Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <Label
              htmlFor="login-password"
              className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase"
            >
              Password
            </Label>
            <Link
              href="#"
              className="text-xs font-medium text-(--token-color-brand) hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-11 rounded-xl border-(--token-color-border) bg-white px-3.5"
            required
          />
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-(--token-color-border) bg-(--token-color-surface-muted)/70 px-3 py-2 text-sm text-slate-600">
          <Checkbox id="login-remember" name="remember" />
          <Label
            htmlFor="login-remember"
            className="text-sm font-normal text-slate-600"
          >
            Keep me signed in on this device
          </Label>
        </div>

        <Button className="h-11 w-full rounded-xl bg-(--token-color-brand) text-white hover:bg-(--token-color-brand)/90">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
