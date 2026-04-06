import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Banknote,
  Bell,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileCheck,
  LayoutDashboard,
  LogOut,
  Receipt,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import type {
  Internship,
  LocalMember,
  Notification,
  Payment,
  SiteSettings,
} from "../../types";
import { BankUPIUpdate } from "./BankUPIUpdate";
import { CertificateSection } from "./CertificateSection";
import { IDCardSection } from "./IDCardSection";
import { InternshipApply } from "./InternshipApply";
import { KYCUpdate } from "./KYCUpdate";
import { MembershipCard } from "./MembershipCard";
import { PaymentHistory } from "./PaymentHistory";
import { ProfileSection } from "./ProfileSection";

type DashboardSection =
  | "overview"
  | "profile"
  | "membership"
  | "idcard"
  | "certificates"
  | "payments"
  | "internship"
  | "kyc"
  | "bank"
  | "notifications";

interface UserDashboardProps {
  member: LocalMember;
  payments: Payment[];
  internships: Internship[];
  notifications: Notification[];
  settings: SiteSettings;
  onUpdateMember: (id: string, updates: Partial<LocalMember>) => void;
  onAddInternship: (data: Omit<Internship, "id">) => void;
  onLogout: () => void;
}

const navItems: {
  id: DashboardSection;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: User },
  { id: "membership", label: "Membership", icon: CreditCard },
  { id: "idcard", label: "ID Card", icon: FileCheck },
  { id: "certificates", label: "Certificates", icon: FileCheck },
  { id: "payments", label: "Payment History", icon: Receipt },
  { id: "internship", label: "Internship", icon: Briefcase },
  { id: "kyc", label: "KYC Update", icon: Shield },
  { id: "bank", label: "Bank / UPI", icon: Banknote },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export function UserDashboard({
  member,
  payments,
  internships,
  notifications,
  settings,
  onUpdateMember,
  onAddInternship,
  onLogout,
}: UserDashboardProps) {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const myPayments = payments.filter((p) => p.memberId === member.id);
  const myInternships = internships.filter((i) => i.memberId === member.id);
  const myNotifications = notifications.filter(
    (n) => n.targetType === "all" || n.targetId === member.id,
  );
  const unreadCount = myNotifications.filter((n) => !n.isRead).length;

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Welcome, {member.name}!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Member ID",
                  value: member.id,
                  color: "bg-green-50 border-green-200",
                },
                {
                  label: "Membership",
                  value: member.membershipType.toUpperCase(),
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  label: "Status",
                  value: member.status.toUpperCase(),
                  color:
                    member.status === "active"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200",
                },
                {
                  label: "KYC Status",
                  value: member.kycStatus.toUpperCase(),
                  color: "bg-yellow-50 border-yellow-200",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`p-4 rounded-xl border ${stat.color}`}
                >
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="font-bold text-gray-900 mt-1">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="text-sm text-gray-500 mb-1">Total Payments</div>
                <div className="font-bold text-green-800 text-2xl">
                  ₹
                  {myPayments
                    .filter((p) => p.status === "success")
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toLocaleString()}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="text-sm text-gray-500 mb-1">
                  Internship Applications
                </div>
                <div className="font-bold text-blue-800 text-2xl">
                  {myInternships.length}
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="text-sm text-gray-500 mb-1">Notifications</div>
                <div className="font-bold text-purple-800 text-2xl">
                  {myNotifications.length}
                </div>
              </div>
            </div>
          </div>
        );
      case "profile":
        return <ProfileSection member={member} onUpdate={onUpdateMember} />;
      case "membership":
        return <MembershipCard member={member} settings={settings} />;
      case "idcard":
        return <IDCardSection member={member} settings={settings} />;
      case "certificates":
        return (
          <CertificateSection
            internships={myInternships}
            member={member}
            settings={settings}
          />
        );
      case "payments":
        return <PaymentHistory payments={myPayments} settings={settings} />;
      case "internship":
        return (
          <InternshipApply
            internships={myInternships}
            member={member}
            onApply={onAddInternship}
          />
        );
      case "kyc":
        return <KYCUpdate member={member} onUpdate={onUpdateMember} />;
      case "bank":
        return <BankUPIUpdate member={member} onUpdate={onUpdateMember} />;
      case "notifications":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            {myNotifications.length === 0 ? (
              <div
                className="text-center py-12 text-gray-400"
                data-ocid="notifications.empty_state"
              >
                No notifications yet.
              </div>
            ) : (
              myNotifications.map((n, idx) => (
                <div
                  key={n.id}
                  data-ocid={`notifications.item.${idx + 1}`}
                  className="bg-white rounded-xl p-4 border border-green-100 shadow-xs"
                >
                  <div className="font-semibold text-gray-900">{n.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{n.message}</div>
                  <div className="text-gray-400 text-xs mt-2">
                    {new Date(n.date).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 flex bg-green-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-20 bottom-0 z-30 transition-all duration-300 flex flex-col shadow-lg",
          sidebarOpen ? "w-56" : "w-14",
        )}
        style={{ backgroundColor: "#166534" }}
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

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              data-ocid={`dashboard.${item.id}.tab`}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all relative",
                activeSection === item.id
                  ? "bg-green-900 text-white"
                  : "text-green-100 hover:bg-green-700",
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {item.id === "notifications" &&
                unreadCount > 0 &&
                sidebarOpen && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-green-700">
          <Button
            onClick={onLogout}
            data-ocid="dashboard.logout.button"
            variant="ghost"
            className={cn(
              "w-full text-green-100 hover:bg-green-700 hover:text-white",
              !sidebarOpen && "px-2 justify-center",
            )}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 p-4 md:p-6",
          sidebarOpen ? "ml-56" : "ml-14",
        )}
      >
        {renderSection()}
      </main>
    </div>
  );
}
