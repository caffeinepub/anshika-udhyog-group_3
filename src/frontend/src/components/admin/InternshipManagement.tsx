import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2, FileText, Forward, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Internship } from "../../types";

interface InternshipManagementProps {
  internships: Internship[];
  onUpdate: (id: string, updates: Partial<Internship>) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800",
};

export function InternshipManagement({
  internships,
  onUpdate,
}: InternshipManagementProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    title: string;
    description: string;
    notes: string;
  }>({ title: "", description: "", notes: "" });
  const uploadRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleApprove = (id: string, memberName: string) => {
    onUpdate(id, { status: "approved", notes: notes[id] });
    toast.success(`Internship approved for ${memberName}`);
  };

  const handleReject = (id: string, memberName: string) => {
    onUpdate(id, { status: "rejected", notes: notes[id] });
    toast.success(`Internship rejected for ${memberName}`);
  };

  const handleComplete = (id: string) => {
    const certId = `CERT-${Date.now()}`;
    onUpdate(id, {
      status: "completed",
      completionDate: new Date().toISOString().split("T")[0],
      certificateId: certId,
    });
    toast.success("Marked as completed and certificate issued!");
  };

  const handleEditOpen = (i: Internship) => {
    setEditingId(i.id);
    setEditForm({
      title: i.title,
      description: i.description,
      notes: i.notes ?? "",
    });
  };

  const handleEditSave = (id: string, memberName: string) => {
    onUpdate(id, {
      title: editForm.title,
      description: editForm.description,
      notes: editForm.notes,
    });
    setEditingId(null);
    toast.success(`Internship updated for ${memberName}`);
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
    onUpdate(id, { notes: `[DOC:${file.name}]${b64}` });
    toast.success(`Document uploaded: ${file.name}`);
  };

  const handleForward = (memberName: string) => {
    window.dispatchEvent(
      new CustomEvent("admin-navigate", { detail: "letter_generator" }),
    );
    toast.success(`Forwarded ${memberName}'s internship to Letter Generator`);
  };

  const handleLetter = (internship: Internship) => {
    const win = window.open("", "_blank", "width=794,height=1123");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Internship Certificate - ${internship.memberName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 50px 60px; color: #1a1a1a; }
            .header { text-align: center; border-bottom: 3px double #166534; padding-bottom: 16px; margin-bottom: 24px; }
            .org { font-size: 22px; font-weight: bold; color: #166534; letter-spacing: 1px; }
            .tagline { font-size: 12px; color: #555; margin-top: 4px; }
            .title { font-size: 18px; font-weight: bold; color: #166534; text-align: center; margin: 20px 0; letter-spacing: 2px; text-transform: uppercase; }
            .body { font-size: 13px; line-height: 2; text-align: justify; }
            .sign { margin-top: 50px; display: flex; justify-content: space-between; }
            .footer { border-top: 2px solid #166534; margin-top: 40px; padding-top: 10px; font-size: 10px; color: #777; text-align: center; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="org">ANSHIKA UDHYOG GROUP™</div>
            <div class="tagline">Self Employment Revolution Scheme</div>
          </div>
          <div class="title">🎓 Internship Completion Certificate</div>
          <div class="body">
            <p>This is to certify that <strong>${internship.memberName}</strong> (Member ID: ${internship.memberId}) has successfully completed the internship program titled <strong>&ldquo;${internship.title}&rdquo;</strong> at <strong>ANSHIKA UDHYOG GROUP™</strong>.</p>
            <p>Applied Date: <strong>${internship.appliedDate}</strong>&nbsp;&nbsp;&nbsp;Completion Date: <strong>${internship.completionDate ?? new Date().toISOString().split("T")[0]}</strong></p>
            <p>${internship.description ?? ""}</p>
            <p>During this internship, the candidate demonstrated dedication and professional conduct. This certificate is issued in recognition of their successful completion.</p>
            ${internship.certificateId ? `<p>Certificate ID: <strong>${internship.certificateId}</strong></p>` : ""}
          </div>
          <div class="sign">
            <div>
              <div style="border-bottom:1px solid #333;width:160px;margin-bottom:4px"></div>
              <div style="font-size:12px">Authorized Signatory</div>
              <div style="font-size:12px;color:#166534">ANSHIKA UDHYOG GROUP™</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:11px;color:#999">[Official Seal]</div>
            </div>
          </div>
          <div class="footer">Official Document | ANSHIKA UDHYOG GROUP™ | This certificate is issued in good faith.</div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">
        💼 Internship Management
      </h2>
      {internships.length === 0 ? (
        <div
          className="text-center py-12 bg-white rounded-xl border"
          data-ocid="internships.empty_state"
        >
          <p className="text-gray-400">No internship applications yet.</p>
        </div>
      ) : (
        internships.map((i, idx) => (
          <div
            key={i.id}
            data-ocid={`internships.item.${idx + 1}`}
            className="bg-white rounded-xl p-4 border border-gray-200 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-gray-900">{i.title}</div>
                <div className="text-sm text-gray-500">
                  {i.memberName} ({i.memberId}) · Applied: {i.appliedDate}
                </div>
                {i.description && (
                  <div className="text-sm text-gray-600 mt-1">
                    {i.description}
                  </div>
                )}
                {i.notes && !i.notes.startsWith("[DOC:") && (
                  <div className="text-xs text-blue-600 mt-1">
                    Notes: {i.notes}
                  </div>
                )}
              </div>
              <Badge className={statusColors[i.status]}>{i.status}</Badge>
            </div>

            {/* Inline Edit Form */}
            {editingId === i.id && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-2 border">
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, title: e.target.value }))
                    }
                    className="mt-1 text-sm"
                    data-ocid={`internships.edit_title.input.${idx + 1}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    rows={2}
                    className="mt-1 text-sm"
                    data-ocid={`internships.edit_description.textarea.${idx + 1}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Notes</Label>
                  <Textarea
                    value={editForm.notes}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    rows={2}
                    className="mt-1 text-sm"
                    data-ocid={`internships.edit_notes.textarea.${idx + 1}`}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 text-white"
                    onClick={() => handleEditSave(i.id, i.memberName)}
                    data-ocid={`internships.edit_save.button.${idx + 1}`}
                  >
                    <Check className="w-3 h-3 mr-1" /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                    data-ocid={`internships.edit_cancel.button.${idx + 1}`}
                  >
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              {i.status === "pending" && (
                <>
                  <Textarea
                    placeholder="Add notes (optional)"
                    value={notes[i.id] || ""}
                    onChange={(e) =>
                      setNotes((p) => ({ ...p, [i.id]: e.target.value }))
                    }
                    rows={2}
                    className="text-sm w-full"
                  />
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleApprove(i.id, i.memberName)}
                    data-ocid={`internships.approve.button.${idx + 1}`}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700"
                    onClick={() => handleReject(i.id, i.memberName)}
                    data-ocid={`internships.reject.button.${idx + 1}`}
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </>
              )}
              {i.status === "approved" && (
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => handleComplete(i.id)}
                  data-ocid={`internships.complete.button.${idx + 1}`}
                >
                  Mark Completed &amp; Issue Certificate
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-700"
                onClick={() => handleEditOpen(i)}
                data-ocid={`internships.edit.button.${idx + 1}`}
              >
                <Edit2 className="w-3 h-3 mr-1" /> Edit
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-orange-300 text-orange-700"
                onClick={() => uploadRefs.current[i.id]?.click()}
                data-ocid={`internships.upload.button.${idx + 1}`}
              >
                <Upload className="w-3 h-3 mr-1" /> Upload Doc
              </Button>
              <input
                ref={(el) => {
                  uploadRefs.current[i.id] = el;
                }}
                type="file"
                className="hidden"
                onChange={(e) => handleUpload(i.id, e)}
              />

              <Button
                size="sm"
                variant="outline"
                className="border-purple-300 text-purple-700"
                onClick={() => handleForward(i.memberName)}
                data-ocid={`internships.forward.button.${idx + 1}`}
              >
                <Forward className="w-3 h-3 mr-1" /> Forward
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-green-300 text-green-700"
                onClick={() => handleLetter(i)}
                data-ocid={`internships.letter.button.${idx + 1}`}
              >
                <FileText className="w-3 h-3 mr-1" /> Letter/Certificate
              </Button>
            </div>

            {i.certificateId && (
              <div className="text-xs text-green-700">
                ✅ Certificate ID: {i.certificateId}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
