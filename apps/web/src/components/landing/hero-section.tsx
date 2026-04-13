import { ArrowRight, ChartColumnIncreasing, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LandingContainer } from "./landing-container";
import { SectionKicker } from "./section-kicker";

const navItems = ["Features", "About Us", "Pricing", "Blog"];

const stats = [
  { value: "200K+", label: "Active users" },
  { value: "100+", label: "Daily growth" },
  { value: "4.8", label: "User rating" },
];

const partnerLogos = [
  "Adobe",
  "Zoom",
  "Zapier",
  "WhatsApp",
  "Webflow",
  "Trustpilot",
  "Shopify",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="landing-grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-44 left-1/2 h-140 w-140 -translate-x-1/2 rounded-full bg-(--token-color-accent-purple)/30 blur-[170px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-(--token-color-brand)/30 blur-[120px]" />

      <LandingContainer className="relative py-6 sm:py-10 lg:py-14">
        <header className="flex items-center justify-between gap-4 rounded-full border border-white/15 bg-white/4 px-4 py-2.5 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/80">
            <span className="h-2 w-2 rounded-full bg-(--token-color-accent-purple)" />
            Ascend
          </div>

          <nav className="hidden items-center gap-7 text-sm text-white/75 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              Login
            </Button>
            <Button className="bg-(--token-color-accent-purple) text-slate-950 hover:bg-(--token-color-accent-purple)/80">
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white hover:bg-white/10 sm:hidden"
            aria-label="Open navigation"
          >
            <Menu />
          </Button>
        </header>

        <div className="mt-12 grid items-end gap-12 xl:grid-cols-[1.03fr_0.97fr]">
          <div className="landing-reveal-up">
            <SectionKicker label="Ai SaaS Boilerplate" inverted />

            <h1 className="mt-6 max-w-[14ch] text-[clamp(2.35rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
              Streamline{" "}
              <span className="text-(--token-color-accent-purple)">
                product
              </span>{" "}
              management
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              Powerful features built for modern SaaS teams. Ship faster,
              coordinate clearly, and keep every product decision in one place.
            </p>

            <form className="mt-8 flex flex-col gap-3 sm:max-w-lg sm:flex-row">
              <label htmlFor="hero-email" className="sr-only">
                Work email
              </label>
              <input
                id="hero-email"
                type="email"
                placeholder="Enter your work email"
                className="h-11 flex-1 rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-(--token-color-accent-purple) focus:ring-3 focus:ring-(--token-color-accent-purple)/25"
              />
              <Button className="h-11 rounded-xl bg-(--token-color-accent-purple) px-6 text-slate-950 hover:bg-(--token-color-accent-purple)/80">
                Try for Free
              </Button>
            </form>

            <dl className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-white/4 px-4 py-4"
                >
                  <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="landing-reveal-up relative">
            <div className="landing-float rounded-[2rem] border border-slate-200/80 bg-white p-4 text-slate-900 shadow-2xl shadow-black/40 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <ChartColumnIncreasing className="size-3.5" />
                  Overview
                </span>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Total Revenue
                  </p>
                  <p className="mt-2 text-3xl font-semibold">$8,136.25</p>
                  <p className="mt-1 text-xs text-emerald-600">
                    +68% this period
                  </p>

                  <div className="mt-5 grid grid-cols-6 items-end gap-2">
                    {[38, 52, 66, 84, 58, 40].map((height, index) => (
                      <div
                        key={height}
                        className="rounded-full bg-(--token-color-accent-purple)/20 px-0.5"
                      >
                        <div
                          className="rounded-full bg-(--token-color-accent-purple)"
                          style={{ height }}
                        />
                        <span className="sr-only">Bar {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Monthly Target
                    </p>
                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div className="h-full w-[76%] rounded-full bg-(--token-color-accent-purple)" />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">
                      76.5% completed
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Upcoming Tasks
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                        Product sync{" "}
                        <ArrowRight className="size-3.5 text-slate-400" />
                      </li>
                      <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                        Team retro{" "}
                        <ArrowRight className="size-3.5 text-slate-400" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-white/45">
            Trusted by modern teams
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-center text-sm font-medium text-white/70 sm:grid-cols-4 lg:grid-cols-7">
            {partnerLogos.map((logo) => (
              <span
                key={logo}
                className="opacity-80 transition hover:opacity-100"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
