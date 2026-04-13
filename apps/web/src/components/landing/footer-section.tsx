import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LandingContainer } from "./landing-container";

const columns = [
  {
    title: "Explore",
    links: ["Features", "Careers", "Blog", "Help Center"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookies"],
  },
  {
    title: "Quick Links",
    links: ["Pricing", "Integrations", "API", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Docs", "Case Studies", "API Reference"],
  },
];

export function FooterSection() {
  return (
    <footer className="mt-6 bg-slate-950 py-14 text-white sm:py-18">
      <LandingContainer>
        <div className="rounded-3xl border border-white/15 bg-white/3 px-6 py-10 text-center sm:px-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Community
          </p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Join our{" "}
            <span className="text-(--token-color-accent-purple)">Discord</span>
          </h2>
          <p className="mt-3 text-sm text-white/65">
            Connect with fellow builders and access feature drops first.
          </p>
          <Button className="mt-6 h-10 rounded-xl bg-(--token-color-accent-purple) px-6 text-slate-950 hover:bg-(--token-color-accent-purple)/85">
            Join our Discord
          </Button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h3 className="text-3xl font-semibold">
              Collaborate with TaskFlow
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/65">
              Improve team efficiency and shipping velocity with one intelligent
              command center.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/4 px-4 py-2 text-sm text-white/75">
            <Star className="size-4 text-emerald-300" />
            Trustpilot 4.9 Average Rating
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex items-end justify-start lg:justify-end">
            <p className="text-4xl font-semibold text-(--token-color-accent-cyan) sm:text-5xl">
              Let's talk
            </p>
          </div>
        </div>
      </LandingContainer>
    </footer>
  );
}
