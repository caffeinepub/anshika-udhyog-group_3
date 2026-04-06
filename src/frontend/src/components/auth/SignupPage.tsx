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
import { ArrowLeft, CreditCard, Mail, MapPin, Phone, User } from "lucide-react";
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

export function SignupPage({
  settings,
  onBack,
  onRegister,
  onLoginAfterRegister,
}: SignupPageProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    membershipType: "basic" as LocalMember["membershipType"],
    designation: "Member",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState<LocalMember | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const member = onRegister({
      ...form,
      status: "active",
      kycStatus: "pending",
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
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your membership application has been submitted.
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
              <span className="text-gray-500 text-sm">Mobile:</span>
              <span className="font-semibold">{registered.phone}</span>
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
            onClick={onBack}
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

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                      required
                    />
                  </div>
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
                    price: "₹500",
                    color: "bg-gray-50 border-gray-200",
                  },
                  {
                    type: "silver",
                    price: "₹1,500",
                    color: "bg-gray-100 border-gray-300",
                  },
                  {
                    type: "gold",
                    price: "₹3,000",
                    color: "bg-yellow-50 border-yellow-200",
                  },
                  {
                    type: "platinum",
                    price: "₹5,000",
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
              type="submit"
              disabled={isSubmitting}
              data-ocid="signup.submit_button"
              className="w-full h-12 text-base"
              style={{ backgroundColor: "#166534" }}
            >
              {isSubmitting ? "Registering..." : "Register as Member"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
