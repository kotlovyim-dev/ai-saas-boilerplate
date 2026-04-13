import { BottomCtaSection } from "./bottom-cta-section";
import { DashboardSection } from "./dashboard-section";
import { FooterSection } from "./footer-section";
import { GrowthSection } from "./growth-section";
import { HeroSection } from "./hero-section";
import { TestimonialsSection } from "./testimonials-section";
import { WorkflowsSection } from "./workflows-section";

export function LandingPage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <GrowthSection />
      <DashboardSection />
      <WorkflowsSection />
      <TestimonialsSection />
      <BottomCtaSection />
      <FooterSection />
    </main>
  );
}
