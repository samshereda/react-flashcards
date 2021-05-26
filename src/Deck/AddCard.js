import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index"; 

function AddCard({deckId}) {
  const history=useHistory();
  const abortController = new AbortController(); 
  const [deck, setDeck] = useState([])


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
    loadDeck()
  }, [])

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      createCard(deck.id, formData, abortController.signal);
      history.push('/');
      history.go(0);
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
        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
      </ol>
    </nav>
    <h3>{deck.name}: Add Card</h3>
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">Front</label>
      <br />
      <textarea id="front" name="front" onChange={handleChange}></textarea>
      <br />
      <label htmlFor="back">Back</label>
      <br />
      <textarea id="back" name="back" onChange={handleChange}></textarea>
      <br/>
      <Link to='/' className="btn btn-secondary">Cancel</Link>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  </>)
}

export default AddCard