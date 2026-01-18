import { Button } from "@/components/ui/button";
import { Play, Users, Info, Clock } from "lucide-react";
import { CardBackCover } from "./DorCardComponent";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex mb-6">
            <CardBackCover className="w-20 h-28 shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            DoR Kards
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Un juego de cartas para definir los criterios de
            <strong className="text-foreground"> Definition of Ready</strong> de
            tu equipo
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Para Equipos</h3>
            <p className="text-xs text-muted-foreground">
              Ideal para equipos ágiles de desarrollo de software
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">30-60 Minutos</h3>
            <p className="text-xs text-muted-foreground">
              Tiempo estimado para completar todas las cartas
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <Info className="w-8 h-8 text-category-valuable mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">25+ Criterios</h3>
            <p className="text-xs text-muted-foreground">
              Basados en el modelo INVEST
            </p>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 text-center">¿Cómo jugar?</h2>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span className="text-muted-foreground">
                De a uno, cada jugador{" "}
                <strong className="text-foreground">roba una carta</strong> y la
                lee en voz alta al equipo.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span className="text-muted-foreground">
                Ubica la carta en{" "}
                <strong className="text-foreground">SÍ, AÚN NO o NO</strong>{" "}
                según considere más adecuado.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span className="text-muted-foreground">
                Si alguien no coincide,{" "}
                <strong className="text-foreground">
                  conversen para lograr consenso
                </strong>{" "}
                (máx. 2 min).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                4
              </span>
              <span className="text-muted-foreground">
                Si no hay consenso al finalizar, la carta va a{" "}
                <strong className="text-foreground">NO</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                5
              </span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Puedes mover cartas</strong>{" "}
                entre columnas en cualquier momento si cambian de opinión.
              </span>
            </li>
          </ol>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button
            onClick={onStart}
            size="lg"
            className="gap-2 text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
          >
            <Play className="w-5 h-5" />
            Comenzar Juego
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          CodeScout &copy; 2026
        </p>
      </div>
    </div>
  );
}
