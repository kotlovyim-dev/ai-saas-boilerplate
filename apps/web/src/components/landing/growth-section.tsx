import { ArrowRight, Bolt, PlugZap, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LandingContainer } from "./landing-container";
import { SectionKicker } from "./section-kicker";

const cards = [
  {
    icon: Bolt,
    title: "Multi-channel Order",
    description:
      "Track orders, conversations, and outcomes from every platform in one dashboard.",
    emphasized: true,
  },
  {
    icon: PlugZap,
    title: "Multi-channel Sync",
    description:
      "Keep inventory and fulfillment synced in real time with low operational overhead.",
  },
  {
    icon: Workflow,
    title: "Real-time Tracking",
    description:
      "Automate status updates and notifications to increase confidence and retention.",
  },
];

export function GrowthSection() {
  return (
    <section className="py-20 sm:py-24">
      <LandingContainer>
        <div className="rounded-[2rem] border border-(--token-color-border) bg-(--token-color-accent-cyan)/30 p-6 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div>
              <SectionKicker label="Boost & Scale" />
              <h2 className="mt-4 max-w-[16ch] text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                Grow Your eCommerce{" "}
                <span className="text-(--token-color-accent-purple)">
                  Business
                </span>{" "}
                Effortlessly.
              </h2>
            </div>
            <p className="max-w-prose text-sm text-muted-foreground sm:text-base">
              Grow your eCommerce business effortlessly, automate routing,
              tracking, and fulfillment control, all in one centralized AI
              workflow.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className={`rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-0.5 ${
                  card.emphasized
                    ? "border-slate-900 bg-slate-950 text-white"
                    : "border-(--token-color-border) bg-card"
                }`}
              >
                <span
                  className={`inline-flex size-9 items-center justify-center rounded-lg ${
                    card.emphasized
                      ? "bg-white/15 text-white"
                      : "bg-(--token-color-accent-purple)/15 text-(--token-color-brand)"
                  }`}
                >
                  <card.icon className="size-4.5" />
                </span>

                <h3
                  className={`mt-4 text-lg font-semibold ${
                    card.emphasized ? "text-white" : "text-foreground"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    card.emphasized ? "text-white/75" : "text-muted-foreground"
                  }`}
                >
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="h-10 rounded-xl px-6">
              Try for free
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
