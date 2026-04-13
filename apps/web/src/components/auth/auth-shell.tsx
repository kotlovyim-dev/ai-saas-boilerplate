import { CheckCircle2, LockKeyhole, Sparkles, UserPlus } from "lucide-react";
import { PropsWithChildren } from "react";

import { Badge } from "@/components/ui/badge";
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
      "Secure sign-in with tenant-aware access control.",
      "Continue your chats exactly where you left off.",
      "Query your uploaded files with grounded responses.",
    ],
  },
  register: {
    kicker: "Create Workspace",
    actionHref: "/login",
    actionLabel: "Sign in",
    bulletIcon: UserPlus,
    bullets: [
      "Launch your AI chat workspace in under two minutes.",
      "Upload docs and ask natural language questions instantly.",
      "Get RAG-based answers with source-aware context.",
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
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,color-mix(in_srgb,var(--token-color-brand)_15%,transparent)_0%,transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-white/60 to-transparent" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="mt-6 grid flex-1 items-center gap-8 pb-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <section>
            <span className="inline-flex items-center gap-2 rounded-full border border-(--token-color-border) bg-(--token-color-surface) px-3 py-1 text-xs font-semibold tracking-[0.16em] text-(--token-color-text-muted) uppercase">
              <span className="inline-flex h-2 w-2 rounded-full bg-(--token-color-brand)" />
              {meta.kicker}
            </span>

            <h1 className="mt-5 max-w-[16ch] text-[clamp(2rem,4.8vw,4rem)] leading-[1.06] font-semibold tracking-tight text-balance">
              {title}
            </h1>

            <p className="mt-4 max-w-xl text-base text-(--token-color-text-muted) sm:text-lg">
              {description}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {meta.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 rounded-xl border border-(--token-color-border) bg-(--token-color-surface) px-3 py-2.5 text-sm text-(--token-color-text-strong) shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 text-(--token-color-brand)" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <Badge
              variant="outline"
              className="mt-7 h-auto rounded-full border-(--token-color-border) bg-card px-3 py-1.5 text-xs font-medium tracking-[0.14em] text-(--token-color-text-muted) uppercase"
            >
              <BulletIcon className="size-3.5 text-(--token-color-brand)" />
              Multi-tenant and production ready
            </Badge>
          </section>

          <Card className="rounded-[1.85rem] border border-(--token-color-border) bg-(--token-color-surface) py-0 ring-0 shadow-[0_24px_70px_-44px_color-mix(in_srgb,var(--token-color-text-strong)_55%,transparent)]">
            <CardContent className="px-6 pt-6 sm:px-7 sm:pt-7">
              <Badge
                variant="outline"
                className="h-auto rounded-full border-(--token-color-border) bg-muted px-3 py-1 text-[0.68rem] tracking-[0.18em] text-(--token-color-text-muted) uppercase"
              >
                <Sparkles className="size-3.5 text-(--token-color-brand)" />
                Chat Access
              </Badge>
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                {mode === "login" ? "Sign in" : "Create account"}
              </h2>
              <p className="mt-2 text-sm text-(--token-color-text-muted)">
                {description}
              </p>

              <div className="mt-6">{children}</div>
            </CardContent>

            <CardFooter className="border-(--token-color-border) bg-transparent px-6 py-4 text-sm text-(--token-color-text-muted) sm:px-7">
              {footer}
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
