import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";

//Form to edit a deck
function DeckEdit({ deckId }) {
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

  if (deck) {
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
              Edit
            </li>
          </ol>
        </nav>
        <h3>Edit Deck</h3>
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" name="name" value={deck.name} />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            name="description"
            value={deck.description}
          ></textarea>
          <br />
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            Cancel
          </Link>
          <button className="btn btn-primary">Save</button>
        </form>
      </>
    );
  }
  return <>Loading</>;
}

export default DeckEdit;
