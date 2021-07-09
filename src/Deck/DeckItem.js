import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

//Deck component shown on DeckList
function DeckItem({ deck }) {
  const history = useHistory();
  function deleteDeckHandler(deckId) {
    const abortController = new AbortController();
    if (window.confirm("Delete this deck?")) {
      try {
        deleteDeck(deckId, abortController.signal);
        history.go(0);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
  }

  return (
    <div className="card">
      <h3>{deck.name}</h3>
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
        View
      </Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
        Study
      </Link>
      <button
        className="btn btn-danger"
        onClick={() => deleteDeckHandler(deck.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default DeckItem;
