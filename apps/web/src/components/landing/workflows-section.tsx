import { ArrowRight, CheckCircle2, Timer, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LandingContainer } from "./landing-container";
import { SectionKicker } from "./section-kicker";

const sideCards = [
  {
    title: "New Customers",
    value: "245+",
    hint: "this month",
  },
  {
    title: "Completed",
    value: "5",
    hint: "today",
  },
];

export function WorkflowsSection() {
  return (
    <section className="py-20 sm:py-24">
      <LandingContainer>
        <div className="mx-auto max-w-2xl text-center">
          <SectionKicker label="Smart Pipeline" />
          <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Automated{" "}
            <span className="text-(--token-color-accent-purple)">
              Workflows
            </span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Streamline processes with custom workflow templates for your
            business needs.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <article className="rounded-2xl border border-(--token-color-border) bg-(--token-color-accent-cyan)/55 p-4 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {sideCards[0].title}
            </p>
            <p className="mt-3 text-4xl font-semibold">{sideCards[0].value}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {sideCards[0].hint}
            </p>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-(--token-color-border) bg-card p-4 md:col-span-4">
            <div className="absolute -right-10 -bottom-12 h-40 w-40 rounded-full bg-(--token-color-accent-purple)/20 blur-2xl" />
            <div className="relative h-full rounded-xl bg-slate-950 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-white/65">
                Team Lead
              </p>
              <p className="mt-2 text-2xl font-semibold">Alex Morgan</p>
              <p className="mt-3 max-w-[24ch] text-sm text-white/75">
                Manage campaigns and customer operations from one dashboard.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-900 bg-slate-950 p-4 text-white md:col-span-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/75">
              <Workflow className="size-3.5" />
              AI Flow
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center justify-between rounded-xl bg-white/6 px-3 py-2 text-sm">
                Draft campaign
                <CheckCircle2 className="size-4 text-emerald-300" />
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white/6 px-3 py-2 text-sm">
                Trigger outreach
                <Timer className="size-4 text-(--token-color-accent-purple)" />
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white/6 px-3 py-2 text-sm">
                Follow-up sequence
                <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs">
                  5 steps
                </span>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-(--token-color-border) bg-(--token-color-accent-purple)/25 p-4 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {sideCards[1].title}
            </p>
            <p className="mt-3 text-4xl font-semibold">{sideCards[1].value}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {sideCards[1].hint}
            </p>
          </article>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="h-10 rounded-xl px-6">
            Try for free
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </LandingContainer>
    </section>
  );
}
