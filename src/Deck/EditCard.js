import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {readDeck, readCard, updateCard} from "../utils/api/index";

function DeckEdit ({deckId}) {
  const cardId = useParams().cardId;
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();

  useEffect(() => {
    setDeck({});
    setCard({})
    
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
        setCard(cardFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    
    loadDeck()
    loadCard()
  }, [])

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    const abortController = new AbortController(); 
    event.preventDefault();
    try {
      updateCard(card, abortController.signal);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  };

  return (<>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
      </ol>
    </nav>
    <h3>{deck.name}: Edit Card</h3>
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">Front</label>
      <br />
      <textarea id="front" name="front" value={card.front} onChange={handleChange}></textarea>
      <br />
      <label htmlFor="back">Back</label>
      <br />
      <textarea id="back" name="back" value={card.back} onChange={handleChange}></textarea>
      <br/>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  </>)
}

export default DeckEdit