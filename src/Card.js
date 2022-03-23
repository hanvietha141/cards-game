import React from "react";
import "./Card.scss";
import { coverSrc } from "./imgSrc";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={`${flipped ? "flipped" : ""}`}>
        <img src={card.src} className="card__front"></img>
        <img onClick={handleClick} src={coverSrc} className="card__back"></img>
      </div>
    </div>
  );
};

export default Card;
