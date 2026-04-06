import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";
import { useRef } from "react";
import type { Internship, LocalMember, SiteSettings } from "../../types";

interface CertificateSectionProps {
  internships: Internship[];
  member: LocalMember;
  settings: SiteSettings;
}

export function CertificateSection({
  internships,
  member,
  settings,
}: CertificateSectionProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const completed = internships.filter((i) => i.status === "completed");

  const handlePrint = (internship: Internship) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Certificate - ${member.name}</title>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f9f9f9; font-family: serif; }
        .cert { width: 800px; padding: 60px; border: 8px double #166534; background: white; text-align: center; position: relative; }
        .cert::before { content: ''; position: absolute; inset: 12px; border: 2px solid #86efac; }
        h1 { color: #166534; font-size: 36px; margin-bottom: 8px; }
        .subtitle { color: #555; font-size: 16px; margin-bottom: 40px; }
        .recipient { font-size: 28px; color: #1a1a1a; font-weight: bold; border-bottom: 2px solid #166534; display: inline-block; padding-bottom: 4px; margin-bottom: 20px; }
        .desc { font-size: 16px; color: #444; line-height: 1.8; }
        .footer { margin-top: 60px; display: flex; justify-content: space-between; }
        .sign { text-align: center; }
        .sign .line { border-top: 1px solid #333; width: 160px; margin: 0 auto 4px; }
        .sign span { font-size: 12px; color: #666; }
        .org { font-size: 20px; color: #166534; font-weight: bold; margin: 20px 0; }
        .cert-id { font-size: 11px; color: #999; margin-top: 20px; }
      </style></head><body>
      <div class="cert">
        <div style="font-size: 14px; color: #166534; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px;">Certificate of Completion</div>
        <h1>Internship Completion Certificate</h1>
        <p class="subtitle">This is to certify that</p>
        <div class="recipient">${member.name}</div>
        <p class="desc">
          Member ID: <strong>${member.id}</strong><br/>
          has successfully completed the internship program
        </p>
        <div class="org">${internship.title}</div>
        <p class="desc">
          Duration: ${internship.appliedDate} to ${internship.completionDate || "Completed"}
        </p>
        <div class="footer">
          <div class="sign">
            <div class="line"></div>
            <span>Date of Issue</span>
          </div>
          <div class="sign">
            <div class="line"></div>
            <span>Program Director</span>
          </div>
          <div class="sign">
            <div class="line"></div>
            <span>Organization Seal</span>
          </div>
        </div>
        <p class="cert-id">Certificate ID: ${internship.certificateId || `CERT-${internship.id}`} | ${settings.siteName}</p>
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6" ref={certRef}>
      <h2 className="text-xl font-bold text-gray-900">My Certificates</h2>
      {completed.length === 0 ? (
        <div
          className="text-center py-16 bg-white rounded-xl border border-green-100"
          data-ocid="certificates.empty_state"
        >
          <Award className="w-12 h-12 text-green-200 mx-auto mb-3" />
          <p className="text-gray-400">
            No certificates yet. Complete an internship to earn your
            certificate.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {completed.map((internship, idx) => (
            <div
              key={internship.id}
              data-ocid={`certificates.item.${idx + 1}`}
              className="bg-white rounded-xl p-6 border border-green-100 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {internship.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    Completed: {internship.completionDate}
                  </div>
                  <Badge className="bg-green-100 text-green-800 mt-1">
                    {internship.certificateId || "Certificate Issued"}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => handlePrint(internship)}
                data-ocid={`certificates.download.button.${idx + 1}`}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
