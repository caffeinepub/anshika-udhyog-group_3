import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import type { Donation } from "../../types";

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
                    <Badge className={statusColors[d.status]}>{d.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    {d.status === "pending" && (
                      <div className="flex gap-1">
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
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
