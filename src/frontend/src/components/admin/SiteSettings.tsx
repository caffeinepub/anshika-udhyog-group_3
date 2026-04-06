import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import type { SiteSettings as SiteSettingsType } from "../../types";
import { ImageUploadField } from "./ImageUploadField";

interface SiteSettingsProps {
  settings: SiteSettingsType;
  onUpdate: (updates: Partial<SiteSettingsType>) => void;
}

export function SiteSettings({ settings, onUpdate }: SiteSettingsProps) {
  const [form, setForm] = useState({ ...settings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Site Settings (CMS)</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <h3 className="font-semibold mb-4">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Site Name</Label>
              <Input
                value={form.siteName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, siteName: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.site_name.input"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={form.tagline}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tagline: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.tagline.input"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUploadField
                label="Company Logo"
                value={form.logoUrl}
                onChange={(val) => setForm((p) => ({ ...p, logoUrl: val }))}
                placeholder="https://... or upload file"
                data-ocid="settings.logo.input"
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
                data-ocid="settings.upi.input"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <h3 className="font-semibold mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={form.contactEmail}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactEmail: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.email.input"
              />
            </div>
            <div>
              <Label>Contact Phone</Label>
              <Input
                value={form.contactPhone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactPhone: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.phone.input"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.address.input"
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
                data-ocid="settings.whatsapp.input"
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
                data-ocid="settings.website.input"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <h3 className="font-semibold mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Facebook</Label>
              <Input
                value={form.facebookUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, facebookUrl: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.facebook.input"
              />
            </div>
            <div>
              <Label>Twitter</Label>
              <Input
                value={form.twitterUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, twitterUrl: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.twitter.input"
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                value={form.instagramUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, instagramUrl: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.instagram.input"
              />
            </div>
            <div>
              <Label>YouTube</Label>
              <Input
                value={form.youtubeUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, youtubeUrl: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.youtube.input"
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          data-ocid="settings.save_button"
          className="w-full"
          style={{ backgroundColor: "#166534" }}
        >
          Save All Settings
        </Button>
      </form>
    </div>
  );
}
