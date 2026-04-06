import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Activity } from "../../types";
import { ImageUploadField } from "./ImageUploadField";

interface ActivityManagementProps {
  activities: Activity[];
  onAdd: (data: Omit<Activity, "id" | "createdAt">) => void;
  onUpdate: (id: string, updates: Partial<Activity>) => void;
  onDelete: (id: string) => void;
}

export function ActivityManagement({
  activities,
  onAdd,
  onUpdate,
  onDelete,
}: ActivityManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    if (editId) {
      onUpdate(editId, form);
      toast.success("Activity updated!");
      setEditId(null);
    } else {
      onAdd(form);
      toast.success("Activity added!");
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
    setShowForm(false);
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (a: Activity) => {
    setForm({
      title: a.title,
      description: a.description,
      imageUrl: a.imageUrl,
      date: a.date,
    });
    setEditId(a.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Activity Posts</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
          }}
          data-ocid="activities.add.button"
          style={{ backgroundColor: "#166534" }}
        >
          <Plus className="w-4 h-4 mr-1" /> Add Activity
        </Button>
      </div>

      {savedMsg && (
        <div
          className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm"
          data-ocid="activities.success_state"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600" />✓ Changes are live
          on the public website
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1"
                data-ocid="activity.title.input"
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="mt-1"
                data-ocid="activity.description.textarea"
              />
            </div>
            <ImageUploadField
              label="Activity Image"
              value={form.imageUrl}
              onChange={(val) => setForm((p) => ({ ...p, imageUrl: val }))}
              placeholder="https://..."
              data-ocid="activity.image.input"
            />
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
                className="mt-1"
                data-ocid="activity.date.input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                data-ocid="activity.submit_button"
                style={{ backgroundColor: "#166534" }}
              >
                {editId ? "Update" : "Add"} Activity
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((a, idx) => (
          <div
            key={a.id}
            data-ocid={`activities.item.${idx + 1}`}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {a.imageUrl && (
              <img
                src={a.imageUrl}
                alt={a.title}
                className="w-full h-36 object-cover"
              />
            )}
            <div className="p-4">
              <div className="font-semibold text-gray-900">{a.title}</div>
              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                {a.description}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(a.date).toLocaleDateString("en-IN")}
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(a)}
                  data-ocid={`activities.edit_button.${idx + 1}`}
                  className="border-blue-300 text-blue-700"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onDelete(a.id);
                    toast.success("Deleted");
                  }}
                  data-ocid={`activities.delete_button.${idx + 1}`}
                  className="border-red-300 text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities.length === 0 && (
        <div
          className="text-center py-12 bg-white rounded-xl border"
          data-ocid="activities.empty_state"
        >
          <p className="text-gray-400">No activities yet.</p>
        </div>
      )}
    </div>
  );
}
