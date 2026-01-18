import { Progress } from "@/components/ui/progress";
import { Layers, CheckCircle2, Clock, XCircle } from "lucide-react";

interface GameProgressProps {
  totalCards: number;
  yesCount: number;
  notYetCount: number;
  noCount: number;
  remainingCards: number;
}

export function GameProgress({
  totalCards,
  yesCount,
  notYetCount,
  noCount,
  remainingCards,
}: GameProgressProps) {
  const completedCount = yesCount + notYetCount + noCount;
  const progressPercent = (completedCount / totalCards) * 100;

  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progreso</span>
          <span className="font-medium">
            {completedCount}/{totalCards} cartas
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
          <Layers className="w-4 h-4 text-primary mb-1" />
          <span className="text-lg font-bold text-foreground">
            {remainingCards}
          </span>
          <span className="text-xs text-muted-foreground">Restantes</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-dor-yes/10">
          <CheckCircle2 className="w-4 h-4 text-dor-yes mb-1" />
          <span className="text-lg font-bold text-dor-yes">{yesCount}</span>
          <span className="text-xs text-muted-foreground">SÍ</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-dor-not-yet/10">
          <Clock className="w-4 h-4 text-dor-not-yet mb-1" />
          <span className="text-lg font-bold text-dor-not-yet">
            {notYetCount}
          </span>
          <span className="text-xs text-muted-foreground">AÚN NO</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-dor-no/10">
          <XCircle className="w-4 h-4 text-dor-no mb-1" />
          <span className="text-lg font-bold text-dor-no">{noCount}</span>
          <span className="text-xs text-muted-foreground">NO</span>
        </div>
      </div>
    </div>
  );
}
