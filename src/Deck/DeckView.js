import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";

//View when looking at a specific deck
function DeckView({ deckId }) {
  const [deck, setDeck] = useState([]);
  const history = useHistory();

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

  function deleteCardHandler(cardId) {
    const abortController = new AbortController();
    if (window.confirm("Delete this Card?")) {
      try {
        deleteCard(cardId, abortController.signal);
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

  if (deck.cards) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
        <button className="btn btn-danger">Delete</button>
        <h2>Cards</h2>
        <div className="card">
          <ul className="list-group list-group-flush">
            {deck.cards.map((card) => {
              return (
                <li key={card.id} className="list-group-item">
                  <p>{card.front}</p>
                  <p>{card.back}</p>
                  <Link
                    to={`/decks/${deck.id}/cards/${card.id}/edit`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCardHandler(card.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
  return <>Loading</>;
}

export default DeckView;
