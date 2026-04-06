import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Designation } from "../../types";

interface DesignationManagementProps {
  designations: Designation[];
  onAdd: (data: Omit<Designation, "id">) => void;
  onDelete: (id: string) => void;
}

export function DesignationManagement({
  designations,
  onAdd,
  onDelete,
}: DesignationManagementProps) {
  const [form, setForm] = useState({ title: "", level: 5, description: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    onAdd(form);
    toast.success("Designation added!");
    setForm({ title: "", level: 5, description: "" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        Designation Management
      </h2>
      <div className="bg-white rounded-xl p-6 border border-green-100">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-green-700" /> Add Designation
        </h3>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <Label>Title *</Label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              className="mt-1"
              placeholder="e.g. President"
              data-ocid="designation.title.input"
              required
            />
          </div>
          <div>
            <Label>Level (1=Highest)</Label>
            <Input
              type="number"
              value={form.level}
              onChange={(e) =>
                setForm((p) => ({ ...p, level: Number(e.target.value) }))
              }
              className="mt-1"
              min={1}
              data-ocid="designation.level.input"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              className="mt-1"
              data-ocid="designation.description.input"
            />
          </div>
          <div className="md:col-span-3">
            <Button
              type="submit"
              data-ocid="designation.submit_button"
              style={{ backgroundColor: "#166534" }}
            >
              Add Designation
            </Button>
          </div>
        </form>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Level</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {designations
              .sort((a, b) => a.level - b.level)
              .map((d, idx) => (
                <tr
                  key={d.id}
                  data-ocid={`designations.row.${idx + 1}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">{d.title}</td>
                  <td className="px-4 py-3">{d.level}</td>
                  <td className="px-4 py-3 text-gray-500">{d.description}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700"
                      onClick={() => {
                        onDelete(d.id);
                        toast.success("Deleted");
                      }}
                      data-ocid={`designations.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
