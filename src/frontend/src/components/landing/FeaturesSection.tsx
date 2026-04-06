import {
  Award,
  BookOpen,
  Briefcase,
  Globe,
  Heart,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Users,
    title: "Membership Management",
    description:
      "Join our growing community with tiered memberships - Basic, Silver, Gold, and Platinum plans with unique benefits.",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: BookOpen,
    title: "Internship Programs",
    description:
      "Apply for certified internship programs in IT, marketing, social work, and entrepreneurship with completion certificates.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Award,
    title: "Skill Training",
    description:
      "Access to 50+ vocational training programs including digital skills, tailoring, agriculture, and more.",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: Heart,
    title: "Donation & Welfare",
    description:
      "Transparent donation system with real-time tracking and impact reports for every contribution.",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Briefcase,
    title: "Employment Schemes",
    description:
      "Access to government and private sector employment schemes with application assistance and guidance.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Shield,
    title: "KYC & Verification",
    description:
      "Secure digital KYC verification for members ensuring transparent and fraud-free operations.",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: Zap,
    title: "Payment System",
    description:
      "Seamless UPI-based payment integration with instant receipts and complete payment history.",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Globe,
    title: "National Reach",
    description:
      "Operating across 25+ districts with digital infrastructure enabling nationwide member support.",
    color: "bg-emerald-50 text-emerald-700",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Comprehensive Features for{" "}
            <span className="text-green-700">Every Need</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Our integrated platform offers everything you need for seamless
            membership management, skill development, and community empowerment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-xs hover:shadow-md transition-shadow border border-green-100 group"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
