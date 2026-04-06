import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Download, X } from "lucide-react";
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
  const handleDownloadReceipt = (payment: Payment) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(
      `<html><head><title>Receipt</title><style>body{font-family:sans-serif;padding:40px;max-width:500px;margin:0 auto}.detail{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}.total{font-size:20px;font-weight:bold;color:#166534}</style></head><body><h1 style="color:#166534">${settings.siteName}</h1><h2>Payment Receipt</h2><div class="detail"><span>Receipt:</span><strong>${payment.receiptNo}</strong></div><div class="detail"><span>Member:</span><strong>${payment.memberName}</strong></div><div class="detail"><span>Purpose:</span><strong>${payment.purpose}</strong></div><div class="detail"><span>Amount:</span><strong class="total">\u20b9${payment.amount}</strong></div><div class="detail"><span>Status:</span><strong>${payment.status.toUpperCase()}</strong></div></body></html>`,
    );
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
                    <Badge className={statusColors[p.status]}>{p.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
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
                    </div>
                  </td>
                </tr>
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
