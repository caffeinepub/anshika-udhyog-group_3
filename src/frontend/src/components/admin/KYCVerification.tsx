import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import type { LocalMember } from "../../types";

interface KYCVerificationProps {
  members: LocalMember[];
  onUpdate: (id: string, updates: Partial<LocalMember>) => void;
}

export function KYCVerification({ members, onUpdate }: KYCVerificationProps) {
  const pending = members.filter((m) => m.kycStatus === "submitted");
  const reviewed = members.filter(
    (m) => m.kycStatus === "approved" || m.kycStatus === "rejected",
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">KYC Verification</h2>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">
          Pending Review ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <div
            className="text-center py-10 bg-white rounded-xl border"
            data-ocid="kyc.empty_state"
          >
            <p className="text-gray-400">No pending KYC requests.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((m, idx) => (
              <div
                key={m.id}
                data-ocid={`kyc.item.${idx + 1}`}
                className="bg-white rounded-xl p-4 border border-yellow-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-gray-900">{m.name}</div>
                  <div className="text-sm text-gray-500">
                    {m.id} · {m.phone}
                  </div>
                  {m.aadhaar && (
                    <div className="text-xs text-gray-400">
                      Aadhaar: {m.aadhaar}
                    </div>
                  )}
                  {m.pan && (
                    <div className="text-xs text-gray-400">PAN: {m.pan}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      onUpdate(m.id, { kycStatus: "approved" });
                      toast.success(`KYC approved for ${m.name}`);
                    }}
                    data-ocid={`kyc.approve.button.${idx + 1}`}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      onUpdate(m.id, { kycStatus: "rejected" });
                      toast.success(`KYC rejected for ${m.name}`);
                    }}
                    data-ocid={`kyc.reject.button.${idx + 1}`}
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">
          Reviewed ({reviewed.length})
        </h3>
        <div className="space-y-2">
          {reviewed.map((m, idx) => (
            <div
              key={m.id}
              data-ocid={`kyc.reviewed.item.${idx + 1}`}
              className="bg-white rounded-xl p-3 border text-sm flex items-center justify-between"
            >
              <span className="text-gray-700">
                {m.name} ({m.id})
              </span>
              <Badge
                className={
                  m.kycStatus === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {m.kycStatus}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
