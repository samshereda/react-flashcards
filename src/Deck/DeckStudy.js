import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Card from "./Card";

//View that shows cards in order when studying
function DeckStudy({ deckId }) {
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

  if (deck.cards) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h3>Study: {deck.name}</h3>
        <Card cards={deck.cards} deckId={deckId} />
      </>
    );
  }
  return <>Loading</>;
}

export default DeckStudy;
