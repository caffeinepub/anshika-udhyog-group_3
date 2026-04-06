import { Button } from "@/components/ui/button";
import { Bell, Download, LogOut, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import type { AuthState, SiteSettings } from "../../types";

const FALLBACK_LOGO =
  "/assets/file_00000000ee8c7208b7195e3f0161d038-019d63d5-db14-7133-b573-8c14be5bebb8.png";

interface HeaderProps {
  auth: AuthState;
  settings: SiteSettings;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  notificationCount?: number;
}

// Custom hamburger icon with 3 bars of distinct widths
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="flex flex-col gap-[5px] w-7 items-start">
    {/* Line 1: WIDE - full width (28px) */}
    <span
      className="block h-[2px] bg-white rounded-full"
      style={{
        width: isOpen ? "28px" : "28px",
        transform: isOpen ? "rotate(45deg) translateY(7px)" : "none",
        transition: "transform 0.3s ease, width 0.3s ease",
      }}
    />
    {/* Line 2: SMALL - narrow (16px) */}
    <span
      className="block h-[2px] bg-white rounded-full"
      style={{
        width: "16px",
        opacity: isOpen ? 0 : 1,
        transition: "opacity 0.2s ease",
      }}
    />
    {/* Line 3: MEDIUM - between line 1 and 2 (22px) */}
    <span
      className="block h-[2px] bg-white rounded-full"
      style={{
        width: isOpen ? "28px" : "22px",
        transform: isOpen ? "rotate(-45deg) translateY(-7px)" : "none",
        transition: "transform 0.3s ease, width 0.3s ease",
      }}
    />
  </div>
);

export function Header({
  auth,
  settings,
  onLoginClick,
  onSignupClick,
  onLogout,
  onNavigate,
  currentPage,
  notificationCount = 0,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { isInstallable, isInstalled, triggerInstall } = useInstallPrompt();

  const effectiveLogo =
    !settings.logoUrl || logoError ? FALLBACK_LOGO : settings.logoUrl;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavLinks = [
    { label: "🏠 Home", page: "landing" },
    { label: "ℹ️ About", page: "about" },
    { label: "🛠️ Services", page: "services" },
    { label: "📸 Activities", page: "activities" },
    { label: "📅 Events", page: "events" },
    { label: "📞 Contact", page: "contact" },
  ];

  const servicesLinks = [
    { label: "🛍️ Shopping", page: "shopping" },
    { label: "📦 E-Commerce", page: "ecommerce" },
    { label: "⚡ Utilities", page: "utilities" },
    { label: "🚚 Shipping", page: "shipping" },
    { label: "🎓 Internship", page: "internship" },
    { label: "💼 Vacancies", page: "vacancy" },
    { label: "💰 Income Plan", page: "income-plan" },
    { label: "🏢 Franchise", page: "franchise" },
    { label: "💼 Jobs", page: "jobs" },
    { label: "📜 Policy", page: "policy" },
  ];

  const desktopNavLinks = [
    { label: "Home", page: "landing" },
    { label: "About", page: "about" },
    { label: "Services", page: "services" },
    { label: "Activities", page: "activities" },
    { label: "Events", page: "events" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#166534" }}
    >
      {/* Top bar - desktop only */}
      <div
        className="hidden md:flex items-center justify-between px-6 py-1 text-xs text-green-100"
        style={{ backgroundColor: "#14532d" }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> {settings.contactPhone}
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3" /> {settings.contactEmail}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>UPI: {settings.upiId}</span>
          {isInstallable && !isInstalled && (
            <button
              type="button"
              onClick={triggerInstall}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold transition-all hover:opacity-90"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#bbf7d0",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Download className="w-3 h-3" /> App Install Karo
            </button>
          )}
          {isInstalled && (
            <span className="flex items-center gap-1 text-green-300 text-xs">
              ✓ App Installed
            </span>
          )}
        </div>
      </div>

      {/* Main header - compact on mobile */}
      <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3">
        {/* Logo + Title */}
        <button
          type="button"
          className="flex items-center gap-2 group"
          onClick={() => onNavigate("landing")}
          data-ocid="nav.home.link"
        >
          {/* Mobile: smaller logo (h-8 = 32px), Desktop: normal (h-12 = 48px) */}
          <img
            src={effectiveLogo}
            alt="AUG Logo"
            className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover border-2 border-green-300 bg-white"
            onError={() => {
              if (!logoError) setLogoError(true);
            }}
          />
          <div className="text-left">
            <div className="text-white font-bold text-xs md:text-base leading-tight tracking-wide">
              {settings.siteName}
            </div>
            <div className="text-green-200 text-[10px] md:text-xs leading-tight hidden xs:block">
              {settings.tagline}
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {desktopNavLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => onNavigate(link.page)}
              data-ocid={`nav.${link.page}.link`}
              className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                currentPage === link.page
                  ? "bg-green-700 text-white"
                  : "text-green-100 hover:bg-green-700 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Mobile Install Button */}
          {isInstallable && !isInstalled && (
            <button
              type="button"
              onClick={triggerInstall}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold lg:hidden transition-all active:scale-95"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              title="App Install Karo"
            >
              <Download className="w-3 h-3" />
            </button>
          )}

          {auth.isLoggedIn ? (
            <>
              {notificationCount > 0 && (
                <div className="relative">
                  <Bell className="w-4 h-4 md:w-5 md:h-5 text-green-200" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                </div>
              )}
              <span className="hidden md:block text-green-100 text-sm">
                {auth.memberName}
              </span>
              <Button
                size="sm"
                onClick={() =>
                  onNavigate(auth.role === "admin" ? "admin" : "dashboard")
                }
                data-ocid="nav.dashboard.link"
                className="bg-green-600 hover:bg-green-500 text-white border-green-500 text-xs px-2 py-1 h-7 md:h-9 md:text-sm md:px-4"
              >
                Dashboard
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onLogout}
                data-ocid="nav.logout.button"
                className="border-green-300 text-green-100 hover:bg-green-700 h-7 w-7 md:h-9 md:w-auto p-1 md:px-3"
              >
                <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={onLoginClick}
                data-ocid="nav.login.button"
                className="border-green-300 text-green-100 hover:bg-green-700 bg-transparent text-xs px-2 py-1 h-7 md:h-9 md:text-sm md:px-4"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={onSignupClick}
                data-ocid="nav.signup.button"
                className="bg-white text-green-800 hover:bg-green-50 text-xs px-2 py-1 h-7 md:h-9 md:text-sm md:px-4"
              >
                Register
              </Button>
            </>
          )}

          {/* Custom Hamburger */}
          <button
            type="button"
            className="lg:hidden p-1.5 md:p-2 rounded hover:bg-green-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-ocid="nav.hamburger.toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Category wise */}
      {isMobileMenuOpen && (
        <nav
          className="lg:hidden overflow-y-auto max-h-screen"
          style={{ backgroundColor: "#14532d" }}
        >
          {/* ── MAIN MENU ────────────── */}
          <div className="px-4 pt-3 pb-1">
            <div className="text-[10px] uppercase tracking-widest font-bold text-green-500 mb-1 flex items-center gap-2">
              <span className="flex-1 h-px bg-green-700" />
              Main Menu
              <span className="flex-1 h-px bg-green-700" />
            </div>
          </div>
          {mainNavLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => {
                onNavigate(link.page);
                setIsMobileMenuOpen(false);
              }}
              data-ocid={`nav.mobile.${link.page}.link`}
              className="block w-full text-left px-6 py-3 text-green-100 hover:bg-green-800 hover:text-white border-b border-green-800 text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}

          {/* ── SERVICES & MORE ────────────── */}
          <div className="px-4 pt-3 pb-1">
            <div className="text-[10px] uppercase tracking-widest font-bold text-green-500 mb-1 flex items-center gap-2">
              <span className="flex-1 h-px bg-green-700" />
              Services &amp; More
              <span className="flex-1 h-px bg-green-700" />
            </div>
          </div>
          {servicesLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => {
                onNavigate(link.page);
                setIsMobileMenuOpen(false);
              }}
              data-ocid={`nav.mobile.${link.page}.link`}
              className="block w-full text-left px-6 py-3 text-green-100 hover:bg-green-800 hover:text-white border-b border-green-800 text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}

          {/* ── MEMBER AREA ────────────── */}
          <div className="px-4 pt-3 pb-1">
            <div className="text-[10px] uppercase tracking-widest font-bold text-green-500 mb-1 flex items-center gap-2">
              <span className="flex-1 h-px bg-green-700" />
              Member Area
              <span className="flex-1 h-px bg-green-700" />
            </div>
          </div>
          {!auth.isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  onLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                data-ocid="nav.mobile.login.button"
                className="block w-full text-left px-6 py-3 text-green-100 hover:bg-green-800 hover:text-white border-b border-green-800 text-sm font-medium transition-colors"
              >
                🔑 Login
              </button>
              <button
                type="button"
                onClick={() => {
                  onSignupClick();
                  setIsMobileMenuOpen(false);
                }}
                data-ocid="nav.mobile.register.button"
                className="block w-full text-left px-6 py-3 text-green-100 hover:bg-green-800 hover:text-white border-b border-green-800 text-sm font-medium transition-colors"
              >
                📝 Register
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  onNavigate(auth.role === "admin" ? "admin" : "dashboard");
                  setIsMobileMenuOpen(false);
                }}
                data-ocid="nav.mobile.dashboard.link"
                className="block w-full text-left px-6 py-3 text-green-100 hover:bg-green-800 hover:text-white border-b border-green-800 text-sm font-medium transition-colors"
              >
                📊 Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                data-ocid="nav.mobile.logout.button"
                className="block w-full text-left px-6 py-3 text-red-300 hover:bg-green-800 hover:text-red-200 border-b border-green-800 text-sm font-medium transition-colors"
              >
                🚪 Logout
              </button>
            </>
          )}

          {/* ── APP ────────────── */}
          <div className="px-4 pt-3 pb-1">
            <div className="text-[10px] uppercase tracking-widest font-bold text-green-500 mb-1 flex items-center gap-2">
              <span className="flex-1 h-px bg-green-700" />
              App
              <span className="flex-1 h-px bg-green-700" />
            </div>
          </div>
          {isInstallable && !isInstalled ? (
            <button
              type="button"
              onClick={() => {
                triggerInstall();
                setIsMobileMenuOpen(false);
              }}
              data-ocid="nav.mobile.install.button"
              className="flex items-center gap-2 w-full px-6 py-3 text-green-300 hover:bg-green-800 text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />📥 App Install Karo (Free)
            </button>
          ) : isInstalled ? (
            <div className="flex items-center gap-2 px-6 py-3 text-green-300 text-sm">
              ✔️ App Installed Hai
            </div>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3 text-green-400 text-sm">
              📱 Web App Ready
            </div>
          )}
          {/* Bottom padding */}
          <div className="h-4" />
        </nav>
      )}
    </header>
  );
}
