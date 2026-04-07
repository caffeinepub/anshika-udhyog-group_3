import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2, FileText, Forward, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Donation } from "../../types";

// Extend Donation locally to support receipt fields
interface DonationWithReceipt extends Donation {
  receiptImageUrl?: string;
  notes?: string;
}

interface DonationManagementProps {
  donations: Donation[];
  onUpdate: (id: string, updates: Partial<Donation>) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export function DonationManagement({
  donations,
  onUpdate,
}: DonationManagementProps) {
  const total = donations
    .filter((d) => d.status === "confirmed")
    .reduce((sum, d) => sum + d.amount, 0);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    amount: string;
    purpose: string;
    notes: string;
    utrNumber: string;
  }>({ amount: "", purpose: "", notes: "", utrNumber: "" });
  const uploadRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleEditOpen = (d: DonationWithReceipt) => {
    setEditingId(d.id);
    setEditForm({
      amount: String(d.amount),
      purpose: d.purpose,
      notes: (d as DonationWithReceipt).notes ?? "",
      utrNumber: d.utrNumber ?? "",
    });
  };

  const handleEditSave = (id: string) => {
    onUpdate(id, {
      amount: Number(editForm.amount),
      purpose: editForm.purpose,
      utrNumber: editForm.utrNumber,
    } as Partial<Donation>);
    setEditingId(null);
    toast.success("Donation updated");
  };

  const handleUpload = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    onUpdate(id, { utrNumber: `[RECEIPT:${file.name}]` } as Partial<Donation>);
    toast.success(`Receipt uploaded: ${file.name}`);
    // store b64 in memory for display
    const donor = donations.find((d) => d.id === id);
    if (donor) {
      (donor as DonationWithReceipt).receiptImageUrl = b64;
    }
  };

  const handleForward = (memberName: string) => {
    window.dispatchEvent(
      new CustomEvent("admin-navigate", { detail: "letter_generator" }),
    );
    toast.success(`${memberName}'s donation forwarded to Letter Generator`);
  };

  const handleReceipt = (d: Donation) => {
    const win = window.open("", "_blank", "width=794,height=1123");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Donation Receipt - ${d.memberName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 50px 60px; color: #1a1a1a; }
            .header { text-align: center; border-bottom: 3px double #166534; padding-bottom: 16px; margin-bottom: 24px; }
            .org { font-size: 22px; font-weight: bold; color: #166534; }
            .title { font-size: 16px; font-weight: bold; text-align: center; margin: 20px 0; color: #166534; text-transform: uppercase; letter-spacing: 2px; }
            .detail { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 13px; }
            .amount { font-size: 24px; font-weight: bold; color: #166534; text-align: center; margin: 20px 0; }
            .footer { border-top: 2px solid #166534; margin-top: 40px; padding-top: 10px; font-size: 10px; color: #777; text-align: center; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="org">ANSHIKA UDHYOG GROUP™</div>
            <div style="font-size:12px;color:#555">Self Employment Revolution Scheme</div>
          </div>
          <div class="title">💚 Donation Receipt</div>
          <div class="detail"><span>Receipt No.</span><strong>DON-${d.id.slice(-6).toUpperCase()}</strong></div>
          <div class="detail"><span>Date</span><strong>${new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</strong></div>
          <div class="detail"><span>Donor Name</span><strong>${d.memberName}</strong></div>
          <div class="detail"><span>Member ID</span><strong>${d.memberId}</strong></div>
          <div class="detail"><span>Purpose</span><strong>${d.purpose}</strong></div>
          ${d.utrNumber ? `<div class="detail"><span>UTR / Reference</span><strong>${d.utrNumber}</strong></div>` : ""}
          <div class="detail"><span>Status</span><strong>${d.status.toUpperCase()}</strong></div>
          <div class="amount">₹${d.amount.toLocaleString()}</div>
          <div style="margin-top:50px;display:flex;justify-content:space-between">
            <div><div style="border-bottom:1px solid #333;width:160px;margin-bottom:4px"></div><div style="font-size:12px">Authorized Signatory</div><div style="font-size:12px;color:#166534">ANSHIKA UDHYOG GROUP™</div></div>
          </div>
          <div class="footer">Official Receipt | ANSHIKA UDHYOG GROUP™ | Thank you for your generous contribution.</div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Donation Management</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-500">Total Confirmed: </span>
          <span className="font-bold text-green-800">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      {donations.length === 0 ? (
        <div
          className="text-center py-12 bg-white rounded-xl border"
          data-ocid="donations.empty_state"
        >
          <p className="text-gray-400">No donations yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600">Donor</th>
                  <th className="text-left px-4 py-3 text-gray-600">Purpose</th>
                  <th className="text-left px-4 py-3 text-gray-600">Amount</th>
                  <th className="text-left px-4 py-3 text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {donations.map((d, idx) => (
                  <>
                    <tr
                      key={d.id}
                      data-ocid={`donations.row.${idx + 1}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{d.memberName}</td>
                      <td className="px-4 py-3">{d.purpose}</td>
                      <td className="px-4 py-3 font-semibold">
                        ₹{d.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(d.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={statusColors[d.status]}>
                          {d.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {d.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white h-7 px-2"
                                onClick={() => {
                                  onUpdate(d.id, { status: "confirmed" });
                                  toast.success("Donation confirmed");
                                }}
                                data-ocid={`donations.confirm.button.${idx + 1}`}
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-700 h-7 px-2"
                                onClick={() => {
                                  onUpdate(d.id, { status: "rejected" });
                                  toast.success("Donation rejected");
                                }}
                                data-ocid={`donations.reject.button.${idx + 1}`}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 border-blue-200 text-blue-700"
                            onClick={() =>
                              handleEditOpen(d as DonationWithReceipt)
                            }
                            data-ocid={`donations.edit.button.${idx + 1}`}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 border-orange-200 text-orange-700"
                            onClick={() => uploadRefs.current[d.id]?.click()}
                            data-ocid={`donations.upload.button.${idx + 1}`}
                          >
                            <Upload className="w-3 h-3" />
                          </Button>
                          <input
                            ref={(el) => {
                              uploadRefs.current[d.id] = el;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(d.id, e)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 border-purple-200 text-purple-700"
                            onClick={() => handleForward(d.memberName)}
                            data-ocid={`donations.forward.button.${idx + 1}`}
                          >
                            <Forward className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 border-green-200 text-green-700"
                            onClick={() => handleReceipt(d)}
                            data-ocid={`donations.letter.button.${idx + 1}`}
                          >
                            <FileText className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {/* Inline edit row */}
                    {editingId === d.id && (
                      <tr key={`edit-${d.id}`} className="bg-blue-50">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                                data-ocid={`donations.edit_amount.input.${idx + 1}`}
                              />
                            </div>
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
                                data-ocid={`donations.edit_purpose.input.${idx + 1}`}
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
                                data-ocid={`donations.edit_utr.input.${idx + 1}`}
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
                              onClick={() => handleEditSave(d.id)}
                              data-ocid={`donations.edit_save.button.${idx + 1}`}
                            >
                              <Check className="w-3 h-3 mr-1" /> Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                              data-ocid={`donations.edit_cancel.button.${idx + 1}`}
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
          </div>
        </div>
      )}
    </div>
  );
}
