import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { WelcomeScreen } from "@/components/game/WelcomeScreen";
import { ActiveCard } from "@/components/game/ActiveCard";
import { DropColumn } from "@/components/game/DropColumn";
import { GameProgress } from "@/components/game/GameProgress";
import { GameSummary } from "@/components/game/GameSummary";
import { CustomCardModal } from "@/components/game/CustomCardModal";
import { ColumnType } from "@/data/dorCards";
import { CardBackCover } from "@/components/game/DorCardComponent";
import { Button } from "@/components/ui/button";
import { Home, Plus, Sparkles } from "lucide-react";

const Index = () => {
  const {
    isGameStarted,
    isGameComplete,
    isGameCompleted,
    currentCard,
    deck,
    yesCards,
    notYetCards,
    noCards,
    history,
    customCards,
    totalCards,
    startGame,
    makeDecision,
    undoLastDecision,
    moveCardToColumn,
    restartGame,
    goToGame,
    goToSummary,
    addCustomCard,
  } = useGameState();

  const [dropTarget, setDropTarget] = useState<ColumnType | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<number | null>(null);
  const [isCustomCardModalOpen, setIsCustomCardModalOpen] = useState(false);

  const handleDrop = (column: ColumnType, cardId?: number) => {
    if (column === "deck") {
      setDropTarget(null);
      return;
    }

    // If we have a cardId, it's a card being moved from a column
    if (cardId && draggingCardId) {
      moveCardToColumn(cardId, column);
    } else if (currentCard) {
      // It's the current active card being dropped
      makeDecision(column as "yes" | "not-yet" | "no");
    }

    setDropTarget(null);
    setDraggingCardId(null);
  };

  const handleCardDragStart = (cardId: number, _sourceColumn: ColumnType) => {
    setDraggingCardId(cardId);
  };

  // Show welcome screen
  if (!isGameStarted) {
    return <WelcomeScreen onStart={startGame} />;
  }

  // Show summary when game is complete
  if (isGameCompleted) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <GameSummary
            yesCards={yesCards}
            notYetCards={notYetCards}
            noCards={noCards}
            onRestart={restartGame}
            onBackToGame={goToGame}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardBackCover className="w-fit h-fit" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomCardModalOpen(true)}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Carta</span>
              <Plus className="w-3 h-3" />
              {customCards.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({customCards.length})
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={restartGame}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Reiniciar</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        {/* Progress */}
        <div className="mb-6">
          <GameProgress
            totalCards={totalCards}
            yesCount={yesCards.length}
            notYetCount={notYetCards.length}
            noCount={noCards.length}
            remainingCards={deck.length + (currentCard ? 1 : 0)}
          />
        </div>

        {/* Game Area */}
        <div className="grid lg:grid-cols-4 gap-6 flex-1">
          {/* Left Side - Active Card */}
          <div className="lg:col-span-1 order-1 lg:order-none">
            {!isGameComplete && currentCard && (
              <div className="sticky top-24">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
                  Carta Actual
                </h2>
                <ActiveCard
                  card={currentCard}
                  onDecision={makeDecision}
                  onUndo={undoLastDecision}
                  canUndo={history.length > 0}
                />
              </div>
            )}
            {isGameComplete && (
              <div className="sticky top-24">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
                  ¡Juego Completo!
                </h2>
                <Button className="w-full" onClick={goToSummary}>
                  Ver Resumen
                </Button>
              </div>
            )}
          </div>

          {/* Right Side - Columns */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-4 h-full">
            <DropColumn
              type="yes"
              cards={yesCards}
              isDropTarget={dropTarget === "yes"}
              onDrop={(cardId) => handleDrop("yes", cardId)}
              onDragOver={() => setDropTarget("yes")}
              onDragLeave={() => setDropTarget(null)}
              onCardDragStart={handleCardDragStart}
            />
            <DropColumn
              type="not-yet"
              cards={notYetCards}
              isDropTarget={dropTarget === "not-yet"}
              onDrop={(cardId) => handleDrop("not-yet", cardId)}
              onDragOver={() => setDropTarget("not-yet")}
              onDragLeave={() => setDropTarget(null)}
              onCardDragStart={handleCardDragStart}
            />
            <DropColumn
              type="no"
              cards={noCards}
              isDropTarget={dropTarget === "no"}
              onDrop={(cardId) => handleDrop("no", cardId)}
              onDragOver={() => setDropTarget("no")}
              onDragLeave={() => setDropTarget(null)}
              onCardDragStart={handleCardDragStart}
            />
          </div>
        </div>
      </main>

      {/* Custom Card Modal */}
      <CustomCardModal
        isOpen={isCustomCardModalOpen}
        onClose={() => setIsCustomCardModalOpen(false)}
        onAddCard={addCustomCard}
        customCardCount={customCards.length}
      />
    </div>
  );
};

export default Index;
