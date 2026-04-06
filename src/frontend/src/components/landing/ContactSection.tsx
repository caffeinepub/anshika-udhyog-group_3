import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Inquiry, SiteSettings } from "../../types";

interface ContactSectionProps {
  settings: SiteSettings;
  onSubmitInquiry: (data: Omit<Inquiry, "id" | "status">) => void;
}

export function ContactSection({
  settings,
  onSubmitInquiry,
}: ContactSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("Please fill in your name and message");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    onSubmitInquiry({ ...form, date: new Date().toISOString() });
    toast.success(
      "Your inquiry has been submitted! We will get back to you soon.",
    );
    setForm({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get In <span className="text-green-700">Touch</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-green-50 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input
                  id="contact-name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="contact.name.input"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    data-ocid="contact.email.input"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Mobile</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    data-ocid="contact.phone.input"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  placeholder="How can we help you?"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.message.textarea"
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                data-ocid="contact.submit_button"
                className="w-full gradient-green text-white hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #166534, #15803d)",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600 text-sm">
                      {settings.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600 text-sm">
                      {settings.contactPhone}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600 text-sm">
                      {settings.contactEmail}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">WhatsApp</div>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-700 text-sm hover:underline"
                    >
                      +91 {settings.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
