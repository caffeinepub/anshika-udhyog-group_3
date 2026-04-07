import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2, FileText, Forward, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
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

  const [viewMember, setViewMember] = useState<LocalMember | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const uploadRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleUpload = async (
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await new Promise<void>((res) => {
      const r = new FileReader();
      r.onload = () => res();
      r.readAsDataURL(file);
    });
    toast.success(`Document uploaded: ${file.name}`);
  };

  const handleForward = (memberName: string) => {
    window.dispatchEvent(
      new CustomEvent("admin-navigate", { detail: "letter_generator" }),
    );
    toast.success(`${memberName}'s KYC forwarded to Letter Generator`);
  };

  const handleLetter = (m: LocalMember, type: "approved" | "rejected") => {
    const win = window.open("", "_blank", "width=794,height=1123");
    if (!win) return;
    const isApproved = type === "approved";
    win.document.write(`
      <html>
        <head>
          <title>KYC ${type} Letter - ${m.name}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 50px 60px; color: #1a1a1a; }
            .header { text-align: center; border-bottom: 3px double ${isApproved ? "#166534" : "#991b1b"}; padding-bottom: 16px; margin-bottom: 24px; }
            .org { font-size: 22px; font-weight: bold; color: ${isApproved ? "#166534" : "#991b1b"}; }
            .title { font-size: 16px; font-weight: bold; color: ${isApproved ? "#166534" : "#991b1b"}; text-align: center; margin: 20px 0; text-transform: uppercase; letter-spacing: 2px; }
            .body { font-size: 13px; line-height: 2; text-align: justify; }
            .footer { border-top: 2px solid #ccc; margin-top: 40px; padding-top: 10px; font-size: 10px; color: #777; text-align: center; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header"><div class="org">ANSHIKA UDHYOG GROUP™</div><div style="font-size:12px;color:#555">Self Employment Revolution Scheme</div></div>
          <div class="title">KYC Verification ${type.toUpperCase()} Letter</div>
          <div class="body">
            <p><strong>Date:</strong> ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
            <p>Dear <strong>${m.name}</strong> (Member ID: ${m.id}),</p>
            <p>This is to inform you that your KYC (Know Your Customer) verification for ANSHIKA UDHYOG GROUP™ has been <strong>${isApproved ? "APPROVED ✅" : "REJECTED ❌"}</strong>.</p>
            ${
              isApproved
                ? "<p>Your identity has been successfully verified. You now have full access to all membership benefits and services. Your blue verification badge has been activated on your profile.</p>"
                : "<p>Unfortunately, we were unable to verify your submitted documents. Please re-submit clear copies of your Aadhaar Card, PAN Card, and Photo. For assistance, contact us.</p>"
            }
            ${m.aadhaar ? `<p>Aadhaar: ${m.aadhaar}</p>` : ""}
            ${m.pan ? `<p>PAN: ${m.pan}</p>` : ""}
          </div>
          <div style="margin-top:50px;display:flex;justify-content:space-between">
            <div><div style="border-bottom:1px solid #333;width:160px;margin-bottom:4px"></div><div style="font-size:12px">Authorized Signatory</div><div style="font-size:12px;color:#166534">ANSHIKA UDHYOG GROUP™</div></div>
          </div>
          <div class="footer">Official Document | ANSHIKA UDHYOG GROUP™</div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">🛡️ KYC Verification</h2>

      {/* Pending */}
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
                className="bg-white rounded-xl p-4 border border-yellow-100"
              >
                <div className="flex items-start justify-between mb-3">
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
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                </div>

                {/* Inline edit notes */}
                {editingId === m.id && (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2 mb-3 border">
                    <Label className="text-xs">Admin Remarks / Notes</Label>
                    <Textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      rows={2}
                      className="text-sm"
                      placeholder="Add admin remarks..."
                      data-ocid={`kyc.edit_notes.textarea.${idx + 1}`}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={() => {
                          onUpdate(m.id, { address: m.address });
                          setEditingId(null);
                          toast.success("Remarks saved");
                        }}
                        data-ocid={`kyc.edit_save.button.${idx + 1}`}
                      >
                        <Check className="w-3 h-3 mr-1" /> Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                        data-ocid={`kyc.edit_cancel.button.${idx + 1}`}
                      >
                        <X className="w-3 h-3 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700"
                    onClick={() => setViewMember(m)}
                    data-ocid={`kyc.view.button.${idx + 1}`}
                  >
                    View Full
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                    onClick={() => {
                      setEditingId(m.id);
                      setEditNotes("");
                    }}
                    data-ocid={`kyc.edit.button.${idx + 1}`}
                  >
                    <Edit2 className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-300 text-orange-700"
                    onClick={() => uploadRefs.current[m.id]?.click()}
                    data-ocid={`kyc.upload.button.${idx + 1}`}
                  >
                    <Upload className="w-3 h-3 mr-1" /> Upload Doc
                  </Button>
                  <input
                    ref={(el) => {
                      uploadRefs.current[m.id] = el;
                    }}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUpload(m.id, e)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-300 text-purple-700"
                    onClick={() => handleForward(m.name)}
                    data-ocid={`kyc.forward.button.${idx + 1}`}
                  >
                    <Forward className="w-3 h-3 mr-1" /> Forward
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-300 text-green-700"
                    onClick={() =>
                      handleLetter(
                        m,
                        m.kycStatus === "approved" ? "approved" : "rejected",
                      )
                    }
                    data-ocid={`kyc.letter.button.${idx + 1}`}
                  >
                    <FileText className="w-3 h-3 mr-1" /> Letter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviewed */}
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
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    m.kycStatus === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {m.kycStatus}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2 text-xs border-blue-200 text-blue-700"
                  onClick={() => setViewMember(m)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2 text-xs border-green-200 text-green-700"
                  onClick={() =>
                    handleLetter(
                      m,
                      m.kycStatus === "approved" ? "approved" : "rejected",
                    )
                  }
                >
                  <FileText className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Full Modal */}
      {viewMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          data-ocid="kyc.modal"
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                KYC Details — {viewMember.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMember(null)}
                data-ocid="kyc.close_button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-3">
              {viewMember.photoUrl && (
                <div className="flex justify-center mb-4">
                  <img
                    src={viewMember.photoUrl}
                    alt={viewMember.name}
                    className="w-24 h-24 rounded-full border-4 border-green-200 object-cover"
                  />
                </div>
              )}
              {(
                [
                  ["Member ID", viewMember.id],
                  ["Full Name", viewMember.name],
                  ["Phone", viewMember.phone],
                  ["Email", viewMember.email],
                  ["Address", viewMember.address],
                  ["City", viewMember.city],
                  ["State", viewMember.state],
                  ["Pincode", viewMember.pincode],
                  ["Aadhaar", viewMember.aadhaar ?? "—"],
                  ["PAN", viewMember.pan ?? "—"],
                  ["KYC Status", viewMember.kycStatus],
                  ["Membership Type", viewMember.membershipType],
                  ["Designation", viewMember.designation],
                  ["Join Date", viewMember.joinDate],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between py-1.5 border-b border-gray-50 text-sm"
                >
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <Button
                size="sm"
                className="bg-green-600 text-white flex-1"
                onClick={() => {
                  onUpdate(viewMember.id, { kycStatus: "approved" });
                  toast.success("KYC Approved");
                  setViewMember(null);
                }}
                data-ocid="kyc.modal_approve.button"
              >
                <Check className="w-4 h-4 mr-1" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 flex-1"
                onClick={() => {
                  onUpdate(viewMember.id, { kycStatus: "rejected" });
                  toast.success("KYC Rejected");
                  setViewMember(null);
                }}
                data-ocid="kyc.modal_reject.button"
              >
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-green-300 text-green-700"
                onClick={() =>
                  handleLetter(
                    viewMember,
                    viewMember.kycStatus === "approved"
                      ? "approved"
                      : "rejected",
                  )
                }
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
