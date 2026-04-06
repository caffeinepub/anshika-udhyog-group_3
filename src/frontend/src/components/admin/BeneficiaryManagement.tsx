import { Badge } from "@/components/ui/badge";
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
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Beneficiary } from "../../types";

interface BeneficiaryManagementProps {
  beneficiaries: Beneficiary[];
  onAdd: (data: Omit<Beneficiary, "id">) => void;
  onUpdate: (id: string, updates: Partial<Beneficiary>) => void;
  onDelete: (id: string) => void;
}

export function BeneficiaryManagement({
  beneficiaries,
  onAdd,
  onDelete,
}: BeneficiaryManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    schemeId: "sch1",
    schemeName: "Self Employment Grant",
    benefitAmount: 0,
    date: new Date().toISOString().split("T")[0],
    status: "active" as const,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill required fields");
      return;
    }
    onAdd(form);
    toast.success("Beneficiary added!");
    setShowForm(false);
    setForm({
      name: "",
      phone: "",
      address: "",
      schemeId: "sch1",
      schemeName: "Self Employment Grant",
      benefitAmount: 0,
      date: new Date().toISOString().split("T")[0],
      status: "active",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Beneficiary Management
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          data-ocid="beneficiaries.add.button"
          style={{ backgroundColor: "#166534" }}
        >
          <Plus className="w-4 h-4 mr-1" /> Add Beneficiary
        </Button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1"
                data-ocid="beneficiary.name.input"
                required
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="mt-1"
                data-ocid="beneficiary.phone.input"
                required
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
                data-ocid="beneficiary.address.input"
              />
            </div>
            <div>
              <Label>Scheme</Label>
              <Select
                value={form.schemeName}
                onValueChange={(v) => setForm((p) => ({ ...p, schemeName: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="beneficiary.scheme.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Self Employment Grant">
                    Self Employment Grant
                  </SelectItem>
                  <SelectItem value="Skill Development Fund">
                    Skill Development Fund
                  </SelectItem>
                  <SelectItem value="Education Support">
                    Education Support
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Benefit Amount (₹)</Label>
              <Input
                type="number"
                value={form.benefitAmount}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    benefitAmount: Number(e.target.value),
                  }))
                }
                className="mt-1"
                data-ocid="beneficiary.amount.input"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button
                type="submit"
                data-ocid="beneficiary.submit_button"
                style={{ backgroundColor: "#166534" }}
              >
                Add Beneficiary
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600">Name</th>
              <th className="text-left px-4 py-3 text-gray-600">Phone</th>
              <th className="text-left px-4 py-3 text-gray-600">Scheme</th>
              <th className="text-left px-4 py-3 text-gray-600">Amount</th>
              <th className="text-left px-4 py-3 text-gray-600">Status</th>
              <th className="text-left px-4 py-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {beneficiaries.map((b, idx) => (
              <tr
                key={b.id}
                data-ocid={`beneficiaries.row.${idx + 1}`}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">{b.phone}</td>
                <td className="px-4 py-3">{b.schemeName}</td>
                <td className="px-4 py-3">
                  ₹{b.benefitAmount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      b.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {b.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700"
                    onClick={() => {
                      onDelete(b.id);
                      toast.success("Deleted");
                    }}
                    data-ocid={`beneficiaries.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {beneficiaries.length === 0 && (
          <div
            className="text-center py-10 text-gray-400"
            data-ocid="beneficiaries.empty_state"
          >
            No beneficiaries yet.
          </div>
        )}
      </div>
    </div>
  );
}
