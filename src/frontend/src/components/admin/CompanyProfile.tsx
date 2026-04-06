import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Save,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SiteSettings } from "../../types";
import { ImageUploadField } from "./ImageUploadField";

interface CompanyProfileProps {
  settings: SiteSettings;
  onUpdateSettings: (updates: Partial<SiteSettings>) => void;
}

export function CompanyProfile({
  settings,
  onUpdateSettings,
}: CompanyProfileProps) {
  const [form, setForm] = useState({ ...settings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(form);
    toast.success("Company profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6 border border-green-100">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-green-700" /> Basic
                Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <ImageUploadField
                    label="Company Logo"
                    value={form.logoUrl}
                    onChange={(val) => setForm((p) => ({ ...p, logoUrl: val }))}
                    placeholder="https://..."
                    data-ocid="company.logo.input"
                  />
                </div>
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={form.siteName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, siteName: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.name.input"
                  />
                </div>
                <div>
                  <Label>Tagline / Slogan</Label>
                  <Input
                    value={form.tagline}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, tagline: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.tagline.input"
                  />
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <Input
                    value={form.registrationNo ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, registrationNo: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="NGO/REG/2024/XXXXX"
                    data-ocid="company.reg_no.input"
                  />
                </div>
                <div>
                  <Label>Founded Year</Label>
                  <Input
                    value={form.foundedYear ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, foundedYear: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="2020"
                    data-ocid="company.founded.input"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Mission Statement</Label>
                  <Textarea
                    value={form.mission ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mission: e.target.value }))
                    }
                    className="mt-1"
                    rows={3}
                    placeholder="Our mission is to..."
                    data-ocid="company.mission.textarea"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Vision Statement</Label>
                  <Textarea
                    value={form.vision ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, vision: e.target.value }))
                    }
                    className="mt-1"
                    rows={3}
                    placeholder="Our vision is to..."
                    data-ocid="company.vision.textarea"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 border border-green-100">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-700" /> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contactEmail: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.email.input"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={form.contactPhone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contactPhone: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.phone.input"
                  />
                </div>
                <div>
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={form.whatsappNumber}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, whatsappNumber: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.whatsapp.input"
                  />
                </div>
                <div>
                  <Label>UPI ID</Label>
                  <Input
                    value={form.upiId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, upiId: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.upi.input"
                  />
                </div>
                <div>
                  <Label>Website URL</Label>
                  <Input
                    value={form.websiteUrl ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, websiteUrl: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="https://www.example.com"
                    data-ocid="company.website.input"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    className="mt-1"
                    rows={2}
                    data-ocid="company.address.textarea"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl p-6 border border-green-100">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-700" /> Social Media Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-1">
                    <Facebook className="w-3 h-3" /> Facebook
                  </Label>
                  <Input
                    value={form.facebookUrl}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, facebookUrl: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.facebook.input"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-1">
                    <Twitter className="w-3 h-3" /> Twitter
                  </Label>
                  <Input
                    value={form.twitterUrl}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, twitterUrl: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.twitter.input"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-1">
                    <Instagram className="w-3 h-3" /> Instagram
                  </Label>
                  <Input
                    value={form.instagramUrl}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, instagramUrl: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.instagram.input"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-1">
                    <Youtube className="w-3 h-3" /> YouTube
                  </Label>
                  <Input
                    value={form.youtubeUrl}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, youtubeUrl: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="company.youtube.input"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              data-ocid="company.save_button"
              className="w-full gap-2"
              style={{ backgroundColor: "#166534" }}
            >
              <Save className="w-4 h-4" /> Save Company Profile
            </Button>
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">
              Live Preview
            </h3>
            <div className="bg-white rounded-xl border border-green-200 overflow-hidden shadow-sm">
              {/* Header */}
              <div
                className="p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #166534 0%, #15803d 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  {form.logoUrl ? (
                    <img
                      src={form.logoUrl}
                      alt="Logo"
                      className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <div className="text-white font-bold text-sm leading-tight">
                      {form.siteName || "Company Name"}
                    </div>
                    <div className="text-green-200 text-xs mt-0.5">
                      {form.tagline || "Your tagline here"}
                    </div>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-4 space-y-3 text-xs text-gray-600">
                {form.registrationNo && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-400 uppercase text-xs">
                      Reg No:
                    </span>
                    <span>{form.registrationNo}</span>
                  </div>
                )}
                {form.foundedYear && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-400 uppercase text-xs">
                      Founded:
                    </span>
                    <span>{form.foundedYear}</span>
                  </div>
                )}
                {form.mission && (
                  <div>
                    <div className="font-semibold text-gray-700 mb-1">
                      Mission
                    </div>
                    <div className="text-gray-500 line-clamp-3">
                      {form.mission}
                    </div>
                  </div>
                )}
                <div className="border-t pt-3 space-y-1">
                  {form.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-green-600" />
                      <span className="truncate">{form.contactEmail}</span>
                    </div>
                  )}
                  {form.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-green-600" />
                      <span>{form.contactPhone}</span>
                    </div>
                  )}
                  {form.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{form.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
