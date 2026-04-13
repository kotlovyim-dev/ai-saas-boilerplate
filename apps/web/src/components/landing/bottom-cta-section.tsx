import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LandingContainer } from "./landing-container";
import { SectionKicker } from "./section-kicker";

export function BottomCtaSection() {
  return (
    <section className="py-12 sm:py-16">
      <LandingContainer>
        <div className="relative overflow-hidden rounded-[2rem] border border-(--token-color-border) bg-(--token-color-accent-cyan)/30 p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-(--token-color-accent-purple)/35 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionKicker label="Launch Smarter" />
              <h2 className="mt-4 max-w-[14ch] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
                Get Started with TaskFlow{" "}
                <span className="text-(--token-color-accent-purple)">
                  Today!
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                Build your next dashboard in minutes with reusable sections,
                performance-first patterns, and scalable design tokens.
              </p>
              <Button className="mt-6 h-10 rounded-xl px-6">
                Start your free trial
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-(--token-color-border) bg-white/70 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Revenue
                </p>
                <p className="mt-2 text-4xl font-semibold">+68%</p>
                <p className="mt-2 text-xs text-muted-foreground">in 90 days</p>
              </div>
              <div className="rounded-2xl border border-(--token-color-border) bg-white/70 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Efficiency
                </p>
                <p className="mt-2 text-4xl font-semibold">2.4x</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  faster delivery
                </p>
              </div>
              <div className="rounded-2xl border border-(--token-color-border) bg-slate-950 p-4 text-white sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">
                  Highlights
                </p>
                <p className="mt-3 text-sm text-white/80">
                  Real-time analytics, automated workflows, and scalable
                  multi-tenant architecture ready out of the box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
