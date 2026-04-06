import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const SERVICES = [
  {
    id: "recharge",
    emoji: "📱",
    title: "Mobile Recharge",
    description: "All operator mobile recharge - Airtel, Jio, BSNL, Vi",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    available: false,
  },
  {
    id: "dth",
    emoji: "📺",
    title: "DTH Recharge",
    description: "Tata Sky, Dish TV, Airtel DTH, Sun Direct recharge",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    available: false,
  },
  {
    id: "bill",
    emoji: "⚡",
    title: "Electricity Bill",
    description: "Pay electricity, water, and gas bills online",
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600",
    available: false,
  },
  {
    id: "insurance",
    emoji: "🛡️",
    title: "Insurance",
    description: "Health, life, vehicle insurance plans",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    available: true,
  },
  {
    id: "emi",
    emoji: "🏦",
    title: "EMI Collection",
    description: "Loan EMI and micro-finance collection service",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    available: true,
  },
  {
    id: "pan",
    emoji: "💳",
    title: "PAN Card Service",
    description: "New PAN card application and corrections",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
    available: true,
  },
  {
    id: "travel",
    emoji: "🚂",
    title: "Travel Booking",
    description: "Bus, train, flight ticket booking assistance",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    available: false,
  },
  {
    id: "govt",
    emoji: "🏛️",
    title: "Govt Schemes",
    description: "PM Awas, Ujjwala, Jan Dhan scheme registration",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    available: true,
  },
];

export function UtilitiesPage() {
  const [enquireService, setEnquireService] = useState<
    (typeof SERVICES)[0] | null
  >(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Enquiry submitted! Our team will contact you within 24 hours.",
    );
    setEnquireService(null);
    setEnquiryForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div
        className="py-10 md:py-16 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          ⚡ Utilities & Services
        </h1>
        <p className="text-green-100 max-w-xl mx-auto">
          One-stop solution for all your utility needs and government services
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="utilities.list"
        >
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className={`rounded-xl border-2 p-5 ${service.color} hover:shadow-md transition-shadow`}
              data-ocid={`utilities.item.${idx + 1}`}
            >
              <div className="text-4xl mb-3">{service.emoji}</div>
              <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {service.description}
              </p>
              {service.available ? (
                <Button
                  size="sm"
                  onClick={() => setEnquireService(service)}
                  data-ocid={`utilities.enquire.${idx + 1}`}
                  className="w-full"
                  style={{ backgroundColor: "#166534" }}
                >
                  Enquire Now
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-bold text-green-800 text-lg mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Contact our support team for any service assistance
          </p>
          <a
            href="https://wa.me/918349600835?text=Hi%20ANSHIKA%20UDHYOG%20GROUP%20I%20need%20help%20with%20utilities"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              style={{ backgroundColor: "#25D366" }}
              className="text-white"
            >
              💬 WhatsApp Support
            </Button>
          </a>
        </div>
      </div>

      {/* Enquiry Dialog */}
      <Dialog
        open={!!enquireService}
        onOpenChange={() => setEnquireService(null)}
      >
        <DialogContent data-ocid="utilities.enquire.dialog">
          <DialogHeader>
            <DialogTitle>
              {enquireService?.emoji} {enquireService?.title} Enquiry
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEnquiry} className="space-y-4">
            <div>
              <Label>Your Name *</Label>
              <Input
                value={enquiryForm.name}
                onChange={(e) =>
                  setEnquiryForm((p) => ({ ...p, name: e.target.value }))
                }
                required
                data-ocid="utilities.enquiry.name.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Mobile Number *</Label>
              <Input
                value={enquiryForm.phone}
                onChange={(e) =>
                  setEnquiryForm((p) => ({ ...p, phone: e.target.value }))
                }
                required
                type="tel"
                data-ocid="utilities.enquiry.phone.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={enquiryForm.message}
                onChange={(e) =>
                  setEnquiryForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Describe your requirement..."
                data-ocid="utilities.enquiry.message.textarea"
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: "#166534" }}
              data-ocid="utilities.enquiry.submit_button"
            >
              Submit Enquiry
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
