import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Award,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Heart,
  Image,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  Activity,
  AdminUser,
  Beneficiary,
  Designation,
  Donation,
  Event,
  IncomePlan,
  Inquiry,
  Internship,
  LocalMember,
  Notification,
  Payment,
  SiteSettings as SiteSettingsType,
} from "../../types";
import { AccessCodeManagement } from "./AccessCodeManagement";
import { ActivityManagement } from "./ActivityManagement";
import { AdminManagement } from "./AdminManagement";
import { BeneficiaryManagement } from "./BeneficiaryManagement";
import { CompanyProfile } from "./CompanyProfile";
import { DesignationManagement } from "./DesignationManagement";
import { DonationManagement } from "./DonationManagement";
import { EventManagement } from "./EventManagement";
import { IDCardDesigner } from "./IDCardDesigner";
import { IncomePlanManagement } from "./IncomePlanManagement";
import { InquiryManagement } from "./InquiryManagement";
import { InternshipManagement } from "./InternshipManagement";
import { KYCVerification } from "./KYCVerification";
import { MemberManagement } from "./MemberManagement";
import { NotificationManagement } from "./NotificationManagement";
import { OfficialLetterGenerator } from "./OfficialLetterGenerator";
import { PaymentManagement } from "./PaymentManagement";
import { SiteSettings } from "./SiteSettings";

type AdminSection =
  | "overview"
  | "members"
  | "kyc"
  | "beneficiaries"
  | "internships"
  | "donations"
  | "payments"
  | "activities"
  | "events"
  | "designations"
  | "inquiries"
  | "notifications"
  | "income_plans"
  | "admins"
  | "settings"
  | "access_codes"
  | "company_profile"
  | "letter_generator"
  | "id_card_designer";

const navItems: {
  id: AdminSection;
  label: string;
  icon: React.ElementType;
  shortLabel: string;
  emoji: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
    shortLabel: "Overview",
    icon: LayoutDashboard,
    emoji: "📊",
  },
  {
    id: "members",
    label: "Members",
    shortLabel: "Members",
    icon: Users,
    emoji: "👥",
  },
  {
    id: "kyc",
    label: "KYC Verification",
    shortLabel: "KYC",
    icon: Shield,
    emoji: "🛡️",
  },
  {
    id: "beneficiaries",
    label: "Beneficiaries",
    shortLabel: "Beneficiaries",
    icon: UserCheck,
    emoji: "✅",
  },
  {
    id: "internships",
    label: "Internships",
    shortLabel: "Internships",
    icon: Briefcase,
    emoji: "💼",
  },
  {
    id: "donations",
    label: "Donations",
    shortLabel: "Donations",
    icon: Heart,
    emoji: "❤️",
  },
  {
    id: "payments",
    label: "Payments",
    shortLabel: "Payments",
    icon: CreditCard,
    emoji: "💳",
  },
  {
    id: "activities",
    label: "Activities",
    shortLabel: "Activities",
    icon: Image,
    emoji: "📸",
  },
  {
    id: "events",
    label: "Events",
    shortLabel: "Events",
    icon: Calendar,
    emoji: "📅",
  },
  {
    id: "designations",
    label: "Designations",
    shortLabel: "Designations",
    icon: Award,
    emoji: "🏆",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    shortLabel: "Inquiries",
    icon: MessageSquare,
    emoji: "💬",
  },
  {
    id: "notifications",
    label: "Notifications",
    shortLabel: "Notif.",
    icon: Bell,
    emoji: "🔔",
  },
  {
    id: "income_plans",
    label: "Income Plans",
    shortLabel: "Income",
    icon: TrendingUp,
    emoji: "📈",
  },
  {
    id: "admins",
    label: "Admin Users",
    shortLabel: "Admins",
    icon: UserCog,
    emoji: "👤",
  },
  {
    id: "company_profile",
    label: "Company Profile",
    shortLabel: "Company",
    icon: Building2,
    emoji: "🏢",
  },
  {
    id: "letter_generator",
    label: "Letter Generator",
    shortLabel: "Letters",
    icon: FileText,
    emoji: "📄",
  },
  {
    id: "id_card_designer" as AdminSection,
    label: "ID Card Designer",
    shortLabel: "ID Card",
    icon: CreditCard,
    emoji: "🪪",
  },
  {
    id: "settings",
    label: "Site Settings",
    shortLabel: "Settings",
    icon: Settings,
    emoji: "⚙️",
  },
  {
    id: "access_codes",
    label: "Access Codes",
    shortLabel: "Codes",
    icon: KeyRound,
    emoji: "🔑",
  },
];

interface AdminDashboardProps {
  members: LocalMember[];
  activities: Activity[];
  events: Event[];
  donations: Donation[];
  payments: Payment[];
  internships: Internship[];
  beneficiaries: Beneficiary[];
  designations: Designation[];
  inquiries: Inquiry[];
  notifications: Notification[];
  incomePlans: IncomePlan[];
  admins: AdminUser[];
  settings: SiteSettingsType;
  onUpdateMember: (id: string, updates: Partial<LocalMember>) => void;
  onDeleteMember: (id: string) => void;
  onAddActivity: (data: Omit<Activity, "id" | "createdAt">) => void;
  onUpdateActivity: (id: string, updates: Partial<Activity>) => void;
  onDeleteActivity: (id: string) => void;
  onAddEvent: (data: Omit<Event, "id" | "createdAt" | "registrations">) => void;
  onUpdateEvent: (id: string, updates: Partial<Event>) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateDonation: (id: string, updates: Partial<Donation>) => void;
  onUpdatePayment: (id: string, updates: Partial<Payment>) => void;
  onUpdateInternship: (id: string, updates: Partial<Internship>) => void;
  onAddBeneficiary: (data: Omit<Beneficiary, "id">) => void;
  onUpdateBeneficiary: (id: string, updates: Partial<Beneficiary>) => void;
  onDeleteBeneficiary: (id: string) => void;
  onAddDesignation: (data: Omit<Designation, "id">) => void;
  onDeleteDesignation: (id: string) => void;
  onReplyInquiry: (id: string, reply: string) => void;
  onAddNotification: (data: Omit<Notification, "id">) => void;
  onAddPlan: (data: Omit<IncomePlan, "id">) => void;
  onUpdatePlan: (id: string, updates: Partial<IncomePlan>) => void;
  onDeletePlan: (id: string) => void;
  onAddAdmin: (data: Omit<AdminUser, "id" | "createdAt">) => void;
  onDeleteAdmin: (id: string) => void;
  onUpdateSettings: (updates: Partial<SiteSettingsType>) => void;
  onLogout: () => void;
}

export function AdminDashboard(props: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const { members, donations, payments, notifications } = props;

  const pendingKYC = members.filter((m) => m.kycStatus === "submitted").length;
  const activeMembers = members.filter((m) => m.status === "active").length;
  const totalDonations = donations
    .filter((d) => d.status === "confirmed")
    .reduce((sum, d) => sum + d.amount, 0);
  const pendingPayments = payments.filter((p) => p.status === "pending").length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll active tab into view when section changes
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  // Listen for custom navigation events from other admin components (e.g. Forward buttons)
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setActiveSection(e.detail as AdminSection);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("admin-navigate", handler as EventListener);
    return () =>
      window.removeEventListener("admin-navigate", handler as EventListener);
  }, []);

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    // Scroll to top of content on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-bold text-gray-900">
                Admin Overview
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                {
                  label: "Total Members",
                  value: members.length,
                  color: "bg-green-50 border-green-200 text-green-800",
                  icon: Users,
                  emoji: "👥",
                },
                {
                  label: "Pending KYC",
                  value: pendingKYC,
                  color: "bg-yellow-50 border-yellow-200 text-yellow-800",
                  icon: Shield,
                  emoji: "🛡️",
                },
                {
                  label: "Active Members",
                  value: activeMembers,
                  color: "bg-blue-50 border-blue-200 text-blue-800",
                  icon: UserCheck,
                  emoji: "✅",
                },
                {
                  label: "Total Donations",
                  value: `\u20b9${totalDonations.toLocaleString()}`,
                  color: "bg-purple-50 border-purple-200 text-purple-800",
                  icon: Heart,
                  emoji: "❤️",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`p-4 rounded-xl border ${stat.color}`}
                >
                  <div className="text-xl mb-1">{stat.emoji}</div>
                  <div className="text-xl md:text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs opacity-70 mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats + Recent Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>⚡</span> Quick Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">💳 Pending Payments</span>
                    <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {pendingPayments}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">
                      🔔 Total Notifications
                    </span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {notifications.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">⏳ Pending Members</span>
                    <span className="font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                      {members.filter((m) => m.status === "pending").length}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>👥</span> Recent Members
                </h3>
                {members.length === 0 && (
                  <div className="text-gray-400 text-sm text-center py-4">
                    Koi member nahi hai abhi
                  </div>
                )}
                {members.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 py-2 border-b last:border-0"
                  >
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                      {m.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">
                        {m.name}
                      </div>
                      <div className="text-xs text-gray-400">{m.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>🚀</span> Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  {
                    label: "Add Member",
                    section: "members" as AdminSection,
                    emoji: "➕",
                  },
                  {
                    label: "View KYC",
                    section: "kyc" as AdminSection,
                    emoji: "🛡️",
                  },
                  {
                    label: "Payments",
                    section: "payments" as AdminSection,
                    emoji: "💳",
                  },
                  {
                    label: "Settings",
                    section: "settings" as AdminSection,
                    emoji: "⚙️",
                  },
                ].map((action) => (
                  <button
                    key={action.section}
                    type="button"
                    onClick={() => handleSectionChange(action.section)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 transition-all active:scale-95 text-center"
                  >
                    <span className="text-2xl">{action.emoji}</span>
                    <span className="text-xs font-medium text-green-800">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "members":
        return (
          <MemberManagement
            members={props.members}
            onUpdate={props.onUpdateMember}
            onDelete={props.onDeleteMember}
            designations={props.designations}
          />
        );
      case "kyc":
        return (
          <KYCVerification
            members={props.members}
            onUpdate={props.onUpdateMember}
          />
        );
      case "beneficiaries":
        return (
          <BeneficiaryManagement
            beneficiaries={props.beneficiaries}
            onAdd={props.onAddBeneficiary}
            onUpdate={props.onUpdateBeneficiary}
            onDelete={props.onDeleteBeneficiary}
          />
        );
      case "internships":
        return (
          <InternshipManagement
            internships={props.internships}
            onUpdate={props.onUpdateInternship}
          />
        );
      case "donations":
        return (
          <DonationManagement
            donations={props.donations}
            onUpdate={props.onUpdateDonation}
          />
        );
      case "payments":
        return (
          <PaymentManagement
            payments={props.payments}
            settings={props.settings}
            onUpdate={props.onUpdatePayment}
          />
        );
      case "activities":
        return (
          <ActivityManagement
            activities={props.activities}
            onAdd={props.onAddActivity}
            onUpdate={props.onUpdateActivity}
            onDelete={props.onDeleteActivity}
          />
        );
      case "events":
        return (
          <EventManagement
            events={props.events}
            onAdd={props.onAddEvent}
            onUpdate={props.onUpdateEvent}
            onDelete={props.onDeleteEvent}
          />
        );
      case "designations":
        return (
          <DesignationManagement
            designations={props.designations}
            onAdd={props.onAddDesignation}
            onDelete={props.onDeleteDesignation}
          />
        );
      case "inquiries":
        return (
          <InquiryManagement
            inquiries={props.inquiries}
            onReply={props.onReplyInquiry}
          />
        );
      case "notifications":
        return (
          <NotificationManagement
            notifications={props.notifications}
            members={props.members}
            onAdd={props.onAddNotification}
          />
        );
      case "income_plans":
        return (
          <IncomePlanManagement
            plans={props.incomePlans}
            onAdd={props.onAddPlan}
            onUpdate={props.onUpdatePlan}
            onDelete={props.onDeletePlan}
          />
        );
      case "admins":
        return (
          <AdminManagement
            admins={props.admins}
            onAdd={props.onAddAdmin}
            onDelete={props.onDeleteAdmin}
          />
        );
      case "company_profile":
        return (
          <CompanyProfile
            settings={props.settings}
            onUpdateSettings={props.onUpdateSettings}
          />
        );
      case "letter_generator":
        return (
          <OfficialLetterGenerator
            settings={props.settings}
            onUpdateSettings={props.onUpdateSettings}
          />
        );
      case "id_card_designer":
        return (
          <IDCardDesigner
            members={props.members}
            settings={props.settings}
            onUpdateSettings={props.onUpdateSettings}
          />
        );
      case "settings":
        return (
          <SiteSettings
            settings={props.settings}
            onUpdate={props.onUpdateSettings}
          />
        );
      case "access_codes":
        return (
          <AccessCodeManagement
            members={props.members}
            onUpdate={props.onUpdateMember}
          />
        );
      default:
        return null;
    }
  };

  const activeItem = navItems.find((n) => n.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden">
        {/* Mobile horizontal scroll nav - fixed below header (header is ~72px) */}
        <div
          className="fixed left-0 right-0 z-40 shadow-lg"
          style={{ top: "72px", backgroundColor: "#166534" }}
        >
          {/* Section title bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-green-700">
            <div className="flex items-center gap-2">
              <span className="text-base">{activeItem?.emoji}</span>
              <span className="text-white font-semibold text-sm">
                {activeItem?.label}
              </span>
            </div>
            <button
              type="button"
              onClick={props.onLogout}
              className="flex items-center gap-1 text-red-300 hover:text-red-200 text-xs px-2 py-1 rounded hover:bg-red-900/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
          {/* Scrollable tabs */}
          <div
            className="overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-1 p-2" style={{ minWidth: "max-content" }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  ref={activeSection === item.id ? activeTabRef : undefined}
                  onClick={() => handleSectionChange(item.id)}
                  data-ocid={`admin.${item.id}.tab`}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                    activeSection === item.id
                      ? "bg-white text-green-800 shadow font-bold"
                      : "text-green-100 hover:bg-green-700",
                  )}
                >
                  <span>{item.emoji}</span>
                  {item.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile content - padded below fixed header (72px) + nav bar (~86px) */}
        <div className="pt-[158px] px-3 pb-6 min-h-screen">
          {renderSection()}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex pt-20 min-h-screen">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-20 bottom-0 z-30 transition-all duration-300 flex flex-col shadow-lg overflow-hidden",
            sidebarOpen ? "w-56" : "w-14",
          )}
          style={{ backgroundColor: "#14532d" }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-6 w-6 h-6 bg-white rounded-full border border-green-200 shadow-md flex items-center justify-center z-10"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-3 h-3 text-green-700" />
            ) : (
              <ChevronRight className="w-3 h-3 text-green-700" />
            )}
          </button>

          <div
            className={cn(
              "px-4 py-3 border-b border-green-800",
              !sidebarOpen && "px-2",
            )}
          >
            {sidebarOpen && (
              <div className="text-white font-semibold text-sm">
                🛠️ Admin Panel
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                data-ocid={`admin.${item.id}.tab`}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-all",
                  activeSection === item.id
                    ? "bg-green-900 text-white border-r-2 border-green-400"
                    : "text-green-100 hover:bg-green-800",
                )}
              >
                <span className="text-base flex-shrink-0">{item.emoji}</span>
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-green-800">
            <Button
              onClick={props.onLogout}
              data-ocid="admin.logout.button"
              variant="ghost"
              className={cn(
                "w-full text-green-100 hover:bg-green-700 hover:text-white text-xs",
                !sidebarOpen && "px-1 justify-center",
              )}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </aside>

        {/* Desktop main content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 p-6 min-h-0",
            sidebarOpen ? "ml-56" : "ml-14",
          )}
        >
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
