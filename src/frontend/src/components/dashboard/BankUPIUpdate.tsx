import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import type { LocalMember } from "../../types";

interface BankUPIUpdateProps {
  member: LocalMember;
  onUpdate: (id: string, updates: Partial<LocalMember>) => void;
}

export function BankUPIUpdate({ member, onUpdate }: BankUPIUpdateProps) {
  const [form, setForm] = useState({
    bankAccount: member.bankAccount || "",
    ifscCode: member.ifscCode || "",
    bankName: member.bankName || "",
    upiId: member.upiId || "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(member.id, form);
    toast.success("Bank & UPI details updated successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Bank & UPI Details</h2>
      <div className="bg-white rounded-xl p-6 border border-green-100 shadow-xs">
        <p className="text-sm text-gray-500 mb-6">
          Your bank details are used for receiving payments and benefits. These
          require admin verification.
        </p>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Bank Account Number</Label>
              <Input
                placeholder="Account number"
                value={form.bankAccount}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bankAccount: e.target.value }))
                }
                data-ocid="bank.account.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>IFSC Code</Label>
              <Input
                placeholder="e.g. SBIN0001234"
                value={form.ifscCode}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    ifscCode: e.target.value.toUpperCase(),
                  }))
                }
                data-ocid="bank.ifsc.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Bank Name</Label>
              <Input
                placeholder="e.g. State Bank of India"
                value={form.bankName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bankName: e.target.value }))
                }
                data-ocid="bank.name.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>UPI ID</Label>
              <Input
                placeholder="e.g. name@upi"
                value={form.upiId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, upiId: e.target.value }))
                }
                data-ocid="bank.upi.input"
                className="mt-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            data-ocid="bank.save_button"
            style={{ backgroundColor: "#166534" }}
          >
            Save Bank Details
          </Button>
        </form>
      </div>
    </div>
  );
}
