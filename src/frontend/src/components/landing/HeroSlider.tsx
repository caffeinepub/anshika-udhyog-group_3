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
    <section
      className="relative w-full overflow-hidden"
      style={{
        /* Mobile: full viewport minus compact header (~52px)
           Desktop: viewport minus full header (~90px) */
        height: "calc(100vw * 0.56)",
        minHeight: "200px",
        maxHeight: "600px",
      }}
    >
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
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,101,52,0.85) 0%, rgba(20,83,45,0.7) 100%)",
            }}
          >
            <div className="text-center text-white px-4 w-full max-w-3xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-block bg-green-500 bg-opacity-80 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3">
                  {slides[current].subtitle}
                </span>
                <h1 className="text-lg sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight px-2">
                  {slides[current].title}
                </h1>
                <p className="text-xs sm:text-sm md:text-lg text-green-100 mb-3 md:mb-8 max-w-2xl mx-auto px-2 hidden sm:block">
                  {slides[current].description}
                </p>
                <div className="flex flex-row gap-2 justify-center px-2">
                  <button
                    type="button"
                    onClick={onCTAClick}
                    data-ocid="hero.primary_button"
                    className="bg-white text-green-800 hover:bg-green-50 font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-200 shadow-lg text-xs sm:text-base"
                  >
                    {slides[current].cta}
                  </button>
                  <button
                    type="button"
                    onClick={onCTAClick}
                    data-ocid="hero.secondary_button"
                    className="border-2 border-white text-white hover:bg-white hover:bg-opacity-20 font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-200 text-xs sm:text-base"
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
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all z-10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        type="button"
        onClick={next}
        data-ocid="hero.slider.next"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all z-10"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-2 rounded-full transition-all ${
              i === current ? "bg-white w-6" : "bg-white bg-opacity-50 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
