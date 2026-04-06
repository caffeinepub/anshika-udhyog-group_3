import {
  ArrowRight,
  Calendar,
  CreditCard,
  FileText,
  GraduationCap,
  HandHeart,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: CreditCard,
    title: "Membership Program",
    description:
      "Four-tier membership structure with exclusive benefits, PVC ID cards, and access to all organization services.",
    price: "From ₹500/year",
  },
  {
    icon: GraduationCap,
    title: "Training & Internship",
    description:
      "Industry-relevant training programs and internship opportunities with official certificates upon completion.",
    price: "Free for Members",
  },
  {
    icon: HandHeart,
    title: "Donation & Welfare",
    description:
      "Support community welfare projects with full transparency. Every donation tracked and reported.",
    price: "Any Amount",
  },
  {
    icon: Calendar,
    title: "Events & Networking",
    description:
      "Regular events, conventions, and networking sessions to connect members and create opportunities.",
    price: "Member Access",
  },
  {
    icon: Users,
    title: "Employment Placement",
    description:
      "Job placement assistance, resume support, and direct connections with employment opportunities.",
    price: "Gold+ Members",
  },
  {
    icon: FileText,
    title: "Government Schemes",
    description:
      "Expert assistance in applying for government welfare schemes, loans, and subsidy programs.",
    price: "Free Consultation",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Services That{" "}
            <span className="text-green-700">Transform Lives</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-full h-1 gradient-green" />
              <div className="p-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <service.icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
