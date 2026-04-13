import { Quote } from "lucide-react";

import { LandingContainer } from "./landing-container";
import { SectionKicker } from "./section-kicker";

const testimonials = [
  {
    name: "Amelia Blake",
    role: "Product Marketing Lead",
    quote:
      "TaskFlow helped our team increase pipeline visibility and shipping confidence in less than a month.",
    dark: true,
  },
  {
    name: "Robert Fox",
    role: "Growth Manager",
    quote:
      "I can launch and iterate without chaos. The dashboard keeps campaigns and handoffs aligned.",
    dark: false,
  },
  {
    name: "Ralph Edwards",
    role: "Operations Director",
    quote:
      "Managing multiple squads is easier now. We finally have one source of truth for every step.",
    dark: false,
  },
  {
    name: "Cameron Williamson",
    role: "CTO",
    quote:
      "From launch to retention, the workflow automation made our process predictable and efficient.",
    dark: false,
  },
  {
    name: "Darnell Steward",
    role: "Senior Product Owner",
    quote:
      "The platform gives us one place to monitor growth, run experiments, and close feedback loops.",
    dark: false,
  },
  {
    name: "Eleanor Pena",
    role: "Customer Success Lead",
    quote:
      "TaskFlow streamlined our onboarding and gave us cleaner metrics for every campaign segment.",
    dark: false,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24">
      <LandingContainer>
        <div className="mx-auto max-w-2xl text-center">
          <SectionKicker label="Our Clients" />
          <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            Trusted by{" "}
            <span className="text-(--token-color-accent-purple)">
              Teams
            </span>{" "}
            Everywhere
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Transforming workflows and delivering impact proactively.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className={`rounded-2xl border p-5 ${
                item.dark
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-(--token-color-border) bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold ${
                      item.dark
                        ? "bg-white/12 text-white"
                        : "bg-(--token-color-accent-cyan)/50 text-foreground"
                    }`}
                  >
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div>
                    <p
                      className={`font-semibold ${
                        item.dark ? "text-white" : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p
                      className={`text-xs ${
                        item.dark ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
                <Quote
                  className={`size-4 ${
                    item.dark ? "text-white/45" : "text-muted-foreground"
                  }`}
                />
              </div>

              <p
                className={`mt-4 text-sm leading-relaxed ${
                  item.dark ? "text-white/78" : "text-muted-foreground"
                }`}
              >
                {item.quote}
              </p>
            </article>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
