import { DorCard, categoryColors } from "@/data/dorCards";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Download,
  Share2,
} from "lucide-react";

interface GameSummaryProps {
  yesCards: DorCard[];
  notYetCards: DorCard[];
  noCards: DorCard[];
  onRestart: () => void;
  onBackToGame: () => void;
}

export function GameSummary({
  yesCards,
  notYetCards,
  noCards,
  onRestart,
  onBackToGame,
}: GameSummaryProps) {
  const exportResults = () => {
    const now = new Date().toLocaleDateString("es-ES");
    let text = `# Definition of Ready - Resultados del equipo\n`;
    text += `Fecha: ${now}\n\n`;

    text += `## ✅ SÍ - Criterios acordados (${yesCards.length})\n`;
    yesCards.forEach((card) => {
      text += `- ${card.title}\n`;
    });

    text += `\n## ⏳ AÚN NO - Para el futuro (${notYetCards.length})\n`;
    notYetCards.forEach((card) => {
      text += `- ${card.title}\n`;
    });

    text += `\n## ❌ NO - No aplican (${noCards.length})\n`;
    noCards.forEach((card) => {
      text += `- ${card.title}\n`;
    });

    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dor-resultados-${now.replace(/\//g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-in fade-in-0 duration-700">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          🎉 ¡Juego Completado!
        </h2>
        <p className="text-muted-foreground">
          Han definido su Definition of Ready como equipo
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-dor-yes/10 rounded-xl p-4 text-center border border-dor-yes/30">
          <CheckCircle2 className="w-8 h-8 text-dor-yes mx-auto mb-2" />
          <div className="text-3xl font-bold text-dor-yes">
            {yesCards.length}
          </div>
          <div className="text-sm text-muted-foreground">Criterios SÍ</div>
        </div>
        <div className="bg-dor-not-yet/10 rounded-xl p-4 text-center border border-dor-not-yet/30">
          <Clock className="w-8 h-8 text-dor-not-yet mx-auto mb-2" />
          <div className="text-3xl font-bold text-dor-not-yet">
            {notYetCards.length}
          </div>
          <div className="text-sm text-muted-foreground">Criterios AÚN NO</div>
        </div>
        <div className="bg-dor-no/10 rounded-xl p-4 text-center border border-dor-no/30">
          <XCircle className="w-8 h-8 text-dor-no mx-auto mb-2" />
          <div className="text-3xl font-bold text-dor-no">{noCards.length}</div>
          <div className="text-sm text-muted-foreground">Criterios NO</div>
        </div>
      </div>

      {/* Results Lists */}
      <div className="space-y-6">
        {/* SÍ Section */}
        {yesCards.length > 0 && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-dor-yes text-dor-yes-foreground px-4 py-3 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Criterios que el equipo se compromete a cumplir
            </div>
            <div className="p-4 space-y-2">
              {yesCards.map((card) => (
                <div
                  key={card.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg bg-muted/50",
                    "border-l-4",
                    `border-l-category-${card.category.toLowerCase()}`,
                  )}
                  style={{
                    borderLeftColor: `hsl(var(--cat-${card.category.toLowerCase()}))`,
                  }}
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    #{card.id}
                  </span>
                  <div>
                    <div className="font-medium text-sm">{card.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {card.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-dor-yes/5 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Acciones:</strong> Hacer visible estos criterios y
                chequear su cumplimiento antes de comprometerse con cualquier
                ítem.
              </p>
            </div>
          </div>
        )}

        {/* AÚN NO Section */}
        {notYetCards.length > 0 && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-dor-not-yet text-dor-not-yet-foreground px-4 py-3 font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Criterios para revisar en el futuro
            </div>
            <div className="p-4 space-y-2">
              {notYetCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    #{card.id}
                  </span>
                  <div>
                    <div className="font-medium text-sm">{card.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {card.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-dor-not-yet/5 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Acciones:</strong> Revisar estos criterios nuevamente en
                2-3 meses. Planificar acciones para avanzar hacia su inclusión.
              </p>
            </div>
          </div>
        )}

        {/* NO Section */}
        {noCards.length > 0 && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-dor-no text-dor-no-foreground px-4 py-3 font-semibold flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Criterios que no aplican actualmente
            </div>
            <div className="p-4 space-y-2">
              {noCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    #{card.id}
                  </span>
                  <div>
                    <div className="font-medium text-sm">{card.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {card.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-dor-no/5 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Acciones:</strong> Investigar para entender mejor
                algunos criterios. Volver a conversar sobre los que no tuvieron
                consenso.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button onClick={onBackToGame} variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" />
          Volver al Juego
        </Button>
        <Button onClick={exportResults} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar Resultados
        </Button>
        <Button
          onClick={onRestart}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <RotateCcw className="w-4 h-4" />
          Jugar de Nuevo
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          CodeScouts &copy; 2026
          <br />
          Distribuida bajo licencia CC BY-SA 3.0
        </p>
      </div>
    </div>
  );
}
