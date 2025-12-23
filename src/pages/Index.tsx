import ChristmasTree from "@/components/ChristmasTree";
import KarmaDisplay from "@/components/KarmaDisplay";
import SnowEffect from "@/components/SnowEffect";
import backgroundImage from "@/assets/upside-down-bg.png";
import backgroundMusic from "@/assets/stranger_wars_theme.mp3";
import { useEffect, useRef } from "react";

// ============================================
// EDIT THIS VALUE TO CONTROL KARMA POINTS
// Each 2000 points lights up one bulb
// 14000+ points reveals all letters of "SUCCESS"
// ============================================
const KARMA_POINTS = 11540;
// ============================================

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(err => console.log("Audio autoplay blocked:", err));
        document.removeEventListener("click", playAudio);
      }
    };

    // Try to play on page load first
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {
        // If autoplay fails, wait for user interaction
        document.addEventListener("click", playAudio);
      });
    }

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background music */}
      <audio ref={audioRef} loop style={{ display: "none" }}>
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Background image with dark overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-background/70" />
      
      {/* Fog effect */}
      <div className="fog-overlay" />
      
      {/* Grain texture */}
      <div className="grain-overlay" />
      
      {/* Snow particles */}
      <SnowEffect />

      {/* Main content */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Event Title */}
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="stranger-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Upside Down into the Unknown
          </h1>
          <p className="stranger-subtitle text-lg sm:text-xl md:text-2xl">
            presented by mulearn geck
          </p>
        </header>

        {/* Karma Points Display */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <KarmaDisplay points={KARMA_POINTS} />
        </div>

        {/* Christmas Tree with Filament Bulbs */}
        <div 
          className="animate-fade-in" 
          style={{ animationDelay: "400ms" }}
        >
          <ChristmasTree karmaPoints={KARMA_POINTS} />
        </div>

        {/* Hidden message hint */}
        <p 
          className="mt-12 text-muted-foreground text-sm text-center max-w-md animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          Reach karma milestones to light up the bulbs and reveal the hidden message...
        </p>

        {/* Footer */}
        <footer 
          className="mt-16 text-center animate-fade-in"
          style={{ animationDelay: "800ms" }}
        >
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2025 muLearn GECK • Into the Upside Down
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            created by Fuad and Keerthana VS
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
