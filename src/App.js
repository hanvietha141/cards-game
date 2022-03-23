import React, { useEffect, useState } from "react";
import "./App.scss";
import Card from "./Card";
import { imgSrc } from "./imgSrc";

const App = () => {
  const [cards, setCard] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const randommizeCards = () => {
    setCard(
      [...imgSrc, ...imgSrc]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))
    );
    resetChoices();
    setTurns(0);
  };

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const resetChoices = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCard((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src || card.src === secondChoice.src) {
              return { ...card, matched: true };
            } else return card;
          });
        });
        resetChoices();
      } else {
        setTimeout(() => {
          resetChoices();
        }, 1000);
      }
      setTurns(turns+1)
    }
  }, [firstChoice, secondChoice]);

  return (
    <div className="App">
      <h1>Memory cards</h1>
      <button onClick={randommizeCards}>New Game</button>
      {cards.length!=0 && <h2>Turn: {turns}</h2>}

      <div className="card-grid">
        {cards.map((card) => {
          return (
            <Card
              handleChoice={handleChoice}
              card={card}
              key={card.id}
              flipped={
                card === firstChoice || card === secondChoice || card.matched
              }
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
