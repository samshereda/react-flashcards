import React from "react";
import { useParams, Switch, Route } from "react-router-dom";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import DeckEdit from "./DeckEdit";
import AddCards from "./AddCard";
import EditCard from "./EditCard";

//Wrapper component for all deck views
function Deck() {
  const deckId = useParams().deckId;

  if (deckId) {
    return (
      <Switch>
        <Route path={`/decks/${deckId}/cards/new`}>
          <AddCards deckId={deckId} />
        </Route>
        <Route path={`/decks/${deckId}/cards/:cardId`}>
          <EditCard deckId={deckId} />
        </Route>
        <Route path={`/decks/${deckId}/study`}>
          <DeckStudy deckId={deckId} />
        </Route>
        <Route path={`/decks/${deckId}/edit`}>
          <DeckEdit deckId={deckId} />
        </Route>
        <Route path={`/decks/${deckId}`}>
          <DeckView deckId={deckId} />
        </Route>
      </Switch>
    );
  }
  return <>Loading</>;
}

export default Deck;
