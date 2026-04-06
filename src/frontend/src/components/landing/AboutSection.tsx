import { Award, Globe, Target, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Users, value: "10,000+", label: "Members" },
  { icon: Target, value: "500+", label: "Beneficiaries" },
  { icon: Award, value: "200+", label: "Certificates Issued" },
  { icon: Globe, value: "25+", label: "Districts Covered" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering India Through{" "}
              <span className="text-green-700">Self Employment</span>
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Anshika Udhyog Group™ is a dedicated NGO and business organization
              committed to the self-employment revolution across India. Founded
              with a mission to uplift underprivileged communities, we provide
              skills, resources, and opportunities to create sustainable
              livelihoods.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our comprehensive programs cover skill development training,
              internship opportunities, financial assistance, and business
              mentorship. We believe every Indian deserves the opportunity to
              achieve economic independence and dignity through meaningful work.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                "Transparent Operations",
                "Government Partnerships",
                "Certified Training Programs",
                "Employment Guarantee Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="gradient-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Read Our Story
            </button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/assets/generated/about-team.dim_600x500.jpg"
                alt="Team"
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-green-100">
              <div className="text-green-700 font-bold text-2xl">10+</div>
              <div className="text-gray-600 text-sm">Years of Service</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-green-700 rounded-xl p-4 shadow-lg text-white text-center">
              <div className="font-bold text-2xl">25+</div>
              <div className="text-green-200 text-sm">Districts</div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-xl bg-green-50 border border-green-100"
            >
              <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-800">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
