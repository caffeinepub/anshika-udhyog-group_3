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
import { CreditCard, Eye, Printer, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { SiteSettings } from "../../types";
import type { LocalMember } from "../../types";

interface IDCardDesignerProps {
  members: LocalMember[];
  settings: SiteSettings;
  onUpdateSettings: (updates: Partial<SiteSettings>) => void;
}

// 12 card design themes
const CARD_DESIGNS = [
  {
    id: 1,
    label: "Design 1 - Classic Green",
    primary: "#166534",
    secondary: "#16a34a",
    bg: "#f0fdf4",
    text: "#fff",
    accent: "#86efac",
  },
  {
    id: 2,
    label: "Design 2 - Royal Blue",
    primary: "#1e3a8a",
    secondary: "#2563eb",
    bg: "#eff6ff",
    text: "#fff",
    accent: "#bfdbfe",
  },
  {
    id: 3,
    label: "Design 3 - Deep Purple",
    primary: "#581c87",
    secondary: "#9333ea",
    bg: "#faf5ff",
    text: "#fff",
    accent: "#e9d5ff",
  },
  {
    id: 4,
    label: "Design 4 - Crimson Red",
    primary: "#7f1d1d",
    secondary: "#dc2626",
    bg: "#fef2f2",
    text: "#fff",
    accent: "#fecaca",
  },
  {
    id: 5,
    label: "Design 5 - Teal Ocean",
    primary: "#0d4a47",
    secondary: "#14b8a6",
    bg: "#f0fdfa",
    text: "#fff",
    accent: "#99f6e4",
  },
  {
    id: 6,
    label: "Design 6 - Dark Slate",
    primary: "#0f172a",
    secondary: "#475569",
    bg: "#f8fafc",
    text: "#fff",
    accent: "#cbd5e1",
  },
  {
    id: 7,
    label: "Design 7 - Gold Luxury",
    primary: "#78350f",
    secondary: "#d97706",
    bg: "#fffbeb",
    text: "#fff",
    accent: "#fde68a",
  },
  {
    id: 8,
    label: "Design 8 - Forest Dual",
    primary: "#14532d",
    secondary: "#4ade80",
    bg: "#f0fdf4",
    text: "#fff",
    accent: "#bbf7d0",
  },
  {
    id: 9,
    label: "Design 9 - Midnight Blue",
    primary: "#172554",
    secondary: "#1d4ed8",
    bg: "#eff6ff",
    text: "#fff",
    accent: "#93c5fd",
  },
  {
    id: 10,
    label: "Design 10 - Rose Gold",
    primary: "#881337",
    secondary: "#f43f5e",
    bg: "#fff1f2",
    text: "#fff",
    accent: "#fda4af",
  },
  {
    id: 11,
    label: "Design 11 - Corporate Gray",
    primary: "#1f2937",
    secondary: "#6b7280",
    bg: "#f9fafb",
    text: "#fff",
    accent: "#d1d5db",
  },
  {
    id: 12,
    label: "Design 12 - Saffron India",
    primary: "#7c2d12",
    secondary: "#ea580c",
    bg: "#fff7ed",
    text: "#fff",
    accent: "#fed7aa",
  },
];

// Simple barcode SVG renderer
function BarcodeVisual({
  value,
  width = 120,
  height = 36,
}: { value: string; width?: number; height?: number }) {
  const bars: number[] = [];
  let seed = 0;
  for (let i = 0; i < value.length; i++)
    seed = (seed * 31 + value.charCodeAt(i)) & 0xffff;
  for (let i = 0; i < 44; i++) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    bars.push(((seed >>> 28) % 3) + 1);
  }
  let x = 0;
  const totalWidth = bars.reduce((a, b) => a + b, 0);
  const scale = width / totalWidth;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Barcode for ${value}`}
    >
      {bars.map((w, i) => {
        const rx = x;
        x += w * scale;
        return i % 2 === 0 ? (
          <rect
            key={`bar-${String(i)}-${w}`}
            x={rx}
            y={0}
            width={w * scale}
            height={height - 8}
            fill="#1a1a1a"
          />
        ) : null;
      })}
      <text
        x={width / 2}
        y={height}
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        fill="#333"
      >
        {value.slice(0, 16)}
      </text>
    </svg>
  );
}

function PVCCardFront({
  member,
  settings,
  design,
  sealUrl,
  signatureUrl,
  memberId,
}: {
  member: Partial<LocalMember> & { name: string };
  settings: SiteSettings;
  design: (typeof CARD_DESIGNS)[0];
  sealUrl: string;
  signatureUrl: string;
  memberId: string;
}) {
  const validUpto = (member as LocalMember).validUpto
    ? new Date((member as LocalMember).validUpto!).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Lifetime";

  return (
    <div
      style={{
        width: "54mm",
        minHeight: "92mm",
        borderRadius: "8px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        background: design.bg,
        border: `2.5px solid ${design.primary}`,
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${design.primary} 0%, ${design.secondary} 100%)`,
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          minHeight: "22mm",
        }}
      >
        {settings.logoUrl ? (
          <img
            src={settings.logoUrl}
            alt="Logo"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: `2px solid ${design.accent}`,
              objectFit: "cover",
              background: "white",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: design.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              color: design.primary,
              flexShrink: 0,
            }}
          >
            {settings.siteName[0]}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: design.text,
              fontSize: "8px",
              fontWeight: "bold",
              letterSpacing: "0.3px",
              lineHeight: 1.3,
            }}
          >
            {settings.siteName}
          </div>
          <div
            style={{
              color: design.accent,
              fontSize: "5.5px",
              lineHeight: 1.3,
              marginTop: "1px",
            }}
          >
            {settings.tagline}
          </div>
        </div>
        <div
          style={{
            color: design.accent,
            fontSize: "5.5px",
            textAlign: "right",
            flexShrink: 0,
          }}
        >
          <div style={{ fontWeight: "bold" }}>MEMBERSHIP</div>
          <div>ID CARD</div>
        </div>
      </div>

      {/* Photo + Info row */}
      <div
        style={{ display: "flex", gap: "6px", padding: "6px 8px 4px", flex: 1 }}
      >
        {/* Photo - bigger, left side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "44px",
              height: "52px",
              borderRadius: "4px",
              border: `2.5px solid ${design.primary}`,
              overflow: "hidden",
              background: design.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {member.photoUrl ? (
              <img
                src={member.photoUrl}
                alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: design.primary,
                }}
              >
                {member.name[0]}
              </span>
            )}
          </div>
          {sealUrl && (
            <img
              src={sealUrl}
              alt="Official seal"
              style={{
                width: "26px",
                height: "26px",
                objectFit: "contain",
                opacity: 0.8,
              }}
            />
          )}
        </div>

        {/* Right side: name + details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "9px",
              color: design.primary,
              lineHeight: 1.3,
              marginBottom: "1px",
            }}
          >
            {member.name}
          </div>
          <div
            style={{
              fontSize: "8px",
              color: design.secondary,
              fontWeight: "700",
              marginBottom: "3px",
            }}
          >
            {(member as LocalMember).designation ?? "Member"}
          </div>
          <div style={{ fontSize: "7px", color: "#333", lineHeight: 1.9 }}>
            <div>
              <strong>ID:</strong> {memberId}
            </div>
            <div>
              <strong>Type:</strong>{" "}
              {(member as LocalMember).membershipType?.toUpperCase() ?? "BASIC"}
            </div>
            <div>
              <strong>Valid:</strong> {validUpto}
            </div>
            <div>
              <strong>Mob:</strong> {(member as LocalMember).phone ?? "—"}
            </div>
          </div>
          {/* Authority name */}
          {settings.siteName && (
            <div
              style={{
                fontSize: "5.5px",
                color: "#666",
                marginTop: "3px",
                lineHeight: 1.3,
              }}
            >
              {settings.address?.split(",").slice(0, 2).join(",")}
            </div>
          )}
          {/* Signature */}
          {signatureUrl && (
            <div style={{ marginTop: "3px" }}>
              <img
                src={signatureUrl}
                alt="Authorized signature"
                style={{
                  height: "16px",
                  maxWidth: "55px",
                  objectFit: "contain",
                }}
              />
              <div style={{ fontSize: "5px", color: "#888", lineHeight: 1 }}>
                Auth. Sign
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: design.primary,
          padding: "3px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: design.accent, fontSize: "5px" }}>
          {settings.contactPhone}
        </div>
        <div style={{ color: design.accent, fontSize: "5px" }}>
          {settings.contactEmail}
        </div>
        <div style={{ color: design.accent, fontSize: "5px" }}>
          {settings.websiteUrl ?? ""}
        </div>
      </div>
    </div>
  );
}

function PVCCardBack({
  settings,
  design,
  termsText,
  memberId,
}: {
  settings: SiteSettings;
  design: (typeof CARD_DESIGNS)[0];
  termsText: string;
  memberId?: string;
}) {
  const defaultTerms = `1. This card is the property of ${settings.siteName} and must be returned on demand.
2. This card is non-transferable and valid only for the named member.
3. If found, please return to: ${settings.address}.
4. Contact: ${settings.contactPhone} | ${settings.contactEmail}
5. Any misuse of this card is subject to legal action.
6. The organization reserves the right to cancel this card at any time.
7. Card validity is subject to membership renewal and payment of dues.
8. The holder must carry this card at all times during official activities.`;

  return (
    <div
      style={{
        width: "54mm",
        minHeight: "92mm",
        borderRadius: "8px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        background: design.bg,
        border: `2.5px solid ${design.primary}`,
      }}
    >
      {/* Back Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${design.primary} 0%, ${design.secondary} 100%)`,
          padding: "5px 8px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: design.text,
            fontSize: "7.5px",
            fontWeight: "bold",
            letterSpacing: "0.8px",
          }}
        >
          {settings.siteName}
        </div>
        <div
          style={{
            color: design.accent,
            fontSize: "6px",
            marginTop: "1px",
            letterSpacing: "1px",
          }}
        >
          TERMS &amp; CONDITIONS
        </div>
      </div>

      {/* Barcode section */}
      <div
        style={{
          padding: "5px 8px 3px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BarcodeVisual
          value={memberId ?? "AUG000000"}
          width={120}
          height={40}
        />
      </div>

      {/* T&C Content */}
      <div style={{ flex: 1, padding: "2px 8px", overflow: "hidden" }}>
        <div
          style={{
            fontSize: "5.5px",
            color: "#333",
            lineHeight: 1.75,
            whiteSpace: "pre-line",
          }}
        >
          {termsText || defaultTerms}
        </div>
      </div>

      {/* Back Footer */}
      <div
        style={{
          background: design.primary,
          padding: "3px 8px",
          textAlign: "center",
        }}
      >
        <div
          style={{ color: design.accent, fontSize: "5px", fontWeight: "bold" }}
        >
          Reg. No: {settings.registrationNo ?? "—"} |{" "}
          {settings.address?.split(",").slice(0, 2).join(",")}
        </div>
      </div>
    </div>
  );
}

export function IDCardDesigner({
  members,
  settings,
  onUpdateSettings,
}: IDCardDesignerProps) {
  const [selectedDesignIdx, setSelectedDesignIdx] = useState(
    settings.idCardDesignIndex ?? 0,
  );
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    members[0]?.id ?? "",
  );
  const [showPreview, setShowPreview] = useState(false);
  const [termsText, setTermsText] = useState(settings.idCardTerms ?? "");
  const [localSeal, setLocalSeal] = useState(settings.sealUrl ?? "");
  const [localSignature, setLocalSignature] = useState(
    settings.signatureUrl ?? "",
  );
  const sealRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  const selectedMember =
    members.find((m) => m.id === selectedMemberId) ?? members[0];
  const design = CARD_DESIGNS[selectedDesignIdx] ?? CARD_DESIGNS[0];

  const handleSealUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    setLocalSeal(b64);
    onUpdateSettings({ sealUrl: b64 });
    toast.success("Seal uploaded");
  };

  const handleSigUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    setLocalSignature(b64);
    onUpdateSettings({ signatureUrl: b64 });
    toast.success("Signature uploaded");
  };

  const handleSaveSettings = () => {
    onUpdateSettings({
      idCardDesignIndex: selectedDesignIdx,
      idCardTerms: termsText,
      sealUrl: localSeal,
      signatureUrl: localSignature,
    });
    toast.success("ID Card settings saved");
  };

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  return (
    <div className="space-y-6">
      <style>{`
        @page { size: A4 portrait; margin: 10mm; }
        @media print {
          .no-print { display: none !important; }
          .print-area {
            position: fixed !important; inset: 0 !important; z-index: 9999 !important;
            background: white !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 20mm !important;
          }
          body > * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible !important; }
        }
      `}</style>

      <div className="no-print">
        <h2 className="text-xl font-bold text-gray-900">
          🪦 ID Card Designer (PVC)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Portrait PVC cards — Front &amp; Back, barcode, seal, signature, 12
          design themes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 no-print">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Card Design */}
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-3">
              🎨 Card Design (12 Options)
            </h3>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {CARD_DESIGNS.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDesignIdx(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs border-2 transition-all flex items-center gap-2 ${
                    selectedDesignIdx === i
                      ? "border-green-600 bg-green-50 font-bold"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  data-ocid={`idcard.design.${d.id}`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${d.primary}, ${d.secondary})`,
                    }}
                  />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Select Member */}
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-3">
              👤 Select Member
            </h3>
            <Select
              value={selectedMemberId}
              onValueChange={setSelectedMemberId}
            >
              <SelectTrigger data-ocid="idcard.member.select">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name} ({m.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seal & Signature */}
          <div className="bg-white rounded-xl p-5 border border-green-100 space-y-3">
            <h3 className="font-semibold text-gray-800">
              🔏 Seal &amp; Signature
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-500">Official Seal</Label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-green-200 rounded-lg p-2 mt-1 flex flex-col items-center gap-1 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => sealRef.current?.click()}
                >
                  {localSeal ? (
                    <img
                      src={localSeal}
                      alt="Official seal"
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-green-400" />
                      <span className="text-xs text-gray-400">Upload</span>
                    </>
                  )}
                </button>
                <input
                  ref={sealRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSealUpload}
                  data-ocid="idcard.seal.upload"
                />
                {localSeal && (
                  <button
                    type="button"
                    className="text-xs text-red-500 mt-1"
                    onClick={() => {
                      setLocalSeal("");
                      onUpdateSettings({ sealUrl: "" });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div>
                <Label className="text-xs text-gray-500">Signature</Label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-green-200 rounded-lg p-2 mt-1 flex flex-col items-center gap-1 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => sigRef.current?.click()}
                >
                  {localSignature ? (
                    <img
                      src={localSignature}
                      alt="Authorized signature"
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-green-400" />
                      <span className="text-xs text-gray-400">Upload</span>
                    </>
                  )}
                </button>
                <input
                  ref={sigRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSigUpload}
                  data-ocid="idcard.signature.upload"
                />
                {localSignature && (
                  <button
                    type="button"
                    className="text-xs text-red-500 mt-1"
                    onClick={() => {
                      setLocalSignature("");
                      onUpdateSettings({ signatureUrl: "" });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-2">
              📋 Terms &amp; Conditions (Back of Card)
            </h3>
            <Textarea
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              rows={5}
              className="text-xs"
              placeholder="Enter terms and conditions (leave blank for default)..."
              data-ocid="idcard.terms.textarea"
            />
          </div>

          <Button
            className="w-full gap-2"
            style={{ backgroundColor: "#166534" }}
            onClick={handleSaveSettings}
            data-ocid="idcard.save_settings"
          >
            Save Card Settings
          </Button>
          <Button
            className="w-full gap-2"
            variant="outline"
            onClick={() => setShowPreview(true)}
            data-ocid="idcard.preview_button"
          >
            <Eye className="w-4 h-4" /> Full Preview &amp; Print / PDF
          </Button>
        </div>

        {/* Card Preview Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">
                Live Card Preview (Portrait)
              </h3>
              {selectedMember && (
                <Badge className="bg-green-100 text-green-800">
                  {selectedMember.name}
                </Badge>
              )}
            </div>

            {selectedMember ? (
              <div className="space-y-8">
                <div>
                  <div className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                    🏦 Front Side
                  </div>
                  <div className="flex justify-center">
                    <PVCCardFront
                      member={selectedMember}
                      settings={settings}
                      design={design}
                      sealUrl={localSeal}
                      signatureUrl={localSignature}
                      memberId={selectedMember.id}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                    🔄 Back Side (Barcode + Terms)
                  </div>
                  <div className="flex justify-center">
                    <PVCCardBack
                      settings={settings}
                      design={design}
                      termsText={termsText}
                      memberId={selectedMember.id}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Select a member to preview the ID card</p>
              </div>
            )}
          </div>

          {/* All Members Cards Grid */}
          {members.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-gray-800 mb-3">
                All Member Cards Quick View
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {members.slice(0, 10).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMemberId(m.id)}
                    className={`text-left p-3 rounded-lg border-2 transition-all ${
                      selectedMemberId === m.id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 overflow-hidden flex items-center justify-center text-sm font-bold"
                        style={{
                          borderColor: design.primary,
                          backgroundColor: design.bg,
                          color: design.primary,
                        }}
                      >
                        {m.photoUrl ? (
                          <img
                            src={m.photoUrl}
                            alt={m.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          m.name[0]
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {m.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {m.id} · {m.designation}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                {members.length > 10 && (
                  <div className="text-xs text-gray-400 text-center py-2">
                    +{members.length - 10} more members
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Print Modal */}
      {showPreview && selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 overflow-y-auto"
          data-ocid="idcard.modal"
        >
          <div className="w-full max-w-4xl my-8 space-y-4">
            <div className="no-print flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">
                ID Card Preview — {selectedMember.name}
              </h3>
              <div className="flex gap-2">
                <Button
                  onClick={handlePrint}
                  className="gap-2"
                  style={{ backgroundColor: design.primary }}
                  data-ocid="idcard.print_button"
                >
                  <Printer className="w-4 h-4" /> Print / Save PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                  className="bg-white"
                  data-ocid="idcard.close_button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="print-area bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-10">
              <div className="space-y-2 text-center">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide no-print">
                  Front Side
                </div>
                <PVCCardFront
                  member={selectedMember}
                  settings={settings}
                  design={design}
                  sealUrl={localSeal}
                  signatureUrl={localSignature}
                  memberId={selectedMember.id}
                />
              </div>
              <div className="space-y-2 text-center">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide no-print">
                  Back Side
                </div>
                <PVCCardBack
                  settings={settings}
                  design={design}
                  termsText={termsText}
                  memberId={selectedMember.id}
                />
              </div>
            </div>

            <div className="no-print bg-white/10 rounded-lg p-3 text-white/70 text-xs text-center">
              💡 Tip: Ctrl+P / Cmd+P → &quot;Save as PDF&quot; → Scale 100% →
              Portrait — PVC card size ke liye print karein
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
