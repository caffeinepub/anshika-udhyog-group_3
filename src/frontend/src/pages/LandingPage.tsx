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
    <main className="pt-20">
      <HeroSlider onCTAClick={onSignupClick} />
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection settings={settings} onSubmitInquiry={onSubmitInquiry} />
    </main>
  );
}
