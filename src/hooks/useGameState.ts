import { useState, useCallback } from "react";
import {
  DorCard,
  ColumnType,
  dorCards,
  orderCardsByCategory,
} from "@/data/dorCards";

interface GameState {
  deck: DorCard[];
  yesCards: DorCard[];
  notYetCards: DorCard[];
  noCards: DorCard[];
  currentCard: DorCard | null;
  history: Array<{
    card: DorCard;
    decision: ColumnType;
  }>;
  customCards: DorCard[];
  nextCustomId: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
  isGameCompleted: boolean;
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    deck: [],
    yesCards: [],
    notYetCards: [],
    noCards: [],
    currentCard: null,
    history: [],
    customCards: [],
    nextCustomId: 26,
    isGameStarted: false,
    isGameComplete: false,
    isGameCompleted: false,
  }));

  const startGame = useCallback(() => {
    // Order base cards by category, then prepend custom cards at the front
    const orderedBaseCards = orderCardsByCategory(dorCards);
    const allCards = [...gameState.customCards, ...orderedBaseCards];
    const [firstCard, ...restDeck] = allCards;

    setGameState((prev) => ({
      ...prev,
      deck: restDeck,
      yesCards: [],
      notYetCards: [],
      noCards: [],
      currentCard: firstCard,
      history: [],
      isGameStarted: true,
      isGameComplete: false,
      isGameCompleted: false,
    }));
  }, [gameState.customCards]);

  const addCustomCard = useCallback(
    (cardData: { title: string; description: string }) => {
      setGameState((prev) => {
        const newCard: DorCard = {
          id: prev.nextCustomId,
          category: "Personalizado",
          title: cardData.title,
          description: cardData.description,
        };

        return {
          ...prev,
          customCards: [...prev.customCards, newCard],
          nextCustomId: prev.nextCustomId + 1,
          currentCard: newCard,
          isGameComplete: false,
        };
      });
    },
    [],
  );

  const removeCustomCard = useCallback((cardId: number) => {
    setGameState((prev) => ({
      ...prev,
      customCards: prev.customCards.filter((c) => c.id !== cardId),
    }));
  }, []);

  const makeDecision = useCallback((decision: "yes" | "not-yet" | "no") => {
    setGameState((prev) => {
      if (!prev.currentCard) return prev;

      const newHistory = [
        ...prev.history,
        { card: prev.currentCard, decision },
      ];
      const [nextCard, ...restDeck] = prev.deck;

      const newState: GameState = {
        ...prev,
        deck: restDeck,
        currentCard: nextCard || null,
        history: newHistory,
        isGameComplete: !nextCard,
      };

      // Add card to the appropriate column
      switch (decision) {
        case "yes":
          newState.yesCards = [...prev.yesCards, prev.currentCard];
          break;
        case "not-yet":
          newState.notYetCards = [...prev.notYetCards, prev.currentCard];
          break;
        case "no":
          newState.noCards = [...prev.noCards, prev.currentCard];
          break;
      }

      return newState;
    });
  }, []);

  const undoLastDecision = useCallback(() => {
    setGameState((prev) => {
      if (prev.history.length === 0) return prev;

      const lastMove = prev.history[prev.history.length - 1];
      const newHistory = prev.history.slice(0, -1);

      // Put current card back to deck if exists
      const newDeck = prev.currentCard
        ? [prev.currentCard, ...prev.deck]
        : prev.deck;

      // Remove the last card from its column
      let newYesCards = prev.yesCards;
      let newNotYetCards = prev.notYetCards;
      let newNoCards = prev.noCards;

      switch (lastMove.decision) {
        case "yes":
          newYesCards = prev.yesCards.filter((c) => c.id !== lastMove.card.id);
          break;
        case "not-yet":
          newNotYetCards = prev.notYetCards.filter(
            (c) => c.id !== lastMove.card.id,
          );
          break;
        case "no":
          newNoCards = prev.noCards.filter((c) => c.id !== lastMove.card.id);
          break;
      }

      return {
        ...prev,
        deck: newDeck,
        yesCards: newYesCards,
        notYetCards: newNotYetCards,
        noCards: newNoCards,
        currentCard: lastMove.card,
        history: newHistory,
        isGameComplete: false,
      };
    });
  }, []);

  const moveCardToColumn = useCallback(
    (cardId: number, targetColumn: ColumnType) => {
      if (targetColumn === "deck") return;

      setGameState((prev) => {
        // Find the card in current position
        if (prev.currentCard?.id === cardId) {
          // It's the active card, just make the decision
          return prev;
        }

        // Find card in columns
        let card: DorCard | undefined;
        let sourceColumn: ColumnType = "deck";

        if (prev.yesCards.find((c) => c.id === cardId)) {
          card = prev.yesCards.find((c) => c.id === cardId);
          sourceColumn = "yes";
        } else if (prev.notYetCards.find((c) => c.id === cardId)) {
          card = prev.notYetCards.find((c) => c.id === cardId);
          sourceColumn = "not-yet";
        } else if (prev.noCards.find((c) => c.id === cardId)) {
          card = prev.noCards.find((c) => c.id === cardId);
          sourceColumn = "no";
        }

        if (!card || sourceColumn === targetColumn) return prev;

        // Remove from source
        let newYesCards =
          sourceColumn === "yes"
            ? prev.yesCards.filter((c) => c.id !== cardId)
            : prev.yesCards;
        let newNotYetCards =
          sourceColumn === "not-yet"
            ? prev.notYetCards.filter((c) => c.id !== cardId)
            : prev.notYetCards;
        let newNoCards =
          sourceColumn === "no"
            ? prev.noCards.filter((c) => c.id !== cardId)
            : prev.noCards;

        // Add to target
        switch (targetColumn) {
          case "yes":
            newYesCards = [...newYesCards, card];
            break;
          case "not-yet":
            newNotYetCards = [...newNotYetCards, card];
            break;
          case "no":
            newNoCards = [...newNoCards, card];
            break;
        }

        return {
          ...prev,
          yesCards: newYesCards,
          notYetCards: newNotYetCards,
          noCards: newNoCards,
        };
      });
    },
    [],
  );

  const restartGame = useCallback(() => {
    setGameState((prev) => ({
      deck: [],
      yesCards: [],
      notYetCards: [],
      noCards: [],
      currentCard: null,
      history: [],
      customCards: prev.customCards, // Keep custom cards
      nextCustomId: prev.nextCustomId,
      isGameStarted: false,
      isGameComplete: false,
      isGameCompleted: false,
    }));
  }, []);

  const goToSummary = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameCompleted: true,
    }));
  }, []);

  const goToGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameCompleted: false,
    }));
  }, []);

  const totalCards = dorCards.length + gameState.customCards.length;

  return {
    ...gameState,
    startGame,
    makeDecision,
    undoLastDecision,
    moveCardToColumn,
    restartGame,
    goToSummary,
    goToGame,
    addCustomCard,
    removeCustomCard,
    totalCards,
  };
}
