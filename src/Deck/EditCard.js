import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

//Component to wrap the CardForm component when editing cards
function EditCard({ deckId }) {
  const cardId = useParams().cardId;
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();

  useEffect(() => {
    setDeck({});
    setCard({});

    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckFromAPI = await readDeck(deckId, abortController.signal);
        setDeck(deckFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }

    async function loadCard() {
      try {
        const cardFromAPI = await readCard(cardId, abortController.signal);
        setCard({ ...cardFromAPI });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();
    loadCard();
  }, [cardId, deckId]);

  console.log(card, 1);

  const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();
    try {
      updateCard(card, abortController.signal);
      history.push(`/decks/${deckId}`);
      history.go(0);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  };

  if (!card.front) return <>Loading</>;

  return (
    <CardForm
      editing={true}
      deck={deck}
      card={card}
      setCard={setCard}
      handleSubmit={handleSubmit}
    />
  );
}

export default EditCard;
