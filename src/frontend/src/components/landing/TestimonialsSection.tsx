import { Quote } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    designation: "Gold Member, Lucknow",
    text: "Joining ANSHIKA UDHYOG GROUP changed my life. Through their employment scheme, I started my own tailoring business and now employ 5 other people. Their guidance and support made it possible.",
    image: "/assets/generated/testimonial-1.dim_100x100.jpg",
    stars: 5,
  },
  {
    id: 2,
    name: "Priya Devi Singh",
    designation: "Silver Member, Kanpur",
    text: "The digital marketing internship I completed through this organization gave me the skills to work from home. I am now earning independently while taking care of my family. Truly life-changing!",
    image: "/assets/generated/testimonial-2.dim_100x100.jpg",
    stars: 5,
  },
  {
    id: 3,
    name: "Mohan Lal Gupta",
    designation: "Member, Agra",
    text: "The team helped me apply for government schemes that I never knew existed. I received a subsidy loan for my small grocery business. The membership was worth every rupee invested.",
    image: "/assets/generated/testimonial-1.dim_100x100.jpg",
    stars: 5,
  },
];

export function TestimonialsSection() {
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Stories of <span className="text-green-700">Transformation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-xs hover:shadow-md transition-shadow border border-green-100"
            >
              <Quote className="w-8 h-8 text-green-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-green-600 text-xs">{t.designation}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {"★"
                      .repeat(t.stars)
                      .split("")
                      .map((star, si) => (
                        <span
                          key={`star-${t.id}-${si}`}
                          className="text-yellow-400 text-xs"
                        >
                          {star}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
