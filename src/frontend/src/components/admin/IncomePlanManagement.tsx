import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { IncomePlan } from "../../types";

interface IncomePlanManagementProps {
  plans: IncomePlan[];
  onAdd: (data: Omit<IncomePlan, "id">) => void;
  onUpdate: (id: string, updates: Partial<IncomePlan>) => void;
  onDelete: (id: string) => void;
}

export function IncomePlanManagement({
  plans,
  onAdd,
  onUpdate,
  onDelete,
}: IncomePlanManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: 0,
    period: "Yearly",
    isActive: true,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    onAdd(form);
    toast.success("Income plan added!");
    setShowForm(false);
    setForm({
      title: "",
      description: "",
      amount: 0,
      period: "Yearly",
      isActive: true,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Income Plans</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          data-ocid="income_plans.add.button"
          style={{ backgroundColor: "#166534" }}
        >
          <Plus className="w-4 h-4 mr-1" /> Add Plan
        </Button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1"
                data-ocid="income_plan.title.input"
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                className="mt-1"
                data-ocid="income_plan.description.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amount: Number(e.target.value) }))
                  }
                  className="mt-1"
                  data-ocid="income_plan.amount.input"
                />
              </div>
              <div>
                <Label>Period</Label>
                <Input
                  value={form.period}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, period: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="income_plan.period.input"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                data-ocid="income_plan.submit_button"
                style={{ backgroundColor: "#166534" }}
              >
                Add Plan
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
      <div className="space-y-3">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            data-ocid={`income_plans.item.${idx + 1}`}
            className="bg-white rounded-xl p-5 border border-gray-200 flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-gray-900">{plan.title}</div>
              <div className="text-sm text-gray-500">
                ₹{plan.amount.toLocaleString()} / {plan.period}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {plan.description}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={plan.isActive}
                  onCheckedChange={(val) => {
                    onUpdate(plan.id, { isActive: val });
                    toast.success("Status updated");
                  }}
                  data-ocid={`income_plans.toggle.${idx + 1}`}
                />
                <span className="text-xs text-gray-500">
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700"
                onClick={() => {
                  onDelete(plan.id);
                  toast.success("Deleted");
                }}
                data-ocid={`income_plans.delete_button.${idx + 1}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        {plans.length === 0 && (
          <div
            className="text-center py-12 bg-white rounded-xl border"
            data-ocid="income_plans.empty_state"
          >
            <p className="text-gray-400">No income plans yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
