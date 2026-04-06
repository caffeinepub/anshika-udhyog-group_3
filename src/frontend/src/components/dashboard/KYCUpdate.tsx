import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import type { LocalMember } from "../../types";

interface KYCUpdateProps {
  member: LocalMember;
  onUpdate: (id: string, updates: Partial<LocalMember>) => void;
}

export function KYCUpdate({ member, onUpdate }: KYCUpdateProps) {
  const [form, setForm] = useState({
    aadhaar: member.aadhaar || "",
    pan: member.pan || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(member.id, { ...form, kycStatus: "submitted" });
    toast.success("KYC documents submitted for verification!");
  };

  const kycStatusColors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-800",
    submitted: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">KYC Verification</h2>
        <Badge className={kycStatusColors[member.kycStatus]}>
          KYC: {member.kycStatus.toUpperCase()}
        </Badge>
      </div>

      {member.kycStatus === "approved" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-green-700 font-semibold text-lg">
            ✓ KYC Verified
          </div>
          <p className="text-green-600 text-sm mt-2">
            Your KYC has been verified and approved by admin.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-xs">
          <p className="text-gray-600 text-sm mb-6">
            Submit your KYC documents for verification. Approved KYC is required
            for certain benefits.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Aadhaar Number</Label>
              <Input
                placeholder="12-digit Aadhaar number"
                value={form.aadhaar}
                onChange={(e) =>
                  setForm((p) => ({ ...p, aadhaar: e.target.value }))
                }
                data-ocid="kyc.aadhaar.input"
                className="mt-1"
                maxLength={12}
              />
            </div>
            <div>
              <Label>PAN Number</Label>
              <Input
                placeholder="10-character PAN number"
                value={form.pan}
                onChange={(e) =>
                  setForm((p) => ({ ...p, pan: e.target.value.toUpperCase() }))
                }
                data-ocid="kyc.pan.input"
                className="mt-1"
                maxLength={10}
              />
            </div>
            <Button
              type="submit"
              data-ocid="kyc.submit_button"
              style={{ backgroundColor: "#166534" }}
              disabled={member.kycStatus === "submitted"}
            >
              {member.kycStatus === "submitted"
                ? "Documents Under Review"
                : "Submit KYC Documents"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
