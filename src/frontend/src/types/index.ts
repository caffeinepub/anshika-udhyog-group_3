export interface LocalMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  membershipType: "basic" | "silver" | "gold" | "platinum";
  status: "pending" | "active" | "blocked" | "rejected";
  accessCode: string;
  designation: string;
  kycStatus: "pending" | "submitted" | "approved" | "rejected";
  joinDate: string;
  photoUrl?: string;
  aadhaar?: string;
  pan?: string;
  bankAccount?: string;
  ifscCode?: string;
  upiId?: string;
  bankName?: string;
  promotionHistory?: PromotionRecord[];
  validUpto?: string;
}

export interface PromotionRecord {
  id: string;
  fromDesignation: string;
  toDesignation: string;
  date: string;
  remarks?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  registrations: string[];
  createdAt: string;
}

export interface Donation {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  purpose: string;
  date: string;
  status: "pending" | "confirmed" | "rejected";
  utrNumber?: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  purpose: string;
  date: string;
  status: "pending" | "success" | "failed" | "rejected";
  utrNumber?: string;
  receiptNo?: string;
}

export interface Internship {
  id: string;
  memberId: string;
  memberName: string;
  title: string;
  description: string;
  appliedDate: string;
  status: "pending" | "approved" | "rejected" | "completed";
  completionDate?: string;
  certificateId?: string;
  notes?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  address: string;
  schemeId: string;
  schemeName: string;
  benefitAmount: number;
  date: string;
  status: "active" | "inactive";
}

export interface Designation {
  id: string;
  title: string;
  level: number;
  description?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: "new" | "replied" | "closed";
  reply?: string;
  repliedAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  targetType: "all" | "specific";
  targetId?: string;
  date: string;
  isRead?: boolean;
}

export interface IncomePlan {
  id: string;
  title: string;
  description: string;
  amount: number;
  period: string;
  isActive: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "super_admin" | "admin" | "moderator";
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  upiId: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  websiteUrl?: string;
  registrationNo?: string;
  foundedYear?: string;
  mission?: string;
  vision?: string;
  sealUrl?: string;
  signatureUrl?: string;
  idCardTerms?: string;
  idCardDesignIndex?: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  role: "admin" | "user" | null;
  memberId?: string;
  memberName?: string;
  adminUsername?: string;
}
