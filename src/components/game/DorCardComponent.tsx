import { DorCard, categoryColors, categoryBorderColors } from "@/data/dorCards";
import { cn } from "@/lib/utils";

interface DorCardComponentProps {
  card: DorCard;
  isActive?: boolean;
  isFlipped?: boolean;
  onClick?: () => void;
  className?: string;
}

export function DorCardComponent({ 
  card, 
  isActive = false, 
  isFlipped = false,
  onClick,
  className 
}: DorCardComponentProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all duration-300 transform-gpu perspective-1000",
        isActive && "scale-105 z-10",
        className
      )}
    >
      <div 
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front - Card Content */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden",
            "flex flex-col rounded-xl border-2 bg-card shadow-card",
            "hover:shadow-card-hover transition-shadow duration-300",
            categoryBorderColors[card.category]
          )}
        >
          {/* Category Badge */}
          <div 
            className={cn(
              "px-3 py-1.5 text-xs font-semibold tracking-wide rounded-t-lg",
              categoryColors[card.category],
              "text-primary-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <span className="opacity-70">#{card.id}</span>
              <span>{card.category}</span>
            </span>
          </div>
          
          {/* Card Content */}
          <div className="flex-1 flex flex-col p-4">
            <h3 className="font-semibold text-card-foreground text-sm leading-tight mb-2">
              {card.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              {card.description}
            </p>
          </div>
        </div>

        {/* Back - Card Back Design */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180",
            "flex items-center justify-center rounded-xl",
            "bg-gradient-to-br from-primary to-primary/80",
            "border-2 border-primary/50 shadow-card"
          )}
        >
          <div className="text-center">
            <span className="text-3xl font-bold text-primary-foreground opacity-90">DoR</span>
            <span className="block text-sm text-primary-foreground/70 mt-1">Kards</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardBackCover({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-xl",
        "bg-gradient-to-br from-primary to-primary/80",
        "border-2 border-primary/50 shadow-card",
        className
      )}
    >
      <div className="text-center">
        <span className="text-3xl font-bold text-primary-foreground opacity-90">DoR</span>
        <span className="block text-sm text-primary-foreground/70 mt-1">Kards</span>
      </div>
    </div>
  );
}
