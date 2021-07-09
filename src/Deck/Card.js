import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

//Card component for rendering cards in the DeckStudy component
function Card({ cards, deckId }) {
  const [cardNumber, setCardNumber] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const history = useHistory();

  function next() {
    setFlipped(false);
    setCardNumber(cardNumber + 1);
  }

  function deckEnd() {
    if (
      window.confirm(
        'Restart Cards? \n \n Click "Cancel" to return to the home page.'
      )
    ) {
      setCardNumber(0);
    } else {
      history.push("/");
    }
  }

  if (cards.length > 2) {
    if (flipped) {
      return (
        <div className="card">
          <h4>
            Card {cardNumber + 1} of {cards.length}
          </h4>
          <p>{cards[cardNumber].back}</p>
          <button
            className="btn btn-secondary"
            onClick={() => setFlipped(!flipped)}
          >
            Flip
          </button>
          <button
            className="btn btn-primary"
            onClick={cardNumber === cards.length - 1 ? deckEnd : next}
          >
            Next
          </button>
        </div>
      );
    }
    return (
      <div className="card">
        <h4>
          Card {cardNumber + 1} of {cards.length}
        </h4>
        <p>{cards[cardNumber].front}</p>
        <button
          className="btn btn-secondary"
          onClick={() => setFlipped(!flipped)}
        >
          Flip
        </button>
      </div>
    );
  }
  return (
    <>
      <h4>Not enough cards.</h4>
      <p>
        You need at least 3 cards to study. There are {cards.length} cards in
        this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        Add Cards
      </Link>
    </>
  );
}

export default Card;
