import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/assets/generated/hero-ngo-activities.dim_1400x600.jpg",
    title: "Community NGO Activities",
    subtitle: "Empowering Rural Communities",
    description:
      "Providing healthcare, education, and essential services to underprivileged communities across Uttar Pradesh.",
    cta: "Learn More",
  },
  {
    id: 2,
    image: "/assets/generated/hero-employment-scheme.dim_1400x600.jpg",
    title: "Self Employment Revolution",
    subtitle: "Build Your Future Today",
    description:
      "Join thousands of entrepreneurs who have transformed their lives through our employment schemes and business support programs.",
    cta: "Join Now",
  },
  {
    id: 3,
    image: "/assets/generated/hero-training-programs.dim_1400x600.jpg",
    title: "Skill Development Programs",
    subtitle: "Skills for a Better Tomorrow",
    description:
      "World-class vocational training in digital skills, technology, handicrafts, and entrepreneurship for youth and women.",
    cta: "Explore Programs",
  },
];

interface HeroSliderProps {
  onCTAClick: () => void;
}

export function HeroSlider({ onCTAClick }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 gradient-hero flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-block bg-green-500 bg-opacity-80 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  {slides[current].subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {slides[current].title}
                </h1>
                <p className="text-base md:text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                  {slides[current].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    onClick={onCTAClick}
                    data-ocid="hero.primary_button"
                    className="bg-white text-green-800 hover:bg-green-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg"
                  >
                    {slides[current].cta}
                  </button>
                  <button
                    type="button"
                    onClick={onCTAClick}
                    data-ocid="hero.secondary_button"
                    className="border-2 border-white text-white hover:bg-white hover:bg-opacity-20 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
                  >
                    Become a Member
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prev}
        data-ocid="hero.slider.prev"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={next}
        data-ocid="hero.slider.next"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
