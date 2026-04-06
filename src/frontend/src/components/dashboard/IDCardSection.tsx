import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { useRef } from "react";
import type { LocalMember, SiteSettings } from "../../types";

interface IDCardSectionProps {
  member: LocalMember;
  settings: SiteSettings;
}

export function IDCardSection({ member, settings }: IDCardSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const card = cardRef.current;
    if (!card) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>ID Card - ${member.name}</title>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f0fdf4; font-family: sans-serif; }
        .card { width: 340px; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
        .header { background: #166534; color: white; padding: 16px; text-align: center; }
        .header img { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #86efac; object-fit: cover; }
        .header h2 { margin: 8px 0 2px; font-size: 13px; font-weight: bold; }
        .header p { margin: 0; font-size: 10px; color: #86efac; }
        .body { padding: 16px; }
        .photo { width: 80px; height: 80px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 28px; font-weight: bold; color: #166534; border: 3px solid #166534; }
        .name { text-align: center; font-size: 16px; font-weight: bold; color: #1a1a1a; }
        .id { text-align: center; color: #166534; font-size: 13px; font-weight: bold; font-family: monospace; }
        .details { margin-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .detail { font-size: 11px; }
        .detail .label { color: #666; font-size: 10px; }
        .detail .value { color: #1a1a1a; font-weight: 600; }
        .footer { background: #166534; color: white; padding: 8px; text-align: center; font-size: 10px; }
        .qr { width: 48px; height: 48px; background: white; border: 2px solid #166534; display: flex; align-items: center; justify-content: center; margin: 8px auto; }
      </style></head><body>
      ${card.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Member ID Card</h2>
        <Button
          onClick={handlePrint}
          data-ocid="idcard.download.button"
          style={{ backgroundColor: "#166534" }}
        >
          <Download className="w-4 h-4 mr-2" /> Download / Print
        </Button>
      </div>

      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="w-80 bg-white rounded-2xl overflow-hidden shadow-xl border border-green-200"
        >
          {/* Card Header */}
          <div
            className="p-4 text-center text-white"
            style={{ backgroundColor: "#166534" }}
          >
            <img
              src={settings.logoUrl}
              alt="Logo"
              className="w-12 h-12 rounded-full mx-auto border-2 border-green-300 object-cover bg-white"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <h2 className="font-bold text-sm mt-2">{settings.siteName}</h2>
            <p className="text-green-200 text-xs">{settings.tagline}</p>
          </div>

          {/* Photo */}
          <div className="flex justify-center mt-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-700">
              <span className="text-3xl font-bold text-green-700">
                {member.name[0]}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="px-4 pb-4 mt-3">
            <div className="text-center">
              <div className="font-bold text-gray-900 text-base">
                {member.name}
              </div>
              <div className="text-green-700 font-bold text-sm font-mono">
                {member.id}
              </div>
              <div className="text-gray-500 text-xs capitalize">
                {member.designation} · {member.membershipType} Member
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-gray-500">Mobile</div>
                <div className="font-semibold text-gray-800">
                  {member.phone}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-gray-500">Join Date</div>
                <div className="font-semibold text-gray-800">
                  {new Date(member.joinDate).toLocaleDateString("en-IN")}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-gray-500">KYC Status</div>
                <div className="font-semibold text-gray-800 capitalize">
                  {member.kycStatus}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-gray-500">Status</div>
                <div
                  className="font-semibold capitalize"
                  style={{
                    color: member.status === "active" ? "#166534" : "#dc2626",
                  }}
                >
                  {member.status}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-3">
              <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded flex items-center justify-center">
                <QrCode className="w-8 h-8 text-green-700" />
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div
            className="py-2 text-center text-white text-xs"
            style={{ backgroundColor: "#166534" }}
          >
            {settings.contactPhone} · {settings.contactEmail}
          </div>
        </div>
      </div>
    </div>
  );
}
