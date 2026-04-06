import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";

const INCOME_PLANS = [
  {
    id: "p1",
    emoji: "💰",
    title: "Direct Sales Income",
    desc: "Earn by selling AUG products and services directly to customers.",
    earning: "\u20B95,000 - \u20B925,000/month",
    color: "bg-green-50 border-green-200",
  },
  {
    id: "p2",
    emoji: "🤝",
    title: "Team Building Bonus",
    desc: "Earn bonuses when you build and grow your team of active members.",
    earning: "\u20B910,000 - \u20B950,000/month",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "p3",
    emoji: "🏆",
    title: "Leadership Rewards",
    desc: "Special rewards for achieving leadership milestones in the organization.",
    earning: "\u20B920,000 - \u20B91,00,000/month",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "p4",
    emoji: "🏠",
    title: "Franchise Income",
    desc: "Open your own AUG franchise and earn from operations in your area.",
    earning: "\u20B950,000 - \u20B95,00,000/month",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: "p5",
    emoji: "🌱",
    title: "Social Work Allowance",
    desc: "Monthly allowance for active NGO and community service activities.",
    earning: "\u20B93,000 - \u20B910,000/month",
    color: "bg-teal-50 border-teal-200",
  },
  {
    id: "p6",
    emoji: "📊",
    title: "Performance Incentive",
    desc: "Quarterly performance-based incentives for top performers.",
    earning: "\u20B915,000 - \u20B975,000/quarter",
    color: "bg-orange-50 border-orange-200",
  },
];

const ROADMAP = [
  {
    step: 1,
    title: "Join as Member",
    desc: "Register and complete KYC verification",
    icon: "📝",
  },
  {
    step: 2,
    title: "Pay Membership Fee",
    desc: "Choose your membership plan and make payment",
    icon: "💳",
  },
  {
    step: 3,
    title: "Attend Training",
    desc: "Complete mandatory orientation and skill training",
    icon: "🎓",
  },
  {
    step: 4,
    title: "Start Selling",
    desc: "Begin selling products and enrolling new members",
    icon: "🛍️",
  },
  {
    step: 5,
    title: "Build Your Team",
    desc: "Recruit and mentor your team for higher earnings",
    icon: "🤝",
  },
  {
    step: 6,
    title: "Achieve Leadership",
    desc: "Reach leadership level for maximum benefits",
    icon: "🏆",
  },
];

const GALLERY_IMAGES = [
  "/assets/generated/hero-ngo-activities.dim_1400x600.jpg",
  "/assets/generated/hero-employment-scheme.dim_1400x600.jpg",
  "/assets/generated/hero-training-programs.dim_1400x600.jpg",
  "/assets/generated/income-plan-roadmap.dim_1200x600.jpg",
];

export function MultiIncomePlanPage({
  onJoinClick,
}: { onJoinClick?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div
        className="py-16 md:py-24 text-white text-center px-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #166534 0%, #14532d 60%, #0f3820 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Multiple Income Sources
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Multiple Income
            <br />
            <span className="text-yellow-300">Opportunity</span> Plan
          </h1>
          <p className="text-green-100 max-w-2xl mx-auto text-base md:text-lg mb-8">
            Earn from 6+ income streams. Build your financial freedom with
            ANSHIKA UDHYOG GROUP™
          </p>
          <Button
            onClick={onJoinClick}
            className="bg-white text-green-800 hover:bg-green-50 font-bold px-8 py-3 text-lg rounded-xl shadow-lg"
            data-ocid="income.join.primary_button"
          >
            Join Now &amp; Start Earning
          </Button>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Income Plans Grid */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            💰 Income Streams
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Choose one or earn from all
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INCOME_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border-2 p-5 ${plan.color} hover:shadow-md transition-shadow`}
              >
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{plan.desc}</p>
                <div className="bg-white bg-opacity-70 rounded-lg p-2 text-center">
                  <span className="font-bold text-green-700 text-sm">
                    {plan.earning}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            📍 Success Roadmap
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Your step-by-step journey to financial freedom
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200 hidden md:block" />
            <div className="space-y-4">
              {ROADMAP.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold shadow-md relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #166534, #16a34a)",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="bg-white rounded-xl p-4 flex-1 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        Step {item.step}
                      </span>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blueprint Table */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            📊 Earnings Blueprint
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Detailed earnings at each level
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{ backgroundColor: "#166534" }}
                    className="text-white"
                  >
                    <th className="p-3 text-left">Level</th>
                    <th className="p-3 text-left">Designation</th>
                    <th className="p-3 text-left">Direct Sales</th>
                    <th className="p-3 text-left">Team Bonus</th>
                    <th className="p-3 text-left">Total/Month</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      level: 1,
                      designation: "Member",
                      direct: "\u20B95,000",
                      team: "-",
                      total: "\u20B95,000",
                    },
                    {
                      level: 2,
                      designation: "Senior Member",
                      direct: "\u20B910,000",
                      team: "\u20B93,000",
                      total: "\u20B913,000",
                    },
                    {
                      level: 3,
                      designation: "Coordinator",
                      direct: "\u20B915,000",
                      team: "\u20B98,000",
                      total: "\u20B923,000",
                    },
                    {
                      level: 4,
                      designation: "Manager",
                      direct: "\u20B920,000",
                      team: "\u20B915,000",
                      total: "\u20B935,000",
                    },
                    {
                      level: 5,
                      designation: "Director",
                      direct: "\u20B930,000",
                      team: "\u20B925,000",
                      total: "\u20B955,000",
                    },
                    {
                      level: 6,
                      designation: "President",
                      direct: "\u20B950,000+",
                      team: "\u20B950,000+",
                      total: "\u20B91,00,000+",
                    },
                  ].map((row, rowIdx) => (
                    <tr
                      key={row.designation}
                      className={`border-b ${rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="p-3 font-bold text-green-700">
                        {row.level}
                      </td>
                      <td className="p-3 font-medium">{row.designation}</td>
                      <td className="p-3 text-green-600">{row.direct}</td>
                      <td className="p-3 text-blue-600">{row.team}</td>
                      <td className="p-3 font-bold text-gray-900">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Gallery - Auto Looping */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            📷 Our Activities Gallery
          </h2>
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex gap-4"
              style={{
                animation: "galleryScroll 15s linear infinite",
              }}
            >
              {GALLERY_IMAGES.concat(GALLERY_IMAGES).map((img, slideNum) => (
                <img
                  key={`slide-${img.slice(-20)}-${slideNum}`}
                  src={img}
                  alt="AUG community activities"
                  className="w-72 md:w-96 h-48 object-cover rounded-xl flex-shrink-0"
                />
              ))}
            </div>
          </div>
          <style>{`
            @keyframes galleryScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* CTA */}
        <section className="text-center bg-green-50 rounded-2xl p-10 border border-green-200">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">
            Start Your Journey Today!
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Join thousands of members who are already earning multiple incomes
            with ANSHIKA UDHYOG GROUP
          </p>
          <Button
            onClick={onJoinClick}
            className="px-10 py-4 text-lg font-bold rounded-xl shadow-lg"
            style={{ backgroundColor: "#166534" }}
            data-ocid="income.join.cta_button"
          >
            Register Now - Start Earning!
          </Button>
        </section>
      </div>
    </div>
  );
}
