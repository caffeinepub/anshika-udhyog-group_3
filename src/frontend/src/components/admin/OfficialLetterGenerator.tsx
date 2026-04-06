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
import { Eye, Printer, RefreshCw, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import type { SiteSettings } from "../../types";

interface OfficialLetterGeneratorProps {
  settings: SiteSettings;
  onUpdateSettings?: (updates: Partial<SiteSettings>) => void;
}

const LETTER_TYPES = [
  { value: "appointment", label: "Appointment Letter" },
  { value: "experience", label: "Experience Letter" },
  { value: "internship_completion", label: "Internship Completion Letter" },
  { value: "membership_certificate", label: "Membership Certificate Letter" },
  { value: "recommendation", label: "Recommendation Letter" },
  { value: "authorization", label: "Authorization Letter" },
  { value: "notice", label: "Notice Letter" },
  { value: "circular", label: "Circular Letter" },
  { value: "offer", label: "Offer Letter" },
  { value: "general", label: "General Purpose Letter" },
  { value: "termination", label: "Termination Letter" },
  { value: "promotion", label: "Promotion Letter" },
];

const LETTER_TEMPLATES: Record<string, { subject: string; body: string }> = {
  appointment: {
    subject: "Appointment Letter - [Designation]",
    body: "We are pleased to inform you that you have been selected for the position of [Designation] at ANSHIKA UDHYOG GROUP™ with effect from [Date].\n\nYour appointment is subject to the terms and conditions as per the organization's policy. You are requested to report to the office on the mentioned date with all required documents.\n\nWe welcome you to our organization and look forward to your valuable contribution.",
  },
  experience: {
    subject: "Experience Certificate",
    body: "This is to certify that [Name] has worked with ANSHIKA UDHYOG GROUP™ from [Start Date] to [End Date] in the capacity of [Designation].\n\nDuring this tenure, [Name] has shown dedication, hard work, and a professional attitude. We wish them all the best in their future endeavors.\n\nThis certificate is issued on the request of the concerned person.",
  },
  internship_completion: {
    subject: "Internship Completion Certificate",
    body: "This is to certify that [Name] has successfully completed their internship at ANSHIKA UDHYOG GROUP™ from [Start Date] to [End Date].\n\nDuring this period, they demonstrated exceptional skills, commitment, and professional conduct. They have successfully fulfilled all internship requirements.\n\nWe wish them a bright and successful future.",
  },
  membership_certificate: {
    subject: "Membership Certificate - ANSHIKA UDHYOG GROUP™",
    body: "This is to certify that [Name] is a registered member of ANSHIKA UDHYOG GROUP™ bearing Member ID [Member ID].\n\nThis membership entitles the holder to all benefits and privileges as per the organization's membership policy. The membership is valid as per the terms and conditions of the organization.\n\nWe welcome you as a valued member of our family.",
  },
  recommendation: {
    subject: "Letter of Recommendation",
    body: "It gives me immense pleasure to recommend [Name] who has been associated with ANSHIKA UDHYOG GROUP™ as [Designation].\n\nDuring their association with us, [Name] has demonstrated exceptional skills, dedication, and professionalism. They have consistently delivered outstanding results and have been an asset to our team.\n\nI strongly recommend [Name] for any opportunity they pursue and am confident they will excel.",
  },
  authorization: {
    subject: "Authorization Letter",
    body: "This is to authorize [Name], [Designation] of ANSHIKA UDHYOG GROUP™ to act on behalf of the organization for the purpose of [Purpose/Task].\n\nThis authorization is valid from [Start Date] to [End Date]. [Name] is authorized to sign documents, collect payments, and represent the organization in all matters related to the specified purpose.\n\nAny assistance provided to the bearer will be greatly appreciated.",
  },
  notice: {
    subject: "Official Notice - [Subject]",
    body: "This is to inform all concerned parties that [Notice Content].\n\nAll members/employees/stakeholders are requested to take note of this notice and comply accordingly. Any queries regarding this notice may be directed to the undersigned.\n\nThis notice is issued with the authority of the organization's management.",
  },
  circular: {
    subject: "Circular No. [Number] - [Subject]",
    body: "This circular is issued to all members/employees/departments of ANSHIKA UDHYOG GROUP™ for their information and necessary action.\n\n[Circular Content]\n\nAll concerned are requested to acknowledge receipt of this circular and ensure strict compliance. This circular is effective from [Date].",
  },
  offer: {
    subject: "Offer Letter - [Designation]",
    body: "We are delighted to offer you the position of [Designation] at ANSHIKA UDHYOG GROUP™.\n\nOffer Details:\n- Position: [Designation]\n- Joining Date: [Date]\n- Stipend/Salary: [Amount]\n- Location: [Location]\n\nKindly confirm your acceptance of this offer by signing and returning a copy of this letter. We look forward to welcoming you to our team.",
  },
  general: {
    subject: "[Subject]",
    body: "Dear [Name],\n\nWe hope this letter finds you in the best of health and spirits.\n\n[Write your letter content here]\n\nThank you for your cooperation and support. Please feel free to contact us for any further information.",
  },
  termination: {
    subject: "Termination of Association",
    body: "This is to inform you that your association with ANSHIKA UDHYOG GROUP™ as [Designation] has been terminated with effect from [Date].\n\nYou are requested to complete all pending handover formalities before [Handover Date]. Any organizational assets in your possession must be returned immediately.\n\nThis decision has been taken after due consideration and is final.",
  },
  promotion: {
    subject: "Promotion Letter - [New Designation]",
    body: "We are pleased to inform you that you have been promoted to the position of [New Designation] at ANSHIKA UDHYOG GROUP™ with effect from [Date].\n\nThis promotion is in recognition of your outstanding performance, dedication, and commitment to the organization. We are confident that you will continue to excel in your new role.\n\nCongratulations on this achievement. We look forward to your continued contribution to our organization.",
  },
};

// 12 header design styles
const HEADER_DESIGNS = [
  {
    id: 1,
    label: "Design 1 - Classic Green",
    primaryColor: "#166534",
    accentColor: "#16a34a",
    style: "classic",
  },
  {
    id: 2,
    label: "Design 2 - Professional Blue",
    primaryColor: "#1e40af",
    accentColor: "#3b82f6",
    style: "professional",
  },
  {
    id: 3,
    label: "Design 3 - Royal Purple",
    primaryColor: "#6b21a8",
    accentColor: "#9333ea",
    style: "royal",
  },
  {
    id: 4,
    label: "Design 4 - Deep Red",
    primaryColor: "#991b1b",
    accentColor: "#dc2626",
    style: "deep",
  },
  {
    id: 5,
    label: "Design 5 - Teal Modern",
    primaryColor: "#0f766e",
    accentColor: "#14b8a6",
    style: "teal",
  },
  {
    id: 6,
    label: "Design 6 - Dark Navy",
    primaryColor: "#1e293b",
    accentColor: "#475569",
    style: "navy",
  },
  {
    id: 7,
    label: "Design 7 - Gold Premium",
    primaryColor: "#92400e",
    accentColor: "#d97706",
    style: "gold",
  },
  {
    id: 8,
    label: "Design 8 - Dual-Band Green",
    primaryColor: "#166534",
    accentColor: "#86efac",
    style: "dual",
  },
  {
    id: 9,
    label: "Design 9 - Bordered Classic",
    primaryColor: "#166534",
    accentColor: "#16a34a",
    style: "bordered",
  },
  {
    id: 10,
    label: "Design 10 - Centered Logo",
    primaryColor: "#166534",
    accentColor: "#16a34a",
    style: "centered",
  },
  {
    id: 11,
    label: "Design 11 - Gradient Banner",
    primaryColor: "#166534",
    accentColor: "#16a34a",
    style: "gradient",
  },
  {
    id: 12,
    label: "Design 12 - Minimal Lines",
    primaryColor: "#166534",
    accentColor: "#16a34a",
    style: "minimal",
  },
];

function generateRefNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AUC/${year}/${month}/${rand}`;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function OfficialLetterGenerator({
  settings,
  onUpdateSettings,
}: OfficialLetterGeneratorProps) {
  const [letterType, setLetterType] = useState("general");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(
    settings.idCardDesignIndex ?? 0,
  );
  const [localSeal, setLocalSeal] = useState<string>(settings.sealUrl ?? "");
  const [localSignature, setLocalSignature] = useState<string>(
    settings.signatureUrl ?? "",
  );
  const sealInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    toName: "",
    toDesignation: "",
    toAddress: "",
    date: new Date().toISOString().split("T")[0],
    refNumber: generateRefNumber(),
    subject: LETTER_TEMPLATES.general.subject,
    body: LETTER_TEMPLATES.general.body,
    signatoryName: settings.siteName,
    signatoryDesignation: "Authorized Signatory",
    footerNote: "",
  });

  const handleLetterTypeChange = (type: string) => {
    setLetterType(type);
    const template = LETTER_TEMPLATES[type] ?? LETTER_TEMPLATES.general;
    setForm((p) => ({ ...p, subject: template.subject, body: template.body }));
  };

  const handleSealUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setLocalSeal(b64);
    onUpdateSettings?.({ sealUrl: b64 });
  };

  const handleSignatureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setLocalSignature(b64);
    onUpdateSettings?.({ signatureUrl: b64 });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const letterTypeName =
    LETTER_TYPES.find((t) => t.value === letterType)?.label ?? "Letter";
  const design = HEADER_DESIGNS[selectedDesign] ?? HEADER_DESIGNS[0];

  return (
    <div className="space-y-6">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-overlay { position: fixed !important; inset: 0 !important; z-index: 9999 !important; background: white !important; padding: 0 !important; overflow: visible !important; }
          body > * { visibility: hidden; }
          .print-overlay, .print-overlay * { visibility: visible !important; }
        }
      `}</style>

      <div className="no-print">
        <h2 className="text-xl font-bold text-gray-900">
          Official Letter Generator
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Professional A4 letters with letterhead, seal &amp; signature
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 no-print">
        {/* Left: Form */}
        <div className="space-y-4">
          {/* Seal & Signature Upload */}
          <div className="bg-white rounded-xl p-5 border border-green-100 space-y-4">
            <h3 className="font-semibold text-gray-800">
              🔏 Seal &amp; Signature
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Seal */}
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">
                  Official Seal / Stamp
                </Label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-green-200 rounded-lg p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => sealInputRef.current?.click()}
                >
                  {localSeal ? (
                    <img
                      src={localSeal}
                      alt="Seal"
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-green-400" />
                      <span className="text-xs text-gray-400 text-center">
                        Upload Seal
                      </span>
                    </>
                  )}
                </button>
                <input
                  ref={sealInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSealUpload}
                  data-ocid="letter.seal.upload"
                />
                {localSeal && (
                  <button
                    type="button"
                    className="text-xs text-red-500 mt-1"
                    onClick={() => {
                      setLocalSeal("");
                      onUpdateSettings?.({ sealUrl: "" });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
              {/* Signature */}
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">
                  Signature Image
                </Label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-green-200 rounded-lg p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => sigInputRef.current?.click()}
                >
                  {localSignature ? (
                    <img
                      src={localSignature}
                      alt="Signature"
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-green-400" />
                      <span className="text-xs text-gray-400 text-center">
                        Upload Signature
                      </span>
                    </>
                  )}
                </button>
                <input
                  ref={sigInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSignatureUpload}
                  data-ocid="letter.signature.upload"
                />
                {localSignature && (
                  <button
                    type="button"
                    className="text-xs text-red-500 mt-1"
                    onClick={() => {
                      setLocalSignature("");
                      onUpdateSettings?.({ signatureUrl: "" });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Header Design Select */}
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-3">
              🎨 Letterhead Design (10-12 Options)
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {HEADER_DESIGNS.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedDesign(i);
                    onUpdateSettings?.({ idCardDesignIndex: i });
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs border-2 transition-all ${
                    selectedDesign === i
                      ? "border-green-600 bg-green-50 font-bold"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  data-ocid={`letter.design.${d.id}`}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-1 align-middle"
                    style={{ backgroundColor: d.primaryColor }}
                  />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Letter Type */}
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <h3 className="font-semibold mb-3">Letter Type</h3>
            <Select value={letterType} onValueChange={handleLetterTypeChange}>
              <SelectTrigger data-ocid="letter.type.select">
                <SelectValue placeholder="Select letter type" />
              </SelectTrigger>
              <SelectContent>
                {LETTER_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient */}
          <div className="bg-white rounded-xl p-5 border border-green-100 space-y-4">
            <h3 className="font-semibold">Recipient Details</h3>
            <div>
              <Label>To (Name) *</Label>
              <Input
                value={form.toName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, toName: e.target.value }))
                }
                className="mt-1"
                placeholder="Full Name"
                data-ocid="letter.to_name.input"
              />
            </div>
            <div>
              <Label>Designation</Label>
              <Input
                value={form.toDesignation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, toDesignation: e.target.value }))
                }
                className="mt-1"
                placeholder="e.g. Member, Secretary"
                data-ocid="letter.to_designation.input"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Textarea
                value={form.toAddress}
                onChange={(e) =>
                  setForm((p) => ({ ...p, toAddress: e.target.value }))
                }
                className="mt-1"
                rows={2}
                placeholder="Full address"
                data-ocid="letter.to_address.textarea"
              />
            </div>
          </div>

          {/* Letter Details */}
          <div className="bg-white rounded-xl p-5 border border-green-100 space-y-4">
            <h3 className="font-semibold">Letter Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="letter.date.input"
                />
              </div>
              <div>
                <Label>Reference Number</Label>
                <div className="flex gap-1 mt-1">
                  <Input
                    value={form.refNumber}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, refNumber: e.target.value }))
                    }
                    data-ocid="letter.ref.input"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        refNumber: generateRefNumber(),
                      }))
                    }
                    title="Generate new ref"
                    className="shrink-0"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                className="mt-1"
                data-ocid="letter.subject.input"
              />
            </div>
            <div>
              <Label>Body / Content</Label>
              <Textarea
                value={form.body}
                onChange={(e) =>
                  setForm((p) => ({ ...p, body: e.target.value }))
                }
                className="mt-1"
                rows={6}
                data-ocid="letter.body.textarea"
              />
            </div>
          </div>

          {/* Signatory */}
          <div className="bg-white rounded-xl p-5 border border-green-100 space-y-4">
            <h3 className="font-semibold">Signatory Details</h3>
            <div>
              <Label>Signatory Name</Label>
              <Input
                value={form.signatoryName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, signatoryName: e.target.value }))
                }
                className="mt-1"
                data-ocid="letter.signatory_name.input"
              />
            </div>
            <div>
              <Label>Signatory Designation</Label>
              <Input
                value={form.signatoryDesignation}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    signatoryDesignation: e.target.value,
                  }))
                }
                className="mt-1"
                data-ocid="letter.signatory_designation.input"
              />
            </div>
            <div>
              <Label>Footer Note (Optional)</Label>
              <Input
                value={form.footerNote}
                onChange={(e) =>
                  setForm((p) => ({ ...p, footerNote: e.target.value }))
                }
                className="mt-1"
                placeholder="e.g. This is a computer-generated letter"
                data-ocid="letter.footer_note.input"
              />
            </div>
          </div>

          <Button
            onClick={() => setShowPreview(true)}
            data-ocid="letter.generate_button"
            className="w-full gap-2"
            style={{ backgroundColor: design.primaryColor }}
          >
            <Eye className="w-4 h-4" /> Generate Letter Preview
          </Button>
        </div>

        {/* Right: Mini preview */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl border border-green-100 p-6 h-full min-h-[500px]">
            <h3 className="font-semibold mb-4 text-gray-600 text-sm uppercase tracking-wide">
              Quick Preview
            </h3>
            <div
              className="border rounded-lg overflow-hidden"
              style={{
                transform: "scale(0.7)",
                transformOrigin: "top left",
                width: "143%",
              }}
            >
              <LetterDocument
                form={form}
                settings={settings}
                letterTypeName={letterTypeName}
                formatDate={formatDate}
                design={design}
                sealUrl={localSeal}
                signatureUrl={localSignature}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {showPreview && (
        <div
          className="print-overlay fixed inset-0 z-50 bg-gray-800/80 flex items-start justify-center p-4 overflow-y-auto"
          data-ocid="letter.modal"
        >
          <div className="relative w-full max-w-3xl">
            <div className="no-print flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">
                {letterTypeName} - Preview
              </h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => window.print()}
                  data-ocid="letter.print_button"
                  className="gap-2"
                  style={{ backgroundColor: design.primaryColor }}
                >
                  <Printer className="w-4 h-4" /> Print / Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                  data-ocid="letter.close_button"
                  className="bg-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <LetterDocument
              form={form}
              settings={settings}
              letterTypeName={letterTypeName}
              formatDate={formatDate}
              design={design}
              sealUrl={localSeal}
              signatureUrl={localSignature}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface LetterDocumentProps {
  form: {
    toName: string;
    toDesignation: string;
    toAddress: string;
    date: string;
    refNumber: string;
    subject: string;
    body: string;
    signatoryName: string;
    signatoryDesignation: string;
    footerNote: string;
  };
  settings: SiteSettings;
  letterTypeName: string;
  formatDate: (d: string) => string;
  design: (typeof HEADER_DESIGNS)[0];
  sealUrl?: string;
  signatureUrl?: string;
}

function LetterDocument({
  form,
  settings,
  letterTypeName,
  formatDate,
  design,
  sealUrl,
  signatureUrl,
}: LetterDocumentProps) {
  const primary = design.primaryColor;
  const accent = design.accentColor;

  const renderHeader = () => {
    switch (design.style) {
      case "professional":
      case "royal":
      case "deep":
      case "teal":
      case "navy":
        return (
          <div
            style={{
              borderBottom: `3px solid ${primary}`,
              borderTop: `8px solid ${primary}`,
              paddingBottom: "12px",
              paddingTop: "12px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              backgroundColor: "#f8fafc",
            }}
          >
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo"
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: "16pt", fontWeight: "bold", color: primary }}
              >
                {settings.siteName}
              </div>
              <div style={{ fontSize: "9pt", color: "#555" }}>
                {settings.tagline}
              </div>
              <div style={{ fontSize: "8pt", color: "#777", marginTop: "3px" }}>
                {settings.address} | {settings.contactPhone} |{" "}
                {settings.contactEmail}
              </div>
            </div>
          </div>
        );
      case "gold":
        return (
          <div
            style={{
              border: `3px double ${primary}`,
              padding: "12px",
              marginBottom: "16px",
              textAlign: "center",
              backgroundColor: "#fffbeb",
            }}
          >
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo"
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "contain",
                  margin: "0 auto 8px",
                }}
              />
            )}
            <div
              style={{
                fontSize: "18pt",
                fontWeight: "bold",
                color: primary,
                letterSpacing: "1px",
              }}
            >
              {settings.siteName}
            </div>
            <div
              style={{ fontSize: "9pt", color: "#92400e", marginTop: "2px" }}
            >
              {settings.tagline}
            </div>
            <div
              style={{
                height: "2px",
                background: `linear-gradient(to right, transparent, ${primary}, transparent)`,
                marginTop: "8px",
              }}
            />
            <div style={{ fontSize: "8pt", color: "#777", marginTop: "4px" }}>
              {settings.address} | {settings.contactPhone}
            </div>
          </div>
        );
      case "dual":
        return (
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                backgroundColor: primary,
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  style={{
                    width: "44px",
                    height: "44px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              )}
              <div style={{ color: "white" }}>
                <div style={{ fontSize: "15pt", fontWeight: "bold" }}>
                  {settings.siteName}
                </div>
                <div style={{ fontSize: "9pt", opacity: 0.85 }}>
                  {settings.tagline}
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: accent, padding: "4px 16px" }}>
              <div style={{ fontSize: "8pt", color: "#166534" }}>
                {settings.address} | {settings.contactPhone} |{" "}
                {settings.contactEmail}
              </div>
            </div>
          </div>
        );
      case "bordered":
        return (
          <div
            style={{
              border: `2px solid ${primary}`,
              borderRadius: "4px",
              padding: "12px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo"
                style={{ width: "64px", height: "64px", objectFit: "contain" }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: "17pt", fontWeight: "bold", color: primary }}
              >
                {settings.siteName}
              </div>
              <div style={{ fontSize: "9pt", color: "#555" }}>
                {settings.tagline}
              </div>
              <div style={{ fontSize: "8pt", color: "#777", marginTop: "3px" }}>
                {settings.address}
              </div>
              <div style={{ fontSize: "8pt", color: "#777" }}>
                {settings.contactPhone} | {settings.contactEmail}
              </div>
            </div>
          </div>
        );
      case "centered":
        return (
          <div
            style={{
              textAlign: "center",
              borderBottom: `3px solid ${primary}`,
              paddingBottom: "12px",
              marginBottom: "16px",
            }}
          >
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo"
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  margin: "0 auto 8px",
                }}
              />
            )}
            <div
              style={{ fontSize: "20pt", fontWeight: "bold", color: primary }}
            >
              {settings.siteName}
            </div>
            <div style={{ fontSize: "9pt", color: "#555" }}>
              {settings.tagline}
            </div>
            <div style={{ fontSize: "8pt", color: "#777", marginTop: "4px" }}>
              {settings.address} | {settings.contactPhone} |{" "}
              {settings.contactEmail}
              {settings.registrationNo
                ? ` | Reg: ${settings.registrationNo}`
                : ""}
            </div>
          </div>
        );
      case "gradient":
        return (
          <div
            style={{
              background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
              padding: "14px 16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              borderRadius: "4px",
            }}
          >
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo"
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "contain",
                  background: "white",
                  borderRadius: "50%",
                  padding: "3px",
                }}
              />
            )}
            <div>
              <div
                style={{ color: "white", fontSize: "17pt", fontWeight: "bold" }}
              >
                {settings.siteName}
              </div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "9pt" }}>
                {settings.tagline}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "8pt",
                  marginTop: "3px",
                }}
              >
                {settings.address} | {settings.contactPhone}
              </div>
            </div>
          </div>
        );
      case "minimal":
        return (
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                paddingBottom: "8px",
              }}
            >
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  style={{
                    width: "52px",
                    height: "52px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontSize: "17pt",
                    fontWeight: "bold",
                    color: primary,
                  }}
                >
                  {settings.siteName}
                </div>
                <div style={{ fontSize: "9pt", color: "#555" }}>
                  {settings.tagline}
                </div>
              </div>
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: primary,
                marginBottom: "2px",
              }}
            />
            <div
              style={{
                height: "3px",
                backgroundColor: accent,
                marginBottom: "6px",
              }}
            />
            <div style={{ fontSize: "8pt", color: "#777", textAlign: "right" }}>
              {settings.address} | {settings.contactPhone} |{" "}
              {settings.contactEmail}
            </div>
          </div>
        );
      default: // classic
        return (
          <div
            style={{
              borderBottom: `3px solid ${primary}`,
              paddingBottom: "12px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: primary,
                  letterSpacing: "0.5px",
                }}
              >
                {settings.siteName}
              </div>
              <div
                style={{ fontSize: "10pt", color: "#555", marginTop: "2px" }}
              >
                {settings.tagline}
              </div>
              <div style={{ fontSize: "9pt", color: "#777", marginTop: "4px" }}>
                {settings.address}
              </div>
              <div style={{ fontSize: "9pt", color: "#777", marginTop: "2px" }}>
                {settings.contactPhone && `Tel: ${settings.contactPhone}`}
                {settings.contactPhone && settings.contactEmail && " | "}
                {settings.contactEmail && `Email: ${settings.contactEmail}`}
                {settings.registrationNo &&
                  ` | Reg. No: ${settings.registrationNo}`}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="bg-white shadow-2xl"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "16mm 18mm",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "12pt",
        lineHeight: "1.6",
        color: "#1a1a1a",
      }}
    >
      {/* Letterhead */}
      {renderHeader()}

      {/* Letter type badge */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
          fontSize: "10pt",
          fontWeight: "bold",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: primary,
        }}
      >
        {letterTypeName}
      </div>

      {/* Ref and Date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          fontSize: "10pt",
          color: "#444",
        }}
      >
        <div>
          <strong>Ref:</strong> {form.refNumber}
        </div>
        <div>
          <strong>Issue Date:</strong> {formatDate(form.date)}
        </div>
      </div>

      {/* To Address */}
      <div style={{ marginBottom: "16px", fontSize: "11pt" }}>
        <div style={{ fontWeight: "bold" }}>To,</div>
        {form.toName && <div>{form.toName}</div>}
        {form.toDesignation && (
          <div style={{ color: "#555" }}>{form.toDesignation}</div>
        )}
        {form.toAddress && (
          <div style={{ color: "#555", whiteSpace: "pre-line" }}>
            {form.toAddress}
          </div>
        )}
      </div>

      {/* Subject */}
      <div style={{ marginBottom: "16px", fontSize: "11pt" }}>
        <strong>Sub:</strong> {form.subject}
      </div>

      {/* Salutation */}
      <div style={{ marginBottom: "12px" }}>
        Dear {form.toName || "Sir/Madam"},
      </div>

      {/* Body */}
      <div
        style={{
          marginBottom: "32px",
          whiteSpace: "pre-line",
          textAlign: "justify",
          lineHeight: "1.8",
        }}
      >
        {form.body}
      </div>

      {/* Closing */}
      <div style={{ marginBottom: "16px" }}>Yours Sincerely,</div>

      {/* Signature + Seal Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "12px",
        }}
      >
        <div>
          {signatureUrl ? (
            <img
              src={signatureUrl}
              alt="Signature"
              style={{
                height: "48px",
                maxWidth: "160px",
                objectFit: "contain",
                marginBottom: "4px",
              }}
            />
          ) : (
            <div
              style={{
                borderBottom: "1px solid #333",
                width: "160px",
                marginBottom: "4px",
              }}
            />
          )}
          <div style={{ fontWeight: "bold", fontSize: "11pt" }}>
            {form.signatoryName}
          </div>
          <div style={{ color: "#555", fontSize: "10pt" }}>
            {form.signatoryDesignation}
          </div>
          <div style={{ color: primary, fontWeight: "bold", fontSize: "10pt" }}>
            {settings.siteName}
          </div>
        </div>
        {sealUrl && (
          <div style={{ textAlign: "center" }}>
            <img
              src={sealUrl}
              alt="Seal"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                opacity: 0.85,
              }}
            />
            <div style={{ fontSize: "8pt", color: "#999" }}>Official Seal</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: `2px solid ${primary}`,
          marginTop: "auto",
          paddingTop: "10px",
          fontSize: "9pt",
          color: "#777",
          textAlign: "center",
        }}
      >
        {form.footerNote && (
          <div style={{ marginBottom: "4px" }}>{form.footerNote}</div>
        )}
        <div>
          Official Document
          {settings.registrationNo
            ? ` | Reg. No. ${settings.registrationNo}`
            : ""}{" "}
          | {settings.siteName} | {settings.contactPhone}
        </div>
      </div>
    </div>
  );
}
