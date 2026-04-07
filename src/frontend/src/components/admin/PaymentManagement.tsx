import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  Download,
  Edit2,
  FileText,
  Forward,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Payment, SiteSettings } from "../../types";

interface PaymentManagementProps {
  payments: Payment[];
  settings: SiteSettings;
  onUpdate: (id: string, updates: Partial<Payment>) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  success: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  rejected: "bg-red-100 text-red-800",
};

export function PaymentManagement({
  payments,
  settings,
  onUpdate,
}: PaymentManagementProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    purpose: string;
    amount: string;
    utrNumber: string;
    notes: string;
  }>({ purpose: "", amount: "", utrNumber: "", notes: "" });
  const uploadRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleEditOpen = (p: Payment) => {
    setEditingId(p.id);
    setEditForm({
      purpose: p.purpose,
      amount: String(p.amount),
      utrNumber: p.utrNumber ?? "",
      notes: "",
    });
  };

  const handleEditSave = (id: string) => {
    onUpdate(id, {
      purpose: editForm.purpose,
      amount: Number(editForm.amount),
      utrNumber: editForm.utrNumber,
    });
    setEditingId(null);
    toast.success("Payment updated");
  };

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
    toast.success(`Screenshot uploaded: ${file.name}`);
  };

  const handleForward = (memberName: string) => {
    window.dispatchEvent(
      new CustomEvent("admin-navigate", { detail: "letter_generator" }),
    );
    toast.success(`${memberName}'s payment forwarded to Letter Generator`);
  };

  const handleDownloadReceipt = (payment: Payment) => {
    const printWindow = window.open("", "_blank", "width=794,height=1123");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt - ${payment.memberName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 50px 60px; color: #1a1a1a; }
            .header { display: flex; align-items: center; gap: 16px; border-bottom: 3px solid #166534; padding-bottom: 16px; margin-bottom: 24px; }
            .org-name { font-size: 22px; font-weight: bold; color: #166534; }
            .org-sub { font-size: 11px; color: #555; }
            .title { font-size: 16px; font-weight: bold; text-align: center; margin: 20px 0; color: #166534; text-transform: uppercase; letter-spacing: 2px; }
            .detail { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; }
            .amount { font-size: 28px; font-weight: bold; color: #166534; text-align: center; border: 2px solid #166534; padding: 12px; margin: 20px 0; border-radius: 8px; }
            .footer { border-top: 2px solid #166534; margin-top: 40px; padding-top: 10px; font-size: 10px; color: #777; text-align: center; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="org-name">${settings.siteName}</div>
              <div class="org-sub">${settings.tagline ?? ""}</div>
              <div class="org-sub">${settings.address ?? ""} | ${settings.contactPhone ?? ""}</div>
            </div>
          </div>
          <div class="title">🯧 Payment Receipt</div>
          <div class="detail"><span>Receipt No.</span><strong>${payment.receiptNo ?? `RCP-${payment.id.slice(-6).toUpperCase()}`}</strong></div>
          <div class="detail"><span>Date</span><strong>${new Date(payment.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</strong></div>
          <div class="detail"><span>Member Name</span><strong>${payment.memberName}</strong></div>
          <div class="detail"><span>Member ID</span><strong>${payment.memberId}</strong></div>
          <div class="detail"><span>Purpose</span><strong>${payment.purpose}</strong></div>
          ${payment.utrNumber ? `<div class="detail"><span>UTR / Reference No.</span><strong>${payment.utrNumber}</strong></div>` : ""}
          <div class="detail"><span>Payment Status</span><strong>${payment.status.toUpperCase()}</strong></div>
          <div class="amount">₹${payment.amount.toLocaleString()}</div>
          <div style="margin-top:50px;display:flex;justify-content:space-between">
            <div><div style="border-bottom:1px solid #333;width:160px;margin-bottom:4px"></div><div style="font-size:12px">Authorized Signatory</div><div style="font-size:12px;color:#166534">${settings.siteName}</div></div>
            <div style="text-align:center"><div style="font-size:11px;color:#999">[Official Seal]</div></div>
          </div>
          <div class="footer">Official Payment Receipt | ${settings.siteName} | ${settings.contactPhone ?? ""} | This is a computer-generated receipt.</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Payment Management</h2>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">Member</th>
                <th className="text-left px-4 py-3 text-gray-600">Purpose</th>
                <th className="text-left px-4 py-3 text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 text-gray-600">Date</th>
                <th className="text-left px-4 py-3 text-gray-600">Status</th>
                <th className="text-left px-4 py-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((p, idx) => (
                <>
                  <tr
                    key={p.id}
                    data-ocid={`payments.admin.row.${idx + 1}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {p.memberName}
                      <div className="text-xs text-gray-400">{p.memberId}</div>
                    </td>
                    <td className="px-4 py-3">{p.purpose}</td>
                    <td className="px-4 py-3 font-semibold">
                      ₹{p.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(p.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={statusColors[p.status]}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 text-white h-7 px-2"
                              onClick={() => {
                                onUpdate(p.id, { status: "success" });
                                toast.success("Payment approved");
                              }}
                              data-ocid={`payments.admin.approve.button.${idx + 1}`}
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-700 h-7 px-2"
                              onClick={() => {
                                onUpdate(p.id, { status: "rejected" });
                                toast.success("Payment rejected");
                              }}
                              data-ocid={`payments.admin.reject.button.${idx + 1}`}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        {p.status === "success" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-700 h-7 px-2"
                            onClick={() => handleDownloadReceipt(p)}
                            data-ocid={`payments.admin.receipt.button.${idx + 1}`}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 border-blue-200 text-blue-700"
                          onClick={() => handleEditOpen(p)}
                          data-ocid={`payments.admin.edit.button.${idx + 1}`}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 border-orange-200 text-orange-700"
                          onClick={() => uploadRefs.current[p.id]?.click()}
                          data-ocid={`payments.admin.upload.button.${idx + 1}`}
                        >
                          <Upload className="w-3 h-3" />
                        </Button>
                        <input
                          ref={(el) => {
                            uploadRefs.current[p.id] = el;
                          }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUpload(p.id, e)}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 border-purple-200 text-purple-700"
                          onClick={() => handleForward(p.memberName)}
                          data-ocid={`payments.admin.forward.button.${idx + 1}`}
                        >
                          <Forward className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 border-green-200 text-green-700"
                          onClick={() => handleDownloadReceipt(p)}
                          data-ocid={`payments.admin.letter.button.${idx + 1}`}
                        >
                          <FileText className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {/* Inline edit row */}
                  {editingId === p.id && (
                    <tr key={`edit-${p.id}`} className="bg-blue-50">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <Label className="text-xs">Purpose</Label>
                            <Input
                              value={editForm.purpose}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  purpose: e.target.value,
                                }))
                              }
                              className="mt-1 text-sm"
                              data-ocid={`payments.admin.edit_purpose.input.${idx + 1}`}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Amount (₹)</Label>
                            <Input
                              value={editForm.amount}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  amount: e.target.value,
                                }))
                              }
                              className="mt-1 text-sm"
                              type="number"
                              data-ocid={`payments.admin.edit_amount.input.${idx + 1}`}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">UTR Number</Label>
                            <Input
                              value={editForm.utrNumber}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  utrNumber: e.target.value,
                                }))
                              }
                              className="mt-1 text-sm"
                              data-ocid={`payments.admin.edit_utr.input.${idx + 1}`}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Notes</Label>
                            <Input
                              value={editForm.notes}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  notes: e.target.value,
                                }))
                              }
                              className="mt-1 text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            className="bg-green-600 text-white"
                            onClick={() => handleEditSave(p.id)}
                            data-ocid={`payments.admin.edit_save.button.${idx + 1}`}
                          >
                            <Check className="w-3 h-3 mr-1" /> Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            data-ocid={`payments.admin.edit_cancel.button.${idx + 1}`}
                          >
                            <X className="w-3 h-3 mr-1" /> Cancel
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && (
            <div
              className="text-center py-10 text-gray-400"
              data-ocid="payments.admin.empty_state"
            >
              No payments yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
