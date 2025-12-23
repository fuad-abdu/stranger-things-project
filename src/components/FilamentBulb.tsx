import { cn } from "@/lib/utils";
import lightingImg from "@/assets/lighting.png";
import nonImg from "@/assets/non.png";
import type {BulbOverride} from "@/config/bulbOverrides";

interface FilamentBulbProps {
  isLit: boolean; // computed/automatic lit state from tree logic
  letter?: string;
  size?: "sm" | "md" | "lg";
  delay?: number; // default delay in ms passed from tree
  override?: BulbOverride | undefined; // manual override object (or simple mode)
}

const FilamentBulb = ({
  isLit,
  letter,
  size = "md",
  delay = 0,
  override,
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

  // Resolve override shape: allow simple string or object (handled upstream too)
  const overrideObj =
    override && typeof override === "object"
      ? override
      : override
      ? { mode: override as "on" | "off" | "auto" }
      : undefined;

  // Final lit state: override.mode can force on/off
  const finalLit = overrideObj?.mode === "on" ? true : overrideObj?.mode === "off" ? false : isLit;

  const brightness = Math.max(0, Math.min(1, overrideObj?.brightness ?? 1));
  const flickerEnabled = overrideObj?.flicker ?? true;
  const pulseEnabled = overrideObj?.pulse ?? true;
  const delayMs = overrideObj?.delayMs ?? delay;
  const tintColor = overrideObj?.color;

  const wrapperStyle: React.CSSProperties = { animationDelay: `${delayMs}ms` };

  const imgAnimation = finalLit && flickerEnabled ? "bulb-flicker 0.15s ease-in-out infinite alternate" : "none";

  const glowCenterBg = tintColor
    ? `radial-gradient(circle, ${tintColor} 0%, transparent 70%)`
    : `radial-gradient(circle, rgba(251,191,36,${0.25 * brightness}) 0%, transparent 70%)`;

  const glowOuterBg = tintColor
    ? `radial-gradient(circle, ${tintColor} 0%, transparent 60%)`
    : `radial-gradient(circle, rgba(251,191,36,${0.1 * brightness}) 0%, transparent 60%)`;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all duration-700 cursor-pointer hover:scale-110",
        sizeClasses[size]
      )}
      style={wrapperStyle}
    >
      {/* Bulb image */}
      <img
        src={finalLit ? lightingImg : nonImg}
        alt={finalLit ? "lit bulb" : "unlit bulb"}
        className={cn(
          "absolute inset-0 object-contain z-10 transition-all duration-500",
          sizeClasses[size]
        )}
        style={{
          animation: imgAnimation,
          animationDelay: `${flickerDelay}s`,
          opacity: finalLit ? brightness : 1,
        }}
      />

      {/* Letter below bulb */}
      {letter && (
        <span
          className={cn(
            "absolute z-20 font-display font-bold transition-all duration-700",
            letterSizes[size],
            finalLit ? "text-amber-900 opacity-100" : "text-transparent opacity-0"
          )}
          style={{
            top: "70%",
            marginTop: "0px",
            textShadow: finalLit
              ? "0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.6)"
              : "none",
            transform: finalLit ? "scale(1.5)" : "scale(0.5)",
            animation: finalLit ? "letter-reveal 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards" : "none",
          }}
        >
          {letter}
        </span>
      )}

      {/* Glow when lit */}
      {finalLit && (
        <>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-20px",
              background: glowCenterBg,
              animation: pulseEnabled ? "glow-pulse 2s ease-in-out infinite" : "none",
              animationDelay: `${flickerDelay}s`,
              opacity: brightness,
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-40px",
              background: glowOuterBg,
              opacity: 0.6 * brightness,
            }}
          />
        </>
      )}
    </div>
  );
};

export default FilamentBulb;
