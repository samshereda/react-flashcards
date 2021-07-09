import React from "react";
import { Link } from "react-router-dom";

//Form used by EditCard and AddCard to input card data
function CardForm({ editing, deck, card, setCard, handleSubmit }) {
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

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
            {editing && card ? `Edit Card ${card.id}` : "Add Card"}
          </li>
        </ol>
      </nav>
      <h3>
        {deck.name}: {editing && card ? `Edit Card ${card.id}` : "Add Card"}
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <br />
        <textarea
          id="front"
          name="front"
          value={card.front}
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="back">Back</label>
        <br />
        <textarea
          id="back"
          name="back"
          value={card.back}
          onChange={handleChange}
        ></textarea>
        <br />
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
}

export default CardForm;
