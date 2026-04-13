import { ArrowRight, DollarSign, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LandingContainer } from "./landing-container";
import { SectionKicker } from "./section-kicker";

const donutSegments = [
  { color: "bg-(--token-color-accent-purple)", value: 46 },
  { color: "bg-(--token-color-brand)", value: 32 },
  { color: "bg-(--token-color-accent-cyan)", value: 22 },
];

export function DashboardSection() {
  return (
    <section className="py-20 sm:py-24">
      <LandingContainer>
        <div className="mx-auto max-w-2xl text-center">
          <SectionKicker label="Performance Hub" />
          <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Centralized{" "}
            <span className="text-(--token-color-accent-purple)">
              Dashboard
            </span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Manage everything from stats to payouts in one elegant overview.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <article className="rounded-2xl border border-(--token-color-border) bg-(--token-color-accent-cyan)/35 p-5 md:col-span-5">
            <p className="text-sm text-muted-foreground">Customer Delight</p>
            <p className="mt-2 text-5xl leading-none font-semibold">+68%</p>
            <p className="mt-3 max-w-[18ch] text-base text-foreground">
              Exemplary Service. Satisfied Customers
            </p>
          </article>

          <article className="rounded-2xl border border-(--token-color-border) bg-(--token-color-accent-purple)/22 p-5 md:col-span-7">
            <p className="text-sm text-muted-foreground">Income Breakdown</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="relative size-20 rounded-full bg-white p-2 shadow-sm">
                <div className="size-full overflow-hidden rounded-full bg-slate-100">
                  {donutSegments.map((segment) => (
                    <div
                      key={segment.value}
                      className={segment.color}
                      style={{ height: `${segment.value}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-(--token-color-accent-purple)" />
                  Subscription
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-(--token-color-brand)" />
                  Enterprise
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-(--token-color-accent-cyan)" />
                  Services
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-(--token-color-border) bg-card p-5 md:col-span-4">
            <p className="text-sm text-muted-foreground">Annual Plans</p>
            <h3 className="mt-3 text-3xl leading-tight font-semibold">
              Up to 30% Off
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Offer your users predictable yearly pricing and improve retention.
            </p>
          </article>

          <article className="rounded-2xl border border-(--token-color-border) bg-(--token-color-accent-purple)/15 p-5 md:col-span-8">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Growth</p>
                <div className="mt-4 flex items-end gap-2">
                  {[18, 34, 46, 58, 40, 66, 72].map((value) => (
                    <div
                      key={value}
                      className="w-4 rounded-full bg-(--token-color-accent-purple)/80"
                      style={{ height: `${value}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-(--token-color-border) bg-white/80 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Net change
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-lg font-semibold text-emerald-600">
                  <TrendingUp className="size-4" />
                  +68%
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-900 bg-slate-950 p-6 text-white md:col-span-6">
            <p className="text-sm text-white/65">New users welcome offer</p>
            <h3 className="mt-2 text-5xl leading-none font-semibold">$30.89</h3>
            <p className="mt-4 max-w-[26ch] text-sm text-white/80">
              New users receive 50% off their first three months to experience
              premium features at a reduced price.
            </p>
          </article>

          <article className="rounded-2xl border border-(--token-color-border) bg-card p-5 md:col-span-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Free First 100 Orders
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-(--token-color-accent-cyan)/30 px-2 py-1 text-xs font-medium text-foreground">
                <DollarSign className="size-3.5" />
                Promo
              </span>
            </div>
            <ul className="mt-5 space-y-2">
              <li className="flex items-center justify-between rounded-xl border border-(--token-color-border) bg-muted/40 px-3 py-2 text-sm">
                Standard
                <strong>$39.00</strong>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-(--token-color-border) bg-muted/40 px-3 py-2 text-sm">
                Premium
                <strong>$89.00</strong>
              </li>
            </ul>
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
