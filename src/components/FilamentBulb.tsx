import { cn } from "@/lib/utils";
import lightingImg from "@/assets/lighting.png";
import nonImg from "@/assets/non.png";

interface FilamentBulbProps {
  isLit: boolean;
  letter?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

const FilamentBulb = ({
  isLit,
  letter,
  size = "md",
  delay = 0,
}: FilamentBulbProps) => {
  const sizeClasses = {
    sm: "w-14 h-20",
    md: "w-20 h-28",
    lg: "w-28 h-36",
  };

  const letterSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  const flickerDelay = Math.random() * 2;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all duration-700 cursor-pointer hover:scale-110",
        sizeClasses[size]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Bulb image */}
      <img
        src={isLit ? lightingImg : nonImg}
        alt={isLit ? "lit bulb" : "unlit bulb"}
        className={cn(
          "absolute inset-0 object-contain z-10 transition-all duration-500",
          sizeClasses[size]
        )}
        style={{
          animation: isLit
            ? "bulb-flicker 0.15s ease-in-out infinite alternate"
            : "none",
          animationDelay: `${flickerDelay}s`,
        }}
      />

      {/* Letter below bulb */}
      {letter && (
        <span
          className={cn(
            "absolute z-20 font-display font-bold transition-all duration-700",
            letterSizes[size],
            isLit
              ? "text-amber-900 opacity-100"
              : "text-transparent opacity-0"
          )}
          style={{
            top: "10%",
            marginTop: "80px",
            textShadow: isLit
              ? "0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.6)"
              : "none",
            transform: isLit ? "scale(1.5)" : "scale(0.5)",
            animation: isLit ? "letter-reveal 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards" : "none",
          }}
        >
          {letter}
        </span>
      )}

      {/* Glow when lit */}
      {isLit && (
        <>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-20px",
              background:
                "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
              animation: "glow-pulse 2s ease-in-out infinite",
              animationDelay: `${flickerDelay}s`,
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-40px",
              background:
                "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 60%)",
            }}
          />
        </>
      )}
    </div>
  );
};

export default FilamentBulb;
