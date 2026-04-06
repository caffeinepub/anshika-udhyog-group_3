import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Internship } from "../../types";

interface InternshipManagementProps {
  internships: Internship[];
  onUpdate: (id: string, updates: Partial<Internship>) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800",
};

export function InternshipManagement({
  internships,
  onUpdate,
}: InternshipManagementProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleApprove = (id: string, memberName: string) => {
    onUpdate(id, { status: "approved", notes: notes[id] });
    toast.success(`Internship approved for ${memberName}`);
  };

  const handleReject = (id: string, memberName: string) => {
    onUpdate(id, { status: "rejected", notes: notes[id] });
    toast.success(`Internship rejected for ${memberName}`);
  };

  const handleComplete = (id: string) => {
    const certId = `CERT-${Date.now()}`;
    onUpdate(id, {
      status: "completed",
      completionDate: new Date().toISOString().split("T")[0],
      certificateId: certId,
    });
    toast.success("Marked as completed and certificate issued!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Internship Management</h2>
      {internships.length === 0 ? (
        <div
          className="text-center py-12 bg-white rounded-xl border"
          data-ocid="internships.empty_state"
        >
          <p className="text-gray-400">No internship applications yet.</p>
        </div>
      ) : (
        internships.map((i, idx) => (
          <div
            key={i.id}
            data-ocid={`internships.item.${idx + 1}`}
            className="bg-white rounded-xl p-4 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-900">{i.title}</div>
                <div className="text-sm text-gray-500">
                  {i.memberName} ({i.memberId}) · Applied: {i.appliedDate}
                </div>
                {i.description && (
                  <div className="text-sm text-gray-600 mt-1">
                    {i.description}
                  </div>
                )}
              </div>
              <Badge className={statusColors[i.status]}>{i.status}</Badge>
            </div>
            {i.status === "pending" && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Add notes (optional)"
                  value={notes[i.id] || ""}
                  onChange={(e) =>
                    setNotes((p) => ({ ...p, [i.id]: e.target.value }))
                  }
                  rows={2}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleApprove(i.id, i.memberName)}
                    data-ocid={`internships.approve.button.${idx + 1}`}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700"
                    onClick={() => handleReject(i.id, i.memberName)}
                    data-ocid={`internships.reject.button.${idx + 1}`}
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            )}
            {i.status === "approved" && (
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => handleComplete(i.id)}
                data-ocid={`internships.complete.button.${idx + 1}`}
              >
                Mark Completed & Issue Certificate
              </Button>
            )}
            {i.certificateId && (
              <div className="text-xs text-green-700 mt-2">
                Certificate ID: {i.certificateId}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
