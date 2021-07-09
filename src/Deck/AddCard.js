import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./CardForm";

//Component to wrap the CardForm component when adding cards
function AddCard({ deckId }) {
  const history = useHistory();
  const abortController = new AbortController();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck([]);
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
    loadDeck();
  }, [deckId]);

  const [card, setCard] = useState({ front: "", back: "" });

  const handleSubmit = (event) => {
    console.log("submitted");
    event.preventDefault();
    try {
      createCard(deck.id, card, abortController.signal);
      history.push(`/decks/${deck.id}`);
      history.go(0);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  };

  return (
    <CardForm
      editing={false}
      deck={deck}
      card={card}
      setCard={setCard}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddCard;
