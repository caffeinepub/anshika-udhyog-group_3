import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import type { LocalMember } from "../../types";

interface ProfileSectionProps {
  member: LocalMember;
  onUpdate: (id: string, updates: Partial<LocalMember>) => void;
}

export function ProfileSection({ member, onUpdate }: ProfileSectionProps) {
  const [form, setForm] = useState({
    name: member.name,
    email: member.email,
    phone: member.phone,
    address: member.address,
    city: member.city,
    state: member.state,
    pincode: member.pincode,
  });

  const handleSave = () => {
    onUpdate(member.id, form);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
      <div className="bg-white rounded-xl p-6 border border-green-100 shadow-xs">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-green-700">
              {member.name[0]}
            </span>
          </div>
          <div>
            <div className="font-bold text-gray-900 text-lg">{member.name}</div>
            <div className="text-green-600 text-sm">{member.id}</div>
            <div className="text-gray-500 text-xs capitalize">
              {member.membershipType} Member
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              data-ocid="profile.name.input"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              data-ocid="profile.email.input"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Mobile</Label>
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              data-ocid="profile.phone.input"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              data-ocid="profile.address.input"
              className="mt-1"
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              data-ocid="profile.city.input"
              className="mt-1"
            />
          </div>
          <div>
            <Label>PIN Code</Label>
            <Input
              value={form.pincode}
              onChange={(e) =>
                setForm((p) => ({ ...p, pincode: e.target.value }))
              }
              data-ocid="profile.pincode.input"
              className="mt-1"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          data-ocid="profile.save_button"
          className="mt-6"
          style={{ backgroundColor: "#166534" }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
