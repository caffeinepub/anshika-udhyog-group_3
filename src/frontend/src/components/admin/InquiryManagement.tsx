import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Inquiry } from "../../types";

interface InquiryManagementProps {
  inquiries: Inquiry[];
  onReply: (id: string, reply: string) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

export function InquiryManagement({
  inquiries,
  onReply,
}: InquiryManagementProps) {
  const [replies, setReplies] = useState<Record<string, string>>({});

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Inquiry Management</h2>
      {inquiries.length === 0 ? (
        <div
          className="text-center py-12 bg-white rounded-xl border"
          data-ocid="inquiries.empty_state"
        >
          <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-2" />
          <p className="text-gray-400">No inquiries yet.</p>
        </div>
      ) : (
        inquiries.map((inq, idx) => (
          <div
            key={inq.id}
            data-ocid={`inquiries.item.${idx + 1}`}
            className="bg-white rounded-xl p-5 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-900">{inq.name}</div>
                <div className="text-sm text-gray-500">
                  {inq.email} · {inq.phone} ·{" "}
                  {new Date(inq.date).toLocaleDateString("en-IN")}
                </div>
              </div>
              <Badge className={statusColors[inq.status]}>{inq.status}</Badge>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-3">
              {inq.message}
            </div>
            {inq.reply && (
              <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800 border border-green-100 mb-3">
                <div className="font-semibold text-xs text-green-600 mb-1">
                  Your Reply:
                </div>
                {inq.reply}
              </div>
            )}
            {inq.status === "new" && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={replies[inq.id] || ""}
                  onChange={(e) =>
                    setReplies((p) => ({ ...p, [inq.id]: e.target.value }))
                  }
                  rows={2}
                  className="text-sm"
                  data-ocid={`inquiries.reply.textarea.${idx + 1}`}
                />
                <Button
                  size="sm"
                  disabled={!replies[inq.id]}
                  onClick={() => {
                    onReply(inq.id, replies[inq.id]);
                    toast.success("Reply sent!");
                    setReplies((p) => ({ ...p, [inq.id]: "" }));
                  }}
                  data-ocid={`inquiries.reply.button.${idx + 1}`}
                  style={{ backgroundColor: "#166534" }}
                >
                  Send Reply
                </Button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
