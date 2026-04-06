import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle2, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Event } from "../../types";
import { ImageUploadField } from "./ImageUploadField";

interface EventManagementProps {
  events: Event[];
  onAdd: (data: Omit<Event, "id" | "createdAt" | "registrations">) => void;
  onUpdate: (id: string, updates: Partial<Event>) => void;
  onDelete: (id: string) => void;
}

export function EventManagement({
  events,
  onAdd,
  onUpdate,
  onDelete,
}: EventManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error("Title and date required");
      return;
    }
    if (editId) {
      onUpdate(editId, form);
      toast.success("Event updated!");
      setEditId(null);
    } else {
      onAdd(form);
      toast.success("Event created!");
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
    setShowForm(false);
    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
      imageUrl: "",
    });
  };

  const handleEdit = (ev: Event) => {
    setForm({
      title: ev.title,
      description: ev.description,
      date: ev.date,
      location: ev.location,
      imageUrl: ev.imageUrl ?? "",
    });
    setEditId(ev.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Event Management</h2>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
          }}
          data-ocid="events.add.button"
          style={{ backgroundColor: "#166534" }}
        >
          <Plus className="w-4 h-4 mr-1" /> Create Event
        </Button>
      </div>

      {savedMsg && (
        <div
          className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm"
          data-ocid="events.success_state"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600" />✓ Changes are live
          on the public website
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="event.title.input"
                  required
                />
              </div>
              <div>
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="event.date.input"
                  required
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="event.location.input"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                  data-ocid="event.description.textarea"
                />
              </div>
              <div className="md:col-span-2">
                <ImageUploadField
                  label="Event Image"
                  value={form.imageUrl}
                  onChange={(val) => setForm((p) => ({ ...p, imageUrl: val }))}
                  placeholder="https://..."
                  data-ocid="event.image.input"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                data-ocid="event.submit_button"
                style={{ backgroundColor: "#166534" }}
              >
                {editId ? "Update" : "Create"} Event
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
      <div className="space-y-3">
        {events.map((e, idx) => (
          <div
            key={e.id}
            data-ocid={`events.item.${idx + 1}`}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {e.imageUrl && (
              <img
                src={e.imageUrl}
                alt={e.title}
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{e.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(e.date).toLocaleDateString("en-IN")} ·{" "}
                    {e.location}
                  </div>
                  <div className="text-xs text-gray-400">{e.description}</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    {e.registrations.length} Registrations
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(e)}
                  data-ocid={`events.edit_button.${idx + 1}`}
                  className="border-blue-300 text-blue-700"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onDelete(e.id);
                    toast.success("Event deleted");
                  }}
                  data-ocid={`events.delete_button.${idx + 1}`}
                  className="border-red-300 text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div
            className="text-center py-12 bg-white rounded-xl border"
            data-ocid="events.empty_state"
          >
            <p className="text-gray-400">No events yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
