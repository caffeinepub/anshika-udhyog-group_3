import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import type { Internship, LocalMember } from "../../types";

interface InternshipApplyProps {
  internships: Internship[];
  member: LocalMember;
  onApply: (data: Omit<Internship, "id">) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800",
};

export function InternshipApply({
  internships,
  member,
  onApply,
}: InternshipApplyProps) {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasActivePending = internships.some(
    (i) => i.status === "pending" || i.status === "approved",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Please enter the internship title");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onApply({
      memberId: member.id,
      memberName: member.name,
      title: form.title,
      description: form.description,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    });
    toast.success("Internship application submitted successfully!");
    setForm({ title: "", description: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Internship Program</h2>

      {!hasActivePending && (
        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-xs">
          <h3 className="font-semibold text-gray-900 mb-4">
            Apply for Internship
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Internship Title / Field *</Label>
              <Input
                placeholder="e.g. Digital Marketing, Web Development"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="internship.title.input"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label>Description / Motivation</Label>
              <Textarea
                placeholder="Why are you interested in this internship?"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="internship.description.textarea"
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              data-ocid="internship.apply.submit_button"
              style={{ backgroundColor: "#166534" }}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">My Applications</h3>
        {internships.length === 0 ? (
          <div
            className="text-center py-12 bg-white rounded-xl border border-green-100"
            data-ocid="internship.empty_state"
          >
            <p className="text-gray-400">No internship applications yet.</p>
          </div>
        ) : (
          internships.map((internship, idx) => (
            <div
              key={internship.id}
              data-ocid={`internship.item.${idx + 1}`}
              className="bg-white rounded-xl p-4 border border-green-100 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {internship.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    Applied: {internship.appliedDate}
                  </div>
                  {internship.notes && (
                    <div className="text-sm text-gray-600 mt-1">
                      Note: {internship.notes}
                    </div>
                  )}
                </div>
                <Badge className={statusColors[internship.status]}>
                  {internship.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
