interface KarmaDisplayProps {
  points: number;
}

const KarmaDisplay = ({ points }: KarmaDisplayProps) => {
  // Format number with commas
  const formattedPoints = points.toLocaleString();
  
  // Calculate progress to next milestone
  const nextMilestone = (Math.floor(points / 5000) + 1) * 5000;
  const progress = ((points % 5000) / 5000) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2 font-medium">
          Total Karma Points
        </p>
        <p className="karma-display text-6xl md:text-7xl font-display">
          {formattedPoints}
        </p>
      </div>

      {/* Progress bar to next milestone */}
      <div className="w-64 md:w-80">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Next milestone</span>
          <span>{nextMilestone.toLocaleString()}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default KarmaDisplay;
