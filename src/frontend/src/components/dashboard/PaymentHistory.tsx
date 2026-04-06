import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Payment, SiteSettings } from "../../types";

interface PaymentHistoryProps {
  payments: Payment[];
  settings: SiteSettings;
}

const statusColors: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  rejected: "bg-red-100 text-red-800",
};

export function PaymentHistory({ payments, settings }: PaymentHistoryProps) {
  const handleDownloadReceipt = (payment: Payment) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Receipt - ${payment.receiptNo}</title>
      <style>
        body { font-family: sans-serif; padding: 40px; max-width: 500px; margin: 0 auto; }
        h1 { color: #166534; }
        .detail { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 20px; font-weight: bold; color: #166534; }
        .stamp { color: #166534; border: 3px solid #166534; display: inline-block; padding: 4px 16px; font-size: 20px; font-weight: bold; transform: rotate(-10deg); margin: 20px 0; }
      </style></head>
      <body>
        <h1>${settings.siteName}</h1>
        <p style="color:#666">${settings.address}</p>
        <hr/>
        <h2>Payment Receipt</h2>
        <div class="detail"><span>Receipt No:</span><strong>${payment.receiptNo}</strong></div>
        <div class="detail"><span>Member:</span><strong>${payment.memberName}</strong></div>
        <div class="detail"><span>Purpose:</span><strong>${payment.purpose}</strong></div>
        <div class="detail"><span>Date:</span><strong>${new Date(payment.date).toLocaleDateString("en-IN")}</strong></div>
        <div class="detail"><span>UTR Number:</span><strong>${payment.utrNumber || "N/A"}</strong></div>
        <div class="detail total"><span>Amount Paid:</span><strong>\u20b9${payment.amount.toLocaleString()}</strong></div>
        <div class="stamp">PAID</div>
        <p style="font-size: 12px; color: #999; margin-top: 20px;">UPI: ${settings.upiId} | ${settings.contactPhone}</p>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
      {payments.length === 0 ? (
        <div
          className="text-center py-16 bg-white rounded-xl border border-green-100"
          data-ocid="payments.empty_state"
        >
          <p className="text-gray-400">No payment records found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((payment, idx) => (
            <div
              key={payment.id}
              data-ocid={`payments.item.${idx + 1}`}
              className="bg-white rounded-xl p-4 border border-green-100 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-gray-900">
                  {payment.purpose}
                </div>
                <div className="text-sm text-gray-500">
                  ₹{payment.amount.toLocaleString()} ·{" "}
                  {new Date(payment.date).toLocaleDateString("en-IN")}
                </div>
                {payment.utrNumber && (
                  <div className="text-xs text-gray-400">
                    UTR: {payment.utrNumber}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Badge className={statusColors[payment.status]}>
                  {payment.status.toUpperCase()}
                </Badge>
                {payment.status === "success" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadReceipt(payment)}
                    data-ocid={`payments.download.button.${idx + 1}`}
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <Download className="w-3 h-3 mr-1" /> Receipt
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
