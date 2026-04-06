import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { LoginModal } from "./components/auth/LoginModal";
import { SignupPage } from "./components/auth/SignupPage";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { SplashScreen } from "./components/layout/SplashScreen";
import { InstallBanner } from "./components/pwa/InstallBanner";
import { useAuth } from "./hooks/useAuth";
import {
  useActivities,
  useAdmins,
  useBeneficiaries,
  useDesignations,
  useDonations,
  useEvents,
  useIncomePlans,
  useInquiries,
  useInternships,
  useMembers,
  useNotifications,
  usePayments,
  useSiteSettings,
} from "./hooks/useDataStore";
import { LandingPage } from "./pages/LandingPage";

type Page =
  | "landing"
  | "dashboard"
  | "admin"
  | "signup"
  | "about"
  | "services"
  | "activities"
  | "events"
  | "contact";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState<Page>("landing");
  const [showLogin, setShowLogin] = useState(false);
  const { auth, loginAdmin, loginUser, logout } = useAuth();

  const { members, addMember, updateMember, deleteMember } = useMembers();
  const { activities, addActivity, updateActivity, deleteActivity } =
    useActivities();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { donations, updateDonation } = useDonations();
  const { payments, updatePayment } = usePayments();
  const { internships, addInternship, updateInternship } = useInternships();
  const {
    beneficiaries,
    addBeneficiary,
    updateBeneficiary,
    deleteBeneficiary,
  } = useBeneficiaries();
  const { designations, addDesignation, deleteDesignation } = useDesignations();
  const { inquiries, addInquiry, replyInquiry } = useInquiries();
  const { notifications, addNotification } = useNotifications();
  const { incomePlans, addPlan, updatePlan, deletePlan } = useIncomePlans();
  const { admins, addAdmin, deleteAdmin } = useAdmins();
  const { settings, setSettings } = useSiteSettings();

  const currentMember = auth.memberId
    ? members.find((m) => m.id === auth.memberId) || null
    : null;

  const myNotifications = auth.memberId
    ? notifications.filter(
        (n) => n.targetType === "all" || n.targetId === auth.memberId,
      )
    : [];

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleNavigate = (newPage: string) => {
    if (newPage === "dashboard" && !auth.isLoggedIn) {
      setShowLogin(true);
      return;
    }
    if (newPage === "admin" && auth.role !== "admin") {
      setShowLogin(true);
      return;
    }
    if (
      ["about", "services", "activities", "events", "contact"].includes(newPage)
    ) {
      setPage("landing");
      setTimeout(() => {
        const el = document.getElementById(newPage);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    setPage(newPage as Page);
  };

  const handleLogout = () => {
    logout();
    setPage("landing");
  };

  const handleAdminLoginWrapper = (
    username: string,
    password: string,
  ): boolean => {
    const result = loginAdmin(username, password);
    if (result) {
      setTimeout(() => setPage("admin"), 100);
    }
    return result;
  };

  const handleUserLoginWrapper = (mobile: string, code: string): boolean => {
    const result = loginUser(mobile, code);
    if (result) {
      setTimeout(() => setPage("dashboard"), 100);
    }
    return result;
  };

  const showHeader = page !== "signup";
  const showFooter =
    page !== "dashboard" && page !== "admin" && page !== "signup";

  return (
    <>
      {/* Splash Screen - shows on every fresh page load */}
      {showSplash && (
        <SplashScreen
          logoUrl={settings.logoUrl}
          onComplete={handleSplashComplete}
        />
      )}

      <div
        className="min-h-screen flex flex-col"
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        {showHeader && (
          <Header
            auth={auth}
            settings={settings}
            onLoginClick={() => setShowLogin(true)}
            onSignupClick={() => setPage("signup")}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentPage={page}
            notificationCount={myNotifications.length}
          />
        )}

        <div className="flex-1">
          {page === "landing" && (
            <LandingPage
              settings={settings}
              onSignupClick={() => setPage("signup")}
              onSubmitInquiry={(data) =>
                addInquiry({
                  ...data,
                  date: data.date || new Date().toISOString(),
                })
              }
            />
          )}

          {page === "signup" && (
            <SignupPage
              settings={settings}
              onBack={() => setPage("landing")}
              onRegister={(data) => addMember(data)}
              onLoginAfterRegister={() => {
                setPage("landing");
                setShowLogin(true);
              }}
            />
          )}

          {page === "dashboard" && currentMember && (
            <UserDashboard
              member={currentMember}
              payments={payments}
              internships={internships}
              notifications={notifications}
              settings={settings}
              onUpdateMember={updateMember}
              onAddInternship={addInternship}
              onLogout={handleLogout}
            />
          )}

          {page === "dashboard" &&
            !currentMember &&
            auth.isLoggedIn &&
            auth.role === "user" && (
              <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-500">
                    Member data not found. Please contact admin.
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 text-green-700 underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

          {page === "admin" && auth.role === "admin" && (
            <AdminDashboard
              members={members}
              activities={activities}
              events={events}
              donations={donations}
              payments={payments}
              internships={internships}
              beneficiaries={beneficiaries}
              designations={designations}
              inquiries={inquiries}
              notifications={notifications}
              incomePlans={incomePlans}
              admins={admins}
              settings={settings}
              onUpdateMember={updateMember}
              onDeleteMember={deleteMember}
              onAddActivity={addActivity}
              onUpdateActivity={updateActivity}
              onDeleteActivity={deleteActivity}
              onAddEvent={addEvent}
              onUpdateEvent={updateEvent}
              onDeleteEvent={deleteEvent}
              onUpdateDonation={updateDonation}
              onUpdatePayment={updatePayment}
              onUpdateInternship={updateInternship}
              onAddBeneficiary={addBeneficiary}
              onUpdateBeneficiary={updateBeneficiary}
              onDeleteBeneficiary={deleteBeneficiary}
              onAddDesignation={addDesignation}
              onDeleteDesignation={deleteDesignation}
              onReplyInquiry={replyInquiry}
              onAddNotification={addNotification}
              onAddPlan={addPlan}
              onUpdatePlan={updatePlan}
              onDeletePlan={deletePlan}
              onAddAdmin={addAdmin}
              onDeleteAdmin={deleteAdmin}
              onUpdateSettings={setSettings}
              onLogout={handleLogout}
            />
          )}

          {!auth.isLoggedIn && page !== "landing" && page !== "signup" && (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-green-50">
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-green-100 max-w-sm mx-4">
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Access Restricted
                </h2>
                <p className="text-gray-500 mb-6">
                  Please login to access this page.
                </p>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="w-full py-3 rounded-lg text-white font-semibold"
                  style={{ backgroundColor: "#166534" }}
                >
                  Login Now
                </button>
              </div>
            </div>
          )}
        </div>

        {showFooter && (
          <Footer settings={settings} onNavigate={handleNavigate} />
        )}

        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onAdminLogin={handleAdminLoginWrapper}
          onUserLogin={handleUserLoginWrapper}
          onSignupClick={() => {
            setShowLogin(false);
            setPage("signup");
          }}
        />

        {/* PWA Install Banner */}
        <InstallBanner />

        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}
