import Link from "next/link";
import { CheckCircle2, LockKeyhole, Sparkles, UserPlus } from "lucide-react";
import { PropsWithChildren } from "react";

import { LandingContainer } from "@/components/landing/landing-container";
import { SectionKicker } from "@/components/landing/section-kicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type AuthMode = "login" | "register";

type AuthShellProps = PropsWithChildren<{
  mode: AuthMode;
  title: string;
  description: string;
  footer: React.ReactNode;
}>;

const modeMeta: Record<
  AuthMode,
  {
    kicker: string;
    actionHref: string;
    actionLabel: string;
    bulletIcon: typeof LockKeyhole;
    bullets: string[];
  }
> = {
  login: {
    kicker: "Welcome Back",
    actionHref: "/register",
    actionLabel: "Create account",
    bulletIcon: LockKeyhole,
    bullets: [
      "Secure sign-in with tenant-aware access.",
      "Pick up workflows exactly where you left off.",
      "Keep product, growth, and support in one loop.",
    ],
  },
  register: {
    kicker: "Create Workspace",
    actionHref: "/login",
    actionLabel: "Sign in",
    bulletIcon: UserPlus,
    bullets: [
      "Launch a workspace in under two minutes.",
      "Invite your team and share one operational hub.",
      "Track metrics, automation, and outcomes from day one.",
    ],
  },
};

export function AuthShell({
  mode,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  const meta = modeMeta[mode];
  const BulletIcon = meta.bulletIcon;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-slate-950 text-white">
      <div className="landing-grid-overlay pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute -top-44 left-1/2 h-140 w-140 -translate-x-1/2 rounded-full bg-(--token-color-accent-purple)/30 blur-[170px]" />
      <div className="pointer-events-none absolute -left-28 top-48 h-72 w-72 rounded-full bg-(--token-color-brand)/25 blur-[130px]" />

      <LandingContainer className="relative flex min-h-dvh flex-col py-6 sm:py-10 lg:py-14">
        <header className="flex items-center justify-between gap-4 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/80 transition hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-(--token-color-accent-purple)" />
            Ascend
          </Link>

          <Button
            asChild
            variant="ghost"
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href={meta.actionHref}>{meta.actionLabel}</Link>
          </Button>
        </header>

        <div className="mt-10 grid flex-1 items-center gap-10 pb-8 xl:grid-cols-[1.06fr_0.94fr]">
          <section className="landing-reveal-up">
            <SectionKicker label={meta.kicker} inverted />

            <h1 className="mt-6 max-w-[15ch] text-[clamp(2.15rem,5.5vw,4.55rem)] leading-[1.04] font-semibold tracking-tight text-balance">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              Build, automate, and scale your SaaS workflows with a polished
              operating system that keeps every team aligned.
            </p>

            <ul className="mt-8 space-y-3">
              {meta.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 rounded-xl border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-white/85"
                >
                  <CheckCircle2 className="mt-0.5 size-4 text-(--token-color-accent-purple)" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <Badge
              variant="outline"
              className="mt-8 h-auto rounded-full border-white/20 bg-white/8 px-3 py-1.5 text-xs font-medium tracking-[0.14em] text-white/70 uppercase"
            >
              <BulletIcon className="size-3.5" />
              Multi-tenant and production ready
            </Badge>
          </section>

          <Card className="landing-reveal-up rounded-[1.85rem] border border-(--token-color-border) bg-white/95 py-0 text-slate-900 shadow-2xl shadow-black/35 ring-0">
            <CardContent className="px-6 pt-6 sm:px-7 sm:pt-7">
              <Badge
                variant="outline"
                className="h-auto rounded-full border-(--token-color-border) bg-(--token-color-surface-muted) px-3 py-1 text-[0.68rem] tracking-[0.18em] text-slate-600 uppercase"
              >
                <Sparkles className="size-3.5 text-(--token-color-brand)" />
                Workspace Access
              </Badge>
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                {mode === "login" ? "Sign in" : "Create account"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{description}</p>

              <div className="mt-6">{children}</div>
            </CardContent>

            <CardFooter className="border-(--token-color-border) bg-transparent px-6 py-4 text-sm text-slate-600 sm:px-7">
              {footer}
            </CardFooter>
          </Card>
        </div>
      </LandingContainer>
    </main>
  );
}
