import { DorCard, categoryColors, categoryBorderColors } from "@/data/dorCards";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";

interface ActiveCardProps {
  card: DorCard;
  onDecision: (decision: "yes" | "not-yet" | "no") => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export function ActiveCard({
  card,
  onDecision,
  onUndo,
  canUndo,
}: ActiveCardProps) {
  return (
    <div
      className="w-full max-w-md mx-auto"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("cardId", card.id.toString());
      }}
    >
      {/* Active Card Display */}
      <div
        className={cn(
          "relative rounded-2xl border-3 bg-card shadow-lg overflow-hidden",
          "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
          categoryBorderColors[card.category],
        )}
        style={{ borderWidth: "3px" }}
      >
        {/* Category Header */}
        <div
          className={cn(
            "px-5 py-3 text-sm font-bold tracking-wide",
            categoryColors[card.category],
            "text-primary-foreground",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span className="bg-primary-foreground/20 px-2 py-0.5 rounded text-xs">
                #{card.id}
              </span>
              <span>{card.category}</span>
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-card-foreground mb-3 leading-tight">
            {card.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Decision Buttons */}
        <div className="p-4 pt-0 grid grid-cols-3 gap-1">
          <Button
            onClick={() => onDecision("yes")}
            className="bg-dor-yes hover:bg-dor-yes/90 text-dor-yes-foreground font-semibold h-12 flex justify-center items-center gap-1"
          >
            <CheckCircle2 className="w-5 h-5" />
            SÍ
          </Button>
          <Button
            onClick={() => onDecision("not-yet")}
            className="bg-dor-not-yet hover:bg-dor-not-yet/90 text-dor-not-yet-foreground font-semibold h-12 flex justify-center items-center gap-1"
          >
            <Clock className="w-5 h-5" />
            AÚN NO
          </Button>
          <Button
            onClick={() => onDecision("no")}
            className="bg-dor-no hover:bg-dor-no/90 text-dor-no-foreground font-semibold h-12 flex justify-center items-center gap-1"
          >
            <XCircle className="w-5 h-5" />
            NO
          </Button>
        </div>
      </div>

      {/* Undo Button */}
      {canUndo && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={onUndo}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Deshacer última decisión
          </Button>
        </div>
      )}

      {/* Drag Hint */}
      <p className="text-center text-xs text-muted-foreground mt-4 opacity-70">
        También puedes arrastrar la carta a una columna
      </p>
    </div>
  );
}
