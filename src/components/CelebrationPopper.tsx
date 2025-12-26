import { useEffect } from "react";

interface CelebrationPopperProps {
  duration?: number; // milliseconds to show
  onClose?: () => void;
}

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];

const CelebrationPopper = ({ duration = 3000, onClose }: CelebrationPopperProps) => {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const pieces = Array.from({ length: 40 });

  return (
    <div
      className="celebration-overlay"
      role="dialog"
      aria-label="Celebration"
      onClick={() => onClose?.()}
    >
      <div className="celebration-popper" aria-hidden>
        {pieces.map((_, i) => {
          const left = Math.round(Math.random() * 100);
          const bg = COLORS[i % COLORS.length];
          const delay = (Math.random() * 0.8).toFixed(2);
          const dur = 1400 + Math.round(Math.random() * 1400);
          const translateX = Math.round((Math.random() - 0.5) * 200);

          return (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${left}%`,
                background: bg,
                animationDelay: `${delay}s`,
                animationDuration: `${dur}ms`,
                transform: `translateX(${translateX}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CelebrationPopper;
