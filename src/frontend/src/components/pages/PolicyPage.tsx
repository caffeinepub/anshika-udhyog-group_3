import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PRIVACY_CONTENT = `
## Privacy Policy

**Effective Date:** January 1, 2025

### 1. Information We Collect
We collect personal information including name, contact details, address, KYC documents, and financial information necessary for membership and service delivery.

### 2. How We Use Your Information
- Membership registration and management
- KYC verification and compliance
- Service delivery and communication
- Payment processing and records
- Legal and regulatory compliance

### 3. Data Security
All personal data is encrypted and stored securely. We do not sell or share your data with third parties without your consent.

### 4. Your Rights
You have the right to access, update, or request deletion of your personal data. Contact us at info@anshikaudhyog.org.

### 5. Cookies
We use minimal cookies for session management and app functionality.

### 6. Contact
For privacy concerns, contact: +91 83496 00835 | info@anshikaudhyog.org
`;

const TERMS_CONTENT = `
## Terms of Service

**Effective Date:** January 1, 2025

### 1. Membership
Membership in ANSHIKA UDHYOG GROUP is open to all Indian citizens above 18 years. Membership is subject to approval and KYC verification.

### 2. Fees
Membership fees are non-refundable once processed. Annual renewal is required to maintain active membership status.

### 3. Code of Conduct
Members are expected to maintain dignity, respect fellow members, and uphold the organization's values.

### 4. Benefits
Membership benefits are subject to availability and the organization's policies, which may change with prior notice.

### 5. Termination
Membership may be terminated for violation of code of conduct, fraudulent activity, or non-payment of dues.

### 6. Disputes
All disputes shall be subject to jurisdiction of courts in Lucknow, Uttar Pradesh.

### 7. Amendments
These terms may be updated with 30 days' prior notice to members.
`;

const REFUND_CONTENT = `
## Refund Policy

**Effective Date:** January 1, 2025

### 1. Membership Fees
Membership registration fees are non-refundable. In case of rejection by admin, 90% of the fee will be refunded within 15 working days.

### 2. Product Purchases
- Products can be returned within 7 days of delivery if found defective
- Original packaging must be intact
- Refund processed within 10-15 working days after return verification

### 3. Service Charges
Service charges for utility payments, document processing, etc. are non-refundable once service is rendered.

### 4. Donation
Donations once made are non-refundable.

### 5. How to Request Refund
Email refund@anshikaudhyog.org with your Member ID, payment details, and reason for refund.

### 6. Processing Time
Refunds are processed via the original payment method within 10-15 working days.
`;

function PolicyContent({ content }: { content: string }) {
  const sections = content.trim().split("\n").filter(Boolean);
  return (
    <div className="prose prose-green max-w-none">
      {sections.map((line, i) => {
        const k = `${i}-${line.slice(0, 10)}`;
        if (line.startsWith("## ")) {
          return (
            <h2 key={k} className="text-2xl font-bold text-green-800 mb-4 mt-6">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={k}
              className="text-lg font-semibold text-gray-900 mb-2 mt-4"
            >
              {line.slice(4)}
            </h3>
          );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={k} className="font-semibold text-gray-700 mb-2">
              {line.slice(2, -2)}
            </p>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={k} className="ml-4 text-gray-600 mb-1 list-disc">
              {line.slice(2)}
            </li>
          );
        }
        return (
          <p key={k} className="text-gray-600 mb-2">
            {line}
          </p>
        );
      })}
    </div>
  );
}

export function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div
        className="py-10 md:py-16 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          📜 Legal & Policies
        </h1>
        <p className="text-green-100">Transparency in everything we do</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Tabs defaultValue="privacy">
          <TabsList className="w-full mb-6">
            <TabsTrigger
              value="privacy"
              className="flex-1"
              data-ocid="policy.privacy.tab"
            >
              🔒 Privacy
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="flex-1"
              data-ocid="policy.terms.tab"
            >
              📝 Terms
            </TabsTrigger>
            <TabsTrigger
              value="refund"
              className="flex-1"
              data-ocid="policy.refund.tab"
            >
              💰 Refund
            </TabsTrigger>
          </TabsList>
          <TabsContent value="privacy">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <PolicyContent content={PRIVACY_CONTENT} />
            </div>
          </TabsContent>
          <TabsContent value="terms">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <PolicyContent content={TERMS_CONTENT} />
            </div>
          </TabsContent>
          <TabsContent value="refund">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <PolicyContent content={REFUND_CONTENT} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
