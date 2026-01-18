import { ColumnType, DorCard } from "@/data/dorCards";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle, GripVertical } from "lucide-react";
import { categoryColors, categoryBorderColors } from "@/data/dorCards";

interface DropColumnProps {
  type: ColumnType;
  cards: DorCard[];
  onCardClick?: (card: DorCard) => void;
  isDropTarget?: boolean;
  onDrop?: (cardId?: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onCardDragStart?: (cardId: number, sourceColumn: ColumnType) => void;
}

const columnConfig = {
  yes: {
    title: "SÍ",
    subtitle: "El equipo se compromete con estos criterios",
    icon: CheckCircle2,
    bgClass: "bg-dor-yes/10",
    borderClass: "border-dor-yes",
    headerClass: "bg-dor-yes text-dor-yes-foreground",
    iconClass: "text-dor-yes",
  },
  "not-yet": {
    title: "AÚN NO",
    subtitle: "Se podrían considerar en el futuro",
    icon: Clock,
    bgClass: "bg-dor-not-yet/10",
    borderClass: "border-dor-not-yet",
    headerClass: "bg-dor-not-yet text-dor-not-yet-foreground",
    iconClass: "text-dor-not-yet",
  },
  no: {
    title: "NO",
    subtitle: "No aplican o no hubo consenso",
    icon: XCircle,
    bgClass: "bg-dor-no/10",
    borderClass: "border-dor-no",
    headerClass: "bg-dor-no text-dor-no-foreground",
    iconClass: "text-dor-no",
  },
  deck: {
    title: "MAZO",
    subtitle: "Cartas restantes",
    icon: Clock,
    bgClass: "bg-muted/50",
    borderClass: "border-muted",
    headerClass: "bg-muted text-muted-foreground",
    iconClass: "text-muted-foreground",
  },
};

// Draggable card component for columns
function DraggableCard({
  card,
  sourceColumn,
  onDragStart,
}: {
  card: DorCard;
  sourceColumn: ColumnType;
  onDragStart: (cardId: number, sourceColumn: ColumnType) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("cardId", card.id.toString());
        e.dataTransfer.setData("sourceColumn", sourceColumn);
        onDragStart(card.id, sourceColumn);
      }}
      className={cn(
        "relative cursor-grab active:cursor-grabbing transition-all duration-300",
        "flex flex-col rounded-xl border-2 bg-card shadow-sm hover:shadow-md",
        "hover:scale-[1.02]",
        categoryBorderColors[card.category],
      )}
    >
      {/* Drag Handle */}
      <div className="absolute top-2 right-2 text-muted-foreground/50">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Category Badge */}
      <div
        className={cn(
          "px-3 py-1.5 text-xs font-semibold tracking-wide rounded-t-lg",
          categoryColors[card.category],
          "text-primary-foreground",
        )}
      >
        <span className="flex items-center gap-2">
          <span className="opacity-70">#{card.id}</span>
          <span>{card.category}</span>
        </span>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-3">
        <h3 className="font-semibold text-card-foreground text-sm leading-tight mb-1 pr-6">
          {card.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export function DropColumn({
  type,
  cards,
  onCardClick,
  isDropTarget = false,
  onDrop,
  onDragOver,
  onDragLeave,
  onCardDragStart,
}: DropColumnProps) {
  const config = columnConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border-2 transition-all duration-300 h-full",
        config.bgClass,
        isDropTarget ? config.borderClass : "border-transparent",
        isDropTarget && "ring-2 ring-offset-2 ring-offset-background",
        type === "yes" && isDropTarget && "ring-dor-yes",
        type === "not-yet" && isDropTarget && "ring-dor-not-yet",
        type === "no" && isDropTarget && "ring-dor-no",
      )}
      onDrop={(e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        onDrop?.(cardId ? parseInt(cardId) : undefined);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.(e);
      }}
      onDragLeave={onDragLeave}
    >
      {/* Header */}
      <div
        className={cn(
          "px-4 py-3 rounded-t-lg flex-shrink-0",
          config.headerClass,
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <h2 className="font-bold text-lg">{config.title}</h2>
          <span className="ml-auto text-sm opacity-80 font-medium">
            {cards.length}
          </span>
        </div>
        <p className="text-xs opacity-80 mt-0.5">{config.subtitle}</p>
      </div>

      {/* Cards Container */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[60vh]">
        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            card={card}
            sourceColumn={type}
            onDragStart={onCardDragStart || (() => {})}
          />
        ))}
        {cards.length === 0 && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm opacity-60">
            Arrastra cartas aquí
          </div>
        )}
      </div>
    </div>
  );
}
