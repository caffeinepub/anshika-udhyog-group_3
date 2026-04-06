import { AboutSection } from "../components/landing/AboutSection";
import { ContactSection } from "../components/landing/ContactSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HeroSlider } from "../components/landing/HeroSlider";
import { ServicesSection } from "../components/landing/ServicesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import type { Inquiry, SiteSettings } from "../types";

interface LandingPageProps {
  settings: SiteSettings;
  onSignupClick: () => void;
  onSubmitInquiry: (data: Omit<Inquiry, "id" | "status">) => void;
}

export function LandingPage({
  settings,
  onSignupClick,
  onSubmitInquiry,
}: LandingPageProps) {
  return (
    <main className="w-full max-w-full overflow-x-hidden">
      {/* Spacer to push content below fixed header.
          Mobile: header ~70px (no top bar), Desktop: header ~90px (top bar + main bar) */}
      <div className="h-[70px] md:h-[90px]" aria-hidden="true" />
      <HeroSlider onCTAClick={onSignupClick} />
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection settings={settings} onSubmitInquiry={onSubmitInquiry} />
    </main>
  );
}
