"use client";

import {
  BarChart3,
  Bot,
  Compass,
  LifeBuoy,
  Settings2,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";

const navMain = [
  { title: "Overview", href: "#overview", icon: Compass },
  { title: "Automation", href: "#automation", icon: Bot },
  { title: "Analytics", href: "#analytics", icon: BarChart3 },
];

const navSecondary = [
  { title: "Settings", href: "#settings", icon: Settings2 },
  { title: "Support", href: "#support", icon: LifeBuoy },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Card className="rounded-xl border border-sidebar-border bg-sidebar-primary/10 py-0 text-sidebar-foreground ring-0">
          <CardContent className="px-3 py-3">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/70">
              <Sparkles className="size-3.5 text-sidebar-primary" />
              Ascend
            </p>
            <p className="mt-2 text-sm font-medium text-sidebar-foreground">
              SaaS Control Center
            </p>
          </CardContent>
        </Card>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={index === 0}
                    tooltip={item.title}
                  >
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Card className="rounded-xl border border-sidebar-border bg-sidebar-accent/35 py-0 text-sidebar-foreground ring-0">
          <CardContent className="px-3 py-3 text-xs text-sidebar-foreground/80">
            Pro plan active
            <br />
            Renewal in 12 days
          </CardContent>
        </Card>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
