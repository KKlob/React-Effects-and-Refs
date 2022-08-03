import React, { useState, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {

  const [card, setCard] = useState(null);
  const BASE_URL = 'http://deckofcardsapi.com/api/deck/';
  let url = useRef(null);
  let deckId = useRef(null);
  let remaining = useRef(52);

  function getCard() {
    async function setDeckGetCard() {
      if (!deckId.current) {
        url.current = BASE_URL + `new/draw/?count=1`;
      } else {
        url.current = BASE_URL + deckId.current + `/draw/?count=1`;
      }
      const resp = await axios.get(url.current);
      deckId.current = resp.data.deck_id;
      remaining.current = resp.data.remaining;
      setCard(resp.data.cards[0])
    }
    setDeckGetCard();
  }

  function shuffleDeck() {
    async function setupDeck() {
      await axios.get(BASE_URL + deckId.current + "/shuffle/");
    }
    setupDeck();
    remaining.current = 52;
    setCard(null);
  }

  return (
    <div className="App">
      {remaining.current > 0 ? <button onClick={getCard}>Get a card!</button> : <div />}
      <div>
        {card ? <Card card={card} /> : <div />}
      </div>
      {remaining.current === 0 ? <button onClick={shuffleDeck}>Shuffle the deck!</button> : <div />}
    </div>
  );
}

export default App;
