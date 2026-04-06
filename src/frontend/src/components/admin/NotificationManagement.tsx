import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import type { LocalMember, Notification } from "../../types";

interface NotificationManagementProps {
  notifications: Notification[];
  members: LocalMember[];
  onAdd: (data: Omit<Notification, "id">) => void;
}

export function NotificationManagement({
  notifications,
  members,
  onAdd,
}: NotificationManagementProps) {
  const [form, setForm] = useState<{
    title: string;
    message: string;
    targetType: "all" | "specific";
    targetId: string;
  }>({
    title: "",
    message: "",
    targetType: "all",
    targetId: "",
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.message) {
      toast.error("Title and message required");
      return;
    }
    onAdd({ ...form, date: new Date().toISOString() });
    toast.success("Notification sent!");
    setForm({ title: "", message: "", targetType: "all", targetId: "" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        Notification Management
      </h2>
      <div className="bg-white rounded-xl p-6 border border-green-100">
        <h3 className="font-semibold mb-4">Send Notification</h3>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <Label>Title *</Label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              className="mt-1"
              data-ocid="notification.title.input"
              required
            />
          </div>
          <div>
            <Label>Message *</Label>
            <Textarea
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              rows={3}
              className="mt-1"
              data-ocid="notification.message.textarea"
              required
            />
          </div>
          <div>
            <Label>Target</Label>
            <Select
              value={form.targetType}
              onValueChange={(v: "all" | "specific") =>
                setForm((p) => ({ ...p, targetType: v }))
              }
            >
              <SelectTrigger
                className="mt-1"
                data-ocid="notification.target.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="specific">Specific Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.targetType === "specific" && (
            <div>
              <Label>Select Member</Label>
              <Select
                value={form.targetId}
                onValueChange={(v) => setForm((p) => ({ ...p, targetId: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="notification.member.select"
                >
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} ({m.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button
            type="submit"
            data-ocid="notification.send.submit_button"
            style={{ backgroundColor: "#166534" }}
          >
            Send Notification
          </Button>
        </form>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Sent Notifications ({notifications.length})
        </h3>
        <div className="space-y-2">
          {notifications.map((n, idx) => (
            <div
              key={n.id}
              data-ocid={`notifications.admin.item.${idx + 1}`}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{n.title}</div>
                  <div className="text-sm text-gray-500">{n.message}</div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {new Date(n.date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-xs text-green-700 mt-1">
                {n.targetType === "all"
                  ? "All members"
                  : `Member: ${n.targetId}`}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div
              className="text-center py-8 text-gray-400"
              data-ocid="notifications.admin.empty_state"
            >
              No notifications sent.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
