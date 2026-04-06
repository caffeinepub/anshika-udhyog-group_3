import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BENEFITS = [
  {
    emoji: "🏢",
    title: "Own Office Setup",
    desc: "Get full support to set up your franchise office with branding materials",
  },
  {
    emoji: "💰",
    title: "Multiple Income Streams",
    desc: "Earn from membership, products, services, and team performance",
  },
  {
    emoji: "🎓",
    title: "Complete Training",
    desc: "Comprehensive training for you and your team on all operations",
  },
  {
    emoji: "📊",
    title: "Marketing Support",
    desc: "Dedicated marketing materials, social media support, and local advertising",
  },
  {
    emoji: "🛡️",
    title: "Brand Protection",
    desc: "Legal protection and exclusive territory rights in your area",
  },
  {
    emoji: "📞",
    title: "24/7 Support",
    desc: "Round-the-clock support from our operations team",
  },
];

const INVESTMENT_TABLE = [
  {
    type: "Basic Franchise",
    investment: "\u20B950,000",
    area: "1 City / Tehsil",
    earning: "\u20B930,000-60,000/month",
  },
  {
    type: "Standard Franchise",
    investment: "\u20B91,50,000",
    area: "1 District",
    earning: "\u20B960,000-1,20,000/month",
  },
  {
    type: "Premium Franchise",
    investment: "\u20B93,00,000",
    area: "Multiple Districts",
    earning: "\u20B91,20,000-3,00,000/month",
  },
];

const HOW_TO_APPLY = [
  "Fill the Franchise Enquiry Form below",
  "Our team will contact you within 48 hours",
  "Visit our Head Office for detailed discussion",
  "Sign the Franchise Agreement",
  "Pay Franchise Fee and complete setup",
  "Attend 5-day comprehensive training program",
  "Launch your franchise!",
];

export function FranchisePage({ onJoinClick }: { onJoinClick?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    investment: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Franchise enquiry submitted! Our team will contact you within 48 hours.",
    );
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      investment: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div
        className="py-14 md:py-20 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          🏢 Franchise Opportunity
        </h1>
        <p className="text-green-100 max-w-2xl mx-auto mb-6">
          Join India's fastest growing self-employment network. Start your own
          AUG franchise today.
        </p>
        <Button
          onClick={onJoinClick}
          className="bg-white text-green-800 hover:bg-green-50 font-bold px-8 py-3"
          data-ocid="franchise.join.primary_button"
        >
          Apply for Franchise
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">
        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🌟 Why AUG Franchise?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{b.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Investment Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            💰 Investment & Returns
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{ backgroundColor: "#166534" }}
                    className="text-white"
                  >
                    <th className="p-3 text-left">Franchise Type</th>
                    <th className="p-3 text-left">Investment</th>
                    <th className="p-3 text-left">Area</th>
                    <th className="p-3 text-left">Est. Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {INVESTMENT_TABLE.map((row, rowIdx) => (
                    <tr
                      key={row.type}
                      className={`border-b ${rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="p-3 font-medium">{row.type}</td>
                      <td className="p-3 font-bold text-red-600">
                        {row.investment}
                      </td>
                      <td className="p-3">{row.area}</td>
                      <td className="p-3 font-bold text-green-700">
                        {row.earning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            📋 How to Apply
          </h2>
          <div className="space-y-3 max-w-xl mx-auto">
            {HOW_TO_APPLY.map((step) => (
              <div
                key={step}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Enquiry Form */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            📧 Franchise Enquiry
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise.enquiry.name.input"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise.enquiry.phone.input"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise.enquiry.email.input"
                  />
                </div>
                <div>
                  <Label>City *</Label>
                  <Input
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, city: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise.enquiry.city.input"
                  />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, state: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="franchise.enquiry.state.input"
                  />
                </div>
                <div>
                  <Label>Investment Budget</Label>
                  <Input
                    value={form.investment}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, investment: e.target.value }))
                    }
                    className="mt-1"
                    placeholder="e.g. \u20B950,000"
                    data-ocid="franchise.enquiry.investment.input"
                  />
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="Tell us about yourself and your interest..."
                  data-ocid="franchise.enquiry.message.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold"
                style={{ backgroundColor: "#166534" }}
                data-ocid="franchise.enquiry.submit_button"
              >
                Submit Franchise Enquiry
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
