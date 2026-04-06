import { useEffect, useState } from "react";

const FALLBACK_LOGO =
  "/assets/file_00000000ee8c7208b7195e3f0161d038-019d63d5-db14-7133-b573-8c14be5bebb8.png";

interface SplashScreenProps {
  logoUrl?: string;
  onComplete: () => void;
}

export function SplashScreen({ logoUrl, onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"animate" | "fadeout">("animate");
  const [loop, setLoop] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Resolve the best logo src: provided > fallback
  const effectiveLogo = !logoUrl || imgError ? FALLBACK_LOGO : logoUrl;

  useEffect(() => {
    // Loop counter ticks every 600ms for pulse animation
    const loopTimer = setInterval(() => {
      setLoop((l) => l + 1);
    }, 600);

    // After 2.4s start fade out
    const fadeTimer = setTimeout(() => {
      clearInterval(loopTimer);
      setPhase("fadeout");
    }, 2400);

    // After fade, call onComplete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(loopTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const isEven = loop % 2 === 0;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 70%, #16a34a 100%)",
        transition: "opacity 0.6s ease",
        opacity: phase === "fadeout" ? 0 : 1,
        pointerEvents: phase === "fadeout" ? "none" : "auto",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "rgba(255,255,255,0.04)",
          top: "-80px",
          right: "-80px",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "rgba(255,255,255,0.04)",
          bottom: "-40px",
          left: "-40px",
        }}
      />

      {/* Main content */}
      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Logo container with pulse animation */}
        <div
          className="relative"
          style={{
            transform: isEven ? "scale(1.08)" : "scale(0.95)",
            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: isEven
                ? "0 0 60px 20px rgba(74, 222, 128, 0.4)"
                : "0 0 30px 8px rgba(74, 222, 128, 0.15)",
              transition: "box-shadow 0.5s ease",
              borderRadius: "50%",
            }}
          />

          {/* Always show image — use fallback if logo errors */}
          <img
            src={effectiveLogo}
            alt="ANSHIKA UDHYOG GROUP"
            className="rounded-full object-cover border-4 border-green-300"
            style={{ width: "140px", height: "140px", display: "block" }}
            onError={() => {
              if (!imgError) setImgError(true);
            }}
          />
        </div>

        {/* Company name */}
        <div className="text-center">
          <h1
            className="text-white font-black text-2xl md:text-3xl tracking-wider"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              letterSpacing: "0.08em",
            }}
          >
            ANSHIKA UDHYOG
          </h1>
          <h2
            className="text-green-200 font-bold text-lg md:text-xl tracking-widest mt-1"
            style={{ letterSpacing: "0.2em" }}
          >
            GROUP™
          </h2>
          <p className="text-green-300 text-sm mt-2 tracking-wide">
            Self Employment Revolution Scheme
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#86efac",
                opacity: loop % 3 === i ? 1 : 0.3,
                transform: loop % 3 === i ? "scale(1.4)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-10 text-center" style={{ opacity: 0.6 }}>
        <p className="text-green-300 text-xs tracking-widest uppercase">
          🌱 Empowering Communities Since 2020 🌱
        </p>
      </div>
    </div>
  );
}
