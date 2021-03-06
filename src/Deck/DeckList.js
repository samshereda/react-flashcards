import React from "react";
import { Link } from "react-router-dom";
import DeckItem from "./DeckItem";

//List of decks on the home screen
function DeckList({ decks }) {
  return (
    <>
      <Link to="/decks/new" className=" btn btn-secondary">
        + Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <DeckItem key={deck.id} deck={deck} />
        ))}
      </div>
    </>
  );
}

export default DeckList;
