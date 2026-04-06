import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LocalMember, SiteSettings } from "../../types";

interface SignupPageProps {
  settings: SiteSettings;
  onBack: () => void;
  onRegister: (
    data: Omit<LocalMember, "id" | "accessCode" | "joinDate">,
  ) => LocalMember;
  onLoginAfterRegister: () => void;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.readAsDataURL(file);
  });

interface KYCDocs {
  aadhaarFront: string;
  aadhaarBack: string;
  panCard: string;
  photograph: string;
  addressProof: string;
  bankPassbook: string;
}

export function SignupPage({
  settings,
  onBack,
  onRegister,
  onLoginAfterRegister,
}: SignupPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    nomineeName: "",
    membershipType: "basic" as LocalMember["membershipType"],
    designation: "Member",
  });
  const [kyc, setKyc] = useState<KYCDocs>({
    aadhaarFront: "",
    aadhaarBack: "",
    panCard: "",
    photograph: "",
    addressProof: "",
    bankPassbook: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState<LocalMember | null>(null);

  const handleFileUpload = async (field: keyof KYCDocs, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("File size should be less than 3MB");
      return;
    }
    const base64 = await toBase64(file);
    setKyc((prev) => ({ ...prev, [field]: base64 }));
    toast.success(`${field} uploaded successfully`);
  };

  const handleStep1Next = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill Name, Mobile, and Address");
      return;
    }
    if (form.phone.length !== 10) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kyc.aadhaarFront || !kyc.photograph) {
      toast.error("Aadhaar Front and Photograph are required");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const member = onRegister({
      ...form,
      status: "active",
      kycStatus: "submitted",
      photoUrl: kyc.photograph,
    });
    setRegistered(member);
    toast.success(`Welcome! Your Member ID is ${member.id}`);
    setIsSubmitting(false);
  };

  if (registered) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-green-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-lg border border-green-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your membership application and KYC documents have been submitted.
          </p>
          <div className="bg-green-50 rounded-xl p-6 mb-6 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Member ID:</span>
              <span className="font-bold text-green-800">{registered.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Access Code:</span>
              <span className="font-bold text-green-800">
                {registered.accessCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Membership:</span>
              <span className="font-semibold capitalize">
                {registered.membershipType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">KYC Status:</span>
              <span className="font-semibold text-yellow-600">
                📋 Submitted
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Please save your <strong>Member ID</strong> and{" "}
            <strong>Access Code</strong>. You will need them to login.
          </p>
          <Button
            onClick={onLoginAfterRegister}
            data-ocid="signup.login.button"
            className="w-full"
            style={{ backgroundColor: "#166534" }}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 bg-green-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={step === 1 ? onBack : () => setStep(1)}
            className="p-2 rounded-lg hover:bg-green-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-green-800" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              Member Registration
            </h1>
            <p className="text-gray-500 text-sm">{settings.siteName}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-6 bg-white rounded-xl p-4 shadow-xs border border-green-100">
          <div
            className={`flex items-center gap-2 flex-1 ${step >= 1 ? "text-green-800" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 1 ? "✓" : "1"}
            </div>
            <span className="text-sm font-medium hidden sm:block">
              Personal Details
            </span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2 rounded">
            <div
              className={`h-full rounded transition-all ${
                step >= 2 ? "bg-green-600" : "bg-gray-200"
              }`}
              style={{ width: step >= 2 ? "100%" : "0%" }}
            />
          </div>
          <div
            className={`flex items-center gap-2 ${step >= 2 ? "text-green-800" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 2
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium hidden sm:block">
              KYC Documents
            </span>
          </div>
        </div>

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-green-100">
            <div className="space-y-6">
              {/* Personal Details */}
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                  <User className="w-4 h-4 text-green-700" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="reg-name">Full Name *</Label>
                    <Input
                      id="reg-name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="signup.name.input"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="reg-father">
                      Father's / Husband's Name
                    </Label>
                    <Input
                      id="reg-father"
                      placeholder="Father's or Husband's name"
                      value={form.fatherName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fatherName: e.target.value }))
                      }
                      data-ocid="signup.father.input"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        data-ocid="signup.email.input"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reg-phone">Mobile Number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="10-digit mobile"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        data-ocid="signup.phone.input"
                        className="pl-10"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reg-dob">Date of Birth</Label>
                    <Input
                      id="reg-dob"
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, dob: e.target.value }))
                      }
                      data-ocid="signup.dob.input"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-gender">Gender</Label>
                    <Select
                      value={form.gender}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, gender: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="signup.gender.select"
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                  <MapPin className="w-4 h-4 text-green-700" />
                  Address Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="reg-address">Street Address *</Label>
                    <Input
                      id="reg-address"
                      placeholder="House No., Street, Area"
                      value={form.address}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, address: e.target.value }))
                      }
                      data-ocid="signup.address.input"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-city">City</Label>
                    <Input
                      id="reg-city"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, city: e.target.value }))
                      }
                      data-ocid="signup.city.input"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-pincode">PIN Code</Label>
                    <Input
                      id="reg-pincode"
                      placeholder="6-digit PIN"
                      value={form.pincode}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, pincode: e.target.value }))
                      }
                      data-ocid="signup.pincode.input"
                      className="mt-1"
                      maxLength={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-state">State</Label>
                    <Select
                      value={form.state}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, state: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="signup.state.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Uttar Pradesh",
                          "Bihar",
                          "Madhya Pradesh",
                          "Rajasthan",
                          "Maharashtra",
                          "Gujarat",
                          "Haryana",
                          "Punjab",
                          "Delhi",
                          "Other",
                        ].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reg-nominee">Nominee Name</Label>
                    <Input
                      id="reg-nominee"
                      placeholder="Nominee full name"
                      value={form.nomineeName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, nomineeName: e.target.value }))
                      }
                      data-ocid="signup.nominee.input"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Membership */}
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                  <CreditCard className="w-4 h-4 text-green-700" />
                  Membership Plan
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    {
                      type: "basic",
                      price: "\u20B9500",
                      color: "bg-gray-50 border-gray-200",
                    },
                    {
                      type: "silver",
                      price: "\u20B91,500",
                      color: "bg-gray-100 border-gray-300",
                    },
                    {
                      type: "gold",
                      price: "\u20B93,000",
                      color: "bg-yellow-50 border-yellow-200",
                    },
                    {
                      type: "platinum",
                      price: "\u20B95,000",
                      color: "bg-purple-50 border-purple-200",
                    },
                  ].map(({ type, price, color }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          membershipType: type as LocalMember["membershipType"],
                        }))
                      }
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        form.membershipType === type
                          ? "border-green-600 bg-green-50 shadow-md"
                          : `${color} hover:border-green-300`
                      }`}
                    >
                      <div className="font-semibold capitalize text-sm">
                        {type}
                      </div>
                      <div className="text-green-700 font-bold text-sm">
                        {price}
                      </div>
                      <div className="text-xs text-gray-500">/ year</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                onClick={handleStep1Next}
                data-ocid="signup.next.button"
                className="w-full h-12 text-base"
                style={{ backgroundColor: "#166534" }}
              >
                Next: Upload KYC Documents{" "}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: KYC Documents */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-green-100">
              <div className="mb-6">
                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                  <FileText className="w-4 h-4 text-green-700" />
                  KYC Documents Upload
                </h3>
                <p className="text-xs text-gray-500">
                  Upload clear images (JPG/PNG). Max 3MB each. *Required fields.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    key: "aadhaarFront" as keyof KYCDocs,
                    label: "Aadhaar Card Front *",
                    emoji: "🪪",
                  },
                  {
                    key: "aadhaarBack" as keyof KYCDocs,
                    label: "Aadhaar Card Back",
                    emoji: "🪪",
                  },
                  {
                    key: "panCard" as keyof KYCDocs,
                    label: "PAN Card",
                    emoji: "💳",
                  },
                  {
                    key: "photograph" as keyof KYCDocs,
                    label: "Recent Photograph *",
                    emoji: "📸",
                  },
                  {
                    key: "addressProof" as keyof KYCDocs,
                    label: "Address Proof",
                    emoji: "🏠",
                  },
                  {
                    key: "bankPassbook" as keyof KYCDocs,
                    label: "Bank Passbook / Cancel Cheque",
                    emoji: "🏦",
                  },
                ].map(({ key, label, emoji }) => (
                  <div
                    key={key}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      {emoji} {label}
                    </Label>
                    {kyc[key] ? (
                      <div className="relative">
                        <img
                          src={kyc[key]}
                          alt={label}
                          className="w-full h-24 object-cover rounded-lg border border-green-200"
                        />
                        <button
                          type="button"
                          onClick={() => setKyc((p) => ({ ...p, [key]: "" }))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                        <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          ✅ Uploaded
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">
                          Click to Upload
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          data-ocid={`signup.kyc.${key}.upload_button`}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(key, file);
                          }}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-green-300 text-green-800"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-ocid="signup.submit_button"
                  className="flex-1 h-12 text-base"
                  style={{ backgroundColor: "#166534" }}
                >
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
