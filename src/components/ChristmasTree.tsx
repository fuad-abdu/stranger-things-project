import { Star } from "lucide-react";
import FilamentBulb from "./FilamentBulb";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ChristmasTreeProps {
  karmaPoints: number;
}

const ChristmasTree = ({ karmaPoints }: ChristmasTreeProps) => {
  // Calculate how many bulbs should be lit (every 5000 karma = 1 bulb)
  const litBulbCount = Math.floor(karmaPoints / 5000);
  
  // The word "SUCCESS" has 7 letters - these are revealed in order
  const successLetters = ["S", "U", "C", "C", "E", "S", "S"];
  const totalLetters = successLetters.length;
  
  // Star lights up when all letters are revealed
  const isStarLit = litBulbCount >= totalLetters;

  // Tree layout - 4 rows of 5 bulbs each
  // Letters are assigned to specific bulbs that light up at karma milestones
  const treeLayout = [
    { count: 5, letters: { 0: 0, 2: 1 } },        // Row 1: 5 bulbs, letters "S" "U" at positions 0,2
    { count: 5, letters: { 1: 2, 3: 3 } },        // Row 2: 5 bulbs, letters "C" "C" at positions 1,3
    { count: 5, letters: { 2: 4 } },              // Row 3: 5 bulbs, letter "E" at center (position 2)
    { count: 5, letters: { 1: 5, 4: 6 } },        // Row 4: 5 bulbs, letters "S" "S" at positions 1,4
  ];

  const [bulbSize, setBulbSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const updateSize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 480) setBulbSize("sm");
      else if (w < 768) setBulbSize("md");
      else setBulbSize("lg");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 relative px-4 w-full max-w-6xl mx-auto rounded-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>

      {/* Tree Rows */}
      <div className="flex flex-col items-center w-full">
        {treeLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full">
            <div
              className="grid grid-cols-5 items-center justify-items-center relative"
              style={{
                gap: "clamp(8px, 3vw, 28px)",
                marginBottom: "8px",
                padding: "6px 8px",
              }}
            >
            {/* Wire connecting bulbs */}
            {row.count > 1 && (
              <svg
                className="absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none"
                style={{
                  width: "100%",
                  height: "2px",
                  left: 0,
                  right: 0,
                }}
                preserveAspectRatio="none"
              >
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#57534e"
                  strokeWidth="1"
                  strokeDasharray="none"
                />
              </svg>
            )}
            
            {Array.from({ length: row.count }).map((_, bulbIndex) => {
              const letterIndex = row.letters[bulbIndex];
              const hasLetter = letterIndex !== undefined;
              const letter = hasLetter ? successLetters[letterIndex] : undefined;
              
              // A bulb with a letter lights up when karma reaches that letter's milestone
              // letterIndex 0 = 5000 karma, letterIndex 1 = 10000 karma, etc.
              const isLit = hasLetter && litBulbCount > letterIndex;
              
              return (
                  <div key={`${rowIndex}-${bulbIndex}`} className="w-full flex items-center justify-center">
                    <FilamentBulb
                      isLit={isLit}
                      letter={letter}
                      size={bulbSize}
                      delay={rowIndex * 100 + bulbIndex * 50}
                    />
                  </div>
              );
            })}
              </div>
          </div>
        ))}
      </div>

      {/* Ground shadow */}
      <div 
        className="w-32 h-2 rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)",
          marginTop: "-8px",
        }}
      />
    </div>
  );
};

export default ChristmasTree;
