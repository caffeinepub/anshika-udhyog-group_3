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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpCircle,
  Award,
  Camera,
  CheckCircle,
  Eye,
  Search,
  Trash2,
  Upload,
  UserCheck,
  UserX,
  X,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Designation, LocalMember, PromotionRecord } from "../../types";

interface MemberManagementProps {
  members: LocalMember[];
  designations: Designation[];
  onUpdate: (id: string, updates: Partial<LocalMember>) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800",
  blocked: "bg-red-100 text-red-800",
  rejected: "bg-gray-100 text-gray-800",
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function MemberManagement({
  members,
  designations,
  onUpdate,
  onDelete,
}: MemberManagementProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<LocalMember | null>(
    null,
  );
  const [mode, setMode] = useState<"view" | "edit" | "promote">("view");
  const [editForm, setEditForm] = useState<Partial<LocalMember>>({});
  const [promotionForm, setPromotionForm] = useState({
    toDesignation: "",
    remarks: "",
    date: new Date().toISOString().split("T")[0],
  });
  const photoInputRef = useRef<HTMLInputElement>(null);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchFilter = filter === "all" || m.status === filter;
    return matchSearch && matchFilter;
  });

  const openMember = (
    member: LocalMember,
    viewMode: "view" | "edit" | "promote" = "view",
  ) => {
    setSelectedMember(member);
    setEditForm({ ...member });
    setPromotionForm({
      toDesignation: member.designation,
      remarks: "",
      date: new Date().toISOString().split("T")[0],
    });
    setMode(viewMode);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setEditForm({});
  };

  const handleSaveEdit = () => {
    if (!selectedMember) return;
    onUpdate(selectedMember.id, editForm);
    toast.success("Member updated successfully");
    closeModal();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setEditForm((p) => ({ ...p, photoUrl: b64 }));
  };

  const handlePromotion = () => {
    if (!selectedMember || !promotionForm.toDesignation) {
      toast.error("Please select a designation for promotion");
      return;
    }
    const newRecord: PromotionRecord = {
      id: Date.now().toString(),
      fromDesignation: selectedMember.designation,
      toDesignation: promotionForm.toDesignation,
      date: promotionForm.date,
      remarks: promotionForm.remarks,
    };
    const history = [...(selectedMember.promotionHistory ?? []), newRecord];
    onUpdate(selectedMember.id, {
      designation: promotionForm.toDesignation,
      promotionHistory: history,
    });
    toast.success(
      `${selectedMember.name} promoted to ${promotionForm.toDesignation}`,
    );
    closeModal();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Member Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="members.search_input"
              className="pl-9 w-full sm:w-56"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32" data-ocid="members.filter.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-12 bg-white rounded-xl border"
          data-ocid="members.empty_state"
        >
          <p className="text-gray-400">No members found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="members.table">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Member
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Designation
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    KYC
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member, idx) => (
                  <tr
                    key={member.id}
                    data-ocid={`members.row.${idx + 1}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0 overflow-hidden border-2 border-green-200"
                          style={{ backgroundColor: "#dcfce7" }}
                        >
                          {member.photoUrl ? (
                            <img
                              src={member.photoUrl}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            member.name[0]
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {member.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{member.phone}</div>
                      <div className="text-xs text-gray-400">
                        {member.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-gray-700 text-xs">
                        {member.designation}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={statusColors[member.status]}>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          member.kycStatus === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {member.kycStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() => openMember(member, "view")}
                          data-ocid={`members.view.button.${idx + 1}`}
                          title="View Profile"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs border-blue-300 text-blue-700"
                          onClick={() => openMember(member, "edit")}
                          data-ocid={`members.edit.button.${idx + 1}`}
                          title="Edit Member"
                        >
                          ✏️
                        </Button>
                        {member.status !== "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs border-green-300 text-green-700"
                            onClick={() => {
                              onUpdate(member.id, { status: "active" });
                              toast.success(`${member.name} approved`);
                            }}
                            data-ocid={`members.approve.button.${idx + 1}`}
                            title="Approve"
                          >
                            <UserCheck className="w-3 h-3" />
                          </Button>
                        )}
                        {member.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs border-orange-300 text-orange-700"
                            onClick={() => {
                              onUpdate(member.id, { status: "rejected" });
                              toast.success(`${member.name} rejected`);
                            }}
                            data-ocid={`members.reject.button.${idx + 1}`}
                            title="Reject"
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        )}
                        {member.status !== "blocked" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs border-red-300 text-red-700"
                            onClick={() => {
                              onUpdate(member.id, { status: "blocked" });
                              toast.success(`${member.name} blocked`);
                            }}
                            data-ocid={`members.block.button.${idx + 1}`}
                            title="Block"
                          >
                            <UserX className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs border-purple-300 text-purple-700"
                          onClick={() => openMember(member, "promote")}
                          data-ocid={`members.promote.button.${idx + 1}`}
                          title="Promote"
                        >
                          <ArrowUpCircle className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs border-red-300 text-red-700"
                          onClick={() => {
                            if (window.confirm("Delete this member?")) {
                              onDelete(member.id);
                              toast.success("Member deleted");
                            }
                          }}
                          data-ocid={`members.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto"
          data-ocid="members.modal"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{
                backgroundColor: "#166534",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                  {(editForm.photoUrl ?? selectedMember.photoUrl) ? (
                    <img
                      src={editForm.photoUrl ?? selectedMember.photoUrl}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    selectedMember.name[0]
                  )}
                </div>
                <div>
                  <div className="text-white font-bold">
                    {selectedMember.name}
                  </div>
                  <div className="text-green-200 text-xs">
                    {selectedMember.id}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {mode !== "view" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-white/10 text-white border-white/30"
                    onClick={() => setMode("view")}
                  >
                    View
                  </Button>
                )}
                {mode !== "edit" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-white/10 text-white border-white/30"
                    onClick={() => setMode("edit")}
                  >
                    Edit
                  </Button>
                )}
                {mode !== "promote" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-white/10 text-white border-white/30"
                    onClick={() => setMode("promote")}
                  >
                    Promote
                  </Button>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white/80 hover:text-white ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* VIEW MODE */}
              {mode === "view" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full border-4 border-green-200 overflow-hidden bg-green-50 flex items-center justify-center">
                      {selectedMember.photoUrl ? (
                        <img
                          src={selectedMember.photoUrl}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-green-700">
                          {selectedMember.name[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {selectedMember.name}
                      </div>
                      <div className="text-green-700 font-mono text-sm">
                        {selectedMember.id}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge className={statusColors[selectedMember.status]}>
                          {selectedMember.status}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 capitalize">
                          {selectedMember.membershipType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Phone", selectedMember.phone],
                      ["Email", selectedMember.email],
                      ["Designation", selectedMember.designation],
                      ["KYC Status", selectedMember.kycStatus],
                      [
                        "Join Date",
                        new Date(selectedMember.joinDate).toLocaleDateString(
                          "en-IN",
                        ),
                      ],
                      ["Valid Upto", selectedMember.validUpto ?? "N/A"],
                      ["City", selectedMember.city],
                      ["State", selectedMember.state],
                      ["Pincode", selectedMember.pincode],
                      ["Aadhaar", selectedMember.aadhaar ?? "—"],
                      ["PAN", selectedMember.pan ?? "—"],
                      ["UPI ID", selectedMember.upiId ?? "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500">{label}</div>
                        <div className="font-semibold text-gray-800 break-all">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Address */}
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="text-xs text-gray-500 mb-1">Address</div>
                    <div className="text-gray-800">
                      {selectedMember.address}, {selectedMember.city},{" "}
                      {selectedMember.state} - {selectedMember.pincode}
                    </div>
                  </div>
                  {/* Promotion History */}
                  {(selectedMember.promotionHistory?.length ?? 0) > 0 && (
                    <div>
                      <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-500" /> Promotion
                        History
                      </div>
                      <div className="space-y-2">
                        {selectedMember.promotionHistory!.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-2 bg-purple-50 rounded-lg px-3 py-2 text-xs"
                          >
                            <span className="text-gray-500">{p.date}</span>
                            <span className="text-gray-500">
                              {p.fromDesignation}
                            </span>
                            <span>→</span>
                            <span className="font-bold text-purple-700">
                              {p.toDesignation}
                            </span>
                            {p.remarks && (
                              <span className="text-gray-400">
                                ({p.remarks})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {selectedMember.status !== "active" && (
                      <Button
                        size="sm"
                        className="gap-1 text-xs"
                        style={{ backgroundColor: "#166534" }}
                        onClick={() => {
                          onUpdate(selectedMember.id, { status: "active" });
                          toast.success("Member approved");
                          closeModal();
                        }}
                      >
                        <CheckCircle className="w-3 h-3" /> Approve
                      </Button>
                    )}
                    {selectedMember.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs border-orange-300 text-orange-700"
                        onClick={() => {
                          onUpdate(selectedMember.id, { status: "rejected" });
                          toast.success("Member rejected");
                          closeModal();
                        }}
                      >
                        <XCircle className="w-3 h-3" /> Reject
                      </Button>
                    )}
                    {selectedMember.status !== "blocked" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs border-red-300 text-red-700"
                        onClick={() => {
                          onUpdate(selectedMember.id, { status: "blocked" });
                          toast.success("Member blocked");
                          closeModal();
                        }}
                      >
                        <UserX className="w-3 h-3" /> Block
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs border-purple-300 text-purple-700"
                      onClick={() => setMode("promote")}
                    >
                      <ArrowUpCircle className="w-3 h-3" /> Promote
                    </Button>
                  </div>
                </div>
              )}

              {/* EDIT MODE */}
              {mode === "edit" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">
                    Edit Member Details
                  </h3>
                  {/* Photo Upload */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-green-200 overflow-hidden bg-green-50 flex items-center justify-center">
                      {editForm.photoUrl ? (
                        <img
                          src={editForm.photoUrl}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-6 h-6 text-green-400" />
                      )}
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs"
                        onClick={() => photoInputRef.current?.click()}
                        data-ocid="members.photo.upload"
                      >
                        <Upload className="w-3 h-3" /> Upload Photo
                      </Button>
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        JPG/PNG, max 2MB
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Full Name", key: "name" },
                      { label: "Phone", key: "phone" },
                      { label: "Email", key: "email" },
                      { label: "City", key: "city" },
                      { label: "State", key: "state" },
                      { label: "Pincode", key: "pincode" },
                      { label: "Aadhaar No.", key: "aadhaar" },
                      { label: "PAN No.", key: "pan" },
                      { label: "Bank Account", key: "bankAccount" },
                      { label: "IFSC Code", key: "ifscCode" },
                      { label: "UPI ID", key: "upiId" },
                      { label: "Valid Upto", key: "validUpto", type: "date" },
                    ].map(({ label, key, type }) => (
                      <div key={key}>
                        <Label className="text-xs">{label}</Label>
                        <Input
                          type={type ?? "text"}
                          className="mt-1 text-sm"
                          value={
                            (editForm as Record<string, string>)[key] ?? ""
                          }
                          onChange={(e) =>
                            setEditForm((p) => ({
                              ...p,
                              [key]: e.target.value,
                            }))
                          }
                          data-ocid={`members.edit.${key}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label className="text-xs">Address</Label>
                    <Textarea
                      className="mt-1 text-sm"
                      rows={2}
                      value={editForm.address ?? ""}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, address: e.target.value }))
                      }
                      data-ocid="members.edit.address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Membership Type</Label>
                      <Select
                        value={editForm.membershipType ?? "basic"}
                        onValueChange={(v) =>
                          setEditForm((p) => ({
                            ...p,
                            membershipType: v as LocalMember["membershipType"],
                          }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 text-sm"
                          data-ocid="members.edit.membership_type"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["basic", "silver", "gold", "platinum"].map((t) => (
                            <SelectItem
                              key={t}
                              value={t}
                              className="capitalize"
                            >
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Designation</Label>
                      <Select
                        value={editForm.designation ?? ""}
                        onValueChange={(v) =>
                          setEditForm((p) => ({ ...p, designation: v }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 text-sm"
                          data-ocid="members.edit.designation"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {designations.map((d) => (
                            <SelectItem key={d.id} value={d.title}>
                              {d.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Status</Label>
                      <Select
                        value={editForm.status ?? "pending"}
                        onValueChange={(v) =>
                          setEditForm((p) => ({
                            ...p,
                            status: v as LocalMember["status"],
                          }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 text-sm"
                          data-ocid="members.edit.status"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["pending", "active", "blocked", "rejected"].map(
                            (s) => (
                              <SelectItem
                                key={s}
                                value={s}
                                className="capitalize"
                              >
                                {s}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">KYC Status</Label>
                      <Select
                        value={editForm.kycStatus ?? "pending"}
                        onValueChange={(v) =>
                          setEditForm((p) => ({
                            ...p,
                            kycStatus: v as LocalMember["kycStatus"],
                          }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 text-sm"
                          data-ocid="members.edit.kyc_status"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["pending", "submitted", "approved", "rejected"].map(
                            (s) => (
                              <SelectItem
                                key={s}
                                value={s}
                                className="capitalize"
                              >
                                {s}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      className="flex-1 text-sm"
                      style={{ backgroundColor: "#166534" }}
                      onClick={handleSaveEdit}
                      data-ocid="members.edit.save"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-sm"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* PROMOTE MODE */}
              {mode === "promote" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ArrowUpCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-800">Promote Member</h3>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 text-sm">
                    <div className="text-gray-500 text-xs mb-1">
                      Current Designation
                    </div>
                    <div className="font-bold text-purple-700 text-base">
                      {selectedMember.designation}
                    </div>
                  </div>

                  <div>
                    <Label>Promote To</Label>
                    <Select
                      value={promotionForm.toDesignation}
                      onValueChange={(v) =>
                        setPromotionForm((p) => ({ ...p, toDesignation: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="members.promote.designation"
                      >
                        <SelectValue placeholder="Select new designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map((d) => (
                          <SelectItem key={d.id} value={d.title}>
                            {d.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Promotion Date</Label>
                    <Input
                      type="date"
                      className="mt-1"
                      value={promotionForm.date}
                      onChange={(e) =>
                        setPromotionForm((p) => ({
                          ...p,
                          date: e.target.value,
                        }))
                      }
                      data-ocid="members.promote.date"
                    />
                  </div>

                  <div>
                    <Label>Remarks (Optional)</Label>
                    <Textarea
                      className="mt-1"
                      rows={2}
                      placeholder="Reason for promotion, achievements, etc."
                      value={promotionForm.remarks}
                      onChange={(e) =>
                        setPromotionForm((p) => ({
                          ...p,
                          remarks: e.target.value,
                        }))
                      }
                      data-ocid="members.promote.remarks"
                    />
                  </div>

                  {/* Previous history */}
                  {(selectedMember.promotionHistory?.length ?? 0) > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">
                        Previous Promotions
                      </div>
                      <div className="space-y-1 max-h-28 overflow-y-auto">
                        {selectedMember.promotionHistory!.map((ph) => (
                          <div
                            key={ph.id}
                            className="flex items-center gap-2 text-xs bg-gray-50 rounded px-2 py-1"
                          >
                            <span className="text-gray-400">{ph.date}</span>
                            <span>
                              {ph.fromDesignation} →{" "}
                              <strong>{ph.toDesignation}</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      className="flex-1 text-sm bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={handlePromotion}
                      data-ocid="members.promote.confirm"
                    >
                      <ArrowUpCircle className="w-4 h-4 mr-1" /> Confirm
                      Promotion
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-sm"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
