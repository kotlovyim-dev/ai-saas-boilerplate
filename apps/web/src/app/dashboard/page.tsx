import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const cards = [
  {
    label: "Monthly recurring revenue",
    value: "$42,840",
    delta: "+14.2%",
  },
  {
    label: "Active workspaces",
    value: "1,284",
    delta: "+6.4%",
  },
  {
    label: "Automation completion",
    value: "87%",
    delta: "+9.1%",
  },
];

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-20 border-b border-(--token-color-border) bg-background/80 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Ascend Dashboard
                </p>
                <h1 className="text-sm font-semibold sm:text-base">
                  Product operations cockpit
                </h1>
              </div>
            </div>
            <Button className="h-9 rounded-lg px-4">
              New workflow
              <Sparkles className="size-4" />
            </Button>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <section id="overview" className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <Card
                key={card.label}
                className="rounded-2xl border border-(--token-color-border) py-0 ring-0"
              >
                <CardHeader className="px-5 pt-5 pb-0">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {card.label}
                  </p>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="mt-3 text-3xl leading-none font-semibold">
                    {card.value}
                  </p>
                  <Badge className="mt-3 rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-600 hover:bg-emerald-500/15">
                    <TrendingUp className="size-3.5" />
                    {card.delta}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </section>

          <section
            id="automation"
            className="mt-6 grid gap-4 xl:grid-cols-[1.45fr_0.95fr]"
          >
            <Card className="rounded-2xl border border-(--token-color-border) bg-(--token-color-accent-cyan)/30 py-0 ring-0">
              <CardContent className="px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Live execution feed
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      Automation pipeline
                    </h2>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border-(--token-color-brand)/30 bg-(--token-color-brand)/15 px-3 py-1 text-(--token-color-brand)"
                  >
                    12 running
                  </Badge>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {[
                    "Lead qualification scoring",
                    "Onboarding checklist generation",
                    "Weekly KPI digest dispatch",
                    "Billing anomaly detection",
                  ].map((item) => (
                    <li key={item}>
                      <Card className="rounded-xl border border-(--token-color-border) bg-card/75 py-0 ring-0">
                        <CardContent className="flex items-center justify-between px-3 py-2.5 text-sm">
                          <span>{item}</span>
                          <Badge variant="secondary">active</Badge>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card
              id="analytics"
              className="rounded-2xl border border-(--token-color-border) py-0 ring-0"
            >
              <CardContent className="px-5 pt-5">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Week trend
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Conversion pulse</h2>

                <div className="mt-5 flex items-end gap-2 rounded-xl border border-(--token-color-border) bg-muted/35 p-4">
                  {[20, 28, 33, 44, 39, 51, 58].map((height, index) => (
                    <div
                      key={height + index}
                      className="w-full rounded-full bg-(--token-color-brand)/20 p-0.5"
                    >
                      <div
                        className="rounded-full bg-(--token-color-brand)"
                        style={{ height: `${height}px` }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="border-none bg-transparent p-5 pt-4">
                <Button variant="outline" className="h-9 w-full rounded-lg">
                  Open full analytics
                  <ArrowUpRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
