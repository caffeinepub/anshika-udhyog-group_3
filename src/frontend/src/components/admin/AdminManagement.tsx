import { Badge } from "@/components/ui/badge";
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
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AdminUser } from "../../types";

interface AdminManagementProps {
  admins: AdminUser[];
  onAdd: (data: Omit<AdminUser, "id" | "createdAt">) => void;
  onDelete: (id: string) => void;
}

export function AdminManagement({
  admins,
  onAdd,
  onDelete,
}: AdminManagementProps) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    role: "admin" as AdminUser["role"],
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.name) {
      toast.error("All fields required");
      return;
    }
    onAdd(form);
    toast.success("Admin created!");
    setForm({ username: "", password: "", name: "", role: "admin" });
  };

  const roleColors: Record<string, string> = {
    super_admin: "bg-red-100 text-red-800",
    admin: "bg-blue-100 text-blue-800",
    moderator: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Admin User Management</h2>
      <div className="bg-white rounded-xl p-6 border border-green-100">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-green-700" /> Create Admin Account
        </h3>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <Label>Full Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="mt-1"
              data-ocid="admin_mgmt.name.input"
              required
            />
          </div>
          <div>
            <Label>Username *</Label>
            <Input
              value={form.username}
              onChange={(e) =>
                setForm((p) => ({ ...p, username: e.target.value }))
              }
              className="mt-1"
              data-ocid="admin_mgmt.username.input"
              required
            />
          </div>
          <div>
            <Label>Password *</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              className="mt-1"
              data-ocid="admin_mgmt.password.input"
              required
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(v: AdminUser["role"]) =>
                setForm((p) => ({ ...p, role: v }))
              }
            >
              <SelectTrigger
                className="mt-1"
                data-ocid="admin_mgmt.role.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button
              type="submit"
              data-ocid="admin_mgmt.submit_button"
              style={{ backgroundColor: "#166534" }}
            >
              Create Admin
            </Button>
          </div>
        </form>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">System Admin</h3>
        <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between mb-2">
          <div>
            <div className="font-medium">Administrator (admin)</div>
            <div className="text-sm text-gray-500">
              Default Super Admin Account
            </div>
          </div>
          <Badge className="bg-red-100 text-red-800">Super Admin</Badge>
        </div>
        {admins.map((a, idx) => (
          <div
            key={a.id}
            data-ocid={`admins.item.${idx + 1}`}
            className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between mb-2"
          >
            <div>
              <div className="font-medium">
                {a.name} ({a.username})
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(a.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={roleColors[a.role]}>
                {a.role.replace("_", " ")}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700"
                onClick={() => {
                  onDelete(a.id);
                  toast.success("Admin deleted");
                }}
                data-ocid={`admins.delete_button.${idx + 1}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        {admins.length === 0 && (
          <div className="text-sm text-gray-400" data-ocid="admins.empty_state">
            No additional admins created.
          </div>
        )}
      </div>
    </div>
  );
}
