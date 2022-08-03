import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {

  const BASE_URL = "http://deckofcardsapi.com/api/deck/";
  const deckId = useRef();
  const remaining = useRef();
  const [card, setCard] = useState(null);
  //let contDraw = useRef(false);

  useEffect(function setupDeck() {
    async function getDeck() {
      const resp = await axios.get(BASE_URL + "new/shuffle/");
      deckId.current = resp.data.deck_id;
    }
    getDeck();
  }, []);

  function drawCard() {
    async function draw() {
      const resp = await axios.get(BASE_URL + deckId.current + "/draw/?count=1");
      remaining.current = resp.data.remaining;
      setCard(resp.data.cards[0])
    }
    draw();
  }

  function shuffleDeck() {
    async function resetDeck() {
      const resp = await axios.get(BASE_URL + deckId.current + "/shuffle/");
      remaining.current = resp.data.remaining;
      setCard(null);
    }
    resetDeck()
  }
  return (
    <div className="App">
      {remaining.current === 0 ? <div /> : <button onClick={drawCard}>Get a card!</button>}
      <div>
        {card ? <Card card={card} /> : <div />}
      </div>
      {remaining.current === 0 ? <button onClick={shuffleDeck}>Shuffle the deck!</button> : <div />}
    </div>
  );
}

export default App;
