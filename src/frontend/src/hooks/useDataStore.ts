import { useCallback, useState } from "react";
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
  SiteSettings,
} from "../types";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

function generateMemberId() {
  const year = new Date().getFullYear().toString().slice(-2);
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `AUC${year}${num}`;
}

function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "ANSHIKA UDHYOG GROUP™",
  tagline: "Self Employment Revolution Scheme",
  logoUrl:
    "/assets/file_00000000ee8c7208b7195e3f0161d038-019d63d5-db14-7133-b573-8c14be5bebb8.png",
  contactEmail: "info@anshikaudhyog.org",
  contactPhone: "+91 83496 00835",
  address:
    "Anshika Udhyog Group, Near Main Market, Uttar Pradesh, India - 226001",
  upiId: "8349600835@UPI",
  facebookUrl: "https://facebook.com",
  twitterUrl: "https://twitter.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  whatsappNumber: "8349600835",
  websiteUrl: "",
  registrationNo: "NGO/REG/2020/AUC001",
  foundedYear: "2020",
  mission:
    "To empower individuals through self-employment opportunities and skill development, creating a self-reliant and prosperous community.",
  vision:
    "A nation where every individual has access to livelihood opportunities and financial independence through organized group efforts.",
};

const SEED_MEMBERS: LocalMember[] = [
  {
    id: "AUC24001",
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@gmail.com",
    phone: "9876543210",
    address: "123 Gandhi Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226001",
    membershipType: "gold",
    status: "active",
    accessCode: "123456",
    designation: "Secretary",
    kycStatus: "approved",
    joinDate: "2024-01-15",
  },
  {
    id: "AUC24002",
    name: "Priya Devi Singh",
    email: "priya.singh@gmail.com",
    phone: "9876543211",
    address: "45 Shivaji Marg",
    city: "Kanpur",
    state: "Uttar Pradesh",
    pincode: "208001",
    membershipType: "silver",
    status: "active",
    accessCode: "234567",
    designation: "Member",
    kycStatus: "submitted",
    joinDate: "2024-02-20",
  },
  {
    id: "AUC24003",
    name: "Mohan Lal Gupta",
    email: "mohan.gupta@email.com",
    phone: "9876543212",
    address: "78 Nehru Place",
    city: "Agra",
    state: "Uttar Pradesh",
    pincode: "282001",
    membershipType: "basic",
    status: "pending",
    accessCode: "345678",
    designation: "Member",
    kycStatus: "pending",
    joinDate: "2024-03-10",
  },
];

const SEED_ACTIVITIES: Activity[] = [
  {
    id: "act1",
    title: "Free Health Camp in Rural Areas",
    description:
      "Organized a free health camp providing medical checkups, medicines, and health awareness to 500+ villagers in remote areas of UP.",
    imageUrl: "/assets/generated/hero-ngo-activities.dim_1400x600.jpg",
    date: "2024-11-15",
    createdAt: "2024-11-10",
  },
  {
    id: "act2",
    title: "Skill Development Workshop",
    description:
      "Three-day workshop on digital skills, tailoring, and entrepreneurship for 200 women from underprivileged backgrounds.",
    imageUrl: "/assets/generated/hero-training-programs.dim_1400x600.jpg",
    date: "2024-12-01",
    createdAt: "2024-11-25",
  },
  {
    id: "act3",
    title: "Tree Plantation Drive",
    description:
      "Community tree plantation drive where members and volunteers planted 1000 saplings across 5 villages for environmental awareness.",
    imageUrl: "/assets/generated/about-team.dim_600x500.jpg",
    date: "2025-01-05",
    createdAt: "2025-01-01",
  },
];

const SEED_EVENTS: Event[] = [
  {
    id: "evt1",
    title: "Annual Members Convention 2025",
    description:
      "Grand annual gathering of all members with awards, recognition, and planning session for next year.",
    date: "2025-03-15",
    location: "Hotel Clarks Avadh, Lucknow",
    registrations: ["AUC24001", "AUC24002"],
    createdAt: "2025-01-01",
  },
  {
    id: "evt2",
    title: "Entrepreneurship Summit 2025",
    description:
      "Platform for members to showcase businesses, network with investors, and learn from industry leaders.",
    date: "2025-04-20",
    location: "CIEL IT Park, Noida",
    registrations: ["AUC24001"],
    createdAt: "2025-01-15",
  },
];

const SEED_DESIGNATIONS: Designation[] = [
  {
    id: "des1",
    title: "President",
    level: 1,
    description: "Highest executive position",
  },
  {
    id: "des2",
    title: "Vice President",
    level: 2,
    description: "Second in command",
  },
  {
    id: "des3",
    title: "Secretary",
    level: 3,
    description: "Administrative head",
  },
  {
    id: "des4",
    title: "Treasurer",
    level: 4,
    description: "Financial controller",
  },
  { id: "des5", title: "Member", level: 5, description: "General member" },
];

const SEED_INCOME_PLANS: IncomePlan[] = [
  {
    id: "plan1",
    title: "Basic Membership Plan",
    description:
      "Entry level membership with access to basic employment schemes and training programs.",
    amount: 500,
    period: "Yearly",
    isActive: true,
  },
  {
    id: "plan2",
    title: "Silver Employment Plan",
    description:
      "Enhanced plan with priority access to internship opportunities and advanced skill training.",
    amount: 1500,
    period: "Yearly",
    isActive: true,
  },
  {
    id: "plan3",
    title: "Gold Enterprise Plan",
    description:
      "Premium plan with direct business support, mentorship, and government scheme assistance.",
    amount: 3000,
    period: "Yearly",
    isActive: true,
  },
];

function getOrInit<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useMembers() {
  const [members, setMembersState] = useState<LocalMember[]>(() =>
    getOrInit("auc_members", SEED_MEMBERS),
  );

  const setMembers = useCallback(
    (updater: LocalMember[] | ((prev: LocalMember[]) => LocalMember[])) => {
      setMembersState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_members", next);
        return next;
      });
    },
    [],
  );

  const addMember = useCallback(
    (data: Omit<LocalMember, "id" | "accessCode" | "joinDate">) => {
      const newMember: LocalMember = {
        ...data,
        id: generateMemberId(),
        accessCode: generateAccessCode(),
        joinDate: new Date().toISOString().split("T")[0],
      };
      setMembers((prev) => [...prev, newMember]);
      return newMember;
    },
    [setMembers],
  );

  const updateMember = useCallback(
    (id: string, updates: Partial<LocalMember>) => {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
      );
    },
    [setMembers],
  );

  const deleteMember = useCallback(
    (id: string) => {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    },
    [setMembers],
  );

  return { members, addMember, updateMember, deleteMember };
}

export function useActivities() {
  const [activities, setActivitiesState] = useState<Activity[]>(() =>
    getOrInit("auc_activities", SEED_ACTIVITIES),
  );
  const setActivities = useCallback(
    (updater: Activity[] | ((prev: Activity[]) => Activity[])) => {
      setActivitiesState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_activities", next);
        return next;
      });
    },
    [],
  );
  const addActivity = useCallback(
    (data: Omit<Activity, "id" | "createdAt">) => {
      const item: Activity = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setActivities((prev) => [item, ...prev]);
      return item;
    },
    [setActivities],
  );
  const updateActivity = useCallback(
    (id: string, updates: Partial<Activity>) => {
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      );
    },
    [setActivities],
  );
  const deleteActivity = useCallback(
    (id: string) => {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    },
    [setActivities],
  );
  return { activities, addActivity, updateActivity, deleteActivity };
}

export function useEvents() {
  const [events, setEventsState] = useState<Event[]>(() =>
    getOrInit("auc_events", SEED_EVENTS),
  );
  const setEvents = useCallback(
    (updater: Event[] | ((prev: Event[]) => Event[])) => {
      setEventsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_events", next);
        return next;
      });
    },
    [],
  );
  const addEvent = useCallback(
    (data: Omit<Event, "id" | "createdAt" | "registrations">) => {
      const item: Event = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        registrations: [],
      };
      setEvents((prev) => [item, ...prev]);
      return item;
    },
    [setEvents],
  );
  const updateEvent = useCallback(
    (id: string, updates: Partial<Event>) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      );
    },
    [setEvents],
  );
  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    },
    [setEvents],
  );
  const registerForEvent = useCallback(
    (eventId: string, memberId: string) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId && !e.registrations.includes(memberId)
            ? { ...e, registrations: [...e.registrations, memberId] }
            : e,
        ),
      );
    },
    [setEvents],
  );
  return { events, addEvent, updateEvent, deleteEvent, registerForEvent };
}

export function useDonations() {
  const seedDonations: Donation[] = [
    {
      id: "d1",
      memberId: "AUC24001",
      memberName: "Rajesh Kumar Sharma",
      amount: 5000,
      purpose: "Health Camp Fund",
      date: "2024-11-01",
      status: "confirmed",
    },
    {
      id: "d2",
      memberId: "AUC24002",
      memberName: "Priya Devi Singh",
      amount: 2000,
      purpose: "Education Support",
      date: "2024-11-15",
      status: "pending",
    },
  ];
  const [donations, setDonationsState] = useState<Donation[]>(() =>
    getOrInit("auc_donations", seedDonations),
  );
  const setDonations = useCallback(
    (updater: Donation[] | ((prev: Donation[]) => Donation[])) => {
      setDonationsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_donations", next);
        return next;
      });
    },
    [],
  );
  const addDonation = useCallback(
    (data: Omit<Donation, "id">) => {
      const item: Donation = { ...data, id: generateId() };
      setDonations((prev) => [item, ...prev]);
      return item;
    },
    [setDonations],
  );
  const updateDonation = useCallback(
    (id: string, updates: Partial<Donation>) => {
      setDonations((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      );
    },
    [setDonations],
  );
  return { donations, addDonation, updateDonation };
}

export function usePayments() {
  const seedPayments: Payment[] = [
    {
      id: "p1",
      memberId: "AUC24001",
      memberName: "Rajesh Kumar Sharma",
      amount: 1500,
      purpose: "Silver Membership Fee",
      date: "2024-01-15",
      status: "success",
      utrNumber: "UTR123456789",
      receiptNo: "RCP001",
    },
    {
      id: "p2",
      memberId: "AUC24002",
      memberName: "Priya Devi Singh",
      amount: 500,
      purpose: "Basic Membership Fee",
      date: "2024-02-20",
      status: "success",
      utrNumber: "UTR987654321",
      receiptNo: "RCP002",
    },
  ];
  const [payments, setPaymentsState] = useState<Payment[]>(() =>
    getOrInit("auc_payments", seedPayments),
  );
  const setPayments = useCallback(
    (updater: Payment[] | ((prev: Payment[]) => Payment[])) => {
      setPaymentsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_payments", next);
        return next;
      });
    },
    [],
  );
  const addPayment = useCallback(
    (data: Omit<Payment, "id" | "receiptNo">) => {
      const item: Payment = {
        ...data,
        id: generateId(),
        receiptNo: `RCP${Date.now()}`,
      };
      setPayments((prev) => [item, ...prev]);
      return item;
    },
    [setPayments],
  );
  const updatePayment = useCallback(
    (id: string, updates: Partial<Payment>) => {
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      );
    },
    [setPayments],
  );
  return { payments, addPayment, updatePayment };
}

export function useInternships() {
  const seed: Internship[] = [
    {
      id: "int1",
      memberId: "AUC24001",
      memberName: "Rajesh Kumar Sharma",
      title: "Digital Marketing Internship",
      description: "Learn digital marketing strategies",
      appliedDate: "2024-10-01",
      status: "completed",
      completionDate: "2024-11-30",
      certificateId: "CERT001",
    },
    {
      id: "int2",
      memberId: "AUC24002",
      memberName: "Priya Devi Singh",
      title: "Web Development Training",
      description: "Frontend and backend web development",
      appliedDate: "2024-11-15",
      status: "approved",
    },
  ];
  const [internships, setInternshipsState] = useState<Internship[]>(() =>
    getOrInit("auc_internships", seed),
  );
  const setInternships = useCallback(
    (updater: Internship[] | ((prev: Internship[]) => Internship[])) => {
      setInternshipsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_internships", next);
        return next;
      });
    },
    [],
  );
  const addInternship = useCallback(
    (data: Omit<Internship, "id">) => {
      const item: Internship = { ...data, id: generateId() };
      setInternships((prev) => [item, ...prev]);
      return item;
    },
    [setInternships],
  );
  const updateInternship = useCallback(
    (id: string, updates: Partial<Internship>) => {
      setInternships((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...updates } : i)),
      );
    },
    [setInternships],
  );
  return { internships, addInternship, updateInternship };
}

export function useBeneficiaries() {
  const seed: Beneficiary[] = [
    {
      id: "ben1",
      name: "Suresh Yadav",
      phone: "9811223344",
      address: "Vill. Rampur, Unnao",
      schemeId: "sch1",
      schemeName: "Self Employment Grant",
      benefitAmount: 10000,
      date: "2024-09-01",
      status: "active",
    },
    {
      id: "ben2",
      name: "Geeta Devi",
      phone: "9822334455",
      address: "Vill. Sitapur, UP",
      schemeId: "sch2",
      schemeName: "Skill Development Fund",
      benefitAmount: 5000,
      date: "2024-10-10",
      status: "active",
    },
  ];
  const [beneficiaries, setBeneficiariesState] = useState<Beneficiary[]>(() =>
    getOrInit("auc_beneficiaries", seed),
  );
  const setBeneficiaries = useCallback(
    (updater: Beneficiary[] | ((prev: Beneficiary[]) => Beneficiary[])) => {
      setBeneficiariesState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_beneficiaries", next);
        return next;
      });
    },
    [],
  );
  const addBeneficiary = useCallback(
    (data: Omit<Beneficiary, "id">) => {
      const item: Beneficiary = { ...data, id: generateId() };
      setBeneficiaries((prev) => [item, ...prev]);
      return item;
    },
    [setBeneficiaries],
  );
  const updateBeneficiary = useCallback(
    (id: string, updates: Partial<Beneficiary>) => {
      setBeneficiaries((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      );
    },
    [setBeneficiaries],
  );
  const deleteBeneficiary = useCallback(
    (id: string) => {
      setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
    },
    [setBeneficiaries],
  );
  return {
    beneficiaries,
    addBeneficiary,
    updateBeneficiary,
    deleteBeneficiary,
  };
}

export function useDesignations() {
  const [designations, setDesignationsState] = useState<Designation[]>(() =>
    getOrInit("auc_designations", SEED_DESIGNATIONS),
  );
  const setDesignations = useCallback(
    (updater: Designation[] | ((prev: Designation[]) => Designation[])) => {
      setDesignationsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_designations", next);
        return next;
      });
    },
    [],
  );
  const addDesignation = useCallback(
    (data: Omit<Designation, "id">) => {
      const item: Designation = { ...data, id: generateId() };
      setDesignations((prev) => [...prev, item]);
    },
    [setDesignations],
  );
  const deleteDesignation = useCallback(
    (id: string) => {
      setDesignations((prev) => prev.filter((d) => d.id !== id));
    },
    [setDesignations],
  );
  return { designations, addDesignation, deleteDesignation };
}

export function useInquiries() {
  const seed: Inquiry[] = [
    {
      id: "inq1",
      name: "Arun Verma",
      email: "arun@example.com",
      phone: "9833445566",
      message:
        "I want to know about membership benefits and how to join the organization.",
      date: "2024-11-10",
      status: "new",
    },
    {
      id: "inq2",
      name: "Sunita Rani",
      email: "sunita@example.com",
      phone: "9844556677",
      message: "What internship programs do you offer for college students?",
      date: "2024-11-20",
      status: "replied",
      reply:
        "Dear Sunita, we offer 3-6 month internship programs in digital marketing, IT, and social work. Please register as a member to apply.",
      repliedAt: "2024-11-21",
    },
  ];
  const [inquiries, setInquiriesState] = useState<Inquiry[]>(() =>
    getOrInit("auc_inquiries", seed),
  );
  const setInquiries = useCallback(
    (updater: Inquiry[] | ((prev: Inquiry[]) => Inquiry[])) => {
      setInquiriesState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_inquiries", next);
        return next;
      });
    },
    [],
  );
  const addInquiry = useCallback(
    (data: Omit<Inquiry, "id" | "status">) => {
      const item: Inquiry = { ...data, id: generateId(), status: "new" };
      setInquiries((prev) => [item, ...prev]);
      return item;
    },
    [setInquiries],
  );
  const replyInquiry = useCallback(
    (id: string, reply: string) => {
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                reply,
                status: "replied",
                repliedAt: new Date().toISOString(),
              }
            : i,
        ),
      );
    },
    [setInquiries],
  );
  return { inquiries, addInquiry, replyInquiry };
}

export function useNotifications() {
  const seed: Notification[] = [
    {
      id: "notif1",
      title: "Welcome to AUG!",
      message:
        "Thank you for joining Anshika Udhyog Group. Your journey to self-employment starts here!",
      targetType: "all",
      date: "2024-11-01",
    },
    {
      id: "notif2",
      title: "New Event: Annual Convention",
      message:
        "Register for the Annual Members Convention 2025 happening on March 15, 2025 in Lucknow.",
      targetType: "all",
      date: "2025-01-15",
    },
  ];
  const [notifications, setNotificationsState] = useState<Notification[]>(() =>
    getOrInit("auc_notifications", seed),
  );
  const setNotifications = useCallback(
    (updater: Notification[] | ((prev: Notification[]) => Notification[])) => {
      setNotificationsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_notifications", next);
        return next;
      });
    },
    [],
  );
  const addNotification = useCallback(
    (data: Omit<Notification, "id">) => {
      const item: Notification = { ...data, id: generateId() };
      setNotifications((prev) => [item, ...prev]);
    },
    [setNotifications],
  );
  return { notifications, addNotification };
}

export function useIncomePlans() {
  const [incomePlans, setIncomePlansState] = useState<IncomePlan[]>(() =>
    getOrInit("auc_income_plans", SEED_INCOME_PLANS),
  );
  const setIncomePlans = useCallback(
    (updater: IncomePlan[] | ((prev: IncomePlan[]) => IncomePlan[])) => {
      setIncomePlansState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_income_plans", next);
        return next;
      });
    },
    [],
  );
  const addPlan = useCallback(
    (data: Omit<IncomePlan, "id">) => {
      const item: IncomePlan = { ...data, id: generateId() };
      setIncomePlans((prev) => [...prev, item]);
    },
    [setIncomePlans],
  );
  const updatePlan = useCallback(
    (id: string, updates: Partial<IncomePlan>) => {
      setIncomePlans((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      );
    },
    [setIncomePlans],
  );
  const deletePlan = useCallback(
    (id: string) => {
      setIncomePlans((prev) => prev.filter((p) => p.id !== id));
    },
    [setIncomePlans],
  );
  return { incomePlans, addPlan, updatePlan, deletePlan };
}

export function useAdmins() {
  const [admins, setAdminsState] = useState<AdminUser[]>(() =>
    getOrInit("auc_admins", []),
  );
  const setAdmins = useCallback(
    (updater: AdminUser[] | ((prev: AdminUser[]) => AdminUser[])) => {
      setAdminsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage("auc_admins", next);
        return next;
      });
    },
    [],
  );
  const addAdmin = useCallback(
    (data: Omit<AdminUser, "id" | "createdAt">) => {
      const item: AdminUser = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setAdmins((prev) => [...prev, item]);
    },
    [setAdmins],
  );
  const deleteAdmin = useCallback(
    (id: string) => {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    },
    [setAdmins],
  );
  return { admins, addAdmin, deleteAdmin };
}

export function useSiteSettings() {
  const [settings, setSettingsState] = useState<SiteSettings>(() =>
    getOrInit("auc_settings", DEFAULT_SETTINGS),
  );
  const setSettings = useCallback((updates: Partial<SiteSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage("auc_settings", next);
      return next;
    });
  }, []);
  return { settings, setSettings };
}
