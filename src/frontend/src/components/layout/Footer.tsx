import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import type { SiteSettings } from "../../types";

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (page: string) => void;
}

export function Footer({ settings, onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    "Hi ANSHIKA UDHYOG GROUP I am Visit Official Website & Reading All Details I am Interested Join Our Group",
  );
  const whatsappNumber = "918349600835";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer style={{ backgroundColor: "#b45309" }} className="text-orange-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-orange-300 bg-white"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <div className="text-white font-bold text-sm">
                  {settings.siteName}
                </div>
                <div className="text-orange-200 text-xs">
                  {settings.tagline}
                </div>
              </div>
            </div>
            <p className="text-orange-200 text-sm leading-relaxed">
              Empowering communities through self-employment, skill development,
              and social welfare initiatives across India.
            </p>
            <div className="flex gap-3 mt-4">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
              )}
              {settings.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "landing",
                "about",
                "services",
                "activities",
                "events",
                "contact",
              ].map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(page)}
                    className="text-orange-200 hover:text-white transition-colors capitalize"
                  >
                    {page === "landing"
                      ? "Home"
                      : page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm text-orange-200">
              <li>Membership Program</li>
              <li>Skill Development Training</li>
              <li>Internship Program</li>
              <li>Donation &amp; Welfare</li>
              <li>Employment Scheme</li>
              <li>Beneficiary Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-orange-200">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2 text-orange-200">
                <Phone className="w-4 h-4" />
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2 text-orange-200">
                <Mail className="w-4 h-4" />
                <span>{settings.contactEmail}</span>
              </li>
              <li className="text-orange-200">
                UPI: <span className="text-white">{settings.upiId}</span>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-lg text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Join करें
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
        title="WhatsApp par Join Karein"
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </a>

      <div className="border-t border-orange-700 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-orange-300">
          <span>
            &copy; {year} {settings.siteName}. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-red-400" fill="currentColor" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="text-orange-200 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
