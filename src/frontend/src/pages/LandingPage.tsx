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
      {/*
        Spacer below fixed header.
        Mobile: header is ~52px (logo 32px + py-2*2 + border)
        Desktop: top bar (~28px) + main header (~60px) = ~88px
      */}
      <div className="h-[52px] md:h-[90px]" aria-hidden="true" />
      <HeroSlider onCTAClick={onSignupClick} />
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection settings={settings} onSubmitInquiry={onSubmitInquiry} />
    </main>
  );
}
